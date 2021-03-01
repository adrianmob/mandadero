import { db } from "../../firebase/firebaseConfig";

export const getEnvios = async (id) => {
  const envios = await db
    .collection("envios")
    .where("id_cliente", "==", id)
    .get()
    .then((envios) => {
      let enviosData = [];
      if (!envios.empty) {
        envios.docs.forEach((envio) => {
          enviosData.push({
            ...envio.data(),
            id: envio.id,
          });
        });
      }
      return enviosData;
    });
  return envios;
};

export const getViajes = async (id) => {
  const viajes = await db
    .collection("envios")
    .where("id_viajero", "==", id)
    .get()
    .then((viajes) => {
      let viajesData = [];
      if (!viajes.empty) {
        viajes.docs.forEach((viaje) => {
          viajesData.push({
            ...viaje.data(),
            id: viaje.id,
          });
        });
      }
      return viajesData;
    });
  return viajes;
};
