// import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Filters, Editors } from "react-data-grid-addons";
import { TextField } from '@material-ui/core';
import ReactDOM from "react-dom";
import 'react-dates/initialize';

import { SingleDatePicker } from 'react-dates';



const useStyles = makeStyles({
    grid: {
        width: '60%',
    },
});

//   export default function MaterialUIPickers() {
//     // The first commit of Material-UI
//     const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

//     const classes = useStyles();

//     function handleDateChange(date) {
//       setSelectedDate(date);
//     }

//     return (
//       <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <Grid container className={classes.grid} justify="space-around">
//           <KeyboardDatePicker
//             margin="normal"
//             id="mui-pickers-date"
//             label="Date picker"
//             value={selectedDate}
//             onChange={handleDateChange}
//             KeyboardButtonProps={{
//               'aria-label': 'change date',
//             }}
//           />
//           <KeyboardTimePicker
//             margin="normal"
//             id="mui-pickers-time"
//             label="Time picker"
//             value={selectedDate}
//             onChange={handleDateChange}
//             KeyboardButtonProps={{
//               'aria-label': 'change time',
//             }}
//           />
//         </Grid>
//       </MuiPickersUtilsProvider>
//     );
//   }

class BirthDayEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // focused: false,
            dob: props.value
        };
        // this.handleOnChange = this.handleOnChange.bind(this);
        // this.onFocusChange = this.onFocusChange.bind(this);
    }


    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    // const classes = useStyles();

    // handleDateChange(date) {
    //     //   setSelectedDate(date);
    //     console.log("date", date);
    //     this.setState({ dob: date }, () => this.props.onCommit());
    // }

    getValue() {
        return { dob: this.state.dob };
    }

    getInputNode() {
        return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
    }

    handleChangeComplete = event => {
        // console.log("dob", dob.target.value);
        this.setState({ dob: event.target.value }, () => this.props.onCommit());
    };

    render() {
        return (
            <form  >
                <TextField
                    id="date"
                    label="Birthday"
                    style={{
                        width: 200,
                    }}
                    type="date"
                    defaultValue="30-06-2019"
                    value={this.state.dob}
                    onChange={this.handleChangeComplete}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        );
    }

    // utils={DateFnsUtils}

    // render() {
    //     return (
    //         <div>
    //             <Grid container
    //                 style={{
    //                     width: '60%',
    //                 }}
    //             // justify="space-around">
    //             >
    //                 <SingleDatePicker
    //                     date={this.state.dob} // momentPropTypes.momentObj or null
    //                     onDateChange={date => this.setState({ dob: date })} // PropTypes.func.isRequired
    //                     focused={this.state.focused} // PropTypes.bool
    //                     onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
    //                 //id="your_unique_id" // PropTypes.string.isRequired,
    //                 />
    //             </Grid>
    //         </div>
    //     );

    // }

}




const formatter = ({ value }) => {
    return <div style={{ textAlign: 'right' }}>{value}</div>;
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

const TShirtSizes = [
    { id: "xSmall", value: "XS" },
    { id: "small", value: "S" },
    { id: "medium", value: "M" },
    { id: "large", value: "L" },
    { id: "xLarge", value: "XL" }
];


const genderOptions = [
    { id: 'male', value: "ז" },
    { id: 'female', value: "נ" },

]

// const BirthDayEditor = <TextField
//     id="date"
//     label="Birthday"
//     style={{
//         width: 200,
//     }}
//     type="date"
//     defaultValue="2019-06-30"
//     InputLabelProps={{
//         shrink: true,
//     }}
// />;

const TShirtSizesEditor = <DropDownEditor options={TShirtSizes} />;
const genderEditor = <DropDownEditor options={genderOptions} />;

const columns = [
    {
        key: "id",
        name: "No.",
        width: 40,
        filterRenderer: NumericFilter,
        editable: false
    },
    {
        key: "lastName",
        name: "שם משפחה",
        width: 100,
        // // headerRenderer: // headerRender('שם משפחה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "firstName",
        name: "שם פרטי",
        //// headerRenderer: // headerRender('שם פרטי'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "groups",
        name: "קבוצות",
        width: 100,
        // // headerRenderer: // headerRender('קבוצות'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "נייד",
        width: 130,
        formatter: false,
        // // headerRenderer: // headerRender('נייד'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "מין",
        editor: genderEditor,
        // // headerRenderer: // headerRender('מין'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tutor",
        name: "מדריך",
        editable: false,
        // // headerRenderer: // headerRender('מדריך'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "coordinator",
        name: "רכז שכונה",
        editable: false,
        width: 100,
        //// headerRenderer: // headerRender('רכז שכונה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "departmentManager",
        name: "מנהל מחלקה",
        editable: false,
        width: 120,
        //// // headerRenderer: // // headerRender('מנהל מחלקה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "schoolGrade",
        name: "כיתה",
        width: 110,
        // headerRenderer: // headerRender('כיתה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "מוסד לימודים",
        width: 110,
        // headerRenderer: // headerRender('מוסד לימודים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "address",
        name: "כתובת",
        // headerRenderer: // headerRender('כתובת'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "שכונה",
        // headerRenderer: // headerRender('שכונה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "dob",
        name: "תאריך לידה",
        editor: BirthDayEditor,
        width: 100,
        // headerRenderer: // headerRender('תאריך לידה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "govID",
        name: "תעודת זהות",
        width: 100,
        // headerRenderer: // headerRender('תעודת זהות'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "city",
        name: "עיר",
        // headerRenderer: // headerRender('עיר'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "email",
        name: "מייל",
        width: 110,
        // headerRenderer: // headerRender('מייל'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "shirtSize",
        name: "מידת חולצה",
        width: 100,
        // headerRenderer: // headerRender('מידת חולצה'),
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },

    {
        key: "friends",
        name: "חברים",
        width: 120,
        // headerRenderer: // headerRender('חברים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "socialCircle",
        name: "מעגל חברתי",
        width: 110,
        // headerRenderer: // headerRender('מעגל חברתי'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "youthGroup",
        name: "תנועת נוער",
        width: 100,
        // headerRenderer: // headerRender('תנועת נוער'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "interests",
        name: "תחומי עניין",
        width: 100,
        // headerRenderer: // headerRender('תחומי עניין'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "specialIssues",
        name: "בעיות מיוחדות",
        width: 110,
        // headerRenderer: // headerRender('בעיות מיוחדות'),
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "prefferedDays",
        name: "ימים מועדפים",
        width: 110,
        // headerRenderer: // headerRender('ימים מועדפים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "staffMemberAppointed",
        name: "איש צוות מטפל",
        width: 120,
        // headerRenderer: // headerRender('איש צוות מטפל'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "comments",
        name: "הערות",
        // headerRenderer: // headerRender('הערות'),
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "studentStatus",
        name: "סטטוס",
        // headerRenderer: // headerRender('סטטוס'),
        filterRenderer: AutoCompleteFilter,
        editable: false
    },

    {
        key: "lastModified",
        name: "שינוי אחרון",
        // headerRenderer: // headerRender('שינוי אחרון'),
        filterRenderer: AutoCompleteFilter,
        editable: false,
        width: 160
    },
    {
        key: "check",
        width: 5
    }
].map(c => ({ ...defaultColumnProperties, ...c }));

const departmentManagerColumns = [
    {
        key: "id",
        name: "No.",
        width: 40,
        //// headerRenderer: // headerRender('No.'),
        filterRenderer: NumericFilter,
        editable: false
    },
    {
        key: "lastName",
        name: "שם משפחה",
        width: 100,
        // // headerRenderer: // headerRender('שם משפחה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "firstName",
        name: "שם פרטי",
        //// headerRenderer: // headerRender('שם פרטי'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "groups",
        name: "קבוצות",
        width: 100,
        // // headerRenderer: // headerRender('קבוצות'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "נייד",
        width: 130,
        formatter: false,
        // // headerRenderer: // headerRender('נייד'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "מין",
        editor: genderEditor,
        // // headerRenderer: // headerRender('מין'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tutor",
        name: "מדריך",
        editable: false,
        // // headerRenderer: // headerRender('מדריך'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "coordinator",
        name: "רכז שכונה",
        editable: false,
        width: 100,
        //// headerRenderer: // headerRender('רכז שכונה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "schoolGrade",
        name: "כיתה",
        width: 110,
        // headerRenderer: // headerRender('כיתה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "מוסד לימודים",
        width: 110,
        // headerRenderer: // headerRender('מוסד לימודים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "address",
        name: "כתובת",
        // headerRenderer: // headerRender('כתובת'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "שכונה",
        // headerRenderer: // headerRender('שכונה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "dob",
        name: "תאריך לידה",
        width: 100,
        // headerRenderer: // headerRender('תאריך לידה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "govID",
        name: "תעודת זהות",
        width: 100,
        // headerRenderer: // headerRender('תעודת זהות'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "city",
        name: "עיר",
        // headerRenderer: // headerRender('עיר'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "email",
        name: "מייל",
        width: 110,
        // headerRenderer: // headerRender('מייל'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "shirtSize",
        name: "מידת חולצה",
        width: 100,
        // headerRenderer: // headerRender('מידת חולצה'),
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },

    {
        key: "friends",
        name: "חברים",
        width: 120,
        // headerRenderer: // headerRender('חברים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "socialCircle",
        name: "מעגל חברתי",
        width: 110,
        // headerRenderer: // headerRender('מעגל חברתי'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "youthGroup",
        name: "תנועת נוער",
        width: 100,
        // headerRenderer: // headerRender('תנועת נוער'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "interests",
        name: "תחומי עניין",
        width: 100,
        // headerRenderer: // headerRender('תחומי עניין'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "specialIssues",
        name: "בעיות מיוחדות",
        width: 110,
        // headerRenderer: // headerRender('בעיות מיוחדות'),
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "prefferedDays",
        name: "ימים מועדפים",
        width: 110,
        // headerRenderer: // headerRender('ימים מועדפים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "staffMemberAppointed",
        name: "איש צוות מטפל",
        width: 120,
        // headerRenderer: // headerRender('איש צוות מטפל'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "comments",
        name: "הערות",
        // headerRenderer: // headerRender('הערות'),
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "studentStatus",
        name: "סטטוס",
        // headerRenderer: // headerRender('סטטוס'),
        filterRenderer: AutoCompleteFilter,
        editable: false
    },

    {
        key: "lastModified",
        name: "שינוי אחרון",
        // headerRenderer: // headerRender('שינוי אחרון'),
        filterRenderer: AutoCompleteFilter,
        editable: false,
        width: 160
    },
    {
        key: "check",
        width: 5
    }
].map(c => ({ ...defaultColumnProperties, ...c }));

const coordinatorColumns = [
    {
        key: "id",
        name: "No.",
        width: 40,
        //// headerRenderer: // headerRender('No.'),
        filterRenderer: NumericFilter,
        editable: false
    },
    {
        key: "lastName",
        name: "שם משפחה",
        width: 100,
        // // headerRenderer: // headerRender('שם משפחה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "firstName",
        name: "שם פרטי",
        //// headerRenderer: // headerRender('שם פרטי'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "groups",
        name: "קבוצות",
        width: 100,
        // // headerRenderer: // headerRender('קבוצות'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "נייד",
        width: 130,
        formatter: false,
        // // headerRenderer: // headerRender('נייד'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "מין",
        editor: genderEditor,
        // // headerRenderer: // headerRender('מין'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tutor",
        name: "מדריך",
        editable: false,
        // // headerRenderer: // headerRender('מדריך'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "schoolGrade",
        name: "כיתה",
        width: 110,
        // headerRenderer: // headerRender('כיתה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "מוסד לימודים",
        width: 110,
        // headerRenderer: // headerRender('מוסד לימודים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "address",
        name: "כתובת",
        // headerRenderer: // headerRender('כתובת'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "שכונה",
        // headerRenderer: // headerRender('שכונה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "dob",
        name: "תאריך לידה",
        width: 100,
        // headerRenderer: // headerRender('תאריך לידה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "govID",
        name: "תעודת זהות",
        width: 100,
        // headerRenderer: // headerRender('תעודת זהות'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "city",
        name: "עיר",
        // headerRenderer: // headerRender('עיר'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "email",
        name: "מייל",
        width: 110,
        // headerRenderer: // headerRender('מייל'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "shirtSize",
        name: "מידת חולצה",
        width: 100,
        // headerRenderer: // headerRender('מידת חולצה'),
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },

    {
        key: "friends",
        name: "חברים",
        width: 120,
        // headerRenderer: // headerRender('חברים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "socialCircle",
        name: "מעגל חברתי",
        width: 110,
        // headerRenderer: // headerRender('מעגל חברתי'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "youthGroup",
        name: "תנועת נוער",
        width: 100,
        // headerRenderer: // headerRender('תנועת נוער'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "interests",
        name: "תחומי עניין",
        width: 100,
        // headerRenderer: // headerRender('תחומי עניין'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "specialIssues",
        name: "בעיות מיוחדות",
        width: 110,
        // headerRenderer: // headerRender('בעיות מיוחדות'),
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "prefferedDays",
        name: "ימים מועדפים",
        width: 110,
        // headerRenderer: // headerRender('ימים מועדפים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "staffMemberAppointed",
        name: "איש צוות מטפל",
        width: 120,
        // headerRenderer: // headerRender('איש צוות מטפל'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "comments",
        name: "הערות",
        // headerRenderer: // headerRender('הערות'),
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "studentStatus",
        name: "סטטוס",
        // headerRenderer: // headerRender('סטטוס'),
        filterRenderer: AutoCompleteFilter,
        editable: false
    },

    {
        key: "lastModified",
        name: "שינוי אחרון",
        // headerRenderer: // headerRender('שינוי אחרון'),
        filterRenderer: AutoCompleteFilter,
        editable: false,
        width: 160
    },
    {
        key: "check",
        width: 5
    }
].map(c => ({ ...defaultColumnProperties, ...c }));

const tutorColumns = [
    {
        key: "id",
        name: "No.",
        width: 40,
        //// headerRenderer: // headerRender('No.'),
        filterRenderer: NumericFilter,
        editable: false
    },
    {
        key: "lastName",
        name: "שם משפחה",
        width: 100,
        // // headerRenderer: // headerRender('שם משפחה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "firstName",
        name: "שם פרטי",
        //// headerRenderer: // headerRender('שם פרטי'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "groups",
        name: "קבוצות",
        width: 100,
        // // headerRenderer: // headerRender('קבוצות'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "נייד",
        width: 130,
        formatter: false,
        // // headerRenderer: // headerRender('נייד'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "מין",
        editor: genderEditor,
        // // headerRenderer: // headerRender('מין'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "schoolGrade",
        name: "כיתה",
        width: 110,
        // headerRenderer: // headerRender('כיתה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "מוסד לימודים",
        width: 110,
        // headerRenderer: // headerRender('מוסד לימודים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "address",
        name: "כתובת",
        // headerRenderer: // headerRender('כתובת'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "שכונה",
        // headerRenderer: // headerRender('שכונה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "dob",
        name: "תאריך לידה",
        width: 100,
        // headerRenderer: // headerRender('תאריך לידה'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "govID",
        name: "תעודת זהות",
        width: 100,
        // headerRenderer: // headerRender('תעודת זהות'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "city",
        name: "עיר",
        // headerRenderer: // headerRender('עיר'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "email",
        name: "מייל",
        width: 110,
        // headerRenderer: // headerRender('מייל'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "shirtSize",
        name: "מידת חולצה",
        width: 100,
        // headerRenderer: // headerRender('מידת חולצה'),
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },

    {
        key: "friends",
        name: "חברים",
        width: 120,
        // headerRenderer: // headerRender('חברים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "socialCircle",
        name: "מעגל חברתי",
        width: 110,
        // headerRenderer: // headerRender('מעגל חברתי'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "youthGroup",
        name: "תנועת נוער",
        width: 100,
        // headerRenderer: // headerRender('תנועת נוער'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "interests",
        name: "תחומי עניין",
        width: 100,
        // headerRenderer: // headerRender('תחומי עניין'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "specialIssues",
        name: "בעיות מיוחדות",
        width: 110,
        // headerRenderer: // headerRender('בעיות מיוחדות'),
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "prefferedDays",
        name: "ימים מועדפים",
        width: 110,
        // headerRenderer: // headerRender('ימים מועדפים'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "staffMemberAppointed",
        name: "איש צוות מטפל",
        width: 120,
        // headerRenderer: // headerRender('איש צוות מטפל'),
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "comments",
        name: "הערות",
        // headerRenderer: // headerRender('הערות'),
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "studentStatus",
        name: "סטטוס",
        // headerRenderer: // headerRender('סטטוס'),
        filterRenderer: AutoCompleteFilter,
        editable: false
    },

    {
        key: "lastModified",
        name: "שינוי אחרון",
        // headerRenderer: // headerRender('שינוי אחרון'),
        filterRenderer: AutoCompleteFilter,
        editable: false,
        width: 160
    },
    {
        key: "check",
        width: 5
    }
].map(c => ({ ...defaultColumnProperties, ...c }));

const Columns = (role) => {

    if (role === "departmentManager")
        return departmentManagerColumns;
    else if (role === "coordinator")
        return coordinatorColumns;
    else if (role === "tutor")
        return tutorColumns;
    else
        return columns;
}

export { Columns };