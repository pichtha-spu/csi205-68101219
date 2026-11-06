import { cn } from "@/utils/cn";
import { TextField as AriaTextField } from "react-aria-components";
import type { ComponentProps } from "react";

type TextFieldProps = Omit<ComponentProps<typeof AriaTextField>, "className"> & {
  className?: string;
};

export function TextField({ className, ...props }: TextFieldProps) {
  return (
    <AriaTextField
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}
