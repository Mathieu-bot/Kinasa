"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialButton } from "@/components/ui/social-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Google sign in error:", error);
      setError("An error occurred with Google sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("facebook", { callbackUrl });
    } catch (error) {
      console.error("Facebook sign in error:", error);
      setError("An error occurred with Facebook sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in to Kinasa</CardTitle>
          <CardDescription className="text-center">
            Connect with farmers and buyers from around the world
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {/* Social Logins */}
          <div className="space-y-3">
            <SocialButton
              provider="Google"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13.5 8V10.5H16C16.2 10.5 16.39 10.65 16.5 10.82V11.94C16.5 12.12 16.33 12.32 16.15 12.32H13.5V16.82C13.5 17 13.33 17.2 13.15 17.2H12.82C12.65 17.2 12.5 17.05 12.5 16.88V12.32H10C9.8 12.32 9.61 12.17 9.5 12V11C9.5 10.82 9.67 10.62 9.85 10.62H12.5V7C12.5 6.82 12.67 6.62 12.85 6.62H13.18C13.35 6.62 13.5 6.77 13.5 6.94V8Z" />
                </svg>
              }
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              type="button"
            />
            <SocialButton
              provider="Facebook"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1877F2">
                  <path d="M13.5 22.5H10.5V15H9V12H10.5V10.5C10.5 9.4 10.8 8.4 11.5 7.7C12.2 7 13 6.6 14.2 6.6C14.8 6.6 15.4 6.7 16 6.8V9.3H14.9C14.3 9.3 14 9.6 14 10.2V12H16L15.6 15H13.5V22.5Z" />
                </svg>
              }
              onClick={handleFacebookSignIn}
              disabled={isLoading}
              type="button"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
