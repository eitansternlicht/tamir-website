import React, { useState } from 'react';
import { TableTabScene } from '../components';
import { getData } from '../utils/createRowData';
import { makeStyles, CircularProgress, Paper, Typography, Tab, Tabs, AppBar } from '@material-ui/core/';
import green from '@material-ui/core/colors/green';

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
function MainScene() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [displayedTab, setDisplayedTab] = useState('TableTabScene');
    if (loading) {
        getData(setRows, setLoading)
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
                        className={classes.appBar}
                    >

                        <Tab value="DepartmenManagersTabScene" label="מנהלי מחלקות" />
                        <Tab value="CoordinatorsTabScene" label="רכזים" />
                        <Tab value="TutorsTabScene" label="מדריכים" />
                        <Tab value="TableTabScene" label="חניכים" className={classes.appBar} />
                    </Tabs>
                </AppBar>

                {displayedTab === 'TableTabScene' ?
                    <div className={classes.table}>
                        {loading ? <></> : <TableTabScene rows={rows} />}
                        {loading && <CircularProgress size={40} className={classes.buttonProgress} />}
                    </div> : <></>}
            </div>

        </div>
    );
}

export { MainScene };
