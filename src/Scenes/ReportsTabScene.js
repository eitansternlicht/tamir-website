import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import { EnhancedTable } from '../components';
import { Box } from '@material-ui/core';
import MonthPickerInput from 'react-month-picker-input';
require('react-month-picker-input/dist/react-month-picker-input.css');

const ReportsTabScene = props => {
  const rows = props.tutors.filter(({ fid }) => fid);
  const [reportType, setReportType] = useState('monthlyReport');
  const [selectedDate, setSelectedDate] = useState({
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear()
  });
  const [selected, setSelected] = useState([]);
  return (
    <div style={{ padding: 50 }}>
      <Box display="flex" flexDirection="row-reverse">
        <Box flex="1" flexDirection="column">
          <Box style={{ textAlign: 'right', marginBottom: 10 }}>
            <Typography variant="h4" style={{ color: '#41ad48' }}>
              בחירת סוג דו״ח
            </Typography>
          </Box>
          <Box style={{ textAlign: 'right', marginBottom: 30 }}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender2"
                value={reportType}
                onChange={event => {
                  setReportType(event.target.value);
                  setSelected([]);
                  console.log('eitan tutors', props.tutors);
                }}>
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
          </Box>
          {reportType === 'monthlyReport' ? (
            <Box style={{ textAlign: 'right' }}>
              <Typography variant="h4" style={{ color: '#41ad48', marginBottom: 10 }}>
                בחירת חודש
              </Typography>
              <MonthPickerInput
                fontSize="50"
                style={{ padding: 50 }}
                lang="he"
                i18n={{
                  monthFormat: 'long',
                  dateFormat: { he: 'MM/YYYY' },
                  monthNames: {
                    he: [
                      'ינו',
                      'פבר',
                      'מרץ',
                      'אפר',
                      'מאי',
                      'יונ',
                      'יול',
                      'אוג',
                      'ספט',
                      'אוק',
                      'נוב',
                      'דצמ'
                    ]
                  }
                }}
                year={selectedDate.selectedYear}
                month={selectedDate.selectedMonth}
                onChange={(maskedValue, selectedYear, selectedMonth) =>
                  setSelectedDate({ selectedMonth, selectedYear })
                }
              />
            </Box>
          ) : null}
        </Box>
        <Box flex="2" flexDirection="column">
          <EnhancedTable
            selected={selected}
            handleClick={fid => {
              const selectedIndex = selected.indexOf(fid);
              if (reportType === 'monthlyReport') {
                let newSelected = [];
                if (selectedIndex === -1) {
                  newSelected = newSelected.concat(selected, fid);
                } else if (selectedIndex === 0) {
                  newSelected = newSelected.concat(selected.slice(1));
                } else if (selectedIndex === selected.length - 1) {
                  newSelected = newSelected.concat(selected.slice(0, -1));
                } else if (selectedIndex > 0) {
                  newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1)
                  );
                }
                setSelected(newSelected);
              } else {
                if (selectedIndex === -1) setSelected([fid]);
              }
            }}
            handleSelectAll={event => {
              if (event.target.checked) {
                setSelected(rows.map(n => n.fid));
              } else {
                setSelected([]);
              }
            }}
            multiSelect={reportType === 'monthlyReport'}
            tableTitle={reportType === 'monthlyReport' ? 'בחירת מדריכים' : 'בחירת מדריך'}
            rows={rows}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ReportsTabScene;
