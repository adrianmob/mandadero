import React, { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { TextField, Snackbar, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startRegisterWithEmailPassword } from "../../actions/auth";

export const RegisterScreen = () => {
  const style_input = {
    margin: "15px 0",
    width: "100%",
  };

  const style_btn = {
    margin: "25px 0",
  };

  const dispatch = useDispatch();
  const [error, setError] = useState({ error: false, msgError: null });

  const [{ email, password, name, phone }, handleChange, reset] = useForm({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const response = await dispatch(
        startRegisterWithEmailPassword(email, password, name, phone)
      );
      console.log(response);
      reset();
      setError(response);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError({ error: false, msgError: null });
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      return false;
    } else if (!validator.isEmail(email)) {
      return false;
    } else if (password.length <= 5) {
      return false;
    }
    return true;
  };

  return (
    <>
      <h1 className="auth__titulo ">¡Únete!</h1>
      <p style={{ padding: "15px 0px" }}>
        Completa el formulario para registrarse
      </p>

      <form onSubmit={handleSubmit} className="form-login">
        <TextField
          type="text"
          name="name"
          onChange={handleChange}
          value={name}
          style={style_input}
          label="Nombre Completo"
        />
        <TextField
          type="number"
          name="phone"
          onChange={handleChange}
          value={phone}
          style={style_input}
          label="Teléfono"
        />
        <TextField
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          style={style_input}
          id="user"
          label="Correo"
        />
        <TextField
          style={style_input}
          onChange={handleChange}
          value={password}
          name="password"
          type="password"
          label="Contraseña"
        />
        <Button
          style={style_btn}
          type="submit"
          variant="outlined"
          disabled={!isFormValid()}
        >
          Crear Cuenta
        </Button>
      </form>

      <Button style={{ margin: "8px" }}>
        <Link
          style={{ textDecoration: "none", color: "#4ABDCE" }}
          to="/auth/login"
        >
          Ya tengo una cuenta
        </Link>
      </Button>
      <Snackbar
        open={error.error}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          {error.msgError}
        </MuiAlert>
      </Snackbar>
    </>
  );
};
