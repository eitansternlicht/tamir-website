import React, { useState } from 'react';
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
import { aoaToFile } from '../utils/excell-utils';
import green from '@material-ui/core/colors/green';
import 'react-responsive-ui/style.css';
import PhoneInput from 'react-phone-number-input/react-responsive-ui';
import { firestoreModule } from '../Firebase/Firebase'
import { Columns } from '../utils/getColumns'


import { Filters, Editors } from "react-data-grid-addons";


const formatter = ({ value }) => {
    return <div style={{ textAlign: 'right' }}>{value}</div>
}

const defaultColumnProperties = {
    filterable: true,
    sortable: true,
    resizable: true,
    editable: true,
    formatter: formatter,
    minWidth: 50

};

const { DropDownEditor } = Editors;
const {
    NumericFilter,
    AutoCompleteFilter,
} = Filters;



const genderOptions = [
    { id: 'male', value: "ז" },
    { id: 'female', value: "נ" },

]
const genderEditor = <DropDownEditor options={genderOptions} />;

const headerRender = (text) => {
    return <div style={{ textAlign: 'center' }}>{text}</div>
}
const columns = [
    {
        key: "id",
        name: "No.",
        width: 40,
        headerRenderer: headerRender('No.'),
        filterRenderer: NumericFilter,
        editable: false
    },
    {
        key: "lastName",
        name: "שם משפחה",
        width: 100,
        headerRenderer: headerRender('שם משפחה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "firstName",
        name: "שם פרטי",
        headerRenderer: headerRender('שם פרטי'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "נייד",
        width: 130,
        headerRenderer: headerRender('נייד'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "מין",
        editor: genderEditor,
        headerRenderer: headerRender('מין'),
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "address",
        name: "כתובת",
        headerRenderer: headerRender('כתובת'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "שכונה",
        headerRenderer: headerRender('שכונה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "dob",
        name: "תאריך לידה",
        width: 100,
        headerRenderer: headerRender('תאריך לידה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "govID",
        name: "תעודת זהות",
        width: 100,
        headerRenderer: headerRender('תעודת זהות'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "city",
        name: "עיר",
        headerRenderer: headerRender('עיר'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "email",
        name: "מייל",
        width: 110,
        headerRenderer: headerRender('מייל'),
        filterRenderer: AutoCompleteFilter
    },







    {
        key: "lastModified",
        name: "שינוי אחרון",
        headerRenderer: headerRender('שינוי אחרון'),
        filterRenderer: AutoCompleteFilter,
        editable: false,
        width: 160
    },
    {
        key: "check",
        width: 5
    }
].map(c => ({ ...defaultColumnProperties, ...c }));

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

function GenericTab({ rows, type }) {

    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [filters, setFilters] = useState({});
    let [rowsCopy, setRows] = useState(rows);
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [msgState, setMsgState] = useState({ title: "", body: "", visible: false });
    const [openForm, setOpenForm] = useState(false);
    let filteredRows = getRows(rowsCopy, filters);
    const [newRow, setNewRow] = useState({});
    const [originalRows, setOriginalRows] = useState([]);


    console.log("original", originalRows);
    console.log("copy", rowsCopy);

    const fixRowFields = (row) => {
        columns.forEach(({ key }) => {
            if (row.hasOwnProperty(key)) {
                if (row[key] === null || row[key] === undefined)
                    row[key] = ''
            }
            else {
                row = { ...row, [key]: '' };
            }
        })
        return row;
    }

    const fixRowsFields = () => {
        return rowsCopy.map(fixRowFields);
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

        return day + '/' + month + '/' + year + ' ' + hours + ':' + min;
    }

    const updateNums = () => {
        for (let i = 0; i < rowsCopy.length; i++) {
            rowsCopy[i]['id'] = i;
        }
        setRows(rowsCopy);
    }

    const handleChange = name => event => {
        setNewRow({ ...newRow, [name]: event.target.value });
    };

    const handleChangePhone = name => value => {
        setNewRow({ ...newRow, [name]: value });
    }

    function handleClickOpenForm() {
        setNewRow({ 'id': rowsCopy.length, lastModified: updateDate(), ...newRow });
        setOpenForm(true);
    }

    function handleCloseForm() {
        setOpenForm(false);
        setNewRow({});
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
            if (type === 'tutors')
                setMsgState({
                    title: "מחיקת מדריכם",
                    body: "!כל המדריכים שנבחרו נמחקו בהצלחה",
                    visible: true
                });
            else if (type === 'coordinators')
                setMsgState({
                    title: "מחיקת רכזים",
                    body: "!כל הרכזים שנבחרו נמחקו בהצלחה",
                    visible: true
                });
            else if (type === 'departmentManagers')
                setMsgState({
                    title: "מחיקת מנהלי מחלקות",
                    body: "!כל המנהלים שנבחרו נמחקו בהצלחה",
                    visible: true
                });
            updateNums();
        }
    };

    const addRow = () => {
        let fixedRow = fixRowFields(newRow)
        handleCloseForm();
        firestoreModule.getStudents().add(fixedRow).then(ref => {
            fixedRow = { ...fixedRow, 'fid': ref.id };
            rowsCopy.unshift(fixedRow);
            updateNums();
            setRows(rowsCopy);
            if (type === 'tutors')
                setMsgState({
                    title: "הוספת מדריך",
                    body: "!המדריך הוסף בהצלחה",
                    visible: true
                });
            else if (type === 'coordinators')
                setMsgState({
                    title: "הוספת רכז",
                    body: "!הרכז הוסף בהצלחה",
                    visible: true
                });
            else if (type === 'departmentManagers')
                setMsgState({
                    title: "הוספת מנהל מחלקה",
                    body: "!המנהל הוסף בהצלחה",
                    visible: true
                });
        }).catch(function (error) {
            console.log("Error adding", error);
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

    const columnsToShow = [...columns];

    const rowToArr = (row) => columns.map(r => row[r.key]);

    const exportToExcel = () => {
        const columnNames = columns.map(r => r.name);
        const aoa = [columnNames].concat(rowsCopy.map(rowToArr));
        aoaToFile({ fileName: "List.xlsx", aoa })
    }

    const firstTimeLoading = () => {
        if (loadingPage) {
            updateNums();
            let newRows = fixRowsFields()
            setRows(newRows);
            setOriginalRows(newRows);
            setLoadingPage(false);
        }
    }
    if (loadingPage)
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
                        {type === 'tutors' && "הוסף מדריך"}
                        {type === 'coordinators' && "הוסף רכז שכונה"}
                        {type === 'departmentManagers' && "הוסף מנהל מחלקה"}
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
                                    placeholder="052-555-5555"
                                    className={classes.textField}
                                    placeholder="Enter phone number"
                                    value={newRow['phone']}
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
                                    value={newRow.gender}
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
                                <Button onClick={() => addRow()} color="primary">
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                </div>


                <div className={classes.actions}>
                    <Button variant="contained" color="primary"
                        className={classes.button}
                        onClick={() => deleteRow()}
                        disabled={loading}
                    >
                        {type === 'tutors' && "מחק מדריכים בחורים"}
                        {type === 'coordinators' && "מחק רכזים בחורים"}
                        {type === 'departmentManagers' && "מחק מנהלים בחורים"}
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



export { GenericTab };