import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {  
  try {
    const { name, email, password, accountType } = await req.json();

    if (!name || !email || !password || !accountType) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: accountType === "farmer" ? "FARMER" : "BUYER",
      },
    });

    return NextResponse.json(
      { message: "Compte créé avec succès", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création du compte" },
      { status: 500 }
    );
  }
}
