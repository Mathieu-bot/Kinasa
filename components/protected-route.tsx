"use client";

import { useAuth, UserRole } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ 
  children, 
  allowedRoles 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
    
    if (!isLoading && isAuthenticated && allowedRoles && user?.role) {
      if (!allowedRoles.includes(user.role as UserRole)) {
        if (user.role === "FARMER") {
          router.push("/dashboard/farmer");
        } else if (user.role === "BUYER") {
          router.push("/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    }
  }, [isLoading, isAuthenticated, router, pathname, allowedRoles, user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" className="text-emerald-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role as UserRole)) {
    return null;
  }

  return <>{children}</>;
}
