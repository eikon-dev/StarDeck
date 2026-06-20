'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/glass/card';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/shared/ui/components/glass/collapsible';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function TaskCard() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card
        glass={{
          color: 'rgba(139, 92, 246, 0.1)',
          outline: 'rgba(139, 92, 246, 0.5)',
          innerGlow: 'rgba(0, 0, 0, 0.5)',
          innerGlowBlur: 5,
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Title</CardTitle>
          <CollapsibleTrigger>
            <ChevronDown />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>Content</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
