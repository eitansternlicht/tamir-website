import React from "react";
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

const TShirtSizes = [
    { id: "xSmall", value: "XS" },
    { id: "small", value: "S" },
    { id: "medium", value: "M" },
    { id: "large", value: "L" },
    { id: "xLarge", value: "XL" }

];

const statusOptions = [
    { id: 'assinged', value: "שובץ" },
    { id: 'notAssinged', value: "לא שובץ" },
]
const genderOptions = [
    { id: 'male', value: "ז" },
    { id: 'female', value: "נ" },

]
const AssignmentEditor = <DropDownEditor options={statusOptions} />;
const TShirtSizesEditor = <DropDownEditor options={TShirtSizes} />;
const genderEditor = <DropDownEditor options={genderOptions} />;

// const // headerRender = (text) => {
// return <div style={{ textAlign: 'center' }}>{text}</div>
// }

const columns = [
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
        filterRenderer: AutoCompleteFilter,
        editor: AssignmentEditor
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
        editor: AssignmentEditor
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
        filterRenderer: NumericFilter,
        editable: false,
    },
    {
        key: "fName",
        name: "שם פרטי",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "lName",
        name: "שם משפחה",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "מס' טלפון",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "מין",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "שכונה",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tShirtSize",
        name: "מידת חולצה",
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },
    {
        key: "city",
        name: "עיר",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "בית ספר",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "coordinator",
        name: "רכז שכונה",
        editable: false,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tutor",
        name: "מדריך",
        editable: false,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "status",
        name: "סטטוס",
        filterRenderer: AutoCompleteFilter,
        editor: AssignmentEditor
    },
    {
        key: "lastModified",
        name: "שינוי אחרון",
        filterRenderer: AutoCompleteFilter,
        editable: false,
        resizable: true,
        width: 200
    },
    {
        key: "check",
        width: 15,
        resizable: true
    }
].map(c => ({ ...defaultColumnProperties, ...c }));

const coordinatorColumns = [
    {
        key: "id",
        name: "No.",
        width: 40,
        filterRenderer: NumericFilter,
        editable: false,
    },
    {
        key: "fName",
        name: "שם פרטי",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "lName",
        name: "שם משפחה",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "מס' טלפון",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "מין",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "שכונה",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tShirtSize",
        name: "מידת חולצה",
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },
    {
        key: "city",
        name: "עיר",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "בית ספר",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tutor",
        name: "מדריך",
        editable: false,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "status",
        name: "סטטוס",
        filterRenderer: AutoCompleteFilter,
        editor: AssignmentEditor
    },
    {
        key: "lastModified",
        name: "שינוי אחרון",
        filterRenderer: AutoCompleteFilter,
        editable: false,
        resizable: true
    },
    {
        key: "check",
        width: 15,
        resizable: true
    }
].map(c => ({ ...defaultColumnProperties, ...c }));

const tutorColumns = [
    {
        key: "id",
        name: "No.",
        width: 40,
        filterRenderer: NumericFilter,
        editable: false,
    },
    {
        key: "fName",
        name: "שם פרטי",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "lName",
        name: "שם משפחה",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "מס' טלפון",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "מין",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "שכונה",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tShirtSize",
        name: "מידת חולצה",
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },
    {
        key: "city",
        name: "עיר",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "בית ספר",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "status",
        name: "סטטוס",
        filterRenderer: AutoCompleteFilter,
        editor: AssignmentEditor
    },
    {
        key: "lastModified",
        name: "שינוי אחרון",
        filterRenderer: AutoCompleteFilter,
        editable: false
    },
    {
        key: "check",
        width: 15,
        resizable: true
    }
].map(c => ({ ...defaultColumnProperties, ...c }));

const Columns = (role) => {

    // const temp = columns.map((row) => row.// headerRender = // headerRender(row.name));

    // columns.forEach((row) => row['// headerRender'] = // headerRender('hey'));
    // console.log("render", columns[0].// headerRender);
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