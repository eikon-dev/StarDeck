'use client';

import { Drawer } from 'vaul';
import TaskPanel from '@/widgets/task-panel/ui/task-panel';
import { useState } from 'react';
import { motion } from 'framer-motion';

const snapPoints = [0.05, 0.8];

export default function DrawerTaskPanel() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const isOpen = snap === snapPoints[0];

  return (
    <Drawer.Root
      open={true}
      dismissible={false}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="h-[100svh] fixed bottom-0 right-0 left-0 flex justify-center items-end">
          <Drawer.Title className="sr-only">Task Panel</Drawer.Title>
          <div className="flex flex-col items-center w-full h-full">
            <motion.div
              className="pb-2 pointer-events-none "
              animate={{
                rotate: isOpen ? 180 : 0,
                y: isOpen ? -4 : 0,
                opacity: isOpen ? 0.9 : 0.15,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="
                  size-10
                  text-white
                  drop-shadow-[0_0_16px_rgba(34,211,238,0.45)]
                "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </motion.div>

            <div
              data-vaul-no-drag
              className="flex flex-col items-center w-full h-full"
            >
              <TaskPanel />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
