// import React from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   CardActions,
//   TextField,
//   i,
//   HomeIcon,
//   CardActionArea,
//   Container
// } from '@material-ui/core';
// import InfoIcon from '@material-ui/icons/Info';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
// import PeopleIcon from '@material-ui/icons/AccountBox';

// import clsx from 'clsx';

// class LoginSms extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       phone: '',
//       errorText: '',
//       error: {
//         phone: false
//       }
//     };
//   }

//   isValid = () => {
//     const { phone } = this.state;
//     let res = true;
//     let error = {
//       phone: false
//     };
//     if (!phone) {
//       error.phone = true;
//       res = false;
//     }
//     this.setState({ error });
//     return res;
//   };
//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.isValid()) {
//       this.setState({ errorText: '' });
//     } else {
//       this.setState({ errorText: 'invalid' });
//     }
//   };
//   handleChange = event => {
//     event.preventDefault();
//     const tempPhone = event.target.value.charAt(0);
//     if (event.target.value.length > 0 && tempPhone === '+') {
//       event.target.value = event.target.value.substr(0, 31);
//     }
//     if (event.target.value.length > 0 && tempPhone != '+') {
//       event.target.value = event.target.value.substr(0, 11);
//     }
//     if (event.target.value.length === 3 && tempPhone != '+') {
//       event.target.value += '-';
//     }
//     if (this.isValid() || event.target.value.length === 1 || event.target.value.length === 2) {
//       this.setState({ errorText: '' });
//     } else {
//       this.setState({ errorText: 'invalid' });
//     }
//     console.log(JSON.stringify(this.state));
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   displayErrors = errors => {
//     errors.map((error, i) => <p key />);
//   };
//   render() {
//     const { phone, errorText } = this.state;
//     const classes = {
//       textField: {
//         // marginLeft: 100,
//         // width:
//       },
//       dense: {
//         marginTop: 19
//       }
//     };
//     return (
//       <Container>
//         <Typography component="div" style={{ backgroundColor: '#d6d6c2', height: '100vh' }}>
//           <AppBar position="static">
//             <Toolbar>
//               <Typography variant="h6" style={{ flexGrow: 1 }}>
//                 Login
//               </Typography>

//               <h3 color="inherit">פורטל טמיר</h3>
//             </Toolbar>
//           </AppBar>
//           <form onSubmit={this.handleSubmit}>
//             <Card
//               style={{
//                 maxWidth: 350,
//                 minhight: 450,
//                 marginLeft: 400,
//                 marginTop: 100,
//                 marginBottom: 150
//               }}>
//               <CardContent>
//                 <Typography
//                   variant="body2"
//                   color="textSecondary"
//                   component="p"
//                   style={{ textAlign: 'center', height: 50 }}>
//                   <AccountBoxIcon fontSize="large" variant="h1" />
//                 </Typography>
//                 <CardActionArea>
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     component="p"
//                     style={{ textAlign: 'center' }}>
//                     SMS כניסה באמצעות
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     component="p"
//                     style={{ marginTop: 30, textAlign: 'right' }}>
//                     כדי להיכנס למערכת עלייך להקליד את מספר הפלאפון שלך לצורך קבלת סיסמא
//                   </Typography>
//                 </CardActionArea>
//                 {errorText ? (
//                   <Typography style={{ height: 56.5 }}>
//                     <InfoIcon style={{ position: 'absolute', left: 770, top: 350 }} />
//                     <TextField
//                       error
//                       id="standard-error"
//                       className={clsx(classes.textField, classes.dense)}
//                       margin="normal"
//                       fullWidth
//                       label=""
//                       placeholder=" שדה חובה"
//                       name="phone"
//                       value={phone}
//                       onChange={this.handleChange}
//                     />
//                   </Typography>
//                 ) : (
//                     <Typography style={{ height: 56.5 }}>
//                       <TextField
//                         fullWidth
//                         id="standard-dense"
//                         label="Phone Number"
//                         className={clsx(classes.textField, classes.dense)}
//                         margin="dense"
//                         name="phone"
//                         errorText={this.state.firstNameError}
//                         value={phone}
//                         onChange={this.handleChange}
//                       />
//                     </Typography>
//                   )}
//                 {/* <PhoneInput
//                   placeholder="Enter phone number"
//                   value={this.state.phone}
//                   onChange={phone => {
//                     this.setState({ phone });
//                   }}
//                 /> */}
//               </CardContent>
//               <CardActions>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   style={{ margin: 10 }}
//                   fullWidth
//                   onClick={this.handleSubmit}>
//                   SMS שלחו לי
//                 </Button>
//               </CardActions>
//             </Card>
//           </form>
//         </Typography>
//       </Container>
//     );
//   }
// }

// export { LoginSms };


// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { firestoreModule } from '../Firebase/Firebase';


class LoginSms extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      //firebase.auth.phoneauthprovider.credential;
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //onSignInSubmit();
      }
    });
    firebase.auth().languageCode = firebase.auth().useDeviceLanguage();
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}

export {LoginSms};