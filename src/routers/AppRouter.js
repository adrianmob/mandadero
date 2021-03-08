import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MandaderoScreen } from "../components/Mandadero/MandaderoScreen";
import { EnvioScreen } from "../components/Mandadero/envio/EnvioScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebaseConfig";
import { login } from "../actions/auth";
import { CheckoutScreen } from "../components/Mandadero/checkout/CheckoutScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { BusquedaScreen } from "../components/Mandadero/busqueda/BusquedaScreen";
import { HistorialScreen } from "../components/Mandadero/historial/HistorialScreen";
import { PerfilScreen } from "../components/Mandadero/perfil/PerfilScreen";
import { HomeScreen } from "../components/Mandadero/home/HomeScreen";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.email));
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setLoggedIn]);

  if (checking) {
    return <h1>Espere..</h1>;
  }
  return (
    <>
      <Router>
        <Switch>
          <PublicRoute
            isAuthenticated={loggedIn}
            path="/auth"
            component={AuthRouter}
          ></PublicRoute>
          <PrivateRoute
            isAuthenticated={loggedIn}
            exact
            path="/viaje"
            component={MandaderoScreen}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={loggedIn}
            exact
            path="/envio"
            component={EnvioScreen}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={loggedIn}
            exact
            path="/checkout"
            component={CheckoutScreen}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={loggedIn}
            exact
            path="/busqueda"
            component={BusquedaScreen}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={loggedIn}
            path="/historial"
            component={HistorialScreen}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={loggedIn}
            path="/perfil"
            component={PerfilScreen}
          ></PrivateRoute>
          <PrivateRoute
            isAuthenticated={loggedIn}
            path="/"
            component={HomeScreen}
          ></PrivateRoute>

          <Redirect to="/auth/login"></Redirect>
        </Switch>
      </Router>
    </>
  );
};
