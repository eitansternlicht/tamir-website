import React, { useState } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from 'react-data-grid-addons';
import {
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress,
  MenuItem,
  TextField
} from '@material-ui/core/';
//import ButtonGroup from '@material-ui/core/ButtonGroup';
import { MsgToShow, AssignmentDialog } from '.';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import AssignmentIcon from '@material-ui/icons/AssignmentInd';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { aoaToFile } from '../utils/excell-utils';
import green from '@material-ui/core/colors/green';
import 'react-responsive-ui/style.css';
import PhoneInput from 'react-phone-number-input/react-responsive-ui';
import { firestoreModule } from '../Firebase/Firebase';
import { Columns } from '../utils/getColumns';

const useStyles = makeStyles(theme => ({
  // wrapper: {
  //   display: 'flex',
  //   flex: 2,
  //   flexDirection: 'row-reverse'
  // },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  actions: {
    display: 'flex',
    margin: theme.spacing(1),
    flexDirection: 'column',
    padding: 5,
    marginTop: 20
  },
  saveContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    marginRight: 'auto',
    padding: 5,
    marginTop: 20
  },
  button: {
    margin: theme.spacing(1),
    textAlign: 'center',
    alignContent: 'center'
  },
  formTitle: {
    textAlign: 'center',
    font: 30
  },
  formText: {
    textAlign: 'right'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    textAlign: 'right',
    width: 150
  },
  icon: {
    margin: theme.spacing(1)
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '15%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  menu: {
    width: 150
  },
  rowRender: {
    border: 1,
    borderRadius: 3
  },
  container: {
    // display: 'flex'
  }
}));

const selectors = Data.Selectors;

const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    if (sortDirection === 'ASC') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === 'DESC') {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === 'NONE' ? initialRows : [...rows].sort(comparer);
};

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getValidFilterValues(rows, columnId) {
  return rows
    .map(r => r[columnId])
    .filter((item, i, a) => {
      return i === a.indexOf(item);
    });
}

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

const RowRenderer = ({ renderBaseRow, ...props }) => {
  const color = props.idx % 2 ? '#eee' : '#555';
  return <div style={{ backgroundColor: color }}>{renderBaseRow(props)}</div>;
};

function TableTabScene({
  originalRows,
  setOriginalRows,
  rows,
  setMainRows,
  setSaveButtonColor,
  saveButtonColor,
  role,
  uid,
  tutors,
  coordinators,
  departmentManagers
}) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [filters, setFilters] = useState({});
  let [rowsCopy, setRows] = useState(rows);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [msgState, setMsgState] = useState({ title: '', body: '', visible: false });
  const [assignmentDialogType, setAssignmentDialogType] = useState('');
  const [openForm, setOpenForm] = useState(false);
  let filteredRows = getRows(rowsCopy, filters);
  const [newStudent, setNewStudent] = useState({});
 // let [originalRows, setOriginalRows] = useState([]);
  const [loadingSave, setLoadingSave] = useState(false);

  const classes = useStyles();
  const genders = [
    {
      value: 'ז',
      label: 'זכר'
    },
    {
      value: 'נ',
      label: 'נקבה'
    }
  ];

  const fixStudentFields = student => {
    columns.forEach(({ key }) => {
      if (student.hasOwnProperty(key)) {
        if(key === 'lastModified' && student[key] !== undefined && student[key] !== null){
          student[key] = student[key].toLocaleString();
        }

        if (student[key] === null || student[key] === undefined || key === 'dob' ) 
          student[key] = '';
        
      } else {
        student = { ...student, [key]: '' };
      }
    });
    return student;
  };

  const fixStudentsFields = arr => {
    return arr.map(fixStudentFields);
  };

  const getOptionsToAssign = type => {
    let answer = [{ firstName: 'None' }];
    if (type === 'tutors' && tutors.length !== 0) answer = [...answer, ...tutors];
    else if (type === 'coordinators' && coordinators.length !== 0)
      answer = [...answer, ...coordinators];
    else if (departmentManagers.length !== 0) answer = [...answer, ...departmentManagers];
    return answer;
  };

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    setSaveButtonColor('secondary');
    const newRows = JSON.parse(JSON.stringify(rowsCopy));
    for (let i = fromRow; i <= toRow; i++) {
      newRows[i] = { ...rowsCopy[i], ...updated };
      newRows[i]['lastModified'] = updateDate();
    }
    rowsCopy = JSON.parse(JSON.stringify(newRows));
    setRows(newRows);
    setMainRows(newRows);
  };

  const updateDate = () => {
    return new Date().toLocaleString(); //Current Date
    // if (day < 10) {
    //   day = '0' + day;
    // }
    // let month = new Date().getMonth() + 1; //Current Month
    // if (month < 10) {
    //   month = '0' + month
    // }
    // let year = new Date().getFullYear(); //Current Year
    // let hours = new Date().getHours(); //Current Hours
    // if (hours < 10) {
    //   hours = '0' + hours;
    // }
    // let min = new Date().getMinutes(); //Current Minutes
    // if (min < 10) {
    //   min = '0' + min;
    // }
    // let sec = new Date().getSeconds(); //Current Seconds
    // if (sec < 10) {
    //   sec = '0' + sec;
    // }

    // return day + '/' + month + '/' + year + ' ' + hours + ':' + min;
  };

  const updateNums = () => {
    for (let i = 0; i < rowsCopy.length; i++) {
      rowsCopy[i]['id'] = i + 1;
    }
    setRows(rowsCopy);
    setMainRows(rowsCopy);
  };

  const handleChange = name => event => {
    setNewStudent({ ...newStudent, [name]: event.target.value });
  };

  const handleChangePhone = name => value => {
    setNewStudent({ ...newStudent, [name]: value });
  };

  function handleClickOpenForm() {
    setNewStudent({
      id: rowsCopy.length,
      studentStatus: 'לא שובץ',
      lastModified: updateDate(),
      ...newStudent
    });
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
    setNewStudent({});
  }

  const deleteRow = () => {
    if (selectedIndexes.length === 0) return;
    setLoading(true);
    const fids = [];
    selectedIndexes.forEach(idx => fids.push(rowsCopy[idx].fid));
    if (role === 'ceo') fids.forEach(id => firestoreModule.deleteStudent(id));
    else {
      let dataToRemove = '';
      let str = 'owners.' + role + 's';
      if (role === 'tutor') {
        dataToRemove = { studentStatus: 'normal', uid: uid };
        fids.forEach(id =>
          firestoreModule
            .getSpecificStudent(id)
            .update({ [str]: firebase.firestore.FieldValue.arrayRemove(dataToRemove) })
        );
      } else
        fids.forEach(id =>
          firestoreModule
            .getSpecificStudent(id)
            .update({ [str]: firebase.firestore.FieldValue.arrayRemove(uid) })
        );
    }

    let newArr = rowsCopy.filter((row, i) => !selectedIndexes.includes(i));
    while (selectedIndexes.length !== 0) {
      selectedIndexes.shift();
    }
    rowsCopy = newArr;
    setRows(rowsCopy);
    setMainRows(rowsCopy);
    setLoading(false);
    setSaveButtonColor('secondary');
    setMsgState({
      title: 'מחיקת חניכים',
      body: '!כל החניכים שנבחרו נמחקו בהצלחה',
      visible: true
    });
    updateNums();
  };

  const removeUnnecessaryFields = student => {
    delete student['check'];
    delete student['id'];
    delete student['studentStatus'];
    delete student['fid'];
    delete student['tutor'];
    delete student['coordinator'];
    delete student['departmentManager'];
    student['lastModified'] = new Date(student['lastModified']);
  };

  const getOwners = (fixedStudent, role) => {
    if (role === 'tutor')
      fixedStudent = {
        ...fixedStudent,
        owners: {
          tutors: [{ studentStatus: 'normal', uid: uid }],
          coordinators: [],
          departmentManagers: []
        }
      };
    else if (role === 'coordinator')
      fixedStudent = {
        ...fixedStudent,
        owners: { tutors: [], coordinators: [uid], departmentManagers: [] }
      };
    else if (role === 'departmentManager')
      fixedStudent = {
        ...fixedStudent,
        owners: { tutors: [], coordinators: [], departmentManagers: [uid] }
      };
    else
      fixedStudent = {
        ...fixedStudent,
        owners: { tutors: [], coordinators: [], departmentManagers: [] }
      };
    return fixedStudent;
  }

  const addStudent = () => {
    let fixedStudent = fixStudentFields(newStudent);
    removeUnnecessaryFields(fixedStudent);
    handleCloseForm();
    fixedStudent = getOwners(fixedStudent, role);

    firestoreModule
      .getStudents()
      .add(fixedStudent)
      .then(ref => {
        fixedStudent = fixStudentFields(newStudent);
        fixedStudent = { ...fixedStudent, fid: ref.id };
        fixedStudent = getOwners(fixedStudent, role);
        rowsCopy.unshift(fixedStudent);
        updateNums();
        rowsCopy = getMissedDetailsForAllStudents();
        setRows(rowsCopy);
        setMainRows(rowsCopy);
        setSaveButtonColor('secondary');
        setMsgState({
          title: 'הוספת חניך',
          body: '!החניך הוסף בהצלחה',
          visible: true
        });
      })
      .catch(function (error) {
        console.log('Error adding student', error);
      });
  };

  const onRowsSelected = rows => {
    setSelectedIndexes(selectedIndexes.concat(rows.map(r => r.rowIdx)));
  };

  const onRowsDeselected = rows => {
    let rowIndexes = rows.map(r => r.rowIdx);
    const newSelectedIndexes = selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1);
    setSelectedIndexes(newSelectedIndexes);
  };

  const rowText = selectedIndexes.length === 1 ? 'row' : 'rows';

  const columns = Columns(role);
  const columnsToShow = [...columns];

  let tutorsOptions = getOptionsToAssign('tutors');

  let coordinatorsOptions = getOptionsToAssign('coordinators');

  let departmentManagersOptions = getOptionsToAssign('departmentManagers');

  const studentToArr = student => columns.map(r => student[r.key]);

  const exportToExcel = () => {
    const columnNames = columns.map(r => r.name);
    const aoa = [columnNames].concat(rowsCopy.map(studentToArr));
    aoaToFile({ fileName: 'Students List.xlsx', aoa });
  };

  const getTutorFromFid = fid => {
    for (let i = 0; i < tutors.length; i++) {
      if (tutors[i].fid === fid) return tutors[i];
    }
    return undefined;
  };

  const getCoordinatorFromFid = fid => {
    for (let i = 0; i < coordinators.length; i++) {
      if (coordinators[i].fid === fid) return coordinators[i];
    }
    return undefined;
  };

  const getDepartmentManagerFromFid = fid => {
    for (let i = 0; i < departmentManagers.length; i++) {
      if (departmentManagers[i].fid === fid) return departmentManagers[i];
    }
    return undefined;
  };

  const getMissedDetailsForStudent = student => {
    let newSt = { ...student };
    let status = '';
    let tutor = '';
    let coordinator = '';
    let departmentManager = '';

    if (newSt.owners !== null && newSt.owners !== undefined) {
      if (newSt.owners.hasOwnProperty('tutors') && newSt.owners['tutors'].length > 0) {
        let arr = newSt.owners['tutors'];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].studentStatus === 'normal') {
            status = 'גויס';
            let temp = getTutorFromFid(arr[i].uid);
            if (temp !== undefined) tutor = temp.firstName;
            break;
          } else if (arr[i].studentStatus === 'potential') {
            status = 'שובץ';
            let temp = getTutorFromFid(arr[i].uid);
            if (temp !== undefined) tutor = temp.firstName;
          }
        }
      }

      if (newSt.owners.hasOwnProperty('coordinators') && newSt.owners['coordinators'].length > 0) {
        let temp = getCoordinatorFromFid(newSt.owners['coordinators'][0]);
        if (temp !== undefined) coordinator = temp.firstName;
      }

      if (
        newSt.owners.hasOwnProperty('departmentManagers') &&
        newSt.owners['departmentManagers'].length > 0
      ) {
        let temp = getDepartmentManagerFromFid(newSt.owners['departmentManagers'][0]);
        if (temp !== undefined) departmentManager = temp.firstName;
      }
      newSt = {
        ...newSt,
        studentStatus: status,
        tutor: tutor,
        departmentManager: departmentManager,
        coordinator: coordinator
      };
    }

    return newSt;
  };

  const getMissedDetailsForAllStudents = () => {
    return rowsCopy.map(getMissedDetailsForStudent);
  };

  const firstTimeLoading = () => {
    updateNums();
    let newRows = fixStudentsFields(rowsCopy);
    rowsCopy = [...newRows];
    newRows = getMissedDetailsForAllStudents();
    setRows(newRows);
    setMainRows(newRows);
    setOriginalRows(JSON.parse(JSON.stringify(newRows)));
    setLoadingPage(false);
  };

  if (loadingPage)
    firstTimeLoading();

  const deleteUnnecessaryStudent = () => {
    let fids = rowsCopy.map(row => row.fid);
    originalRows = originalRows.filter(row => fids.includes(row.fid));
    setOriginalRows(originalRows);
  };

  const getStudentsToUpdate = () => {
    let ids = [];
    let students = [];
    rowsCopy.map(row => ids.push({ id: row.id - 1, fid: row.fid }));
    for (let i = 0; i < originalRows.length; i++) {
      for (let j = 0; j < ids.length; j++) {
        if (originalRows[i].fid === ids[j].fid) {
          if (rowsCopy[ids[j].id] !== undefined) {
            if (
              new Date(originalRows[i].lastModified).getTime() !==
              new Date(rowsCopy[ids[j].id].lastModified).getTime()
            )
              students.push(rowsCopy[ids[j].id]);
          }
        }
      }
    }
    return students;
  };

  const makeUpdate = arr => {
    arr.forEach(student => {
      let temp = { ...student };
      removeUnnecessaryFields(temp);
      firestoreModule.getSpecificStudent(student.fid).update(temp);
    });
  };

  const saveUpdates = () => {
    setLoadingSave(true);
    if (originalRows.length !== rowsCopy.length) deleteUnnecessaryStudent();
    let arr = getStudentsToUpdate();

    if (arr.length > 0)
      makeUpdate(arr);
    let newRows = fixStudentsFields(rowsCopy);
    rowsCopy = [...newRows];
    newRows = getMissedDetailsForAllStudents();

    setRows(newRows);
    setOriginalRows(JSON.parse(JSON.stringify(newRows)));
    setMainRows(newRows);
    updateNums();
    setLoadingSave(false);
    setSaveButtonColor('default');
    if (arr.length > 0)
    setMsgState({
      title: 'שמירת שינויים',
      body: 'כל השינויים נשמרו בהצלחה',
      visible: true
    });
  };

  console.log("co", rowsCopy, "or", originalRows);
  return (
    <div>
      <ReactDataGrid
        rowKey="id"
        columns={columnsToShow.reverse()}
        rowGetter={i => filteredRows[i]}
        rowsCount={filteredRows.length}
        minHeight={350}
        toolbar={<Toolbar enableFilter={true} />}
        onAddFilter={filter => setFilters(handleFilterChange(filter))}
        onClearFilters={() => setFilters({})}
        getValidFilterValues={columnKey => getValidFilterValues(rowsCopy, columnKey)}
        onGridSort={(sortColumn, sortDirection) =>
          setRows(sortRows(rowsCopy, sortColumn, sortDirection))
        }
        onGridRowsUpdated={onGridRowsUpdated}
        rowRenderer={RowRenderer}
        enableCellSelect={true}
        rowSelection={{
          showCheckbox: true,
          enableShiftSelect: true,
          onRowsSelected: onRowsSelected,
          onRowsDeselected: onRowsDeselected,
          selectBy: {
            indexes: selectedIndexes
          }
        }}
      />
      <span style={{ textAlign: 'center', alignContent: 'center', alignSelf: 'center', font: 30 }}>
        {selectedIndexes.length} {rowText} selected
      </span>

      <div className={classes.actionsContainer}>
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleClickOpenForm()}>
            הוסף חניך
            <AddIcon />
          </Button>
          <MsgToShow
            {...msgState}
            handleClose={() => setMsgState({ ...msgState, visible: false })}
          />

          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={openForm}
            onClose={handleCloseForm}
            aria-labelledby="form-dialog-title">
            <form validate="true" className={classes.container} autoComplete="on">
              <DialogTitle id="form-dialog-title" className={classes.formTitle}>
                הוספת חניך
              </DialogTitle>
              <DialogContent>
                <DialogContentText className={classes.formText}>
                  : נא למלא את כל השדות
                </DialogContentText>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="firstName"
                  className={classes.textField}
                  placeholder="דוד"
                  label="שם פרטי"
                  type="name"
                  onChange={handleChange('firstName')}
                />
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="lastName"
                  className={classes.textField}
                  placeholder="כהן"
                  label="שם המשפחה"
                  type="name"
                  onChange={handleChange('lastName')}
                />

                <PhoneInput
                  required
                  country="IL"
                  label="מס' טלפון"
                  className={classes.textField}
                  placeholder="Enter phone number"
                  value={newStudent['phone']}
                  onChange={handleChangePhone('phone')}
                />

                <TextField
                  required
                  autoFocus
                  select
                  id="gender"
                  margin="normal"
                  label="מין"
                  className={classes.textField}
                  onChange={handleChange('gender')}
                  value={newStudent.gender}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}>
                  {genders.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseForm} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => addStudent()} color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>

        <div className={classes.actions}>
          {role !== 'tutor' ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() =>
                selectedIndexes.length !== 0
                  ? setAssignmentDialogType('tutors')
                  : setAssignmentDialogType('')
              }>
              שבץ חניכים בחורים למדריך
              <AssignmentIcon />
            </Button>
          ) : (
              <></>
            )}

          <AssignmentDialog
            title="בחר מדריך"
            optionsArr={tutorsOptions}
            visible={assignmentDialogType === 'tutors'}
            handleClose={chosenOption => {
              setAssignmentDialogType('');
              if (selectedIndexes.length !== 0 && chosenOption !== 'Cancel') {
                selectedIndexes.map(i => {
                  if (chosenOption !== 'None') {
                    let owners = rowsCopy[i].owners;
                    if (owners.hasOwnProperty('tutors')) {
                      owners = owners['tutors'];
                      let uids = owners.map(o => o.uid);
                      if (!uids.includes(chosenOption))
                        rowsCopy[i].owners['tutors'].push({
                          studentStatus: 'potential',
                          uid: chosenOption
                        });
                    } else {
                      owners = { ...owners, tutors: [] };
                      owners['tutors'].push({ studentStatus: 'potential', uid: chosenOption });
                      rowsCopy[i].owners = owners;
                    }
                  } else {
                    rowsCopy[i].owners['tutors'] = [];
                  }
                  // firestoreModule
                  //   .getSpecificStudent(rowsCopy[i].fid)
                  //   .update({ owners: rowsCopy[i].owners });
                  rowsCopy[i].lastModified = updateDate();
                  rowsCopy = getMissedDetailsForAllStudents();
                  setRows(rowsCopy);
                  setMainRows(rowsCopy);
                });
                if (chosenOption !== 'None')
                  setMsgState({
                    title: 'שיבוץ חניכים למדריך',
                    body: 'כל החניכים שנבחרו שובצו בהצלחה',
                    visible: true
                  });
                while (selectedIndexes.length !== 0) {
                  selectedIndexes.shift();
                }
                setSaveButtonColor('secondary');
              }
            }}
          />

          {role === 'departmentManager' || role === 'ceo' ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() =>
                selectedIndexes.length !== 0
                  ? setAssignmentDialogType('coordinators')
                  : setAssignmentDialogType('')
              }>
              שבץ חניכים בחורים לרכז
              <AssignmentIcon />
            </Button>
          ) : (
              <></>
            )}

          <AssignmentDialog
            title="בחר רכז"
            optionsArr={coordinatorsOptions}
            visible={assignmentDialogType === 'coordinators'}
            handleClose={chosenOption => {
              setAssignmentDialogType('');
              if (selectedIndexes.length !== 0 && chosenOption !== 'Cancel') {
                selectedIndexes.map(i => {
                  if (chosenOption !== 'None') {
                    let owners = rowsCopy[i].owners;
                    if (owners.hasOwnProperty('coordinators')) {
                      owners = owners['coordinators'];
                      let uids = owners.map(o => o.uid);
                      if (!uids.includes(chosenOption))
                        rowsCopy[i].owners['coordinators'].push(chosenOption);
                    } else {
                      owners = { ...owners, coordinators: [] };
                      owners['coordinators'].push(chosenOption);
                      rowsCopy[i].owners = owners;
                    }
                  } else {
                    rowsCopy[i].owners['coordinators'] = [];
                  }
                  // firestoreModule
                  //   .getSpecificStudent(rowsCopy[i].fid)
                  //   .update({ owners: rowsCopy[i].owners });
                  rowsCopy[i].lastModified = updateDate();
                  rowsCopy = getMissedDetailsForAllStudents();
                  setRows(rowsCopy);
                  setMainRows(rowsCopy);
                });
                if (chosenOption !== 'None')
                  setMsgState({
                    title: 'שיבוץ חניכים לרכז',
                    body: 'כל החניכים שנבחרו שובצו בהצלחה',
                    visible: true
                  });

                while (selectedIndexes.length !== 0) {
                  selectedIndexes.shift();
                }
                setSaveButtonColor('secondary');
              }
            }}
          />

          {role === 'ceo' ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() =>
                selectedIndexes.length !== 0
                  ? setAssignmentDialogType('departmentManagers')
                  : setAssignmentDialogType('')
              }>
              שבץ חניכים בחורים למנהל מחלקה
              <AssignmentIcon />
            </Button>
          ) : (
              <></>
            )}

          <AssignmentDialog
            title="בחר מנהל מחלקה"
            optionsArr={departmentManagersOptions}
            visible={assignmentDialogType === 'departmentManagers'}
            handleClose={chosenOption => {
              setAssignmentDialogType('');
              if (selectedIndexes.length !== 0 && chosenOption !== 'Cancel') {
                selectedIndexes.map(i => {
                  if (chosenOption !== 'None') {
                    let owners = rowsCopy[i].owners;
                    if (owners.hasOwnProperty('departmentManagers')) {
                      owners = owners['departmentManagers'];
                      let uids = owners.map(o => o.uid);
                      if (!uids.includes(chosenOption))
                        rowsCopy[i].owners['departmentManagers'].push(chosenOption);
                    } else {
                      owners = { ...owners, departmentManagers: [] };
                      owners['departmentManagers'].push(chosenOption);
                      rowsCopy[i].owners = owners;
                    }
                  } else {
                    rowsCopy[i].owners['departmentManagers'] = [];
                  }
                  // firestoreModule
                  //   .getSpecificStudent(rowsCopy[i].fid)
                  //   .update({ owners: rowsCopy[i].owners });
                  rowsCopy[i].lastModified = updateDate();
                  rowsCopy = getMissedDetailsForAllStudents();
                  setRows(rowsCopy);
                  setMainRows(rowsCopy);
                });
                if (chosenOption !== 'None')
                  setMsgState({
                    title: 'שיבוץ חניכים למנהל מחלקה',
                    body: 'כל החניכים שנבחרו שובצו בהצלחה',
                    visible: true
                  });
                while (selectedIndexes.length !== 0) {
                  selectedIndexes.shift();
                }
                setSaveButtonColor('secondary');
              }
            }}
          />
        </div>

        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => deleteRow()}
            disabled={loading}>
            מחק חניכים בחורים
            <DeleteIcon />
          </Button>

          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

          {/* <MsgToShow {...msgState} handleClose={() => setMsgState({ ...msgState, visible: false })} /> */}
        </div>

        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => exportToExcel()}>
            ייצא לאקסל
            <SaveIcon />
          </Button>
        </div>

        <div className={classes.saveContainer}>
          {/* <ButtonGroup
            variant="contained"
            color="secondary"
            size="large"
            aria-label="Large contained secondary button group"
          > */}
          <Button
            variant="contained"
            color={saveButtonColor}
            className={classes.button}
            size="large"
            onClick={() => saveUpdates()}
            disabled={loadingSave}>
            שמור שינויים
            <SaveIcon />
          </Button>
          {/* </ButtonGroup> */}

          {loadingSave && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </div>
    </div>
  );
}

export { TableTabScene };
