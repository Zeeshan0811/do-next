import React from 'react';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import {
  Wrapper,
  Image,
  Figure,
  Caption,
  Text,
  Mail
} from '../styles/Commissions';

const style = {
  headline: {
    paddingTop: '20px'
  }
};

const Commissions = () => {
  return (
    <Layout pathname={false}>
      <Wrapper>
        <Figure>
          <Image src="../static/images/cufflinks.jpg" alt="Cufflinks" />
          <Caption>
            <Typography align="left" color="textSecondary">
              It is always a joy to create the personalised item.
            </Typography>
          </Caption>
        </Figure>
        <Text>
          <Typography
            align="left"
            color="secondary"
            variant="h5"
            gutterBottom
            style={style.headline}
          >
            COMMISSIONS
          </Typography>
          <Typography align="left" paragraph color="secondary">
            For any interest, please{' '}
            <Mail href="mailto:hello@dovilejewellery.com" target="_top">
              e-mail me
            </Mail>{' '}
            with the piece you interested chosen from my designs. I am accepting
            idea for the customised item only fitting my vision and my
            aesthetics, work principles. The design, price, timing and delivery
            are discussed by e-mail or in person.
          </Typography>

          <Typography align="left" paragraph color="secondary">
            Most of my designs could be re-created in new different ways as in
            different materials, gold-plating, different gemstones etc. Feel
            free to ask. I am making one of a kind piece to make each unique and
            special.
          </Typography>
          <Typography align="left" paragraph color="secondary">
            Please note, I do not make any other designs taken from other
            makers.
          </Typography>
        </Text>
      </Wrapper>
    </Layout>
  );
};

export default Commissions;