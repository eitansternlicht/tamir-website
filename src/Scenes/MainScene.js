import React, { useState } from 'react';
import { TableTabScene } from '../components';
import { makeStyles, CircularProgress, Paper, Typography, Tab, Tabs, AppBar } from '@material-ui/core/';
import green from '@material-ui/core/colors/green';
import { GenericTab } from '../components/GenericTab';
import { getStudents, getTutors, getCoordinators, getDepartmentManagers } from '../utils/createRowData';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 1),
        textAlign: 'right',
        backgroundColor: theme.palette.background.paper,
        //width: 500,
        //flexGrow: 1,
        width: '100%',
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
        padding: 5,

    },
    appBar: {
        // textAlign: 'center',
        // alignContent: 'center',
        // position: "centered",
        // justifyContent: 'center',
        alignItems: 'center',

    }
}));
const role = 'ceo';
const uid = 'qIAOWJMzBXdSXHf20w8J';

function MainScene() {
    const [loading, setLoading] = useState(true);
    const [loadingTutors, setLoadingTutors] = useState(true);
    const [loadingCoordinators, setLoadingCoordinators] = useState(true);
    const [loadingDepartmentManagers, setLoadingDepartmentManagers] = useState(true);
    const [studentsRows, setStudentsRows] = useState([]);
    const [saveButtonColor, setSaveButtonColor] = useState('default');
    const [tutorsSaveButtonColor, setTutorsSaveButtonColor] = useState('default');
    const [coordinatorsSaveButtonColor, setCoordinatorsSaveButtonColor] = useState('default');
    const [departmentManagersSaveButtonColor, setDepartmentManagersSaveButtonColor] = useState('default');
    const [coordinatorsRows, setCoordinatorsRows] = useState([]);
    const [tutorsRows, setTutorsRows] = useState([]);
    const [departmentManagersRows, setDepartmentManagersRows] = useState([]);
    const [displayedTab, setDisplayedTab] = useState('TableTabScene');

    if (loading) {
        getStudents(setStudentsRows, setLoading)
        if (role !== 'tutor')
            getTutors(setTutorsRows, uid, setLoadingTutors, role);
        if (role === 'departmentManager' || role === 'ceo')
            getCoordinators(setCoordinatorsRows, uid, setLoadingCoordinators, role);
        if (role === 'ceo')
            getDepartmentManagers(setDepartmentManagersRows, setLoadingDepartmentManagers);
    }

    function handleChange(event, newValue) {

        setDisplayedTab(newValue);
    }

    const classes = useStyles();

    return (
        <div >
            <div>
                <Paper className={classes.details}>
                    <Typography variant="h5" component="h5">
                        מנהל מחלקה א
                    </Typography>
                    <Typography component="p">ירושלים</Typography>
                </Paper>
            </div>
            <div>
                <AppBar position="static" color="default" className={classes.appBar}>
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        value={displayedTab}
                        onChange={handleChange}

                    >

                        <Tab value="ReportsTabScene" label="דוחות" />
                        {role === 'ceo' ? <Tab value="DepartmentManagersTabScene" label="מנהלי מחלקות" /> : <></>}
                        {role === 'departmentManager' || role === 'ceo' ? <Tab value="CoordinatorsTabScene" label="רכזים" /> : <></>}
                        {role !== 'tutor' ? <Tab value="TutorsTabScene" label="מדריכים" /> : <></>}
                        <Tab value="TableTabScene" label="חניכים" />
                    </Tabs>
                </AppBar>

                {displayedTab === 'TableTabScene' ?
                    <div className={classes.table}>
                        {loading || loadingTutors || loadingCoordinators || loadingDepartmentManagers ? <></> : <TableTabScene rows={studentsRows} setMainRows={setStudentsRows} saveButtonColor={saveButtonColor} setSaveButtonColor={setSaveButtonColor} role={role} uid={uid} tutors={tutorsRows} coordinators={coordinatorsRows} departmentManagers={departmentManagersRows} />}
                        {(loading || loadingTutors || loadingCoordinators || loadingDepartmentManagers) && <CircularProgress size={40} className={classes.buttonProgress} />}
                    </div> : <></>}
                {displayedTab === 'TutorsTabScene' ?
                    <GenericTab rows={tutorsRows} setMainRows={setTutorsRows} genericSaveButtonColor={tutorsSaveButtonColor} setGenericSaveButtonColor={setTutorsSaveButtonColor} type="tutors" role={role} uid={uid} /> : <></>}
                {displayedTab === 'CoordinatorsTabScene' ?
                    <GenericTab rows={coordinatorsRows} setMainRows={setCoordinatorsRows}  genericSaveButtonColor={coordinatorsSaveButtonColor} setGenericSaveButtonColor={setCoordinatorsSaveButtonColor} type="coordinators" role={role} uid={uid} /> : <></>}
                {displayedTab === 'DepartmentManagersTabScene' ?
                    <GenericTab rows={departmentManagersRows} setMainRows={setDepartmentManagersRows}  genericSaveButtonColor={departmentManagersSaveButtonColor} setGenericSaveButtonColor={setDepartmentManagersSaveButtonColor} type="departmentManagers" role={role} uid={uid} /> : <></>}
            </div>
        </div>
    );
}

export { MainScene };
