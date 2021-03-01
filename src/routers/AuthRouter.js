import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
export const AuthRouter = () => {
  return (
    <div
      className="auth__main"
      style={{ backgroundImage: "url(../imgs/background.jpg)" }}
    >
      <div className="auth__cortina"></div>
      <div className="auth__container">
        <Switch>
          <Route exact path="/auth/login" component={LoginScreen}></Route>
          <Route exact path="/auth/register" component={RegisterScreen}></Route>
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};
