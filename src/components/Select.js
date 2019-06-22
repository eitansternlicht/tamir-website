import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AlertDialog } from './../components';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  FormControl,
  NativeSelect,
  FormHelperText,
  TextField,
  Paper,
  Table,
  TableCell,
  HomeIcon,
  CardActionArea,
  TableBody,
  TableHead,
  TableRow,
  Container
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InfoIcon from '@material-ui/icons/Info';
import LockIcon from '@material-ui/icons/Lock';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import account_box from '@material-ui/icons/Action/account_box';

import clsx from 'clsx';

const rows = [
  'i',
  'lastName',
  'firstName',
  'groups',
  'phone',
  'gender',
  'schoolGrade',
  'school',
  'address',
  'neighborhood',
  'dob',
  'govID',
  'city',
  'email',
  'shirtSize',
  'friends',
  'socialCircle',
  'youthGroup',
  'interests',
  'specialIssues',
  'prefferedDays',
  'staffMemberAppointed',
  'comments'
];
const fileRows = rows;
class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'lastName': '',
      'firstName': '',
      'groups': '',
      'phone': '',
      'gender': '',
      'schoolGrade': '',
      'school': '',
      'address': '',
      'neighborhood': '',
      'dob': '',
      'govID': '',
      'city': '',
      'email': '',
      'shirtSize': '',
      'friends': '',
      'socialCircle': '',
      'youthGroup': '',
      'interests': '',
      'specialIssues': '',
      'prefferedDays': '',
      'staffMemberAppointed': '',
      'comments': '',
      i: '',
      okeeDialog: '',
      errordialog: '',
      open: '',
      send: ''
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };



  getLabel = str => {
    switch (str) {
      case 'i':
        return 'בחר עמודה מתאימה';
      case 'lastName':
        return 'שם משפחה';
      case 'firstName':
        return 'שם פרטי';
      case 'phone':
        return 'נייד';
      case 'groups':
        return 'קבוצות';
      case 'gender':
        return 'מין';
      case 'schoolGrade':
        return 'כיתה';
      case 'school':
        return 'מוסד  לימודים';
      case 'address':
        return 'כתובת';
      case 'neighborhood':
        return 'שכונה';
      case 'dob':
        return 'תאריך לידה';
      case 'govID':
        return 'תעודת זהות';
      case 'city':
        return 'עיר';
      case 'email':
        return 'מייל';
      case 'friends':
        return 'חברים';
      case 'shirtSize':
        return 'מידת חולצה';
      case 'socialCircle':
        return 'מעגל חברתי';
      case 'youthGroup':
        return 'תנועת נוער';
      case 'interests':
        return 'תחומי עניין';
      case 'specialIssues':
        return 'בעיות מיוחדות';
      case 'prefferedDays':
        return 'ימים מועדפים';
      case 'staffMemberAppointed':
        return 'איש צוות מטפל';
      case 'comments':
        return 'הערות';
    }
  };

  chekdisabled = str => {
    if (str === 'i') {
      return false;
    }
    return Object.values(this.state).includes(this.getLabel(str));
  };



  handleClickOpen = () => {
    // const keys = Object.keys(this.state);

    let values = rows.map(key => key !== 'i' ? this.state[key] : null);
    values = values.map(row => row === '' && row !== null ? 'בחר עמודה מתאימה' : row);

    console.log("val", values);
    let canSend = !values.includes('בחר עמודה מתאימה');

    if (canSend === true) {
      this.setState({ send: true });
      return;
    }

    if (values.includes('') || values.includes('בחר עמודה מתאימה'))
      this.setState({ open: true });
    else
      this.setState({ open: false });

    return;
  };

  handleClose = () => {
    this.setState({ open: false });

    this.setState({ send: false });
  };

  displayErrors = errors => {
    errors.map((error, i) => <p key />);
  };

  render() {

    // const useStyles = makeStyles(theme => ({
    //   root: {
    //     display: 'flex',
    //     margin: 50,
    //     flexWrap: 'wrap'
    //   },
    //   formControl: {
    //     margin: theme.spacing(1),
    //     flexDirection: 'row',
    //     minWidth: 120
    //   },
    //   selectEmpty: {
    //     marginTop: theme.spacing(2)
    //   },
    //   leftIcon: {
    //     marginRight: theme.spacing(1)
    //   },
    //   iconSmall: {
    //     fontSize: 40
    //   },
    //   button: {
    //     margin: theme.spacing(1)
    //   }
    // }));
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
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button
              align='right'
              color="secondary"
              style={{ width: 150, height: 50, position: 'relative', float: 'left', margin: 20 }}
              variant="contained"
              className={classes.button}
              onClick={this.handleClickOpen}>
              <ChevronLeftIcon style={{ marginRight: 20 }} />
              בצע התאמה
        </Button>
            <Typography variant="h6" style={{ flexGrow: 1 }} />
            <h2 color="inherit" style={{ flexGrow: 1 }}>
              התאמת עמודות
            </h2>

          </Toolbar>

        </AppBar>

        <CardContent>
          <Table style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
            <TableBody>
              <TableRow style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto' }} >
                <TableCell component="th" scope="row" />
                <TableCell align="right"> מותאם ל </TableCell>
                <TableCell align="right"> עמודה מהאקסל </TableCell>
              </TableRow>
              {rows.map(row => (row !== 'i' ?
                <TableRow key={row} style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
                  <TableCell component="th" scope="row" />
                  <TableCell align="right">
                    <NativeSelect
                      className={classes.selectEmpty}
                      value={this.state[row]}
                      name={row}
                      onChange={this.handleChange(row)}
                      inputProps={{ 'aria-label': 'age' }}>
                      {fileRows.map(row => <option disabled={this.chekdisabled(row)} value={this.getLabel(row)}>
                        {this.getLabel(row)}
                      </option>)}
                    </NativeSelect>
                  </TableCell>
                  <TableCell align="right">{this.getLabel(row)}</TableCell>
                </TableRow>
                : null))}
            </TableBody>
          </Table>
        </CardContent>


        <Dialog
          open={this.state.open}
          onClose={this.handleClickOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">error</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              המערכת לא הצליחה לטעון את הנתונים בדוק אם מלאת את כול השדות
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              אישור
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.send}
          onClose={this.handleClickOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">okee</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              הנתונים נטענו בהצלחה
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              אישור
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Select;
