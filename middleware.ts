import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if (req.nextUrl.pathname.startsWith("/auth/") && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    if (req.nextUrl.pathname.startsWith("/dashboard/farmer") && 
        token?.role !== "FARMER" && 
        token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    if (req.nextUrl.pathname.startsWith("/dashboard/market") && 
        token?.role === "FARMER") {
      return NextResponse.redirect(new URL("/dashboard/farmer/products", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/((?!api/auth|auth|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
