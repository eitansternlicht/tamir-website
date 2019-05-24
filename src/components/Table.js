import React, { useState, Component } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data, Filters } from "react-data-grid-addons";

const defaultColumnProperties = {
  filterable: true,
  sortable: true,
  resizable: true,
  width: 120
};

const selectors = Data.Selectors;
const {
  NumericFilter,
  AutoCompleteFilter,
  MultiSelectFilter,
  SingleSelectFilter
} = Filters;
const columns = [
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
    filterRenderer: AutoCompleteFilter
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

// const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
//   this.setState(state => {
//     const rows = state.rows.slice();
//     for (let i = fromRow; i <= toRow; i++) {
//       rows[i] = { ...rows[i], ...updated };
//     }
//     return { rows };
//   });
// };

function Table({ rows }) {
  const [filters, setFilters] = useState({});
  const [rowsCopy, setRows] = useState(rows);
  const filteredRows = getRows(rowsCopy, filters);

  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => filteredRows[i]}
        rowsCount={filteredRows.length}
        minHeight={500}
        toolbar={<Toolbar enableFilter={true} />}
        onAddFilter={filter => setFilters(handleFilterChange(filter))}
        onClearFilters={() => setFilters({})}
        getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
        // enableCellSelect={true}
        // onGridRowsUpdated={this.onGridRowsUpdated}
        onGridSort={(sortColumn, sortDirection) =>
          setRows(sortRows(rows, sortColumn, sortDirection))
        }
      />
    </div>

  );
}

// class Table extends Component {
//   constructor(props) {
//     super(props);
//     const defaultColumnProperties = {
//       filterable: true,
//       sortable: true,
//       width: 160
//     };
//     const selectors = Data.Selectors;
//     const {
//       NumericFilter,
//       AutoCompleteFilter,
//       MultiSelectFilter,
//       SingleSelectFilter
//     } = Filters;
//     this._columns = [
//       {
//         key: "id",
//         name: "ID",
//         filterRenderer: NumericFilter,
//         sortDescendingFirst: true
//       },
//       {
//         key: "name",
//         name: "Name",
//         filterRenderer: AutoCompleteFilter
//       },
//       {
//         key: "neighborhood",
//         name: "Neighborhood",
//         filterRenderer: AutoCompleteFilter
//       },
//       {
//         key: "tShirtSize",
//         name: "T-Shirt Size",
//         filterRenderer: AutoCompleteFilter
//       },
//       {
//         key: "city",
//         name: "City",
//         filterRenderer: AutoCompleteFilter
//       },
//       {
//         key: "school",
//         name: "School",
//         filterRenderer: AutoCompleteFilter
//       },
//       {
//         key: "coordinator",
//         name: "Coordinator",
//         filterRenderer: AutoCompleteFilter
//       },
//       {
//         key: "tutor",
//         name: "Tutor",
//         filterRenderer: AutoCompleteFilter
//       },
//       {
//         key: "status",
//         name: "Status",
//         filterRenderer: AutoCompleteFilter
//       },

//       {
//         key: "lastModified",
//         name: "Last Modified",
//         filterRenderer: AutoCompleteFilter
//       }
//     ].map(c => ({ ...c, ...defaultColumnProperties }));

//     this.state = { rows: this.props.rows, selectedIndexes: [] };
//   }

//   render() {

//     const [filters, setFilters] = useState({});
//     const rows = this.state.rows;
//     const [rowsCopy, setRows] = useState(rows);
//     const filteredRows = this.getRows(rows, filters);
//     const rowText = this.state.selectedIndexes.length === 1 ? "row" : "rows";

//     return (
//       <div>
//         <span>
//           {this.state.selectedIndexes.length} {rowText} selected
//         </span>
//         <ReactDataGrid
//           rowKey="id"
//           columns={this._columns}
//           rowGetter={i => rowsCopy[i]}
//           rowsCount={filteredRows.length}
//           minHeight={500}
//           rowSelection={{
//             showCheckbox: true,
//             enableShiftSelect: true,
//             onRowsSelected: this.onRowsSelected,
//             onRowsDeselected: this.onRowsDeselected,
//             selectBy: {
//               indexes: this.state.selectedIndexes
//             }
//           }}
//           toolbar={<Toolbar enableFilter={true} />}
//           onAddFilter={filter => setFilters(this.handleFilterChange(filter))}
//           onClearFilters={() => setFilters({})}
//           getValidFilterValues={columnKey => this.getValidFilterValues(rows, columnKey)}
//           // enableCellSelect={true}
//           // onGridRowsUpdated={this.onGridRowsUpdated}
//           onGridSort={(sortColumn, sortDirection) =>
//             setRows(this.sortRows(rows, sortColumn, sortDirection))
//           }
//         />
//       </div>
//     );
//   }

//   onRowsSelected = rows => {
//     this.setState({
//       selectedIndexes: this.state.selectedIndexes.concat(
//         rows.map(r => r.rowIdx)
//       )
//     });
//   };

//   onRowsDeselected = rows => {
//     let rowIndexes = rows.map(r => r.rowIdx);
//     this.setState({
//       selectedIndexes: this.state.selectedIndexes.filter(
//         i => rowIndexes.indexOf(i) === -1
//       )
//     });
//   };

//   sortRows = (initialRows, sortColumn, sortDirection) => rows => {
//     const comparer = (a, b) => {
//       if (sortDirection === "ASC") {
//         return a[sortColumn] > b[sortColumn] ? 1 : -1;
//       } else if (sortDirection === "DESC") {
//         return a[sortColumn] < b[sortColumn] ? 1 : -1;
//       }
//     };
//     return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
//   };

//   handleFilterChange = filter => filters => {
//     const newFilters = { ...filters };
//     if (filter.filterTerm) {
//       newFilters[filter.column.key] = filter;
//     } else {
//       delete newFilters[filter.column.key];
//     }
//     return newFilters;
//   };

//   getValidFilterValues(rows, columnId) {
//     return rows
//       .map(r => r[columnId])
//       .filter((item, i, a) => {
//         return i === a.indexOf(item);
//       });
//   }

//   getRows(rows, filters) {
//     return this.state.selectors.getRows({ rows, filters });
//   }




// }


export { Table };
