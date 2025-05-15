import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {  
  try {
    console.log("Starting registration process...");
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body));
    
    const { name, email, password, accountType } = body;

    if (!name || !email || !password || !accountType) {
      console.log("Missing required fields");
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Checking for existing user with email:", email);
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        console.log("Email already in use");
        return NextResponse.json(
          { message: "Email already in use" },
          { status: 400 }
        );
      }
    } catch (dbError: any) {
      console.error("Database error when checking existing user:", dbError);
      return NextResponse.json(
        { message: "Database error when checking user", error: dbError.message },
        { status: 500 }
      );
    }

    console.log("Hashing password...");
    const hashedPassword = await hash(password, 10);

    console.log("Creating user in database...");
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: accountType === "farmer" ? "FARMER" : "BUYER",
        },
      });
      
      console.log("User created successfully with ID:", user.id);

      return NextResponse.json(
        { message: "Account created successfully", userId: user.id },
        { status: 201 }
      );
    } catch (createError: any) {
      console.error("Error creating user:", createError);
      return NextResponse.json(
        { message: "Error creating user", error: createError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Error during account creation", error: error.message },
      { status: 500 }
    );
  }
}
