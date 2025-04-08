/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { usersCollection } from "@/lib/db";
import { User } from "@/models/User";

//Registrar usuario
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  contact: { email: string; number: string },
  address: string
) => {
  try {
    // Validar campos requeridos
    if (!email || !password || !name || !contact?.email || !contact?.number) {
      throw new Error("Missing required fields");
    }

    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Crear el usuario en Firestore
    const newUser: User = {
      id: user.uid,
      name,
      contact, // Descomposicion de objeto innecesaria aqui
      address,
      profileComplete: false,
      createdAt: new Date(),
    };

    await setDoc(doc(usersCollection, user.uid), newUser);

    return user;
  } catch (error: any) {
    console.error("Error during registration:", error);

    if (error.code === "auth/email-already-in-use") {
      throw new Error("This email is already in use.");
    }
    if (error.code === "auth/weak-password") {
      throw new Error("Password is too weak.");
    }

    throw new Error("Registration failed. Please try again.");
  }
};

//Iniciar sesión
export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//Cerrar sesión
export const logoutUser = async () => {
  return await signOut(auth);
};
