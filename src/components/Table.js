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
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { Columns } from '../utils/getColumns'

const useStyles = makeStyles(theme => ({
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    marginTop: 20,
  },
  button: {
    margin: theme.spacing(1),
    textAlign: 'right',

  },
  icon: {
    margin: theme.spacing(1),
    textAlign: 'right',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
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

const insertRow = rowIdx => rows => {
  const newRow = "heey";
  const nextRows = [...rows];
  nextRows.splice(rowIdx, 0, newRow);
  return nextRows;
};

function Table({ rows }) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [filters, setFilters] = useState({});
  const [rowsCopy, setRows] = useState(rows);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const filteredRows = getRows(rowsCopy, filters);

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const newRows = [...rowsCopy];
    for (let i = fromRow; i <= toRow; i++) {
      newRows[i] = { ...rows[i], ...updated };
    }
    setRows(newRows);
  };


  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const deleteRow = () => {
    console.log("selected: ", selectedIndexes);

    if (selectedIndexes.length === 0)
      return;
    if (!loading) {
      setLoading(true);
      while (selectedIndexes.length !== 0) {
        console.log("index: ", selectedIndexes[0]);
        delete rows[selectedIndexes[0]];
        rows.splice(selectedIndexes[0], 1);
        selectedIndexes.shift();
      }
      setRows(rows);
      setLoading(false);
      handleClickOpen();
    }

  };


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
  const columns = Columns('ceo').reverse();

  const getData = () => {
    const fs = firebase.firestore();
    const uid = 'oPtv4HgN09ToxUX9hXJp4ihvopN2'
    let s = fs.collection('Students').where(`owners.tutors.${uid}`, '==', true)
    let t = fs.collection('Tutors').doc(uid).get()
    Promise.all([s, t]).then(res => {
      //console.log("res", res);
    })
  }

  const studentToArr = (student) => columns.map(r => student[r.key]);

  const exportToExcel = () => {
    const columnNames = columns.map(r => r.name);
    const aoa = [columnNames].concat(rowsCopy.map(studentToArr));
    aoaToFile({ fileName: "temp.xlsx", aoa })
  }

  //getData();
  return (
    <div>
      <span style={{ textAlign: 'center', alignContent: 'center', font: 30 }} >
        {selectedIndexes.length} {rowText} selected
      </span>

      <ReactDataGrid
        rowKey="id"
        columns={Columns({ type: "ceo" })}
        rowGetter={i => filteredRows[i]}
        rowsCount={filteredRows.length}
        minHeight={400}
        toolbar={<Toolbar enableFilter={true} />}
        onAddFilter={filter => setFilters(handleFilterChange(filter))}
        onClearFilters={() => setFilters({})}
        getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
        onGridSort={(sortColumn, sortDirection) =>
          setRows(sortRows(rows, sortColumn, sortDirection))
        }
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

      <div className={classes.actionsContainer}>

        <div className={classes.actions}>
          <Button variant="contained" color="primary" className={classes.button} >
            הוסף חניך
          <AddIcon />
          </Button>

          <Button variant="contained" color="primary" className={classes.button}>
            הוסף מדריך
            <AddIcon />
          </Button>

          <Button variant="contained" color="primary" className={classes.button}>
            הוסף רכז
          <AddIcon />
          </Button>
          <Button variant="contained" color="primary" className={classes.button}>
            הוסף מנהל מחלקה
          <AddIcon />
          </Button>
        </div>

        <div className={classes.actions}>
          <Button variant="contained" color="primary" className={classes.button}>
            שבץ חניכים בחורים למדריך
         <AssignmentIcon />
          </Button>

          <Button variant="contained" color="primary" className={classes.button}>
            שבץ חניכים בחורים לרכז
         <AssignmentIcon />
          </Button>

          <Button variant="contained" color="primary" className={classes.button}>
            שבץ חניכים בחורים למנהל מחלקה
         <AssignmentIcon />
          </Button>

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

          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

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