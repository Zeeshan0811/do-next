const mongoose = require('mongoose');
const body = require('body-parser');
const co = require('co');
const express = require('express');
const next = require('next');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

const api = require('./api/api');
const { appUrl } = require('./config');
const getUrls = require('./util/getUrls');

let sitemap;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '/static/uploads'));
  },
  filename(req, file, cb) {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;

    cb(null, newFilename);
  }
});

const upload = multer({ storage });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { MONGO_URL } = process.env;
const PORT = process.env.PORT || 3000;

// credits to http://thecodebarbarian.com/building-a-nextjs-app-with-mongodb.html
co(function*() {
  // Initialize the Next.js app
  yield app.prepare();

  console.log(`Connecting to ${MONGO_URL}`);
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  const db = yield mongoose.connection;

  // Configure express to expose a REST API
  const server = express();
  server.use(compression());
  server.use(cors());
  server.use(body.json());
  server.use((req, res, next) => {
    // Also expose the MongoDB database handle so Next.js can access it.
    req.db = db;
    next();
  });
  server.use('/api', api(db, upload));

  // make clean URL's possible from server
  server.get('/piece/:id', (req, res) => {
    const actualPage = '/piece';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/edit/:id', (req, res) => {
    const actualPage = '/edit';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/gallery/:collection', (req, res) => {
    const actualPage = '/gallery';
    const queryParams = { collection: req.params.collection.toLowerCase() };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/robots.txt', (req, res) => {
    res.status(200).sendFile('robots.txt', {
      root: `${__dirname}/static/`,
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    });
  });

  server.get('/sitemap.xml', async (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    // if we have a cached entry send it
    if (sitemap) {
      res.send(sitemap);
      return;
    }
    try {
      const smStream = new SitemapStream({ hostname: appUrl });
      const pipeline = smStream.pipe(createGzip());

      const urls = await getUrls();

      for (const obj of Object.values(urls)) {
        const { page, lastModified } = obj;
        if (Object.prototype.hasOwnProperty.call(obj, 'images')) {
          const { caption, title, images } = obj;
          smStream.write({
            url: page,
            lastmod: lastModified,
            img: images.map(imgObj => ({
              url: `${appUrl}/static/uploads/${imgObj.big}`,
              caption,
              title,
              license: 'https://creativecommons.org/licenses/by/4.0/'
            }))
          });
        } else {
          smStream.write({ url: page, lastmod: lastModified }); // changefreq: 'weekly',  priority: 0.5
        }
      }
      smStream.end();

      // cache the response
      streamToPromise(pipeline).then(sm => (sitemap = sm));
      // stream the response
      pipeline.pipe(res).on('error', e => {
        throw e;
      });
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  // Everything that isn't '/api' gets passed along to Next.js
  server.get('*', (req, res) => handle(req, res));

  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}).catch(error => console.error(error.stack));
