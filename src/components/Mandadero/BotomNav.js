import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

export const BotomNav = () => {
  const [value, setValue] = useState(0);
  return (
    <AppBar position="fixed" color="primary" style={{ top: "auto", bottom: 0 }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{ backgroundColor: "#4ABDCE" }}
        showLabels
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          style={{ color: "white" }}
          icon={<HomeIcon />}
          label="Home"
        />

        <BottomNavigationAction
          component={Link}
          to="/envio"
          style={{ color: "white" }}
          icon={<SearchIcon />}
          label="Envio"
        />

        <BottomNavigationAction
          component={Link}
          to="/viaje"
          style={{ color: "white" }}
          icon={<AddIcon />}
          label="Viaje"
        />
        <BottomNavigationAction
          component={Link}
          to="/historial"
          style={{ color: "white" }}
          icon={<FlightTakeoffIcon />}
          label="Historial"
        />
        <BottomNavigationAction
          component={Link}
          to="/perfil"
          style={{ color: "white" }}
          icon={<PersonIcon />}
          label="Perfil"
        />
      </BottomNavigation>
    </AppBar>
  );
};
