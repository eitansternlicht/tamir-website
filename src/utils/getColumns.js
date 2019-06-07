import React from "react";
import { Filters, Editors } from "react-data-grid-addons";

const defaultColumnProperties = {
    filterable: true,
    sortable: true,
    resizable: true,
    editable: true,
    minWidth: 30
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
const TShirtSizesEditor = <DropDownEditor options={TShirtSizes} />;

const columns = [

    {
        key: "id",
        name: "ID",
        filterRenderer: NumericFilter
    },
    {
        key: "name",
        name: "Name",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "Phone Number",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "Gender",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "Neighborhood",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tShirtSize",
        name: "T-Shirt Size",
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },
    {
        key: "city",
        name: "City",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "School",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "departmentManager",
        name: "Department Manager",
        filterRenderer: AutoCompleteFilter

    },
    {
        key: "coordinator",
        name: "Coordinator",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tutor",
        name: "Tutor",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "status",
        name: "Status",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "lastModified",
        name: "Last Modified",
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

const departmentManagerColumns = [

    {
        key: "id",
        name: "ID",
        filterRenderer: NumericFilter,
        resizable: true
    },
    {
        key: "name",
        name: "Name",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "Phone Number",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "Gender",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "Neighborhood",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tShirtSize",
        name: "T-Shirt Size",
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },
    {
        key: "city",
        name: "City",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "School",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "coordinator",
        name: "Coordinator",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tutor",
        name: "Tutor",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "status",
        name: "Status",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "lastModified",
        name: "Last Modified",
        filterRenderer: AutoCompleteFilter,
        editable: false,
        resizable: true
    },
    {
        key: "check",
        width: 15,
        resizable: true
    }
].map(c => ({ ...c, ...defaultColumnProperties })).reverse();

const coordinatorColumns = [
    {
        key: "id",
        name: "ID",
        filterRenderer: NumericFilter,
        resizable: true
    },
    {
        key: "name",
        name: "Name",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "Phone Number",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "Gender",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "Neighborhood",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tShirtSize",
        name: "T-Shirt Size",
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },
    {
        key: "city",
        name: "City",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "School",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tutor",
        name: "Tutor",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "status",
        name: "Status",
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "lastModified",
        name: "Last Modified",
        filterRenderer: AutoCompleteFilter,
        editable: false,
        resizable: true
    },
    {
        key: "check",
        width: 15,
        resizable: true
    }
].map(c => ({ ...c, ...defaultColumnProperties }));

const tutorColumns = [

    {
        key: "id",
        name: "ID",
        filterRenderer: NumericFilter,
        resizable: true
    },
    {
        key: "name",
        name: "Name",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "phone",
        name: "Phone Number",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "gender",
        name: "Gender",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "neighborhood",
        name: "Neighborhood",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tShirtSize",
        name: "T-Shirt Size",
        filterRenderer: AutoCompleteFilter,
        editor: TShirtSizesEditor
    },
    {
        key: "city",
        name: "City",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "school",
        name: "School",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "status",
        name: "Status",
        filterRenderer: AutoCompleteFilter
    },

    {
        key: "lastModified",
        name: "Last Modified",
        filterRenderer: AutoCompleteFilter,
        editable: false,
        resizable: true
    },
    {
        key: "check",
        width: 15,
        resizable: true
    }
].map(c => ({ ...c, ...defaultColumnProperties }));

const Columns = ({ type }) => {

    if (type === "departmentManager")
        return departmentManagerColumns;
    else if (type === "coordinator")
        return coordinatorColumns;
    else if (type === "tutor")
        return tutorColumns;
    else
        return columns.reverse();
}

export { Columns };