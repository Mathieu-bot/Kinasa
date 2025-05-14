"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      // Format the error message
      switch (errorParam) {
        case "OAuthSignin":
          setError("Error starting the OAuth sign in process.");
          break;
        case "OAuthCallback":
          setError("Error during the OAuth callback process.");
          break;
        case "OAuthCreateAccount":
          setError("Error creating a user from OAuth login.");
          break;
        case "EmailCreateAccount":
          setError("Error creating a user with this email.");
          break;
        case "Callback":
          setError("Error during the OAuth callback.");
          break;
        case "AccessDenied":
          setError("You do not have access to this resource.");
          break;
        default:
          setError(`An error occurred during authentication: ${errorParam}`);
      }
    } else {
      setError("An unknown error occurred during authentication.");
    }
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-red-600">Authentication Error</CardTitle>
          <CardDescription className="text-center">
            We encountered a problem during the sign-in process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">
            {error}
          </div>
          <p className="text-center text-gray-600">
            Please try again or use a different sign-in method.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/auth/login">Try Again</Link>
          </Button>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
