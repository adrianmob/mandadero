import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../Header";

export const PerfilScreen = () => {
  const { name } = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      <div className="auth__container" style={{ marginTop: "20px" }}>
        <h1>{name}</h1>
        <p></p>
      </div>
    </>
  );
};
