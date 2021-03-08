import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { TextField } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Header } from "../Header";
import { useForm } from "../../../hooks/useForm";
import { useSelector } from "react-redux";
import { CheckoutForm } from "./CheckoutForm";
import { useHistory } from "react-router-dom";
import { BotomNav } from "../BotomNav";

export const CheckoutScreen = () => {
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(
      "pk_live_51INZegIUa12FAo8qDYrPxdj5f6PEBEzMAy7xUD0m19XhQoqZbUiCnrlUQo59MV6f5f5LhoqNtkNHNVXQD0hNxXAd00Mnxg8lPv"
    )
  );

  const viaje = useSelector((state) => state.busqueda);
  const history = useHistory();

  useEffect(() => {
    console.log(viaje);
    if (Object.keys(viaje).length === 0) {
      history.push("/");
    }
  }, [viaje, history]);

  const searchOptions = {
    componentRestrictions: {
      country: "mx",
    },
  };

  const [{ notas }, handleChange] = useForm({
    notas: "",
  });

  const [direccion, setDireccion] = useState("");

  const handleChangeDireccion = (address) => {
    setDireccion(address);
  };

  return (
    <>
      <header id="header">
        <Header />
      </header>
      <div className="auth__container" style={{ marginTop: "20px" }}>
        <h1>Pago</h1>
        <div className="form-login" style={{ color: "black" }}>
          <div style={{ width: "100%", margin: "15px 0" }}>
            <GooglePlacesAutocomplete
              autocompletionRequest={searchOptions}
              selectProps={{
                onChange: (evt) => handleChangeDireccion(evt),
                placeholder: "Direccion complementaria",
                getOptionLabel: (option) => {
                  return `${option.label}`;
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

          <div style={{ width: "100%", margin: "20px 0" }}>
            <TextField
              style={{ width: "100%" }}
              label="Notas adicionales"
              multiline
              rowsMax={4}
              name="notas"
              value={notas}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: "100%", margin: "20px 0" }}>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                notas={notas}
                direccion={direccion.label}
                precio={viaje.precio}
              />
            </Elements>
          </div>
        </div>
      </div>
      <footer id="footer">
        <BotomNav />
      </footer>
    </>
  );
};
