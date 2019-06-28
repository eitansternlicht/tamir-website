import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import { EnhancedTable } from '../components';
import { Box } from '@material-ui/core';
import MonthPickerInput from 'react-month-picker-input';
import { firestoreModule } from '../Firebase/Firebase';
import { zip } from '../utils/general-utils';
import { toMoment } from '../utils/date-utils';
import { totalHoursWorked } from '../utils/local-db';
import { aoaToFile } from '../utils/excell-utils';
import _ from 'lodash';
import moment from 'moment';

require('react-month-picker-input/dist/react-month-picker-input.css');

const orderAndLabelsOfStatsInReport = [
  { name: 'totalHoursWorked', label: 'כמה שעות עבדת החודש?' },
  { name: 'studentsInYourCare', label: 'כמה בני נוער באחריותך?' },
  { name: 'studentsDiscussedWith', label: 'עם כמה בני נוער ניהלת שיחה ולו פעם אחת?' },
  {
    name: 'studentsWhoSharedProblems',
    label: 'עם כמה בני נוער יש לך קשר משמעותי ? (לדוגמה משתף אותך בקשיים ?)'
  },
  {
    name: 'studentsWhoAttendedContentGroupActivity',
    label: 'כמה בני נוער נמצאים בפעילות תהליכי תוכן שאתה מוביל? (גם דברים שלא אתה ישירות מעביר)'
  },
  {
    name: 'groupActivitiesWithAdmirablePerson',
    label: 'כמה מפגשים עם דמויות להזדהות ארגנת לחברה?  (לא חשוב לכמה חברה)'
  },
  {
    name: 'regiousGroupActivities',
    label:
      "כמה חוויות שלערכיות / משמעותיות /קודש ארגנת לקבוצות קטנות ובינוניות (קבלת שבת, עונג שבת, מלווה מלכה , סיור, טיול, שיעור תורה חד פעמי, על האש - פויקה , מפגש ביתי לשיח חופשי, התנדבותו כדו')"
  }
];

const ReportsTabScene = props => {
  const rows = props.tutors.filter(({ fid }) => fid);
  const [reportType, setReportType] = useState('monthlyReport');
  const [selectedDate, setSelectedDate] = useState({
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear()
  });
  const [selected, setSelected] = useState([]);
  const [isFetchingReport, setIsFetchingReport] = useState(false);
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
            isFetchingReport={isFetchingReport}
            onClickFetchReport={() => {
              setIsFetchingReport(true);
              let month = null;
              if (reportType === 'monthlyReport')
                month = new Date(selectedDate.selectedYear, selectedDate.selectedMonth);

              firestoreModule
                .getAttendance(selected, month)
                .then(results => {
                  if (results.length === 0) {
                    throw new Error('no results!');
                  }
                  const aoaOfUIDs = results.map(resultsOfUID => {
                    const objOfMonthsToShifts = _.groupBy(resultsOfUID, ({ startTime }) =>
                      toMoment(startTime).format('YYYY-MM')
                    );
                    const sortedMonths = _.sortBy(Object.entries(objOfMonthsToShifts), ([month]) =>
                      moment(month)
                    ).map(([month]) => month);

                    const entries = Object.entries(objOfMonthsToShifts)
                      .map(([month, shifts]) => {
                        const totalHoursWorkedInMonth = totalHoursWorked(shifts);
                        const fixedShiftDates = shifts.map(
                          ({ activities, startTime, endTime }) => ({
                            activities,
                            startTime: toMoment(startTime),
                            endTime: toMoment(endTime)
                          })
                        );
                        const sortedShifts = fixedShiftDates.sort((shiftA, shiftB) =>
                          shiftA.startTime > shiftB.startTime ? 1 : -1
                        );
                        const sortedShiftsWithGroupActivities = sortedShifts.filter(
                          ({ activities }) => _.some(activities, ['type', 'פעילות קבוצתית'])
                        );
                        const sortedShiftsWithDiscussion = sortedShifts.filter(({ activities }) =>
                          _.some(activities, ['type', 'שיחה אישית'])
                        );
                        const discussionExists = sortedShiftsWithDiscussion.length !== 0;

                        const groupActivitiesExist = sortedShiftsWithGroupActivities.length !== 0;

                        let studentsInYourCare;
                        let studentsWhoAttendedContentGroupActivity;
                        let groupActivitiesWithAdmirablePerson;
                        let regiousGroupActivities;
                        if (groupActivitiesExist) {
                          const lastShiftWithGroupActivity =
                            sortedShiftsWithGroupActivities[
                              sortedShiftsWithGroupActivities.length - 1
                            ];
                          studentsInYourCare = _.union(
                            ..._.find(lastShiftWithGroupActivity.activities, [
                              'type',
                              'פעילות קבוצתית'
                            ]).groups.map(({ participants }) => participants.map(({ uid }) => uid))
                          ).length;
                          studentsWhoAttendedContentGroupActivity = _.union(
                            _.flatMapDeep(
                              sortedShiftsWithGroupActivities.map(({ activities }) =>
                                activities
                                  .filter(({ subtype }) => subtype === 'תהליך תוכן')
                                  .map(({ groups }) =>
                                    groups
                                      .filter(({ attended }) => attended)
                                      .map(({ participants }) =>
                                        participants
                                          .filter(({ attended }) => attended)
                                          .map(({ uid }) => uid)
                                      )
                                  )
                              )
                            )
                          ).length;
                        }
                        groupActivitiesWithAdmirablePerson = _.sum(
                          sortedShiftsWithGroupActivities.map(
                            ({ activities }) =>
                              activities.filter(({ subtype }) => subtype === 'מפגש עם דמות להזדהות')
                                .length
                          )
                        );
                        regiousGroupActivities = _.sum(
                          sortedShiftsWithGroupActivities.map(
                            ({ activities }) =>
                              activities.filter(
                                ({ subtype }) => subtype === ' חוויה ערכית / משמעותית / קודש'
                              ).length
                          )
                        );
                        let studentsDiscussedWith;
                        let studentsWhoSharedProblems;
                        if (discussionExists) {
                          const discussionActivities = _.union(
                            ...sortedShiftsWithDiscussion.map(({ activities }) =>
                              activities.filter(({ type }) => type === 'שיחה אישית')
                            )
                          );
                          studentsDiscussedWith = _.union(
                            discussionActivities.map(({ student }) => student.uid)
                          ).length;
                          studentsWhoSharedProblems = _.union(
                            discussionActivities
                              .filter(({ subtype }) => subtype === 'קושי/בעיה')
                              .map(({ student }) => student.uid)
                          ).length;
                        }
                        return [
                          month,
                          {
                            totalHoursWorked: _.ceil(totalHoursWorkedInMonth, 1),
                            studentsInYourCare: groupActivitiesExist
                              ? studentsInYourCare
                              : undefined,
                            studentsDiscussedWith: discussionExists
                              ? studentsDiscussedWith
                              : undefined,
                            studentsWhoSharedProblems: discussionExists
                              ? studentsWhoSharedProblems
                              : undefined,
                            studentsWhoAttendedContentGroupActivity: groupActivitiesExist
                              ? studentsWhoAttendedContentGroupActivity
                              : undefined,
                            groupActivitiesWithAdmirablePerson: groupActivitiesExist
                              ? groupActivitiesWithAdmirablePerson
                              : undefined,
                            regiousGroupActivities: groupActivitiesExist
                              ? regiousGroupActivities
                              : undefined
                          }
                        ];
                      })
                      .map(([month, shifts]) => _.mapValues(shifts, val => ({ [month]: val })));
                    _.merge(...entries);
                    return [[undefined].concat(sortedMonths)].concat(
                      orderAndLabelsOfStatsInReport.map(({ name, label }) =>
                        [label].concat(sortedMonths.map(month => entries[0][name][month]))
                      )
                    );
                  });
                  if (reportType !== 'monthlyReport') {
                    return aoaOfUIDs[0];
                  } else {
                    return zip(selected, aoaOfUIDs).reduce(
                      (accArr, [currUID, currArr]) =>
                        accArr.map((row, i) => {
                          if (i === 0) {
                            const tutor = _.find(props.tutors, ['fid', currUID]);
                            return row.concat(tutor.firstName + ' ' + tutor.lastName);
                          } else if (currArr[i].length !== 1)
                            return row.concat(currArr[i][currArr[i].length - 1]);
                          else return row.concat([undefined]);
                        }),
                      [[undefined]].concat(
                        orderAndLabelsOfStatsInReport.map(({ label }) => [label])
                      )
                    );
                  }
                })
                .then(aoa => {
                  setIsFetchingReport(false);
                  if (reportType !== 'monthlyReport') {
                    aoaToFile({ fileName: 'דו״ח מדריך', aoa });
                  } else {
                    aoaToFile({ fileName: 'דו״ח חודש ' + moment(month).format('MM-YYYY'), aoa });
                  }
                })
                .catch(error => {
                  setIsFetchingReport(false);
                });
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ReportsTabScene;
