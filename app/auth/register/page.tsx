"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialButton } from "@/components/ui/social-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ChromeIcon, LucideFacebook } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("farmer");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Basic validation
      if (!name || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      // Call to registration API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          accountType,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error during registration");
      }
      router.push("/auth/login?registered=true");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  // Render the registration form
  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full border-amber-200 shadow-lg">
          <CardHeader className="space-y-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center text-amber-100">
              Join Kinasa
            </CardTitle>
            <CardDescription className="text-center text-amber-100/90">
              Create your account to connect with the global coffee community
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
                <span className="w-full border-t border-amber-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-amber-800 font-medium">
                  Or register with email
                </span>
              </div>
            </div>

            {/* Account Type Selection */}
            <div className="flex space-x-2 p-1 bg-gray-100 rounded-md">
              <Button
                type="button"
                variant={accountType === "farmer" ? "default" : "ghost"}
                className={`flex-1 ${accountType === "farmer" ? "bg-emerald-600 text-white" : "bg-amber-50 text-amber-800 hover:bg-amber-100"}`}
                onClick={() => setAccountType("farmer")}
                disabled={isLoading}
              >
                I'm a Farmer
              </Button>
              <Button
                type="button"
                variant={accountType === "buyer" ? "default" : "ghost"}
                className={`flex-1 ${accountType === "buyer" ? "bg-emerald-600 text-white" : "bg-amber-50 text-amber-800 hover:bg-amber-100"}`}
                onClick={() => setAccountType("buyer")}
                disabled={isLoading}
              >
                I'm a Buyer
              </Button>
            </div>

            {/* Email Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="outline-none bg-amber-50 border-amber-200/80 hover:border-amber-300 
                    transition-all duration-200 shadow-sm hover:shadow-amber-100/50
                    focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400/70 focus:border-emerald-400
                    focus:bg-white placeholder-amber-400/60 text-amber-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
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
                <Label htmlFor="password">Password</Label>
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-amber-50 font-medium text-base py-2 h-auto" 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : 'Create Account'}
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="justify-center bg-amber-50 rounded-b-lg">
            <div className="text-sm text-amber-800">
              Already have an account?{" "}
              <Link 
                href="/auth/login" 
                className="text-emerald-700 hover:text-emerald-800 font-medium ml-1"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
