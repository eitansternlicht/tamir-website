import React, { useState, Component, span } from "react";
import Container from '@material-ui/core/Container';
import { Table } from '../components';
import row from '../utils/createRowData';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        textAlign: 'right',

    },
    table: {
        padding: 3.5,
        borderRadius: 3,
    }
}));

function MainScene() {

    const classes = useStyles();

    return (
        <>
            <div>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h5">
                        מנהל מחלקה א
        </Typography>
                    <Typography component="p">
                        ירושלים
        </Typography>
                </Paper>
            </div>
            <div className={classes.table}>
                <Table rows={row} />
            </div>
        </>
    );

}


export { MainScene };