import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  i,
  HomeIcon,
  CardActionArea,
  Container
} from '@material-ui/core';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InfoIcon from '@material-ui/icons/Info';

// import account_box from '@material-ui/icons/Action/account_box';

import clsx from 'clsx';

class LoginPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      errorText: '',
      error: {
        password: false
      }
    };
  }

  isValid = () => {
    const { password } = this.state;
    let res = true;
    let error = {
      password: false
    };
    if (!password) {
      error.password = true;
      res = false;
    }
    this.setState({ error });
    return res;
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errorText: '' });
    } else {
      this.setState({ errorText: 'invalid' });
    }
  };
  handleChange = event => {
    event.preventDefault();
    if (event.target.value.length > 6) {
      event.target.value = event.target.value.substr(0, 6);
    }
    if (this.isValid() || event.target.value.length === 1 || event.target.value.length === 2) {
      this.setState({ errorText: '' });
    } else {
      this.setState({ errorText: 'invalid' });
    }
    console.log(JSON.stringify(this.state));
    this.setState({ [event.target.name]: event.target.value });
  };

  displayErrors = errors => {
    errors.map((error, i) => <p key />);
  };
  render() {
    const { password, errorText } = this.state;
    const classes = {
      textField: {
        marginLeft: 100,

        width: 1000
      },
      dense: {
        marginTop: 19
      }
    };
    return (
      <Container>
        <Typography component="div" style={{ backgroundColor: '#d6d6c2', height: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Login
              </Typography>

              <h3 color="inherit">פורטל טמיר</h3>
            </Toolbar>
          </AppBar>
          <form onSubmit={this.handleSubmit}>
            <Card
              style={{
                maxWidth: 350,
                minhight: 450,
                marginLeft: 395,
                marginTop: 100,
                marginBottom: 150
              }}>
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ textAlign: 'center', height: 50 }}>
                  <AccountBoxIcon fontSize="large" variant="h1" />
                </Typography>
                <CardActionArea>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ textAlign: 'center' }}
                  />

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ marginTop: 30, textAlign: 'right' }}>
                    SMS אנא הקלד את הסיסמא שנשלח אלייך ב
                  </Typography>
                </CardActionArea>
                {errorText ? (
                  <Typography style={{ height: 72 }}>
                    <InfoIcon style={{ position: 'absolute', left: 760, top: 310 }} />
                    <TextField
                      error
                      id="standard-error"
                      className={classes.textField}
                      margin="normal"
                      fullWidth
                      label=""
                      placeholder=" שדה חובה"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </Typography>
                ) : (
                  <Typography style={{ height: 72 }}>
                    <TextField
                      fullWidth
                      id="standard-dense"
                      label="password"
                      className={clsx(classes.textField, classes.dense)}
                      margin="normal"
                      name="password"
                      errorText={this.state.firstNameError}
                      value={password}
                      autoComplete="current-password"
                      onChange={this.handleChange}
                    />
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: 10 }}
                  fullWidth
                  onClick={this.handleSubmit}>
                  Login
                </Button>
              </CardActions>
            </Card>
          </form>
        </Typography>
      </Container>
    );
  }
}

export { LoginPassword };
