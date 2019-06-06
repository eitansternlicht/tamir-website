import React, { useState, Component } from "react";
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
import { Menu } from "react-data-grid-addons";
import { aoaToFile } from '../utils/excell-utils';

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
}));

const { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } = Menu;

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


function ExampleContextMenu({
  idx,
  id,
  rowIdx,
  onRowDelete,
  onRowInsertAbove,
  onRowInsertBelow
}) {
  return (
    <ContextMenu id={id}>
      <MenuItem data={{ rowIdx, idx }} onClick={onRowDelete}>
        Delete Row
      </MenuItem>
      <SubMenu title="Insert Row">
        <MenuItem data={{ rowIdx, idx }} onClick={onRowInsertAbove}>
          Above
        </MenuItem>
        <MenuItem data={{ rowIdx, idx }} onClick={onRowInsertBelow}>
          Below
        </MenuItem>
      </SubMenu>
    </ContextMenu>
  );
}

const deleteRow = rowIdx => rows => {
  const nextRows = [...rows];
  nextRows.splice(rowIdx, 1);
  return nextRows;
};

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
  const filteredRows = getRows(rowsCopy, filters);

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const newRows = [...rowsCopy];
    for (let i = fromRow; i <= toRow; i++) {
      newRows[i] = { ...rows[i], ...updated };
    }
    setRows(newRows);
  };

  const onRowsSelected = rows => {
     { console.log("rows: ", rows); }
    setSelectedIndexes(selectedIndexes.concat(
      rows.map(r => r.rowIdx)
    ));
      { console.log("selected: ", selectedIndexes); }
  };

  const onRowsDeselected = rows => {
    let rowIndexes = rows.map(r => r.rowIdx);
    const newSelectedIndexes = selectedIndexes.filter(
      i => rowIndexes.indexOf(i) === -1
    );
    setSelectedIndexes(newSelectedIndexes);
  };

  const rowText = selectedIndexes.length === 1 ? "row" : "rows";
  const classes = useStyles();
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

  const studentToArr = (student) => 
    columns.map(r => student[r.key]);

  const exportToExcel = () => {
    const columnNames = columns.map(r => r.name);
    const aoa = [columnNames].concat(rowsCopy.map(studentToArr));
    aoaToFile({fileName: "temp.xlsx", aoa })
  }

  getData();
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
        minHeight={500}
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

        contextMenu={
          <ExampleContextMenu
            onRowDelete={(e, { rowIdx }) => setRows(deleteRow(rowIdx))}
            onRowInsertAbove={(e, { rowIdx }) => setRows(insertRow(rowIdx))}
            onRowInsertBelow={(e, { rowIdx }) => setRows(insertRow(rowIdx + 1))}
          />
        }
        RowsContainer={ContextMenuTrigger}
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
          <Button variant="contained" color="primary" className={classes.button}>
            מחק חניכים בחורים
         <DeleteIcon />
          </Button>
        </div>

        <div className={classes.actions}>
          <Button variant="contained" color="primary" className={classes.button} onClick={() => exportToExcel()}>
            ייצא לאקסל
          <SaveIcon />
          </Button>
        </div>

      </div>
    </div>
  );
}



export { Table };