import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

  const [{ email, password }, handleChange, reset] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
    dispatch(startLoginEmailPassword(email, password));
    reset();
  };

  return (
    <>
      <h1 className="titulo">Iniciar Sesión</h1>
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
        <Button style={style_btn} type="submit" variant="outlined">
          Iniciar Sesión
        </Button>
      </form>

      <Button style={{ margin: "10px" }}>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/auth/register"
        >
          ¿No eres cliente? Regístrate aquí
        </Link>
      </Button>
    </>
  );
};
