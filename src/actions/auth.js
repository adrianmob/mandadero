import { types } from "../types/types";
import { firebase, db } from "../firebase/firebaseConfig";
export const login = (uid, displayName, email) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    email,
  },
});

export const logout = () => ({
  type: types.logout,
});

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.email));
      });
  };
};

export const startRegisterWithEmailPassword = (
  email,
  password,
  name,
  phone
) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        db.collection("users")
          .doc(user.uid)
          .set({ email, name, phone })
          .then(() => {
            dispatch(login(user.uid, name, user.email));
          });
      });
  };
};

export const salir = () => {
  return (dispatch) => {
    firebase.auth().signOut();
    dispatch(logout());
  };
};
