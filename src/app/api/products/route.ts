import { NextRequest, NextResponse } from "next/server";
/* import { db } from "@/lib/firebase";*/
import {
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { productsCollection } from "@/lib/db";
import { Product } from "@/models/Product";

export const GET = async () => {
  try {
    //Obtener los documentos de la colección "products"
    const querySnapshot = await getDocs(productsCollection);

    //Convertir los documentos en un array de objetos
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Products", products);
    //Responder con los productos y estado positivo
    return NextResponse.json(products, { status: 200 });

    //Manejo de errores
  } catch (error) {
    console.error(">> error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name, price, stock, categories }: Omit<Product, "id"> =
      await req.json();

    if (!name || !price || stock === undefined || categories.length === 0) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // 📌 Verificar si el producto ya existe
    const q = query(productsCollection, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: "Product already exists", name },
        { status: 409 }
      );
    }

    //Guardar el nuevo producto en Firestore
    const docRef = await addDoc(productsCollection, {
      name,
      price,
      stock,
      categories,
    });

    return NextResponse.json(
      { message: "Product added successfully: ", name, id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding product" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { id, name, price, stock, categories } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    //Referencia al documento en Firestore
    const productRef = doc(productsCollection, id);
    //Obtener documento de acuerdo a la collection de referencia
    const productSnap = await getDoc(productRef);

    //productSnap.exists() revisa si el snapshot(captura de datos/instantanea) contiene datos válidos además devuelve boolean
    if (!productSnap.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Construimos el objeto actualizado basado en Product
    const updatedData: Partial<Product> = {};
    if (name) updatedData.name = name;
    if (price !== undefined) updatedData.price = price;
    if (stock !== undefined) updatedData.stock = stock;
    if (categories)
      updatedData.categories = Array.isArray(categories)
        ? categories
        : [categories];

    await updateDoc(productRef, updatedData);

    console.log(">> UpdatedData:", updatedData);

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(">> Error updating product", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // 📌 Referencia al documento en Firestore
    const productRef = doc(productsCollection, id);

    // 📌 Verificar si el documento existe antes de eliminarlo
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 📌 Eliminar el producto
    await deleteDoc(productRef);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
};
