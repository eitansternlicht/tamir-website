import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const WatchReportsButton = () => {
  const classes = useStyles();

  return (
    <Button variant="outlined" color="inherit" className={classes.button}>
      צפה בדו"ח
    </Button>
  );
};

export { WatchReportsButton };
