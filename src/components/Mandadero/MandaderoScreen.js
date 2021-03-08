import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import MuiAlert from "@material-ui/lab/Alert";

import { useSelector } from "react-redux";
import { Header } from "./Header";
import { BotomNav } from "./BotomNav";
import { useForm } from "../../hooks/useForm";
import { setViaje } from "../../actions/mandadero/viaje";

export const MandaderoScreen = () => {
  const style_input = {
    margin: "15px 0",
    width: "100%",
  };

  const style_btn = {
    margin: "25px 0",
  };

  const [{ ine, tipoViaje, equipajePeso, notas }, handleChange] = useForm({
    name: "",
    tipoViaje: "",
    equipajePeso: "",
    ine: "",
    notas: "",
  });

  const [fecha, setFecha] = useState(Date.now());
  const [hora, setHora] = useState(Date.now());
  const [direccion, setDireccion] = useState({
    dirSalida: "",
    dirDestino: "",
  });
  const [checkCarta, setCheckCarta] = useState(true);
  const [alert, setAlert] = useState(false);

  const { uid } = useSelector((state) => state.auth);

  const handleChangeFecha = (fecha) => {
    setFecha(fecha);
  };

  const handleChangeHora = (hora) => {
    setHora(hora);
  };

  const searchOptions = {
    types: ["(cities)"],
    componentRestrictions: {
      country: "mx",
    },
  };

  const handleChangeDireccion = (address, idx) => {
    if (idx === 1) {
      setDireccion({ ...direccion, dirSalida: address.value.description });
    } else {
      setDireccion({ ...direccion, dirDestino: address.value.description });
    }
  };

  const handleChangeCheck = (event) => {
    setCheckCarta(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaViaje = format(fecha, "dd/MM/yy");
    const horaViaje = format(fecha, "HH:mm");
    const hora_llegada = format(hora, "HH:mm");
    const body = {
      salida: direccion.dirSalida,
      destino: direccion.dirDestino,
      fechaViaje,
      horaViaje,
      hora_llegada,
      tipoViaje,
      equipajePeso: parseInt(equipajePeso),
      checkCarta,
      ine,
      notas,
      viajeroID: uid,
    };
    setViaje(body);
    setAlert(true);
  };

  const handleClose = () => {
    setAlert(false);
  };

  return (
    <>
      <header id="header">
        <Header />
      </header>
      <div className="viaje__container" style={{ marginTop: "20px" }}>
        <h1>Publicar Viaje</h1>
        <form onSubmit={handleSubmit} className="viaje__login">
          <div style={{ width: "100%", margin: "15px 0" }}>
            <GooglePlacesAutocomplete
              autocompletionRequest={searchOptions}
              selectProps={{
                onChange: (evt) => handleChangeDireccion(evt, 1),
                placeholder: "Salida",
                getOptionLabel: (option) => {
                  return `${option.value.terms[0].value} ${option.value.terms[1].value}`;
                },
                styles: {
                  input: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                  option: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                  singleValue: (provided) => ({ ...provided, color: "black" }),
                },
                loadingMessage: () => "Cargando",
                noOptionsMessage: () => "Sin resultados",
              }}
            />
          </div>
          <div style={{ width: "100%", margin: "15px 0" }}>
            <GooglePlacesAutocomplete
              autocompletionRequest={searchOptions}
              selectProps={{
                onChange: (evt) => handleChangeDireccion(evt, 2),
                placeholder: "Destino",
                getOptionLabel: (option) => {
                  return `${option.value.terms[0].value} ${option.value.terms[1].value}`;
                },
                styles: {
                  input: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                  option: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                  singleValue: (provided) => ({ ...provided, color: "black" }),
                },
                loadingMessage: () => "Cargando",
                noOptionsMessage: () => "Sin resultados",
              }}
            />
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={style_input}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              label="Dia del viaje"
              value={fecha}
              onChange={handleChangeFecha}
            />
            <KeyboardTimePicker
              style={style_input}
              margin="normal"
              label=" Hora de salida"
              value={fecha}
              onChange={handleChangeFecha}
            />
            <KeyboardTimePicker
              style={style_input}
              margin="normal"
              label=" Hora de llegada"
              value={hora}
              onChange={handleChangeHora}
            />
          </MuiPickersUtilsProvider>
          <TextField
            type="number"
            name="equipajePeso"
            onChange={handleChange}
            value={equipajePeso}
            style={style_input}
            label="Equipaje Disponible"
          />
          {/* <FormControl style={style_input}>
            <InputLabel id="tipoViajeLabel">Tipo de Viaje</InputLabel>
            <Select
              labelId="tipoViajeLabel"
              value={tipoViaje}
              onChange={handleChange}
              name="tipoViaje"
            >
              <MenuItem value={"avion"}>Avion</MenuItem>
              <MenuItem value={"coche"}>Coche</MenuItem>
              <MenuItem value={"bus"}>Camión</MenuItem>
            </Select>
          </FormControl> */}
          <TextField
            type="text"
            name="ine"
            onChange={handleChange}
            value={ine}
            style={style_input}
            label="Datos del INE"
          />
          <TextField
            type="text"
            multiline
            rowsMax={4}
            name="notas"
            onChange={handleChange}
            value={notas}
            style={style_input}
            label="Notas adicionales"
            placeholder="Llego a domicilio, Entrego en punto especifico, etc."
          />
          <FormControlLabel
            style={{ color: "black", marginTop: "15px", marginBottom: "15px" }}
            control={
              <Checkbox
                checked={checkCarta}
                onChange={handleChangeCheck}
                name="checkCarta"
                color="primary"
              />
            }
            label="Carta responsiva"
          />
          <Button
            disabled={!checkCarta}
            style={style_btn}
            type="submit"
            variant="outlined"
          >
            Publicar Viaje
          </Button>
        </form>
      </div>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Muy bien viaje publicado con exito
        </MuiAlert>
      </Snackbar>
      <footer id="footer">
        <BotomNav />
      </footer>
    </>
  );
};
