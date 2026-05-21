'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const items = ['Дисциплина', 'Дневные', 'Долговременные', 'Очередь'];

export default function Picker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sidePadding, setSidePadding] = useState(0);
  const [capsule, setCapsule] = useState({ x: 0, width: 0 });
  const [scales, setScales] = useState<number[]>(items.map(() => 1));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      setSidePadding(container.clientWidth / 2);
    };

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const el = itemRefs.current[activeItem];
    if (el) {
      setCapsule({ x: el.offsetLeft - sidePadding, width: el.offsetWidth });
    }

    if (!el) return;

    container.scrollTo({
      left: el.offsetLeft + el.offsetWidth / 2 - container.clientWidth / 2,
      behavior: 'smooth',
    });

    // setTimeout(() => {
    //   const el = itemRefs.current[activeItem];
    //   const container = containerRef.current;
    //   if (!el || !container) return;
    //
    //   const elCenter =
    //     el.offsetLeft - container.scrollLeft + el.offsetWidth / 2;
    //   const containerCenter = container.clientWidth / 2;
    //   console.log(
    //     'elCenter:',
    //     elCenter,
    //     'containerCenter:',
    //     containerCenter,
    //     'diff:',
    //     elCenter - containerCenter,
    //   );
    // }, 1000);
  }, [activeItem, sidePadding]);

  let scrollTimeout: any;

  const onScroll = () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      snapToCenter();
    }, 80);

    const newScales = [...scales];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const container = containerRef.current;
      if (!container) return;
      const elCenter =
        el.offsetLeft - container.scrollLeft + el.offsetWidth / 2;
      const containerCenter = container.clientWidth / 2;
      const diff = elCenter - containerCenter;
      newScales[index] = Math.max(0.85, 1 - Math.abs(diff) / 300);
    });

    setScales(newScales);
  };

  const snapToCenter = () => {
    const container = containerRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.clientWidth / 2;

    // let closestEl: HTMLElement | null = null;
    let minDist = Infinity;

    Array.from(container.children).forEach((child) => {
      const el = child as HTMLElement;

      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - elCenter);

      if (dist < minDist) {
        minDist = dist;
        // closestEl = el;
      }
    });

    // if (!closestEl) return;

    // const CAPSULE_WIDTH = 112; // w-28 = 112px

    // const target =
    //   closestEl.offsetLeft -
    //   container.clientWidth / 2 +
    //   closestEl.offsetWidth / 2 +
    //   CAPSULE_WIDTH / 2 -
    //   closestEl.offsetWidth / 2;

    // container.scrollTo({
    //   left: target,
    //   behavior: 'smooth',
    // });
  };

  return (
    <div className="rounded-4xl" style={{ position: 'relative' }}>
      {/* центр */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 rounded-full bg-white/10 border border-white/20"
        animate={{ width: capsule.width }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      {/* лента */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        style={{
          position: 'relative',
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          paddingLeft: sidePadding,
          paddingRight: sidePadding,
          scrollbarWidth: 'none',
        }}
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
              transform: `scale(${scales[index]})`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
