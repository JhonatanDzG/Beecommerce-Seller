import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";
import { getAuth } from "firebase/auth";

export const GET = async (req: NextRequest) => {
  try {
    const authInstance = getAuth();
    const user = authInstance.currentUser;

    if (!user) {
      return NextResponse.json(
        { error: "No user authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { id: user.uid, email: user.email },
      { status: 200 }
    );
  } catch (error) {
    console.log(">> errregister", error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { email, password, name, contact, address } = await req.json();

    if (
      !email ||
      !password ||
      !name ||
      !contact?.email ||
      !contact?.number ||
      !address
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    //Registrar usuario en Auth y Firestore
    const user = await registerUser(email, password, name, contact, address);

    return NextResponse.json(
      { user: { id: user.uid, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.log(">>erregister :c : ", error);

    return NextResponse.json(
      { error: "Error registering user" },
      { status: 500 }
    );
  }
};
