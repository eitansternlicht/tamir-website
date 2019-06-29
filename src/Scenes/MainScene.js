import React, { useState, useEffect } from 'react';
import { TableTabScene } from '../components';
import { makeStyles, Typography, Tab, Tabs, AppBar, Button } from '@material-ui/core/';
import green from '@material-ui/core/colors/green';
import { GenericTab } from '../components/GenericTab';
import {
  getStudents,
  getTutors,
  getCoordinators,
  getDepartmentManagers
} from '../utils/createRowData';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Loader from 'react-loader-spinner';
import { addOwners } from '../utils/local-db';
import { firestoreModule } from '../Firebase/Firebase';
import Upload from '../utils/Upload';
import ReportsTabScene from './ReportsTabScene';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1),
    textAlign: 'right',
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  table: {
    padding: 20,
    paddingTop: 5,
    borderRadius: 3
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '15%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  details: {
    textAlign: 'right',
    backgroundColor: theme.palette.background.paper,
    padding: 5
  },
  appBar: {
    alignItems: 'center'
  }
}));
// const role = 'ceo';
// const uid = 'qIAOWJMzBXdSXHf20w8J';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      defaultCountry: 'IL'
    }
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const popup = () => {
  return 'are you sure you want to exit?';
};

const MainScene = () => {
  // const [isSignedIn, setIsSignedIn] = useState(true);
  const [userStatus, setUserStatus] = useState('SignedOut');
  const [loading, setLoading] = useState(true);
  const [loadingTutors, setLoadingTutors] = useState(true);
  const [loadingCoordinators, setLoadingCoordinators] = useState(true);
  const [loadingDepartmentManagers, setLoadingDepartmentManagers] = useState(true);
  const [studentsRows, setStudentsRows] = useState([]);
  const [saveButtonColor, setSaveButtonColor] = useState('default');
  const [tutorsSaveButtonColor, setTutorsSaveButtonColor] = useState('default');
  const [coordinatorsSaveButtonColor, setCoordinatorsSaveButtonColor] = useState('default');
  const [departmentManagersSaveButtonColor, setDepartmentManagersSaveButtonColor] = useState(
    'default'
  );
  const [coordinatorsRows, setCoordinatorsRows] = useState([]);
  const [tutorsRows, setTutorsRows] = useState([]);
  const [departmentManagersRows, setDepartmentManagersRows] = useState([]);
  const [displayedTab, setDisplayedTab] = useState('TableTabScene');
  const [originalRows, setOriginalRows] = useState([]);
  const [tutorsOriginalRows, setTutorsOriginalRows] = useState([]);
  const [coordinatorsOriginalRows, setCoordinatorsOriginalRows] = useState([]);
  const [departmentManagersOriginalRows, setDepartmentManagersOriginalRows] = useState([]);

  firebase.auth().languageCode = 'iw';
  let unregisterAuthObserver;
  // componentDidMount
  useEffect(() => {
    unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserStatus('SignedInCheckingPermissions');
        user
          .getIdTokenResult()
          .then(idTokenResult => {
            if (idTokenResult && idTokenResult.claims && idTokenResult.claims.isRegistered) {
              setUserStatus(idTokenResult.claims);

            } else {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  setUserStatus('SignedOutPermissionDenied');
                });
            }
          })
          .catch(err => {
            firebase
              .auth()
              .signOut()
              .then(() => setUserStatus('SignedOutPermissionDenied'));
            console.error(err);
          });
      }
    });
  }, []);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  if (userStatus.isRegistered && loading) {
    const { uid } = firebase.auth().currentUser;
    const { role } = userStatus;
    getStudents(setStudentsRows, setLoading, uid, role);
    getStudents(setOriginalRows, setLoading, uid, role);
    if (role !== 'tutor') {
      getTutors(setTutorsRows, uid, setLoadingTutors, role);
      getTutors(setTutorsOriginalRows, uid, setLoadingTutors, role);
    }
    if (role === 'departmentManager' || role === 'ceo') {
      getCoordinators(setCoordinatorsRows, uid, setLoadingCoordinators, role);
      getCoordinators(setCoordinatorsOriginalRows, uid, setLoadingCoordinators, role);
    }
    if (role === 'ceo') {
      getDepartmentManagers(setDepartmentManagersRows, setLoadingDepartmentManagers);
      getDepartmentManagers(setDepartmentManagersOriginalRows, setLoadingDepartmentManagers);
    }
  }

  function handleChange(event, newValue) {
    setDisplayedTab(newValue);
  }

  const classes = useStyles();

  function getAppropriateStudentsRows() {
    const { uid } = firebase.auth().currentUser;
    const { role } = userStatus;
    if (role === 'tutor' && !loading) {
      return (
        <TableTabScene
          originalRows={originalRows}
          setOriginalRows={setOriginalRows}
          rows={studentsRows}
          setMainRows={setStudentsRows}
          saveButtonColor={saveButtonColor}
          setSaveButtonColor={setSaveButtonColor}
          userStatus={userStatus}
          role={role}
          uid={uid}
          tutors={tutorsRows}
          coordinators={coordinatorsRows}
          departmentManagers={departmentManagersRows}
        />
      );
    } else if (role === 'coordinator' && !loading && !loadingTutors) {
      return (
        <TableTabScene
          originalRows={originalRows}
          setOriginalRows={setOriginalRows}
          rows={studentsRows}
          setMainRows={setStudentsRows}
          saveButtonColor={saveButtonColor}
          setSaveButtonColor={setSaveButtonColor}
          userStatus={userStatus}
          role={role}
          uid={uid}
          tutors={tutorsRows}
          coordinators={coordinatorsRows}
          departmentManagers={departmentManagersRows}
        />
      );
    } else if (role === 'departmentManager' && !loading && !loadingTutors && !loadingCoordinators) {
      return (
        <TableTabScene
          originalRows={originalRows}
          setOriginalRows={setOriginalRows}
          rows={studentsRows}
          setMainRows={setStudentsRows}
          saveButtonColor={saveButtonColor}
          setSaveButtonColor={setSaveButtonColor}
          userStatus={userStatus}
          role={role}
          uid={uid}
          tutors={tutorsRows}
          coordinators={coordinatorsRows}
          departmentManagers={departmentManagersRows}
        />
      );
    } else if (
      role === 'ceo' &&
      !loading &&
      !loadingTutors &&
      !loadingCoordinators &&
      !loadingDepartmentManagers
    ) {
      return (
        <TableTabScene
          originalRows={originalRows}
          setOriginalRows={setOriginalRows}
          rows={studentsRows}
          setMainRows={setStudentsRows}
          saveButtonColor={saveButtonColor}
          setSaveButtonColor={setSaveButtonColor}
          userStatus={userStatus}
          role={role}
          uid={uid}
          tutors={tutorsRows}
          coordinators={coordinatorsRows}
          departmentManagers={departmentManagersRows}
        />
      );
    } else return null;
  }

  if (userStatus === 'SignedOut')
    return (
      <div style={{ padding: 50 }}>
        <Typography variant="h5" component="h5" style={{ textAlign: 'right', paddingBottom: 10 }}>
          טמיר
        </Typography>
        <Typography variant="h5" component="h5" style={{ textAlign: 'right' }}>
          התחבר
        </Typography>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  else if (userStatus === 'SignedOutPermissionDenied')
    return (
      <div style={{ padding: 50 }}>
        <Typography variant="h5" component="h5" style={{ textAlign: 'right', paddingBottom: 10 }}>
          טמיר
        </Typography>
        <Typography variant="h5" component="h5" style={{ textAlign: 'right' }}>
          התחבר
        </Typography>
        <Typography variant="h5" component="h5" style={{ textAlign: 'right', color: 'red' }}>
          אין הרשאות גישה למספר זה
        </Typography>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  else if (userStatus === 'SignedInCheckingPermissions')
    return <Loader type="Grid" color="#41ad48" height="100" width="100" />;
  else {
    const { uid } = firebase.auth().currentUser;
    const { role } = userStatus;
    return (
      <div  >
        {saveButtonColor === 'secondary' ? (window.onbeforeunload = popup) : null}
        <div>
          <AppBar
            position="static"
            color="default"
            className={classes.appBar}
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingLeft: 10, paddingTop: 7 }}>
            <Button
              style={{ marginRight: 'auto' }}
              size="large"
              variant="outlined"
              color="primary"
              onClick={() => {
                setUserStatus('SignedOut');
                firebase.auth().signOut();
              }}>
              התנתק
            </Button>
            <Tabs
              indicatorColor="primary"
              style={{ marginRight: 'auto' }}
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              value={displayedTab}
              onChange={handleChange}>
              <Tab key={0} value="ReportsTabScene" label="דוחות" />
              <Tab key={5} value="ImportFile" label="ייבוא קובץ מאקסל" />
              {role === 'ceo' ? (
                <Tab key={1} value="DepartmentManagersTabScene" label="מנהלי מחלקות" />
              ) : null}
              {role === 'departmentManager' || role === 'ceo' ? (
                <Tab key={2} value="CoordinatorsTabScene" label="רכזים" />
              ) : null}
              {role !== 'tutor' ? <Tab key={3} value="TutorsTabScene" label="מדריכים" /> : null}
              <Tab key={4} value="TableTabScene" label="חניכים" />
            </Tabs>
          </AppBar>

          {displayedTab === 'TableTabScene' ? (
            <div className={classes.table}>{getAppropriateStudentsRows()}</div>
          ) : null}

          {displayedTab === 'TutorsTabScene' ? (
            <div className={classes.table}>
              <GenericTab
                originalRows={tutorsOriginalRows}
                setOriginalRows={setTutorsOriginalRows}
                rows={tutorsRows}
                setMainRows={setTutorsRows}
                genericSaveButtonColor={tutorsSaveButtonColor}
                setGenericSaveButtonColor={setTutorsSaveButtonColor}
                type="tutors"
                userStatus={userStatus}
                role={role}
                uid={uid}
              />
            </div>
          ) : null}

          {displayedTab === 'CoordinatorsTabScene' ? (
            <div className={classes.table}>
              <GenericTab
                originalRows={coordinatorsOriginalRows}
                setOriginalRows={setCoordinatorsOriginalRows}
                rows={coordinatorsRows}
                setMainRows={setCoordinatorsRows}
                genericSaveButtonColor={coordinatorsSaveButtonColor}
                setGenericSaveButtonColor={setCoordinatorsSaveButtonColor}
                type="coordinators"
                userStatus={userStatus}
                role={role}
                uid={uid}
              />
            </div>
          ) : null}

          {displayedTab === 'DepartmentManagersTabScene' ? (
            <div className={classes.table}>
              <GenericTab
                originalRows={departmentManagersOriginalRows}
                setOriginalRows={setDepartmentManagersOriginalRows}
                rows={departmentManagersRows}
                setMainRows={setDepartmentManagersRows}
                genericSaveButtonColor={departmentManagersSaveButtonColor}
                setGenericSaveButtonColor={setDepartmentManagersSaveButtonColor}
                type="departmentManagers"
                userStatus={userStatus}
                role={role}
                uid={uid}
              />
            </div>
          ) : null}
          {displayedTab === 'ImportFile' ? (
            <div className={classes.table}>
              <Upload
                onNewFile={aooToAdd => {
                  aooToAdd.forEach(student => {
                    const fixedStudent = addOwners(role, uid, userStatus.owners, null, student);
                    firestoreModule
                      .getStudents()
                      .add({ ...fixedStudent, lastModified: new Date() });
                  });
                }}
              />
            </div>
          ) : null}

          {displayedTab === 'ReportsTabScene' ? (
            <div className={classes.table}>
              <ReportsTabScene tutors={tutorsOriginalRows} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
};

export default MainScene;
