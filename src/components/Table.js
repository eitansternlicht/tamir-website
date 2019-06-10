import React, { useState, Component, Form } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data, Filters, Editors } from "react-data-grid-addons";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import AssignmentIcon from '@material-ui/icons/AssignmentInd';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { aoaToFile } from '../utils/excell-utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import 'react-responsive-ui/style.css';

import PhoneInput from 'react-phone-number-input/react-responsive-ui';

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

function Table({ rows }) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [filters, setFilters] = useState({});
  let [rowsCopy, setRows] = useState(rows);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const filteredRows = getRows(rowsCopy, filters);
  const [student, setStudent] = useState({});

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const newRows = [...rowsCopy];

    for (let i = fromRow; i <= toRow; i++) {
      newRows[i] = { ...rows[i], ...updated };
      newRows[i]['lastModified'] = updateDate();
    }
    console.log("lm", newRows[fromRow]['lastModified']);
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
    setStudent({ ...student, [name]: event.target.value });
  };

  const handleChangePhone = name => value => {
    setStudent({ ...student, [name]: value });
  }


  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpenForm() {
    setStudent({ 'id': rowsCopy.length, 'status': "לא שובץ", lastModified: updateDate(), ...student });
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
    setStudent({});
  }

  const deleteRow = () => {
    if (selectedIndexes.length === 0)
      return;
    if (!loading) {
      setLoading(true);
      let newArr = rowsCopy.filter((row, i) => !selectedIndexes.includes(i));
      while (selectedIndexes.length !== 0) {
        selectedIndexes.shift();
      }
      rowsCopy = newArr;
      setRows(rowsCopy);
      setLoading(false);
      handleClickOpen();
      updateNums();
    }
  };

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


  const addStudent = () => {
    rowsCopy.unshift(student);
    updateNums();
    handleCloseForm();
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
    console.log("selected :", selectedIndexes);
  };

  const rowText = selectedIndexes.length === 1 ? "row" : "rows";

  const role = 'ceo';
  const columns = Columns(role);
  const columnsToShow = [...columns];

  const getData = () => {
    const fs = firebase.firestore();
    const uid = 'oPtv4HgN09ToxUX9hXJp4ihvopN2'
    let s = fs.collection('Students').where(`owners.tutors.${uid}`, '==', true)
    let t = fs.collection('Tutors').doc(uid).get()
    Promise.all([s, t]).then(res => {
      // console.log("res", res);
    })
  }

  const studentToArr = (student) => columns.map(r => student[r.key]);

  const exportToExcel = () => {
    const columnNames = columns.map(r => r.name);
    const aoa = [columnNames].concat(rowsCopy.map(studentToArr));
    aoaToFile({ fileName: "Students List.xlsx", aoa })
  }

  //getData();
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
        //headerRowHeight={30}
        onGridRowsUpdated={onGridRowsUpdated}
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

          <Dialog open={openForm} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
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
                  id="fName"
                  className={classes.textField}
                  placeholder="דוד"
                  label="שם החניך"
                  type="name"
                  onChange={handleChange('fName')}
                />
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="lName"
                  className={classes.textField}
                  placeholder="כהן"
                  label="שם המשפחה"
                  type="name"
                  onChange={handleChange('lName')}
                />
                {/* <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="phone"
                  className={classes.textField}
                  placeholder="055-5555555"
                  label="מס' טלפון"
                  type="number"
                  onChange={handleChange('phone')}
                /> */}

                <PhoneInput
                  required
                  country="IL"
                  label="מס' טלפון"
                  className={classes.textField}
                  placeholder="Enter phone number"
                  value={student['phone']}
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
                  value={student.gender}
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

          {role !== 'tutor' ? <Button variant="contained" color="primary" className={classes.button}>
            הוסף מדריך
            <AddIcon />
          </Button> : <></>}

          {role === 'departmentManager' || role === 'ceo' ? <Button variant="contained" color="primary" className={classes.button}>
            הוסף רכז
          <AddIcon />
          </Button> : <></>}

          {role === 'ceo' ? <Button variant="contained" color="primary" className={classes.button}>
            הוסף מנהל מחלקה
          <AddIcon />
          </Button> : <></>}
        </div>

        <div className={classes.actions}>

          {role !== 'tutor' ? <Button variant="contained" color="primary" className={classes.button}>
            שבץ חניכים בחורים למדריך
         <AssignmentIcon />
          </Button> : <></>}

          {role === 'departmentManager' || role === 'ceo' ? <Button variant="contained" color="primary" className={classes.button}>
            שבץ חניכים בחורים לרכז
         <AssignmentIcon />
          </Button> : <></>}

          {role === 'ceo' ? <Button variant="contained" color="primary" className={classes.button}>
            שבץ חניכים בחורים למנהל מחלקה
         <AssignmentIcon />
          </Button> : <></>}

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

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Deleting Succeed."}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                All the selected Students was deleted Successfully.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                OK
          </Button>
            </DialogActions>
          </Dialog>



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



export { Table };