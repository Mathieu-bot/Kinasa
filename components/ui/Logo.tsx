"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

type LogoProps = {
  size?: number | string;
  className?: string;
};

export function Logo({ size = 40, className }: LogoProps) {
  const { theme } = useTheme();

  return (
    <div
      style={{ position: "relative", width: size, height: size }}
      className={className}
    >
      <Image
        src="/logo.svg"
        alt="Logo"
        width={Number(size)}
        height={Number(size)}
        style={{
          filter: theme === "dark" ? "invert(0)" : "invert(0.7)",
        }}
      />
    </div>
  );
}
