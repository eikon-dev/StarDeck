'use client';

import Synthesis from '@/shared/ui/synthesis';
import DrawerTaskPanel from '@/widgets/task-panel/ui/drawer-task-panel';
import { motion } from 'framer-motion';

export default function DashboardScene() {
  return (
    <motion.div
      className="sm:px-4 sm:pt-4 pb-0 w-full min-h-[100svh] flex justify-center items-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Synthesis
        speed={0.2}
        color1="#0a0e1a"
        color2="#2d1b4e"
        color3="#280bbc"
        scale={1.2}
        complexity={10}
        distortion={0.6}
        glowIntensity={0.5}
        flowFrequency={6.5}
        contrast={1.2}
      />
      <DrawerTaskPanel />
    </motion.div>
  );
}
