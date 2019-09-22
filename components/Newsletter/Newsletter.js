import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Input, Typography, Button, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

import { Wrapper, Form, Wrap } from '../../styles/Newsletter';

const styles = () => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  wrapper: {
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: '#9E9E9E',
    '&:hover': {
      backgroundColor: '#212121'
    }
  },
  buttonProgress: {
    color: '#9E9E9E',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  inputRoot: {
    fontSize: '14px',
    maxWidth: '178px',
    background: '#fff',
    padding: '0 4px',
    borderRadius: '3px 0 0 3px',
    height: '30px'
  },
  newsletter: {
    textShadow: '2px 2px #333',
    alignItems: 'center',
    marginBottom: '10px',
    letterSpacing: '2px'
  },
  discover: {
    textShadow: '1px 1px #333',
    alignItems: 'center',
    marginBottom: '20px'
  },
  button: {
    borderRadius: '0 3px 3px 0',
    height: '30px'
  },
  checkIcon: {
    color: '#4CAF50'
  }
});

class Newsletter extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    subscribed: false,
    email: '',
    loading: false,
    error: null
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  sendRequest = e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    const { email } = this.state;
    axios
      .post('/api/subscribe', {
        email
      })
      .then(res => {
        if (res.data.err) {
          return this.setState({ error: res.data.err, loading: false });
        }
        this.setState({ subscribed: true, loading: false });
        return res.data;
      })
      .catch(err => {
        this.setState({ loading: false, error: err });
        return err;
      });
  };

  render() {
    const { subscribed, email, loading, error } = this.state;
    const { classes } = this.props;

    return (
      <Wrapper>
        <Typography
          variant="h5"
          align="center"
          color="primary"
          classes={{ root: classes.newsletter }}
        >
          SIGN UP FOR NEWSLETTER
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="primary"
          classes={{ root: classes.discover }}
        >
          discover new designs, upcoming shows and events
        </Typography>
        <Form onSubmit={e => this.sendRequest(e)}>
          <Wrap>
            {subscribed ? null : (
              <Input
                value={email}
                id="email"
                inputProps={{
                  'aria-label': 'Signup for newsletter',
                  required: true
                }}
                type="email"
                disableUnderline
                classes={{ root: classes.inputRoot }}
                onChange={this.handleChange('email')}
                error={!!error}
                placeholder="Email"
              />
            )}
            <div className={classes.root}>
              <div className={classes.wrapper}>
                {subscribed ? (
                  <>
                    <Typography inline variant="body2" color="primary">
                      Subscribed
                    </Typography>{' '}
                    <CheckIcon classes={{ root: classes.checkIcon }} />
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                    className={subscribed ? classes.buttonSuccess : ''}
                    classes={{ root: classes.button }}
                    disabled={loading}
                  >
                    Subscribe
                  </Button>
                )}
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
          </Wrap>
          {error && (
            <Typography variant="body2" color="primary">
              {error}
            </Typography>
          )}
        </Form>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(Newsletter);
