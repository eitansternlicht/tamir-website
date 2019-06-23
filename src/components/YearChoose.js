import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const YearChoose = () => {
  const classes = useStyles();
  const [year, setYear] = React.useState('');
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setYear(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={year}
          onChange={handleChange}
          inputProps={{
            name: 'year',
            id: 'demo-controlled-open-select'
          }}>
          <MenuItem value={10}>2019</MenuItem>
          <MenuItem value={20}>2018</MenuItem>
          <MenuItem value={30}>2017</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

export { YearChoose };