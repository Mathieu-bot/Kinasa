"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  provider: string;
}

export function SocialButton({
  icon,
  provider,
  className,
  children,
  ...props
}: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn("flex items-center gap-2 w-full", className)}
      {...props}
    >
      {icon}
      <span>Continue with {provider}</span>
    </Button>
  );
}
