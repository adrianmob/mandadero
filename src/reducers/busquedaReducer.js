import { types } from "../types/types";
export const busquedaReducer = (state = {}, action) => {
  switch (action.type) {
    case types.busqueda:
      return {
        viajes: action.payload.viajes,
        imgPaquete: action.payload.imgPaquete,
      };

    case types.emptyBusqueda:
      return {};

    case types.selectBusqueda:
      return {
        equipajePeso: action.payload.equipajePeso,
        viajeroID: action.payload.viajeroID,
        id: action.payload.id,
        precio: action.payload.precio,
        origen: action.payload.origen,
        destino: action.payload.destino,
        imgPaquete: state.imgPaquete,
        peso_envio: action.payload.peso_envio,
        hora_origen: action.payload.hora_origen,
        hora_destino: action.payload.hora_destino,
        fecha_envio: action.payload.fecha_envio,
      };

    default:
      return state;
  }
};
