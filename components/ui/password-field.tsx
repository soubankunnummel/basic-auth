"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export const PasswordField = forwardRef<
  HTMLInputElement,
  {
    form: UseFormReturn<any>;
    name: "confirm_password" | "password";
    label?: string;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: any;
    clasName?: string;
  }
>(({ form, label, name, onFocus, onBlur, clasName }, ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel className={cn("", clasName)}>{label}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  {...field}
                  ref={ref}
                  id="input-51"
                  className={cn("pe-9")}
                  type={isVisible ? "text" : "password"}
                  onFocus={onFocus}
                  onBlur={onBlur || field.onBlur}
                />
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Eye size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

PasswordField.displayName = "PasswordField";
