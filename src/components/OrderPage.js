import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import Alert from "@mui/material/Alert";
import Axios from "axios";
let orderID = 0;
export default function Orders() {
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const handleEditRowsModelChange = React.useCallback((model, x) => {
    console.log("model", x);
    setEditRowsModel(model);
  }, []);
  const getAddress = (params) => {
    console.log(params);
    return `${params.row.address.phoneNumber} , location here`;
  };
  const onStatusDoubleClick = (params) => {
    orderID = params.row._id;
  };
  const onStatusCommit = (params) => {
    Axios.put("http://localhost:3001/order/updatestatus", {
      ID: orderID,
      stat: params.value,
    });
  };
  React.useEffect(() => {
    Axios.get(`http://localhost:3001/order/getorders`)
      .then((response) => {
        console.log(response.data);
        setRows(response.data);
      })
      .catch((e) => {});
  }, []);
  const columns = [
    {
      field: "productId",
      headerName: "Product ID",
      width: 250,
      editable: false,
    },
    {
      field: "customer",
      headerName: "Customer E-Mail",
      width: 250,
      editable: false,
    },
    { field: "size", headerName: "Size", editable: false },
    {
      field: "quantity",
      headerName: "Quantity",

      width: 180,
      editable: false,
    },
    {
      field: "address",
      headerName: "Address",
      valueGetter: getAddress,
      width: 220,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Order Date",

      width: 220,
      editable: false,
    },
    {
      field: "status",
      headerName: "Current Status",

      width: 220,
      editable: true,
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <Alert severity="info" style={{ marginBottom: 8 }}>
        <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
      </Alert>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editRowsModel={editRowsModel}
          onEditRowsModelChange={handleEditRowsModelChange}
          getRowId={(r) => r._id}
          onCellEditCommit={onStatusCommit}
          onCellDoubleClick={onStatusDoubleClick}
        />
      </div>
    </div>
  );
}
