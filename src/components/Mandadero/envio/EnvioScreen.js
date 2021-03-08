import React, { useEffect, useRef, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faEnvelope,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

import { Header } from "../Header";
import { getViaje, viajesBusqueda } from "../../../actions/mandadero/envio";
import { useDispatch, useSelector } from "react-redux";
import { BotomNav } from "../BotomNav";

export const EnvioScreen = () => {
  const style_input = {
    margin: "15px 0",
    width: "100%",
  };

  const style_btn = {
    margin: "25px 0",
  };

  const searchOptions = {
    types: ["(cities)"],
    componentRestrictions: {
      country: "mx",
    },
  };

  const [imgPaquete, setimgPaquete] = useState(null);
  const [fecha, setFecha] = useState(Date.now());
  const [direccion, setDireccion] = useState({
    dirSalida: "",
    dirDestino: "",
  });
  const [pesoPaquete, setPesoPaquete] = useState(1);
  const [checkCarta, setCheckCarta] = useState(true);
  const [open, setopen] = useState(false);
  const [alert, setAlert] = useState(false);

  const refImage = useRef(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const { viajes } = useSelector((state) => state.busqueda);

  useEffect(() => {
    const trip = viajes ? viajes : [];
    if (trip.length > 0) {
      history.push("/busqueda");
    }
  }, [viajes, history]);

  const handleChangeFecha = (fecha) => {
    setFecha(fecha);
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

  const handleChangeToggle = (e, selectPeso) => {
    setPesoPaquete(selectPeso);
  };

  const handleChangeInputImg = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (event) => {
      setimgPaquete(file);
      refImage.current.src = event.target.result;
    };

    reader.onerror = (event) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fechaEnvio = format(fecha, "dd/MM/yy");
    const { dirSalida, dirDestino } = direccion;
    const body = {
      dirSalida,
      dirDestino,
      pesoPaquete,
      fechaEnvio,
    };
    setopen(true);
    const viajes = await getViaje(body);
    setopen(false);
    if (viajes.length !== 0) {
      dispatch(viajesBusqueda(viajes, imgPaquete));
    } else {
      setAlert(true);
    }
  };

  const handleClose = () => {
    setAlert(false);
  };

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "9999", color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <header id="header">
        <Header />
      </header>
      <div className="envio__container" style={{ marginTop: "20px" }}>
        <h1 className="envio__titulo">¿A dónde quieres envíar?</h1>
        <form onSubmit={handleSubmit} className="envio__login">
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
              label="Dia del envio"
              value={fecha}
              onChange={handleChangeFecha}
            />
          </MuiPickersUtilsProvider>
          <ToggleButtonGroup
            orientation="vertical"
            value={pesoPaquete}
            exclusive
            onChange={handleChangeToggle}
            style={{ width: "100%", margin: "15px", backgroundColor: "white" }}
          >
            <ToggleButton value={1}>
              <div className="selectPaquete">
                <FontAwesomeIcon
                  style={{ fontSize: "2.4rem" }}
                  icon={faEnvelope}
                />
                <p>Sobre | Documento</p>
                <strong>1KG</strong>
              </div>
            </ToggleButton>
            <ToggleButton value={5}>
              <div className="selectPaquete">
                <FontAwesomeIcon
                  style={{ fontSize: "2.4rem" }}
                  icon={faBoxOpen}
                />
                <p>Caja chica</p>
                <strong>2KG - 5KG</strong>
              </div>
            </ToggleButton>
            <ToggleButton value={10}>
              <div className="selectPaquete">
                <FontAwesomeIcon
                  style={{ fontSize: "2.4rem" }}
                  icon={faBoxOpen}
                />
                <p>Caja mediana</p>
                <strong>6KG - 10KG</strong>
              </div>
            </ToggleButton>
            <ToggleButton value={25}>
              <div className="selectPaquete">
                <FontAwesomeIcon
                  style={{ fontSize: "2.4rem" }}
                  icon={faBoxOpen}
                />
                <p>Caja grande</p>
                <strong>11KG - 25KG</strong>
              </div>
            </ToggleButton>
          </ToggleButtonGroup>
          <div className="btnImage">
            <input
              accept="image/*"
              id="imageBtn"
              type="file"
              onChange={handleChangeInputImg}
              style={{ display: "none" }}
            />

            <label htmlFor="imageBtn">
              <Button
                variant="outlined"
                component="span"
                style={{ width: "100%", padding: "10px 0" }}
              >
                <FontAwesomeIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                    margin: "0 10px",
                  }}
                  icon={faImage}
                />
                <p>Añadir imagen</p>
              </Button>
              {imgPaquete && (
                <img
                  alt="evidencia"
                  className="imgPaquete"
                  ref={refImage}
                  src=""
                ></img>
              )}
            </label>
          </div>
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
            Solicitar Envio
          </Button>
        </form>
      </div>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity="info">
          No existen viajes para esas fechas.
        </MuiAlert>
      </Snackbar>
      <footer id="footer">
        <BotomNav />
      </footer>
    </>
  );
};
