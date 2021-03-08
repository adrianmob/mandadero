import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Snackbar, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLoginEmailPassword } from "../../actions/auth";

export const LoginScreen = () => {
  const style_input = {
    margin: "15px 0",
    width: "100%",
  };

  const style_btn = {
    margin: "25px 0",
  };

  const dispatch = useDispatch();
  const [error, setError] = useState({ error: false, msgError: null });

  const [{ email, password }, handleChange, reset] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(startLoginEmailPassword(email, password));
    setError(response);
    reset();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError({ error: false, msgError: null });
  };

  return (
    <>
      <h1 className="auth__titulo">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="form-login">
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
          disabled={email === "" || password === ""}
        >
          Iniciar Sesión
        </Button>
      </form>

      <Button style={{ margin: "10px" }}>
        <Link
          style={{ textDecoration: "none", color: "#4ABDCE" }}
          to="/auth/register"
        >
          ¿No eres cliente? Regístrate aquí
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
