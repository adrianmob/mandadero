import { types } from "../../types/types";

export const selectBusqueda = (viaje) => ({
  type: types.selectBusqueda,
  payload: viaje,
});
