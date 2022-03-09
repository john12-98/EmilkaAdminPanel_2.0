import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import api from "../axios/axios";
import Backdrop from "@mui/material/Backdrop";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Axios from "axios";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

export default function FullFeaturedCrudGrid() {
  const history = useHistory();
  const [rows, setRows] = React.useState([]);
  const [delID, setDelID] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClick = (id) => {
    setOpenSnack(true);
    setDelID(id);
  };

  const handle_Close = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleEditClick = (id) => (event) => {
    history.push(`/viewitem/${id}`);
  };

  const handleDeleteClick = (id) => (event) => {
    handleClick(id);
    console.log("id id:  ", id);
    console.log("wewewewewwe");
  };
  const deleteGarment = async () => {
    console.log("tatatatatata", delID);
    let a = await api.delete(`/getallproducts/delete?id=${delID}`);
    window.location.reload(true);
    console.log(a);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={deleteGarment}>
        Confirm Delete?
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handle_Close}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const columns = [
    { field: "_id", width: 300 },
    {
      field: "imgUrl",
      headerName: "Image",
      width: 180,
      editable: false,
      renderCell: (params) => {
        console.log(params);
        return (
          <img
            onClick={() => {
              handleToggle();
              setSrc(params.row.imgUrl);
            }}
            style={{ width: "100%", height: "100%" }}
            src={params.row.imgUrl}
          />
        );
      },
    },
    {
      field: "productName",
      headerName: "Designer Name",
      width: 180,
      editable: true,
    },

    { field: "price", headerName: "Price", type: "number", editable: true },
    {
      field: "createdAt",
      headerName: "Date Created",
      type: "dateTime",
      width: 220,
      editable: false,
    },
    {
      field: "updatedAt",
      headerName: "Date Updated",
      type: "dateTime",
      width: 220,
      editable: true,
    },
    {
      field: "description",
      headerName: "Garment Description",

      width: 220,
      editable: true,
    },
    {
      field: "size",
      headerName: "Size",

      width: 180,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",

      width: 180,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  React.useEffect(() => {
    api
      .get("/getallproducts")
      .then((response) => {
        console.log("gaga", response.data);
        setRows([...response.data]);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <img style={{ height: "100%", width: "70%" }} src={src} />
      </Backdrop>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        getRowId={(r) => r._id}
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handle_Close}
        message="Note archived"
        action={action}
      />
    </Box>
  );
}
