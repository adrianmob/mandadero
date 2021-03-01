import React from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

  const [{ email, password, name, phone }, handleChange, reset] = useForm({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPassword(email, password, name, phone));
      reset();
    }
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
      <h1 className="titulo">¡Únete!</h1>
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
        <Button style={style_btn} type="submit" variant="outlined">
          Crear Cuenta
        </Button>
      </form>

      <Button style={{ margin: "8px" }}>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/auth/login"
        >
          Ya tengo una cuenta
        </Link>
      </Button>
    </>
  );
};
