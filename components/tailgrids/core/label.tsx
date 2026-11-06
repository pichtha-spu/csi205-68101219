import { cn } from "@/utils/cn";
import { Label as AriaLabel } from "react-aria-components";
import type { ComponentPropsWithoutRef } from "react";

type LabelProps = Omit<ComponentPropsWithoutRef<"label">, "className"> & {
  className?: string;
};

export function Label({ className, ...props }: LabelProps) {
  return (
    <AriaLabel
      className={cn("text-sm text-title-50", className)}
      {...props}
    />
  );
}
