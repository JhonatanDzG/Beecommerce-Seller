import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { usersCollection } from "@/lib/db";

//"oc4REZahDESdGvwkRcng"

export const GET = async () => {
  try {
    //Obtener los documentos de la colección "users"
    const querySnapshot = await getDocs(usersCollection);

    //Convertir los documentos en un array de objetos
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(">> Users:", users);
    //Responder con los productos y estado positivo
    return NextResponse.json(users, { status: 200 });

    //Manejo de errores
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name, contact, address } = await req.json();

    // Si el valor de una propiedad falta, devolvemos un mensaje de error y status 400
    if (!name || !contact?.email || !contact?.number || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    //Crear el usuario basandose en el modelo
    const newUser: Omit<User, "id"> = {
      name,
      contact: {
        email: contact.email,
        number: contact.number,
      },
      address,
    };

    //Verificar si el producto ya existe
    const q = query(usersCollection, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: "Product already exists", name },
        { status: 409 }
      );
    }

    //Guardar en firestore
    const docRef = await addDoc(usersCollection, newUser);

    //Respuesta positiva
    return NextResponse.json(
      { message: "User added successfully", id: docRef.id },
      { status: 201 }
    );

    //Manejo de errores
  } catch (error) {
    console.error("Error adding user", error);
    return NextResponse.json(
      {
        error: "Error adding user",
      },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { id, name, contact, address } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    //Referencia al documento en Firestore
    const userRef = doc(usersCollection, id);
    //Obtener documento de acuerdo a la collection de referencia
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingUser = userSnap.data(); // Obtenemos el usuario actual

    // Construimos el objeto actualizado basado en el modelo User
    const updatedData: Partial<User> = {};
    if (name) updatedData.name = name;
    if (address) updatedData.address = address;
    if (contact && typeof contact === "object") {
      updatedData.contact = {
        ...existingUser.contact,//Mantiene props anteriores
        ...contact,//Sobreescribe con props actualizadas
      }
    }

    await updateDoc(userRef, updatedData);
    console.log(">> UpdatedData:", updatedData);

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(">> Error updating user", error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    //Referencia al documento en Firestore
    const userRef = doc(usersCollection, id);

    //Verificar si el documento existe antes de eliminarlo
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    //Eliminar usuario
    console.log("Deleting user: ", userSnap.data().name);

    await deleteDoc(userRef);

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
};
