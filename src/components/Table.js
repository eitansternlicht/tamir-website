import React, { useState, Component } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data, Filters, Editors } from "react-data-grid-addons";

const defaultColumnProperties = {
  filterable: true,
  sortable: true,
  resizable: true,
  width: 120
};

const selectors = Data.Selectors;
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
    key: "check",
    width: 60,
    resizable: true,
    dragable: true
  },
  {
    key: "id",
    name: "ID",
    filterRenderer: NumericFilter,
    sortDescendingFirst: true
  },
  {
    key: "name",
    name: "Name",
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
    filterRenderer: AutoCompleteFilter
  }
].map(c => ({ ...c, ...defaultColumnProperties }));

const ROW_COUNT = 50;

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

  return (
    <div>
      <span style={{ textAlign: 'center', alignContent: 'center', font: 30 }} >
        {selectedIndexes.length} {rowText} selected
      </span>
      <ReactDataGrid
        columns={columns}
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
        enableCellSelect={true}
        onGridRowsUpdated={onGridRowsUpdated}
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
    </div>
  );
}



export { Table };