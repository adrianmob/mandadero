import { db } from "../../firebase/firebaseConfig";

export const setViaje = (body) => {
  db.collection("viajes").doc().set(body);
};
