import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

//Registrar usuario
export const regiterUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

//Iniciar sesión
export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//Cerrar sesión
export const logoutUser = async () => {
  return await signOut(auth);
};
