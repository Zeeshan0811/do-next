import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/Layout';
import {
  Wrapper,
  Stockist,
  StockistText,
  UpcomingEvents,
  Events,
  ImageWrapper,
  Image,
  Data
} from '../styles/WhereToFind';
import UpcomingEvent from '../components/UpcomingEvent/UpcomingEvent';
import { AnchorLink, Table, Row } from '../styles/Shared';

const styles = () => ({
  fontSize: {
    fontSize: '1.2rem'
  },
  mb: {
    marginBottom: '12px'
  }
});

const WhereToFind = ({ pathname, collections, classes }) => (
  <Layout
    pathname={pathname}
    collections={collections}
    title="Where To Find | Dovile Jewellery"
  >
    <UpcomingEvent />
    <Wrapper>
      <Stockist>
        <ImageWrapper>
          <Image src="/static/images/wheretofind1.JPG" alt="dovile jewellery" />
        </ImageWrapper>
        <StockistText>
          <Typography variant="body1" gutterBottom className={classes.fontSize}>
            STOCKISTS
          </Typography>
          <Typography variant="body2">
            <AnchorLink
              href="https://studiofusiongallery.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              STUDIO FUSION GALLERY
            </AnchorLink>
            , Unit 1:06, Oxo Tower Wharf, Bargehouse Street, London SE1 9PH, UK
          </Typography>
          <Typography variant="body2" gutterBottom>
            <AnchorLink
              href="https://www.artisan-alchemy.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ARTISAN ALCHEMY GALLERY
            </AnchorLink>
            , 85 Caroline Street, Birmingham, B3 1UP, UK
          </Typography>
          <Typography variant="body2" gutterBottom>
            <AnchorLink
              href="http://www.vda.lt/lt/galerija-argentum/apie-galerija"
              target="_blank"
              rel="noopener noreferrer"
            >
              ARGENTUM GALLERY
            </AnchorLink>
            , Latako g. 2, Vilnius, Lithuania
          </Typography>
          <Typography variant="body2" gutterBottom>
            <AnchorLink
              href="https://www.facebook.com/theplaces17/"
              target="_blank"
              rel="noopener noreferrer"
            >
              THE PLACE
            </AnchorLink>
            , Subaciaus g. 17-33, Vilnius, Lithuania
          </Typography>
          <Typography variant="body2" gutterBottom>
            <AnchorLink
              href="https://miutto.com/collections/dovile-jewellery"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIUTTO
            </AnchorLink>
          </Typography>
        </StockistText>
      </Stockist>
      <Events>
        <UpcomingEvents>
          <ImageWrapper>
            <Image
              src="/static/images/wheretofind2.JPG"
              alt="dovile jewellery"
            />
          </ImageWrapper>
          <Typography variant="body1" gutterBottom className={classes.fontSize}>
            UPCOMING EVENTS
          </Typography>
          <Table>
            <tbody>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">10 - 12 Oct</Typography>
                </Data>
                <Data>
                  <AnchorLink
                    href="http://preview.joyabarcelona.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="body2" gutterBottom inline>
                      JOYA Barcelona Art Jewellery & Objects
                    </Typography>
                  </AnchorLink>
                  <Typography variant="body2" gutterBottom inline>
                    , Barcelona, Spain
                  </Typography>
                </Data>
              </Row>
              <Row>
                <Data>
                  {' '}
                  <Typography variant="body2">4 Nov - 23 Feb</Typography>
                </Data>
                <Data>
                  <AnchorLink
                    href="https://ysp.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography variant="body2" gutterBottom inline>
                      MADE Showcase
                    </Typography>
                  </AnchorLink>
                  <Typography variant="body2" gutterBottom inline>
                    , Yorkshire Sculpture Park
                  </Typography>
                </Data>
              </Row>
            </tbody>
          </Table>
        </UpcomingEvents>
      </Events>
    </Wrapper>
  </Layout>
);

WhereToFind.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  classes: PropTypes.object.isRequired
};

WhereToFind.getInitialProps = async ({ pathname }) => ({ pathname });

export default withStyles(styles)(WhereToFind);
