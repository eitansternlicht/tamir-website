import React, { useState, useEffect } from 'react';
import { TableTabScene } from '../components';
import { makeStyles, Paper, Typography, Tab, Tabs, AppBar, Button } from '@material-ui/core/';
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
import { getOwners } from '../utils/general-utils';
import { firestoreModule } from '../Firebase/Firebase';
import Upload from '../utils/Upload';
import ReportsTabScene from './ReportsTabScene';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1),
    textAlign: 'right',
    backgroundColor: theme.palette.background.paper,
    //width: 500,
    //flexGrow: 1,
    width: '100%'
  },
  table: {
    padding: 3.5,
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
    // textAlign: 'center',
    // alignContent: 'center',
    // position: "centered",
    // justifyContent: 'center',
    alignItems: 'center'
  }
}));
const role = 'ceo';
const uid = 'qIAOWJMzBXdSXHf20w8J';

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

const MainScene = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
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
    unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => setIsSignedIn(!!user));
  }, []);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  if (isSignedIn && loading) {
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
    if (role === 'tutor' && !loading) {
      return (
        <TableTabScene
          originalRows={originalRows}
          setOriginalRows={setOriginalRows}
          rows={studentsRows}
          setMainRows={setStudentsRows}
          saveButtonColor={saveButtonColor}
          setSaveButtonColor={setSaveButtonColor}
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
          role={role}
          uid={uid}
          tutors={tutorsRows}
          coordinators={coordinatorsRows}
          departmentManagers={departmentManagersRows}
        />
      );
    } else return null;
  }

  return !isSignedIn ? (
    <div style={{ padding: 50 }}>
      <Typography variant="h5" component="h5" style={{ textAlign: 'right', paddingBottom: 10 }}>
        טמיר
      </Typography>
      <Typography variant="h5" component="h5" style={{ textAlign: 'right' }}>
        התחבר
      </Typography>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  ) : (
    <div>
      <div>
        <AppBar
          position="static"
          color="default"
          className={classes.appBar}
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            style={{ marginRight: 'auto' }}
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => firebase.auth().signOut()}>
            התנתק
          </Button>
          <Tabs
            indicatorColor="primary"
            // centered
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
              role={role}
              uid={uid}
            />
          </div>
        ) : null}

        {displayedTab === 'ImportFile' ? (
          <div className={classes.table}>
            <Upload
              onNewFile={aooToAdd =>
                aooToAdd.map(student => {
                  let fixedStudent = getOwners(student, role, uid);
                  firestoreModule.getStudents().add({ ...fixedStudent, lastModified: new Date() });
                })
              }
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
              role={role}
              uid={uid}
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
};

export { MainScene };
