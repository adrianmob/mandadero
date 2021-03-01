import React from "react";
import { Provider } from "react-redux";
import { store } from "./components/store/store";
import { AppRouter } from "./routers/AppRouter";

export const MandaderoApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
