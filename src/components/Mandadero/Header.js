import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

import { salir } from "../../actions/auth";

export const Header = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(salir());
  };

  const toggleDrawer = (open) => (event) => {
    let today = new Date();
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <h3 style={{ flexGrow: "1" }}>Mandadero</h3>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List style={{ width: "250px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemText primary="Publicar Viaje" />
            </ListItem>
          </Link>
          <Link to="/envio" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemText primary="Solicitar Envio" />
            </ListItem>
          </Link>
          <Link
            to="/historial"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem button>
              <ListItemText primary="Historial" />
            </ListItem>
          </Link>
          <Link to="/perfil" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button>
              <ListItemText primary="Perfil" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
};
