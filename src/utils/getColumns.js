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

const AssignmentEditor = <DropDownEditor options={statusOptions} />;
const TShirtSizesEditor = <DropDownEditor options={TShirtSizes} />;

const columns = [
    {
        key: "id",
        name: "No.",
        width: 40,
        filterRenderer: NumericFilter,
        editable: false
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
        key: "departmentManager",
        name: "מנהל מחלקה",
        editable: false,
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