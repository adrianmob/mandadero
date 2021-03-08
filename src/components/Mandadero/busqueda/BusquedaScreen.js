import React, { useEffect, useState } from "react";
import { Popover } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Header } from "../Header";
import { ListaViaje } from "./ListaViaje";
import { selectBusqueda } from "../../../actions/mandadero/busqueda";
import { BotomNav } from "../BotomNav";

export const BusquedaScreen = () => {
  const { viajes } = useSelector((state) => state.busqueda);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [notas, setNotas] = useState("");
  const [hora, setHora] = useState(Date.now());
  const [filterViajes, setFilterViajes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (viajes.length === 0) {
      history.push("/envio");
    }
  }, [viajes, history]);

  const setDireccion = (direccion) => {
    const newDir = direccion.split(",");
    return `${newDir[0]},${newDir[1]}`;
  };

  const handleClick = (event, note) => {
    setAnchorEl(event.currentTarget);
    setNotas(note);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeHora = (hora) => {
    const horaViaje = format(hora, "HH:mm");
    const filterViajes = viajes.filter((value) => {
      if (value.horaViaje === horaViaje) return value;
    });
    setFilterViajes(filterViajes);
    setHora(hora);
  };

  const handleSelectViaje = (id) => {
    const selectViaje = viajes.find((value) => {
      if (value.id === id) {
        return value;
      }
    });
    const dataViaje = {
      equipajePeso: selectViaje.equipajePeso,
      viajeroID: selectViaje.viajeroID,
      id: selectViaje.id,
      precio: selectViaje.precio,
      origen: selectViaje.salida,
      destino: selectViaje.destino,
      peso_envio: selectViaje.peso_envio,
      fecha_envio: selectViaje.fechaViaje,
      hora_destino: selectViaje.hora_llegada,
      hora_origen: selectViaje.horaViaje,
    };

    dispatch(selectBusqueda(dataViaje));
    history.push("/checkout");
  };

  return (
    <>
      <header id="header">
        <Header />
      </header>{" "}
      <div className="auth__container" style={{ marginTop: "20px" }}>
        <h1>Busqueda</h1>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              style={{ width: "100%", margin: "15px 0" }}
              margin="normal"
              label=" Hora de llegada"
              value={hora}
              onChange={handleChangeHora}
            />
          </MuiPickersUtilsProvider>
          {filterViajes.length === 0 ? (
            <ListaViaje
              viajes={viajes}
              setDireccion={setDireccion}
              handleClick={handleClick}
              handleSelectViaje={handleSelectViaje}
            />
          ) : (
            <ListaViaje
              viajes={filterViajes}
              setDireccion={setDireccion}
              handleClick={handleClick}
              handleSelectViaje={handleSelectViaje}
            />
          )}

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div style={{ padding: "20px" }}>{notas}</div>
          </Popover>
        </div>
      </div>
      <footer id="footer">
        <BotomNav />
      </footer>
    </>
  );
};
