import { db, storage } from "../../firebase/firebaseConfig";
import { types } from "../../types/types";

export const saveFile = async (file) => {
  const uploadTask = storage.ref(
    `envios_evidencia/${Date.now() + "-" + file.name}`
  );
  await uploadTask.put(file);
  const urlImg = await uploadTask.getDownloadURL();
  return urlImg;
};

export const saveCheckout = ({
  notas,
  direccion,
  total,
  urlImg,
  viaje,
  auth,
  id_envio,
}) => {
  const peso = viaje.equipajePeso - viaje.peso_envio;

  const body = {
    notas,
    direccion,
    total,
    urlImg,
    id_cliente: auth.uid,
    nombre_cliente: auth.name,
    id_viajero: viaje.viajeroID,
    origen: viaje.origen,
    destino: viaje.destino,
    hora_destino: viaje.hora_destino,
    hora_origen: viaje.hora_origen,
  };

  updateViaje(viaje.id, peso);
  setEnvioViaje(id_envio, body);
};

const updateViaje = (id, peso) => {
  return db.collection("viajes").doc(id).update({ equipajePeso: peso });
};

const setEnvioViaje = (id, body) => {
  return db.collection("envios").doc(id).set(body);
};
