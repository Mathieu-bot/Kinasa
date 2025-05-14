"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialButton } from "@/components/ui/social-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChromeIcon, LucideFacebook } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
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
    <div className="flex justify-center items-center min-h-screen px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full border-blue-200 shadow-lg">
          <CardHeader className="space-y-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center text-blue-100">
              Welcome to Kinasa
            </CardTitle>
            <CardDescription className="text-center text-blue-100/90">
              Connect with farmers and buyers from around the world
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200"
              >
                {error}
              </motion.div>
            )}

            {/* Social Logins */}
            <div className="space-y-3">
              <SocialButton
                provider="Google"
                icon={<ChromeIcon />}
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                type="button"
              />
              <SocialButton
                provider="Facebook"
                icon={<LucideFacebook />}
                onClick={handleFacebookSignIn}
                disabled={isLoading}
                type="button"
              />
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-blue-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-blue-800 font-medium">
                  Or continue with email
                </span>
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
                  className="outline-none bg-amber-50 border-amber-200/80 hover:border-amber-300 
                    transition-all duration-200 shadow-sm hover:shadow-amber-100/50
                    focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400/70 focus:border-emerald-400
                    focus:bg-white placeholder-amber-400/60 text-amber-900"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-emerald-700 hover:text-emerald-800 font-medium"
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
                  className="outline-none bg-amber-50 border-amber-200/80 hover:border-amber-300 
                    transition-all duration-200 shadow-sm hover:shadow-amber-100/50
                    focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400/70 focus:border-emerald-400
                    focus:bg-white placeholder-amber-400/60 text-amber-900"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full"
              >
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-blue-50 font-medium text-base py-2 h-auto" 
                  onClick={async () => {
                  if (!email || !password) {
                    setError("Email and password are required");
                    return;
                  }
                  setIsLoading(true);
                  try {
                    const result = await signIn("credentials", {
                      redirect: false,
                      email,
                      password,
                    });
                    
                    if (result?.error) {
                      setError(result.error);
                    } else {
                      // Redirection réussie vers le tableau de bord
                      router.push(callbackUrl);
                    }
                  } catch (error) {
                    console.error("Login error:", error);
                    setError("An error occurred during login");
                  } finally {
                    setIsLoading(false);
                  }
                }}
                type="button" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : "Sign In"}
                </Button>
              </motion.div>
            </div>
          </CardContent>
          <CardFooter className="justify-center bg-blue-50 rounded-b-lg">
            <div className="text-sm text-blue-800">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-emerald-700 hover:text-emerald-800 font-medium ml-1"
              >
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
