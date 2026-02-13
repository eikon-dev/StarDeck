import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

<<<<<<<< HEAD:src/shared/ui/shadcn/february2026/label.tsx
import { cn } from "@/shared/lib/cn/utils"
========
import {cn} from "@/shared/lib"
>>>>>>>> origin/main:src/shared/ui/label.tsx

function Label({
                 className,
                 ...props
               }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export {Label}
