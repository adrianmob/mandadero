import React, { useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Backdrop,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { saveCheckout, saveFile } from "../../../actions/mandadero/checkout";
import { useHistory } from "react-router-dom";

export const CheckoutForm = ({ precio, notas, direccion }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [seguro, setSeguro] = useState(true);
  const [open, setOpen] = useState(false);
  const [total, seTotal] = useState(precio + 15);
  const viaje = useSelector((state) => state.busqueda);
  const auth = useSelector((state) => state.auth);
  const [openDialgo, setOpenDialog] = useState(false);
  const history = useHistory();
  const [id_envio, setId_envio] = useState("");

  const handlePago = async (e) => {
    setOpen(true);
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;
      const { data } = await axios.post(
        "https://us-central1-mandadero-f2403.cloudfunctions.net/checkout",
        {
          amount: total * 100,
          id,
        }
      );

      if (data.status) {
        const urlImg = await saveFile(viaje.imgPaquete);
        console.log(urlImg);
        let idEnvio = `${viaje.origen.substr(0, 4)}${viaje.destino.substr(
          0,
          4
        )}${Date.now()}`;

        setId_envio(idEnvio);

        saveCheckout({
          notas: notas ? notas : "",
          direccion: direccion ? direccion : "",
          total,
          urlImg,
          viaje,
          auth,
          id_envio: idEnvio,
        });
        setOpen(false);
        setOpenDialog(true);
      } else {
        setOpen(false);
      }
    } else {
      console.log(error);
      setOpen(false);
    }
  };

  const handleChange = (event) => {
    setSeguro(event.target.checked);
    const seguro_precio = event.target.checked ? 15 : -15;
    seTotal((total) => total + seguro_precio);
  };

  const handleClose = () => {
    history.push("/");
  };

  const setDireccion = (direccion) => {
    if (direccion) {
      const newDir = direccion.split(",");
      return `${newDir[0]}`;
    }
  };

  const handleSendEmail = async () => {
    console.log("hola");
    const body = {
      email: auth.email,
      name: auth.name,
      id_viaje: id_envio,
      origen: setDireccion(viaje.origen),
      destino: setDireccion(viaje.destino),
      hora_origen: viaje.hora_origen,
      hora_destino: viaje.hora_destino,
      total,
    };
    const { data } = await axios.post(
      "https://us-central1-mandadero-f2403.cloudfunctions.net/envioMail",
      body
    );
    console.log(data);
    history.push("/");
  };

  return (
    <form onSubmit={handlePago}>
      <Backdrop open={open} style={{ zIndex: "9999", color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CardElement
        style={{ padding: "20px 0" }}
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div style={{ margin: "30px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: "0 25px 0 0" }}>Subtotal</p>
          <p>
            ${precio}.00<span style={{ fontSize: "10px" }}>MX</span>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "14px",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            style={{ fontSize: "14px", margin: "0 25px 0 0" }}
            control={
              <Checkbox
                color="primary"
                checked={seguro}
                onChange={handleChange}
                name="seguro"
              />
            }
            label="¿Desea agregar el seguro?"
          />
          <p>
            $15.00<span style={{ fontSize: "10px" }}>MX</span>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: "0 25px 0 0" }}>Total</p>
          <p>
            ${total}.00<span style={{ fontSize: "10px" }}>MX</span>
          </p>
        </div>
      </div>

      <Button
        disabled={!stripe}
        style={{ margin: "0 auto", display: "block" }}
        variant="contained"
        color="primary"
        type="submit"
      >
        Pagar
      </Button>
      <Dialog open={openDialgo} onClose={handleClose}>
        <DialogTitle>{"!Tu envío ha sido registrado con exito!"}</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              margin: "0 auto",
              flexDirection: "column",
              alignItems: "center",
              border: "2px solid",
              width: "fit-content",
              padding: "10px 20px",
            }}
          >
            <p style={{ margin: "10px 0" }}>
              Clave de envío: <span>{id_envio}</span>
            </p>
            <p style={{ margin: "10px 0" }}>
              Viaje:{" "}
              <span>
                {setDireccion(viaje.origen)} a {setDireccion(viaje.destino)}
              </span>
            </p>
            <p style={{ margin: "10px 0" }}>
              Hora:{" "}
              <span>
                {viaje.hora_origen} hrs - {viaje.hora_destino} hrs
              </span>
            </p>
            <p style={{ margin: "10px 0" }}>
              Destinatorio: <span>{auth.name}</span>
            </p>
            <p style={{ margin: "10px 0" }}>
              Costo envío: <span>${total}.00</span>
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSendEmail} color="primary">
            Enviar a correo
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
