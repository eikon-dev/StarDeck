'use client';

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/shared/ui/components/glass/collapsible';
import { Check, ChevronDown, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

const TITLE = { size: 16, weight: 600, tracking: '-0.015em' } as const;
const DESC_SIZE = 15;
const TEXT = '#E5E8ED';
const TEXT_DIM = '#B3B7C6';
const RAISED = '#25282D';
const RADIUS = 24;
const EDGE =
  'inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.35)';
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")";
const GRAIN_OPACITY = 0.2;

const BOX = { size: 28, radius: 10, check: 18, stroke: 2 };

const CATEGORY = {
  TODAY: { hue: 152, plateL: 0.42, plateC: 0.1, accentC: 0.167, ringC: 0.126 },
  DISCIPLINE: {
    hue: 255,
    plateL: 0.44,
    plateC: 0.105,
    accentC: 0.13,
    ringC: 0.129,
  },
  LONG_TERM: {
    hue: 4,
    plateL: 0.425,
    plateC: 0.101,
    accentC: 0.164,
    ringC: 0.157,
  },
  QUEUE: {
    hue: 305,
    plateL: 0.43,
    plateC: 0.125,
    accentC: 0.161,
    ringC: 0.134,
  },
} as const;

export type TaskCategory = keyof typeof CATEGORY;

type CategoryTone = (typeof CATEGORY)[TaskCategory];
const plate = (c: CategoryTone) => `oklch(${c.plateL} ${c.plateC} ${c.hue})`;

const ACCENT_L = 0.72;
const RING_SPREAD = 25; // влево по оттенку
const RING_PLUS = 20; // вправо
const accent = (c: CategoryTone) => `oklch(${ACCENT_L} ${c.accentC} ${c.hue})`;

const ringGradient = (c: CategoryTone) => {
  const stop = (h: number) =>
    `oklch(${ACCENT_L} ${c.ringC} ${((h % 360) + 360) % 360})`;
  const lo = c.hue - RING_SPREAD;
  const hi = c.hue + RING_PLUS;
  return `linear-gradient(105deg, ${stop(lo)} 0%, ${stop(c.hue)} 22%, ${stop(hi)} 44%, ${stop(c.hue)} 66%, ${stop(lo)} 100%)`;
};

const PRISM =
  'linear-gradient(100deg,' +
  ' oklch(0.72 0.13 265 / 0) 26%,' +
  ' oklch(0.72 0.13 265 / 0.08) 36%,' +
  ' oklch(0.78 0.13 230 / 0.28) 43%,' +
  ' oklch(0.86 0.14 195 / 0.62) 47%,' +
  ' oklch(0.95 0.15 150 / 0.95) 50%,' +
  ' oklch(0.88 0.15 95 / 0.62) 53%,' +
  ' oklch(0.80 0.16 30 / 0.28) 57%,' +
  ' oklch(0.76 0.16 350 / 0.08) 64%,' +
  ' oklch(0.76 0.16 350 / 0) 74%)';
const PRISM_START = '120% 50%';
const PRISM_REST = '40% 50%';

export interface TaskCardProps {
  title: string;
  description?: string | null;
  category: TaskCategory;
  done: boolean;
  onToggle: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  celebrating?: boolean;
  index?: number;
}

export default function TaskCard({
  title,
  description,
  category,
  done,
  onToggle,
  onEdit,
  onDelete,
  celebrating = false,
  index = 0,
}: TaskCardProps) {
  const [open, setOpen] = useState(false);
  const tone = CATEGORY[category];

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div
        className="relative isolate overflow-hidden font-manrope"
        style={{
          borderRadius: RADIUS,
          backgroundColor: plate(tone),
          boxShadow: EDGE,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            borderRadius: RADIUS,
            backgroundImage: GRAIN,
            backgroundSize: '120px 120px',
            opacity: GRAIN_OPACITY,
            mixBlendMode: 'overlay',
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            borderRadius: RADIUS,
            background: PRISM,
            backgroundSize: '260% 100%',
            backgroundPosition: celebrating ? PRISM_REST : PRISM_START,
            opacity: celebrating ? 0.45 : 0,
            mixBlendMode: 'screen',
            transition:
              'background-position 1200ms cubic-bezier(0.16,1,0.3,1), opacity 400ms ease-out',
            transitionDelay: `${index * 90}ms`,
          }}
        />
        {/* Грань */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            borderRadius: RADIUS,
            padding: 2,
            boxSizing: 'border-box',
            opacity: done ? 1 : 0,
            background: ringGradient(tone),
            backgroundSize: '200% 100%',
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            maskComposite: 'exclude',
          }}
        />

        {/* Шапка */}
        <div className="flex items-center gap-1 px-2">
          <button
            type="button"
            role="checkbox"
            aria-checked={done}
            aria-label={done ? 'Снять отметку' : 'Отметить выполненной'}
            onClick={onToggle}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl outline-none active:scale-90 focus-visible:ring-2"
            style={{ ['--tw-ring-color' as string]: accent(tone) }}
          >
            <span
              className="grid place-items-center transition-transform duration-100 focus-visible:ring-2"
              style={
                done
                  ? {
                      width: BOX.size,
                      height: BOX.size,
                      borderRadius: BOX.radius,
                      backgroundColor: accent(tone),
                    }
                  : {
                      width: BOX.size,
                      height: BOX.size,
                      borderRadius: BOX.radius,
                      border: `${BOX.stroke}px solid ${TEXT}47`,
                    }
              }
            >
              {done && (
                <Check size={BOX.check} strokeWidth={3} color="#1C1E23" />
              )}
            </span>
          </button>

          <h3
            className="min-w-0 flex-1 truncate py-2 transition-colors duration-200"
            style={{
              color: done ? TEXT_DIM : TEXT,
              fontSize: TITLE.size,
              fontWeight: TITLE.weight,
              letterSpacing: TITLE.tracking,
            }}
          >
            {title}
          </h3>

          <CollapsibleTrigger
            aria-label={open ? 'Свернуть' : 'Развернуть'}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl outline-none focus-visible:ring-2"
            style={{ ['--tw-ring-color' as string]: accent(tone) }}
          >
            <ChevronDown
              size={18}
              className="transition-transform duration-200"
              style={{
                color: TEXT_DIM,
                transform: open ? 'rotate(180deg)' : 'none',
              }}
            />
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="sd-collapsible">
          <div className="pl-14 pr-4 pb-3 pt-1">
            {description ? (
              <p
                className="mb-4 leading-normal"
                style={{ color: TEXT_DIM, fontSize: DESC_SIZE }}
              >
                {description}
              </p>
            ) : null}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onEdit}
                className="flex h-9 items-center gap-2 rounded-xl px-3 text-[13px]"
                style={{ color: TEXT_DIM, backgroundColor: RAISED }}
              >
                <Pencil size={14} />
                Изменить
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="flex h-9 items-center gap-2 rounded-xl px-3 text-[13px]"
                style={{ color: TEXT_DIM, backgroundColor: RAISED }}
              >
                <Trash2 size={14} />
                Удалить
              </button>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
