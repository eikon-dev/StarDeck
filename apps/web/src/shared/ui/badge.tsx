import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/shared/lib"

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 whitespace-nowrap shrink-0 w-fit",
    "rounded-full border text-xs font-medium",
    "px-3 py-1", // единый padding для всех
    "backdrop-blur-md", // единый “glass”
    "transition-all duration-300 select-none overflow-hidden",
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",

        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",

        destructive:
          "border-transparent bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/30",

        outline:
          "text-foreground hover:bg-accent hover:text-accent-foreground",

        low:
          "bg-slate-400/10 border-slate-400/20 text-slate-300 hover:bg-slate-400/15",

        med: [
          "bg-gradient-to-br from-cyan-400/20 to-violet-400/20",
          "border-violet-400/30 text-violet-200",
          "shadow-[0_0_12px_rgba(139,92,246,0.15)] hover:shadow-[0_0_16px_rgba(139,92,246,0.25)]",
        ].join(" "),

        high: [
          "bg-gradient-to-br from-pink-400/30 to-amber-300/30",
          "border-amber-300/40 text-amber-100",
          "shadow-[0_0_14px_rgba(251,191,36,0.25)] hover:shadow-[0_0_20px_rgba(251,191,36,0.35)]",
        ].join(" "),

        completed:
          "bg-white/5 border-white/10 text-white/40 shadow-none hover:bg-white/7",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
                 className,
                 variant,
                 asChild = false,
                 ...props
               }: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({variant}), className)}
      {...props}
    />
  )
}

export {Badge, badgeVariants}
