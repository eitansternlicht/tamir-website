import React from "react";
import { Filters, Editors } from "react-data-grid-addons";

const defaultColumnProperties = {
    filterable: true,
    sortable: true,
    resizable: true,
    editable: true,
    minWidth: 120,
    dragable: false,
    expandableOptions: false,
    isExpanded: false,
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

const columns = [
    {
        key: "id",
        name: "No.",
        width: 40,
        filterRenderer: NumericFilter,
        editable: false
    },
    {
        key: "firstName",
        name: "שם פרטי",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "lastName",
        name: "שם משפחה",
        width: 100,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "govID",
        name: "ת.ז",
        width: 100,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "מס' טלפון",
        width: 130,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "מין",
        editor: genderEditor,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "שכונה",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tutor",
        name: "מדריך",
        editable: false,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "coordinator",
        name: "רכז שכונה",
        editable: false,
        width: 100,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "departmentManager",
        name: "מנהל מחלקה",
        editable: false,
        width: 120,
        filterRenderer: AutoCompleteFilter

    },
    {
        key: "city",
        name: "עיר",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "address",
        name: "כתובת",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tShirtSize",
        name: "מידת חולצה",
        width: 100,
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },
    {
        key: "school",
        name: "בית ספר",
        filterRenderer: AutoCompleteFilter

    },
    {
        key: "dob",
        name: "תאריך לידה",
        width: 100,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "email",
        name: "דואר אלקטרוני",
        width: 120,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "prefferedDays",
        name: "ימים מועדפים",
        width: 110,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "schoolGrade",
        name: "ממוצע ציונים",
        width: 110,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "socialCircle",
        name: "חברים קרובים",
        width: 110,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "specialIssues",
        name: "מקרים חריגים",
        width: 110,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "status",
        name: "סטטוס",
        filterRenderer: AutoCompleteFilter,
        editor: AssignmentEditor
    },
    {
        key: "comments",
        name: "הערות",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "lastModified",
        name: "שינוי אחרון",
        filterRenderer: AutoCompleteFilter,
        editable: false,
        resizable: true,
        width: 160
    },
    {
        key: "check",
        width: 15,
        resizable: true
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