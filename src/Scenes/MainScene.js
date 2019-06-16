import React, { useState, Component, span } from 'react';
import { Table } from '../components';
import { getData } from '../utils/createRowData';
import { makeStyles, CircularProgress, Paper, Typography } from '@material-ui/core/';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: 'right'
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
    }
}));
function MainScene() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    if (loading){
        getData(setRows, setLoading)
    } 

    const classes = useStyles();
    
    return (
        <>
            <div>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h5">
                        מנהל מחלקה א
          </Typography>
                    <Typography component="p">ירושלים</Typography>
                </Paper>
            </div>
            <div className={classes.table}>
                {loading ? <></> : <Table rows={rows} />}
                {loading && <CircularProgress size={40} className={classes.buttonProgress} />}
            </div>
        </>
    );
}

export { MainScene };
