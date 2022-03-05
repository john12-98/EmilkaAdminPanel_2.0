import * as React from "react";
import PropTypes from "prop-types";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Box from "@mui/material/Box";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
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
import api from "../axios/axios";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
let delID = "";
export default function Users() {
  const history = useHistory();
  const [rows, setRows] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClick = (id) => {
    delID = id;
    setOpenSnack(true);
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
  const handleEnableClick = (id) => (event) => {
    api.put(`/admin/enable?id=${id}`).then((response) => {
      setRows([...response.data]);
    });
  };
  const handleDisableClick = (id) => (event) => {
    api.put(`/admin/disable?id=${id}`).then((response) => {
      setRows([...response.data]);
    });
  };

  const deleteUser = (event) => {
    console.log("rrrrrrrrrr", delID);
    api.delete(`/admin/delete?id=${delID}`).then((response) => {
      setRows([...response.data]);
    });
  };
  const handleDeleteClick = (id) => (event) => {
    handleClick(id);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={deleteUser}>
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
    { field: "uid", width: 300 },
    {
      field: "email",
      headerName: "Email",
    },
    {
      field: "photoURL",
      headerName: "Image",
      width: 180,
      editable: false,
      renderCell: (params) => {
        console.log(params);
        return (
          <img
            onClick={() => {
              handleToggle();
              setSrc(params.row.photoURL);
            }}
            style={{ width: "100%", height: "100%" }}
            src={params.row.photoURL}
          />
        );
      },
    },
    {
      field: "displayName",
      headerName: "Display Name",
      width: 180,
      editable: true,
    },

    { field: "disabled", headerName: "Disabled", editable: true },
    {
      field: "createdAt",
      headerName: "Date Created",
      type: "dateTime",
      width: 220,
      editable: false,
      valueGetter: (params) => params.row.metadata.creationTime,
    },
    {
      field: "updatedAt",
      headerName: "Last Sign IN",
      type: "dateTime",
      width: 220,
      editable: true,
      valueGetter: (params) => params.row.metadata.lastSignInTime,
    },
    {
      field: "emailVerified",
      headerName: "Email Verified",

      width: 220,
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        console.log("feso", params);
        if (params.row.disabled) {
          return [
            <GridActionsCellItem
              icon={<VerifiedUserIcon color="success" />}
              label="Enable"
              className="textPrimary"
              onClick={handleEnableClick(params.id)}
              color="inherit"
            />,

            <GridActionsCellItem
              icon={<DeleteIcon color="info" />}
              label="Delete"
              onClick={handleDeleteClick(params.id)}
              color="inherit"
            />,
          ];
        } else if (!params.row.disabled) {
          return [
            <GridActionsCellItem
              icon={<DoNotDisturbIcon color="error" />}
              label="Edit"
              className="textPrimary"
              onClick={handleDisableClick(params.id)}
              color="inherit"
            />,

            <GridActionsCellItem
              icon={<DeleteIcon color="info" />}
              label="Delete"
              onClick={handleDeleteClick(params.id)}
              color="inherit"
            />,
          ];
        }
      },
    },
  ];

  React.useEffect(() => {
    api
      .get("/admin/users")
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
        getRowId={(r) => r.uid}
        components={{
          Toolbar: GridToolbar,
        }}
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
