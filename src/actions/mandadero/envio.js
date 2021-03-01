import { db } from "../../firebase/firebaseConfig";
import { types } from "../../types/types";

export const viajesBusqueda = (viajes, imgPaquete) => ({
  type: types.busqueda,
  payload: { viajes, imgPaquete },
});

export const viajesBusquedaEmpty = () => ({
  type: types.emptyBusqueda,
});
export const getViaje = ({
  dirSalida,
  dirDestino,
  fechaEnvio,
  pesoPaquete,
  imgPaquete,
}) => {
  return (dispatch) => {
    const viajesRef = db.collection("viajes");
    viajesRef
      .where("salida", "==", dirSalida)
      .where("destino", "==", dirDestino)
      .where("fechaViaje", "==", fechaEnvio)
      .where("equipajePeso", ">=", pesoPaquete)
      .get()
      .then((viajes) => {
        if (!viajes.empty) {
          let viajesData = [];
          const precio = getPrecio(pesoPaquete);
          viajes.docs.forEach((viaje) => {
            viajesData.push({
              ...viaje.data(),
              id: viaje.id,
              precio,
              peso_envio: pesoPaquete,
            });
          });
          dispatch(viajesBusqueda(viajesData, imgPaquete));
        } else {
          dispatch(viajesBusquedaEmpty());
        }
      });
  };
};

const getPrecio = (peso) => {
  switch (true) {
    case peso == 1:
      return 85;

    case peso > 1 && peso < 6:
      return 150;

    case peso > 6 && peso < 11:
      return 250;

    case peso > 11 && peso < 26:
      return 350;
  }
};
