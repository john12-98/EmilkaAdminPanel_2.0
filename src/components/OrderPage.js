import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../axios/axios";

let orderID = 0;
export default function Orders() {
  const [rows, setRows] = React.useState([]);

  const getSize = (params) => {
    return `${params.row.product.size}`;
  };
  const getQuantity = (params) => {
    return `${params.row.product.quantity}`;
  };
  const getPhoneNumber = (params) => {
    return `${params.row.phone}`;
  };
  const getOrderDate = (params) => {
    return `${params.row.createdAt}`;
  };
  const getCustomerName = (params) => {
    return `${params.row.product.name}`;
  };
  const getProductPrice = (params) => {
    return `${params.row.product.price}`;
  };

  React.useEffect(() => {
    api
      .get(`/order/getorders`)
      .then((response) => {
        setRows(response.data);
      })
      .catch((e) => {});
  }, []);
  const columns = [
    // {
    //   field: "_id",
    //   headerName: "Order ID",
    //   width: 250,
    //   editable: false,
    // },
    {
      field: "customer",
      headerName: "Customer E-Mail or name",
      width: 250,
      editable: false,
    },
    {
      field: "name",
      headerName: "Customer Name",
      width: 250,
      valueGetter: getCustomerName,
      editable: false,
    },
    {
      field: "imgUrl",
      headerName: "Product Image",
      editable: false,
      valueGetter: getSize,
      renderCell: (params) => {
        return (
          <img
            style={{ width: "100%", height: "100%" }}
            src={params.row.product.imgUrl}
          />
        );
      },
    },
    {
      field: "size",
      headerName: "Size",
      editable: false,
      valueGetter: getSize,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      valueGetter: getQuantity,
      width: 180,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 180,
      valueGetter: getProductPrice,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      valueGetter: getPhoneNumber,
      width: 220,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      valueGetter: getOrderDate,
      width: 220,
      editable: false,
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} getRowId={(r) => r._id} />
      </div>
    </div>
  );
}
