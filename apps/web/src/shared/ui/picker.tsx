'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type PickerProps = {
  setActiveItem: (index: number) => void;
  activeItem: number;
  items: string[];
};

export default function Picker({
  setActiveItem,
  activeItem,
  items,
}: PickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [capsule, setCapsule] = useState({ x: 0, width: 0 });

  const [itemSpacing, setItemSpacing] = useState(250);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      setItemSpacing(Math.min(container.clientWidth / 1.8, 280));
    };

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const el = itemRefs.current[activeItem];
    if (el) {
      setCapsule({ x: 0, width: el.offsetWidth });
    }
  }, [activeItem]);

  return (
    <div className="flex items-center">
      {/* левая стрелка */}
      <div className="hidden sm:block pl-6">
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
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      <div className="rounded-4xl flex-1" style={{ position: 'relative' }}>
        {/* центр */}
        <motion.div
          className="
          font-medium
          font-manrope
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          h-12
          rounded-full
          bg-white/10
          border
          border-[rgba(100,180,255,0.4)]
          shadow-[0_0_6px_rgba(100,180,255,0.4)]
          "
          animate={{ width: capsule.width }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* лента */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            maskImage:
              'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          }}
          className="h-16"
        >
          {items.map((item, index) => (
            <div
              key={item}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => setActiveItem(index)}
              className="whitespace-nowrap transition-all duration-200 px-6 py-2 text-center text-white text-xl select-none"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${(index - activeItem) * itemSpacing}px), -50%)`,
                opacity: Math.abs(index - activeItem) > 1 ? 0 : 1,
                scale: index === activeItem ? 1 : 0.9,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* правая стрелка */}
      <div className="hidden sm:block pr-6">
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
}
