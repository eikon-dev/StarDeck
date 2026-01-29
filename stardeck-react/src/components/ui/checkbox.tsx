import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
    [
      "m-0.5 h-6 w-6 rounded-md",
      "border backdrop-blur-md",
      "transition-all duration-300",
      "data-[state=checked]:scale-105",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ].join(" "),
    {
      variants: {
        variant: {
          unchecked:
              "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/8",
          checked:
              "border-violet-400/50 bg-gradient-to-br from-cyan-400/40 to-violet-400/40 shadow-[0_0_10px_rgba(139,92,246,0.35)]",
          calm:
              "border-white/15 bg-white/8 shadow-none",
          disabled:
              "border-white/10 bg-white/3 opacity-40 cursor-not-allowed shadow-none",
        },
      },
      defaultVariants: { variant: "unchecked" },
    }
);

type CheckboxProps =
    React.ComponentProps<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxVariants>;

function Checkbox({ className, variant, disabled, ...props }: CheckboxProps) {
  // Авто-variant по disabled (чтобы везде было консистентно)
  const resolvedVariant = disabled ? "disabled" : variant;

  return (
      <CheckboxPrimitive.Root
          data-slot="checkbox"
          disabled={disabled}
          className={cn(checkboxVariants({ variant: resolvedVariant }), className)}
          {...props}
      >
        <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="grid place-content-center text-white/90 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
        >
          <CheckIcon className="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
  );
}

export { Checkbox, checkboxVariants };
