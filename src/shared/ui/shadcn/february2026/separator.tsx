"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

<<<<<<<< HEAD:src/shared/ui/shadcn/february2026/separator.tsx
import { cn } from "@/shared/lib/cn/utils"
========
import {cn} from "@/shared/lib"
>>>>>>>> origin/main:src/shared/ui/separator.tsx

function Separator({
                     className,
                     orientation = "horizontal",
                     decorative = true,
                     ...props
                   }: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export {Separator}
