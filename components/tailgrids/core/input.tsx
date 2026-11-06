import { cn } from "@/utils/cn";
import { Input as AriaInput } from "react-aria-components";
import type { ComponentPropsWithoutRef } from "react";

export type InputProps = Omit<ComponentPropsWithoutRef<"input">, "className"> & {
  className?: string;
};

export function Input({ className, ...props }: InputProps) {
  return (
    <AriaInput
      className={cn(
        "w-full rounded-lg border border-base-300 bg-input-background px-4 py-2.5 text-title-50 outline-none focus:border-input-primary-focus-border focus:ring-4 focus:ring-input-primary-focus-border/20 disabled:border-base-100 disabled:text-input-disabled-text disabled:placeholder:text-input-disabled-text",
        className,
      )}
      {...props}
    />
  );
}
