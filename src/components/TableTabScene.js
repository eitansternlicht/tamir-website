import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data } from "react-data-grid-addons";
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
  TextField,

} from '@material-ui/core/';
import { MsgToShow, AssignmentDialog } from '.';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import AssignmentIcon from '@material-ui/icons/AssignmentInd';

import { aoaToFile } from '../utils/excell-utils';
import green from '@material-ui/core/colors/green';
import 'react-responsive-ui/style.css';
import PhoneInput from 'react-phone-number-input/react-responsive-ui';
import { firestoreModule } from '../Firebase/Firebase'
import { Columns } from '../utils/getColumns'

const useStyles = makeStyles(theme => ({
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  actions: {
    display: 'flex',
    margin: theme.spacing(1),
    position: 'relative',
    flexDirection: 'column',
    padding: 5,
    marginTop: 20,
  },
  button: {
    margin: theme.spacing(1),
    textAlign: 'right',
  },
  formTitle: {
    textAlign: 'center',
    font: 30,
  },
  formText: {
    textAlign: 'right',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    textAlign: 'right',
    width: 150,

  },

  icon: {
    margin: theme.spacing(1),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '15%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  menu: {
    width: 150,
  },
  rowRener: {
    border: 1,
    borderRadius: 3,
  },
  container: {
    // display: 'flex'
  },
}));


const selectors = Data.Selectors;

const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
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
  const color = props.idx % 2 ? "#eee" : "#555";
  return <div style={{ backgroundColor: color }}>{renderBaseRow(props)}</div>;
};

function TableTabScene({ rows }) {

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [filters, setFilters] = useState({});
  let [rowsCopy, setRows] = useState(rows);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [msgState, setMsgState] = useState({ title: "", body: "", visible: false });
  const [assignmentDialogType, setAssignmentDialogType] = useState("");
  const [openForm, setOpenForm] = useState(false);
  let filteredRows = getRows(rowsCopy, filters);
  const [newStudent, setNewStudent] = useState({});
  const [originalRows, setOriginalRows] = useState([]);


  console.log("original", originalRows);
  console.log("copy", rowsCopy);

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

  
  const fixStudentFields = (student) => {
    columns.forEach(({ key }) => {
      if (student.hasOwnProperty(key)) {
        if (student[key] === null || student[key] === undefined)
          student[key] = ''
      }
      else {
        student = { ...student, [key]: '' };
      }
    })
    return student;
  }

  const fixStudentsFields = () => {
    return rowsCopy.map(fixStudentFields);
  }

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {

    const newRows = JSON.parse(JSON.stringify(rowsCopy));
    for (let i = fromRow; i <= toRow; i++) {
      newRows[i] = { ...rowsCopy[i], ...updated };
      newRows[i]['lastModified'] = updateDate();
    }
    rowsCopy = JSON.parse(JSON.stringify(newRows));
    setRows(newRows);
  };

  const updateDate = () => {
    let day = new Date().getDate(); //Current Date
    if (day < 10) {
      day = '0' + day;
    }
    let month = new Date().getMonth() + 1; //Current Month
    if (month < 10) {
      month = '0' + month
    }
    let year = new Date().getFullYear(); //Current Year
    let hours = new Date().getHours(); //Current Hours
    if (hours < 10) {
      hours = '0' + hours;
    }
    let min = new Date().getMinutes(); //Current Minutes
    if (min < 10) {
      min = '0' + min;
    }
    let sec = new Date().getSeconds(); //Current Seconds
    if (sec < 10) {
      sec = '0' + sec;
    }

    return day + '/' + month + '/' + year + ' ' + hours + ':' + min;
  }

  const updateNums = () => {
    for (let i = 0; i < rowsCopy.length; i++) {
      rowsCopy[i]['id'] = i;
    }
    setRows(rowsCopy);
  }

  const handleChange = name => event => {
    setNewStudent({ ...newStudent, [name]: event.target.value });
  };

  const handleChangePhone = name => value => {
    setNewStudent({ ...newStudent, [name]: value });
  }


  function handleClickOpenForm() {
    setNewStudent({ 'id': rowsCopy.length, 'studentStatus': "לא שובץ", lastModified: updateDate(), ...newStudent });
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
    setNewStudent({});
  }


  const deleteRow = () => {
    if (selectedIndexes.length === 0)
      return;
    if (!loading) {
      setLoading(true);
      const fids = []
      selectedIndexes.forEach(idx => fids.push(rowsCopy[idx].fid))
      // firestoreModule.deleteStudents(fids)
      fids.forEach(id => firestoreModule.deleteStudent(id));
      let newArr = rowsCopy.filter((row, i) => !selectedIndexes.includes(i));
      while (selectedIndexes.length !== 0) {
        selectedIndexes.shift();
      }
      rowsCopy = newArr;
      setRows(rowsCopy);
      setLoading(false);
      setMsgState({
        title: "מחיקת חניכים",
        body: "!כל החניכים שנבחרו נמחקו בהצלחה",
        visible: true
      });
      updateNums();
    }
  };

 

  const addStudent = () => {
    let fixedStudent = fixStudentFields(newStudent)
    handleCloseForm();
    firestoreModule.getStudents().add(fixedStudent).then(ref => {
      fixedStudent = { ...fixedStudent, 'fid': ref.id };
      rowsCopy.unshift(fixedStudent);
      updateNums();
      setRows(rowsCopy);
      setMsgState({
        title: "הוספת חניך",
        body: "!החניך הוסף בהצלחה",
        visible: true
      });
    }).catch(function (error) {
      console.log("Error adding student", error);
    });
  }

  const classes = useStyles();

  const onRowsSelected = rows => {
    setSelectedIndexes(selectedIndexes.concat(
      rows.map(r => r.rowIdx)
    ));
  };

  const onRowsDeselected = rows => {
    let rowIndexes = rows.map(r => r.rowIdx);
    const newSelectedIndexes = selectedIndexes.filter(
      i => rowIndexes.indexOf(i) === -1
    );
    setSelectedIndexes(newSelectedIndexes);
  };

  const rowText = selectedIndexes.length === 1 ? "row" : "rows";

  const role = 'ceo';
  const columns = Columns(role);
  const columnsToShow = [...columns];


  const tutorsOptions = [
    'None',
    'מדריך א',
    'מדריך ב',
    'מדריך ג',
    'מדריך ד',
    'מדריך ה',
    'מדריך ו',
    'מדריך ז',
    'מדריך ח',
    'מדריך ט',
    'מדריך י',
    'מדריך כ',
    'מדריך ל',
    'מדריך מ',
  ];
  const coordinatorsOptions = [
    'None',
    'רכז א',
    'רכז ב',
    'רכז ג',
    'רכז ד',
    'רכז ה',
    'רכז ו',
    'רכז ז',
    'רכז ח',
    'רכז ט',
    'רכז י',
    'רכז כ',
    'רכז ל',
    'רכז מ',
  ];
  const departmentManagersOptions = [
    'None',
    'מנהל  א',
    'מנהל  ב',
    'מנהל  ג',
    'מנהל  ד',
    'מנהל  ה',
    'מנהל  ו',
    'מנהל  ז',
    'מנהל  ח',
    'מנהל  ט',
    'מנהל  י',
    'מנהל  כ',
    'מנהל  ל',
    'מנהל  מ',
  ];

  const studentToArr = (student) => columns.map(r => student[r.key]);

  const exportToExcel = () => {
    const columnNames = columns.map(r => r.name);
    const aoa = [columnNames].concat(rowsCopy.map(studentToArr));
    aoaToFile({ fileName: "Students List.xlsx", aoa })
  }

  const firstTimeLoading = () => {
    if (loadingPage) {
      updateNums();
      let newRows = fixStudentsFields()
      setRows(newRows);
      setOriginalRows(newRows);
      setLoadingPage(false);
    }
  }
  firstTimeLoading();

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
      <span style={{ textAlign: 'center', alignContent: 'center', alignSelf: 'center', font: 30 }} >
        {selectedIndexes.length} {rowText} selected
      </span>

      <div className={classes.actionsContainer}>
        <div className={classes.actions}>
          <Button variant="contained" color="primary" className={classes.button} onClick={() => handleClickOpenForm()} >
            הוסף חניך
          <AddIcon />
          </Button>
          <MsgToShow {...msgState} handleClose={() => setMsgState({ ...msgState, visible: false })} />

          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={openForm}
            onClose={handleCloseForm}
            aria-labelledby="form-dialog-title">
            <form validate="true" className={classes.container} autoComplete="on">
              <DialogTitle id="form-dialog-title" className={classes.formTitle}>הוספת חניך</DialogTitle>
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
                  label="שם החניך"
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
                      className: classes.menu,
                    },
                  }}
                >
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

          {role !== 'tutor' ? <Button variant="contained" color="primary" className={classes.button} onClick={() => selectedIndexes.length !== 0 ? setAssignmentDialogType('tutors') : setAssignmentDialogType('')} >
            שבץ חניכים בחורים למדריך
         <AssignmentIcon />
          </Button> : <></>}

          <AssignmentDialog title="בחר מדריך" optionsArr={tutorsOptions} visible={assignmentDialogType === 'tutors'}
            handleClose={(chosenOption) => {
              setAssignmentDialogType("");
              if (selectedIndexes.length !== 0 && chosenOption !== 'Cancel') {
                selectedIndexes.map(
                  (i) => {
                    onGridRowsUpdated({ fromRow: i, toRow: i, updated: { tutor: chosenOption === 'None' ? '' : chosenOption } })
                    onGridRowsUpdated({ fromRow: i, toRow: i, updated: { studentStatus: chosenOption === 'None' ? 'לא שובץ' : 'שובץ' } })
                  }
                )
                if (chosenOption !== 'None')
                  setMsgState({
                    title: "שיבוץ חניכים למדריך",
                    body: "כל החניכים שנבחרו שובצו בהצלחה עבור " + chosenOption,
                    visible: true
                  });
                while (selectedIndexes.length !== 0) {
                  selectedIndexes.shift();
                }

              }

            }
            } />

          {role === 'departmentManager' || role === 'ceo' ? <Button variant="contained" color="primary" className={classes.button} onClick={() => selectedIndexes.length !== 0 ? setAssignmentDialogType('coordinators') : setAssignmentDialogType('')}>
            שבץ חניכים בחורים לרכז
         <AssignmentIcon />
          </Button> : <></>}

          <AssignmentDialog title="בחר רכז" optionsArr={coordinatorsOptions} visible={assignmentDialogType === 'coordinators'}
            handleClose={(chosenOption) => {
              setAssignmentDialogType("");
              if (selectedIndexes.length !== 0 && chosenOption !== 'Cancel') {
                selectedIndexes.map(
                  (i) => {
                    onGridRowsUpdated({ fromRow: i, toRow: i, updated: { coordinator: chosenOption === 'None' ? '' : chosenOption } })
                  }
                )
                if (chosenOption !== 'None')
                  setMsgState({
                    title: "שיבוץ חניכים לרכז",
                    body: "כל החניכים שנבחרו שובצו בהצלחה עבור " + chosenOption,
                    visible: true
                  });
                while (selectedIndexes.length !== 0) {
                  selectedIndexes.shift();
                }
              }


            }} />

          {role === 'ceo' ? <Button variant="contained" color="primary" className={classes.button} onClick={() => selectedIndexes.length !== 0 ? setAssignmentDialogType('departmentManagers') : setAssignmentDialogType('')}>
            שבץ חניכים בחורים למנהל מחלקה
         <AssignmentIcon />
          </Button> : <></>}

          <AssignmentDialog title="בחר מנהל מחלקה" optionsArr={departmentManagersOptions} visible={assignmentDialogType === 'departmentManagers'}
            handleClose={(chosenOption) => {
              setAssignmentDialogType("");
              if (selectedIndexes.length !== 0 && chosenOption !== 'Cancel') {
                selectedIndexes.map(
                  (i) => {
                    onGridRowsUpdated({ fromRow: i, toRow: i, updated: { departmentManager: chosenOption === 'None' ? '' : chosenOption } })
                  }
                )
                if (chosenOption !== 'None')
                  setMsgState({
                    title: "שיבוץ חניכים למנהל מחלקה",
                    body: "כל החניכים שנבחרו שובצו בהצלחה עבור " + chosenOption,
                    visible: true
                  });
                while (selectedIndexes.length !== 0) {
                  selectedIndexes.shift();
                }
              }

            }} />

        </div>

        <div className={classes.actions}>
          <Button variant="contained" color="primary"
            className={classes.button}
            onClick={() => deleteRow()}
            disabled={loading}
          >
            מחק חניכים בחורים
         <DeleteIcon />
          </Button>

          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

          {/* <MsgToShow {...msgState} handleClose={() => setMsgState({ ...msgState, visible: false })} /> */}

        </div>

        <div className={classes.actions}>
          <Button variant="contained" color="primary"
            className={classes.button}
            onClick={() => exportToExcel()}>
            ייצא לאקסל
          <SaveIcon />
          </Button>
        </div>
      </div>

    </div>
  );
}



export { TableTabScene };