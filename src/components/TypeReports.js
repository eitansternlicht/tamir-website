import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    textAlign: 'left',
    display: 'block'
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  formControl: {
    color: 'black'
  }
}));

const TypeReports = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('monthR');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="gender"
          name="gender2"
          className={classes.group}
          value={value}
          onChange={handleChange}>
          <FormControlLabel
            value="monthR"
            control={<Radio color="primary" />}
            label="דוח מדריכים לפי חודש"
            labelPlacement="start"
          />
          <FormControlLabel
            value="specificR"
            control={<Radio color="primary" />}
            label="דוח מדריך ספציפי"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export { TypeReports };
