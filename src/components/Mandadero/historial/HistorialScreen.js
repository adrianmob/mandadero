import React, { useEffect, useState } from "react";
import { Header } from "../Header";
import { Paper, Tabs, Tab, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import { getEnvios, getViajes } from "../../../actions/mandadero/historial";
import { useSelector } from "react-redux";
import { ListaHistorial } from "./ListaHistorial";
import { BotomNav } from "../BotomNav";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export const HistorialScreen = () => {
  const [value, setValue] = useState(0);
  const { uid } = useSelector((state) => state.auth);
  const [envios, setEnvios] = useState([]);
  const [viajes, setViajes] = useState([]);

  useEffect(() => {
    async function getHistorial() {
      const envios_data = await getEnvios(uid);
      const viajes_data = await getViajes(uid);

      setEnvios(envios_data);
      setViajes(viajes_data);
    }
    getHistorial();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <header id="header">
        <Header />
      </header>
      <div className="auth__container" style={{ marginTop: "20px" }}>
        <h1>Historial</h1>
        <Paper style={{ flexGrow: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Envios Activos" />
            <Tab label="Viajes Activos" />
            {/* <Tab label="Envios Historial" />
            <Tab label="Viajes Historial" /> */}
          </Tabs>
          <TabPanel value={value} index={0}>
            <ListaHistorial envios={envios} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ListaHistorial envios={viajes} />
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Three
          </TabPanel> */}
        </Paper>
      </div>
      <footer id="footer">
        <BotomNav />
      </footer>
    </>
  );
};
