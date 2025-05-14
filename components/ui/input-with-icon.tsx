import * as React from "react";
import { cn } from "@/lib/utils/cn";

// Omit les props 'prefix' et 'suffix' pour éviter les conflits avec les HTMLAttributes
export interface InputWithIconProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  icon?: React.ReactNode; // Pour la compatibilité
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, type, prefix, suffix, icon, ...props }, ref) => {
    // Utiliser icon comme un alias pour prefix (pour maintenir la compatibilité)
    const prefixIcon = prefix || icon;
    
    return (
      <div className="relative w-full">
        {prefixIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {prefixIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            prefixIcon && "pl-10",
            suffix && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
