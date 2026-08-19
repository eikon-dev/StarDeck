'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/ui/components/glass/card';
import { Button } from '@/shared/ui/components/glass/button';

import { useRef, useState } from 'react';
import Picker from '@/shared/ui/picker';
import TaskCard from '@/features/task-card/ui/task-card';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { key: 'DISCIPLINE', label: 'Дисциплина' },
  { key: 'TODAY', label: 'Сегодня' },
  { key: 'LONG_TERM', label: 'Долговременные' },
  { key: 'QUEUE', label: 'Очередь' },
] as const;

export default function TaskPanel() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      category: 'DISCIPLINE',
      title: 'Зарядка и растяжка',
      description:
        'No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.',
      done: false,
    },
    {
      id: 2,
      category: 'DISCIPLINE',
      title: 'Прочитать главу',
      description: 'Пятнадцать минут, без телефона',
      done: false,
    },
    {
      id: 6,
      category: 'DISCIPLINE',
      title: 'Прочитать главу 2',
      description: 'Пятнадцать минут, без телефона',
      done: false,
    },
    {
      id: 3,
      category: 'TODAY',
      title: 'Разобрать почту',
      description: 'Проверка длинного названия',
      done: false,
    },
    {
      id: 4,
      category: 'LONG_TERM',
      title: 'Английский',
      description: 'Двадцать новых слов',
      done: false,
    },
    {
      id: 5,
      category: 'QUEUE',
      title: 'Прогулка',
      description: null,
      done: false,
    },
  ]);

  const toggle = (id: number) =>
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

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
        if (diff > 50) {
          setActiveItem((prev) => Math.min(prev + 1, CATEGORIES.length - 1));
        }
        if (diff < -50) {
          setActiveItem((prev) => Math.max(prev - 1, 0));
        }
      }}
    >
      <CardHeader>
        <Picker
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          items={CATEGORIES.map((c) => c.label)}
        />
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex"
            animate={{ x: `-${activeItem * 100}%` }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {CATEGORIES.map((c) => {
              const catTasks = tasks.filter((t) => t.category === c.key);
              const allDone =
                catTasks.length > 0 && catTasks.every((t) => t.done);

              return (
                <div key={c.key} className="w-full flex-shrink-0">
                  <div className="flex flex-col gap-4 px-1">
                    {catTasks.map((t, i) => (
                      <TaskCard
                        key={t.id}
                        title={t.title}
                        description={t.description}
                        category={c.key}
                        done={t.done}
                        celebrating={allDone}
                        index={i}
                        onToggle={() => toggle(t.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
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
