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
  // Комментарий для теста скорости сборки после первого запуска с кешами
  // Первый запуск 2,55с с кешированием
  // Тест показал API= 1m49s, Web= 39s, deploy= 59s
  // Делаем второй тест после настройки кешев
  // Новый тест скорости после обновления архитектуры Docker
  // Speed test #4
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
