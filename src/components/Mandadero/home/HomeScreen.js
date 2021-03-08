import React from "react";
import { Header } from "../Header";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { BotomNav } from "../BotomNav";

export const HomeScreen = () => {
  return (
    <>
      <header id="header">
        <Header />
      </header>
      <div className="home__container">
        <img
          alt="el mandadero"
          className="home__img"
          src="./imgs/logo.png"
        ></img>
        <h1 className="home__titulo">El mandadero</h1>
        <p className="home__leyenda">Envia tus paquetes con los viajeros</p>
        <div>
          <Button
            variant="contained"
            style={{ margin: "8px", backgroundColor: "#4ABDCE" }}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/viaje"
            >
              Publicar Viaje
            </Link>
          </Button>
          <Button
            variant="contained"
            style={{ margin: "8px", backgroundColor: "#4ABDCE" }}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/envio"
            >
              Solicitar envio
            </Link>
          </Button>
        </div>
      </div>
      <footer id="footer">
        <BotomNav />
      </footer>
    </>
  );
};
