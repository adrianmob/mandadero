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
  const response = async (dispatch) => {
    return await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.email));
      })
      .catch((error) => {
        return { error: true, msgError: error.message };
      });
  };
  return response;
};

export const startRegisterWithEmailPassword = (
  email,
  password,
  name,
  phone
) => {
  const response = async (dispatch) => {
    return await firebase
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
      })
      .catch((error) => {
        return { error: true, msgError: error.message };
      });
  };
  return response;
};

export const salir = () => {
  return (dispatch) => {
    firebase.auth().signOut();
    dispatch(logout());
  };
};
