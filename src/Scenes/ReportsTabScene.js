import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import { DenseTable, MonthChoose, YearChoose, WatchReportsButton } from '../components';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  rootChoose: {
    display: 'flex',
    textAlign: 'left'
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  }
}));

const text = {
  thirdLine: 'סוג דוח',
  fourthLine: 'בחירת חודש ושנה',
  fifthLine: 'בחירת מדריכים'
};

const ReportsTabScene = () => {
  const [reportType, setReportType] = useState('monthlyReportReport');

  const renderTitle = titleText => (
    <Grid container>
      <Grid item xs align="right">
        <Typography variant="h3" align="right" style={{ marginRight: 28 }}>
          {titleText}
        </Typography>
      </Grid>
    </Grid>
  );

  const printRelevantComponent = num => {
    switch (num) {
      case 0:
        return (
          <Grid>
            <Grid>
              <Typography variant="h3" align="left" style={{ marginLeft: 270 }}>
                {text.fifthLine}
              </Typography>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid>
            <Grid>
              <Typography variant="h3" align="center" style={{ marginLeft: 120 }}>
                {text.fourthLine}
              </Typography>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid>
            <Grid>
              <Typography variant="h3" align="right" style={{ marginLeft: 300 }}>
                {text.thirdLine}
              </Typography>
            </Grid>
          </Grid>
        );
      default:
        return;
    }
  };
  const print3Reports = () => (
    <div>
      <Grid container>
        <Grid>
          <Grid container spacing={3}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                {printRelevantComponent(value)}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid justify="space-between" container spacing={24}>
        <Grid item>
          <DenseTable />
        </Grid>

        <Grid item>
          <div style={{ marginTop: 25, marginRight: 100 }}>
            <div style={{ marginLeft: 40 }}>
              <YearChoose />
            </div>
            <MonthChoose />
          </div>
        </Grid>

        <Grid item>
          <div style={{ marginTop: 25, marginRight: 28 }}>
            <div className={useStyles.rootChoose}>
              <FormControl component="fieldset" className={useStyles.formControl}>
                <RadioGroup
                  aria-label="gender"
                  name="gender2"
                  className={useStyles.group}
                  value={reportType}
                  onChange={event => setReportType(event.target.value)}>
                  <FormControlLabel
                    value="monthlyReport"
                    control={<Radio color="primary" />}
                    label="דוח מדריכים לפי חודש"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="specificTutorReport"
                    control={<Radio color="primary" />}
                    label="דוח מדריך ספציפי"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </Grid>
      </Grid>

      <div style={{ marginRight: 28 }}>
        {[0, 1, 2, 3, 4].map(value => (
          <br key={value} />
        ))}
        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
          <WatchReportsButton />
        </Grid>
      </div>
    </div>
  );

  const print2Reports = () => (
    <div>
      <Container style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
        <Grid container justify="flex-end" direction="row">
          <div style={{ marginRight: 290 }}>
            <Typography variant="h3">{text.fifthLine}</Typography>
          </div>

          <div style={{ marginRight: -124 }}>
            <Typography variant="h3">{text.thirdLine}</Typography>
          </div>
        </Grid>
      </Container>

      <Grid justify="flex-end" container spacing={24}>
        <div style={{ marginRight: 228 }}>
          <Grid item>
            <DenseTable />
          </Grid>
        </div>

        <Grid item>
          <div style={{ marginTop: 25, marginRight: 28 }}>
            <div className={useStyles.rootChoose}>
              <FormControl component="fieldset" className={useStyles.formControl}>
                <RadioGroup
                  aria-label="gender"
                  name="gender2"
                  className={useStyles.group}
                  value={reportType}
                  onChange={event => setReportType(event.target.value)}>
                  <FormControlLabel
                    value="monthlyReport"
                    control={<Radio color="primary" />}
                    label="דוח מדריכים לפי חודש"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="specificTutorReport"
                    control={<Radio color="primary" />}
                    label="דוח מדריך ספציפי"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </Grid>
      </Grid>

      <div style={{ marginRight: 28 }}>
        {[0, 1, 2, 3, 4].map(value => (
          <br key={value} />
        ))}
        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
          <WatchReportsButton />
        </Grid>
      </div>
    </div>
  );

  return <div>{reportType === 'monthlyReport' ? print3Reports() : print2Reports()}</div>;
};

export default ReportsTabScene;
