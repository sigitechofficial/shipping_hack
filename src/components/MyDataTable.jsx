import React from "react";
import DataTable from "react-data-table-component";
import primaryStyles from "../utilities/CustomStyles";

export default function MyDataTable(props) {
  return (
    <DataTable
      theme="myTheme"
      customStyles={primaryStyles}
      columns={props.columns}
      data={props.data}
      noDataComponent={
        props.dependancy && props.dependancy.status === "2"
          ? "You are not authorized to access it"
          : "No Data Available"
      }
      pagination
    />
  );
}
