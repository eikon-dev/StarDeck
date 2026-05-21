'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/glass/card';
import { Button } from '@/components/ui/glass/button';

import { useRef, useState } from 'react';
import Picker from '@/shared/ui/picker';
import TaskCard from '@/shared/ui/task-card';

export default function TaskPanel() {
  const items = ['Дисциплина', 'Дневные', 'Долговременные', 'Очередь'];
  const touchStartX = useRef(0);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <Card
      className="max-w-[110vh] w-full h-full rounded-t-4xl rounded-b-none"
      glass={{
        color: 'rgba(67, 67, 67, 0.3)',
        blur: 30,
        transparency: 0.1,
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50)
          setActiveItem((prev) => Math.min(prev + 1, items.length - 1));
        if (diff < -50) setActiveItem((prev) => Math.max(prev - 1, 0));
      }}
    >
      <CardHeader>
        <Picker
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          items={items}
        />
      </CardHeader>
      <CardContent>
        <TaskCard></TaskCard>
      </CardContent>
      <CardFooter className="flex justify-center mt-auto">
        <Button className="w-16 h-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
}
