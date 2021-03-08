import React from "react";
import { useSelector } from "react-redux";
import { BotomNav } from "../BotomNav";
import { Header } from "../Header";

export const PerfilScreen = () => {
  const { name } = useSelector((state) => state.auth);
  return (
    <>
      <header id="header">
        <Header />
      </header>{" "}
      <div className="auth__container" style={{ marginTop: "20px" }}>
        <h1>{name}</h1>
        <p></p>
      </div>
      <footer id="footer">
        <BotomNav />
      </footer>
    </>
  );
};
