'use client';

import { LoginForm } from '@/shared/ui/login-form';
import { LightSpeed } from '@/shared/ui/light-speed';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';

export default function LoginScene() {
  const [phase, setPhase] = useState<'idle' | 'warping' | 'arriving' | 'done'>(
    'idle',
  );

  const [speed, setSpeed] = useState(0.5);
  const [intensity, setIntensity] = useState(3);

  const speedMV = useMotionValue(0.5);
  const intensityMV = useMotionValue(3);

  useEffect(() => {
    const unsubSpeed = speedMV.on('change', setSpeed);
    const unsubIntensity = intensityMV.on('change', setIntensity);
    return () => {
      unsubSpeed();
      unsubIntensity();
    };
  }, []);

  useEffect(() => {
    if (phase === 'warping') {
      animate(speedMV, 4, { duration: 1.2 });
      animate(intensityMV, 5, { duration: 1.2 });
    } else if (phase === 'arriving') {
      animate(speedMV, 0, { duration: 1.5 });
      animate(intensityMV, 1, { duration: 1.5 });
    } else if (phase === 'idle') {
      animate(speedMV, 0.5, { duration: 0.5 });
      animate(intensityMV, 3, { duration: 0.5 });
    }
  }, [phase]);

  const router = useRouter();

  const handleLogin = () => {
    setPhase('warping');

    window.Telegram.Login.auth(
      { bot_id: process.env.NEXT_PUBLIC_BOT_ID, request_access: true },
      async (user) => {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...user }),
        });
        if (res.ok) {
          setPhase('arriving');
          // через секунду редиректим
          setTimeout(() => router.replace('/dashboard'), 1500);
        } else {
          setPhase('idle'); // ошибка — возвращаем, как было
        }
      },
    );
  };

  return (
    <div className="relative min-h-svh">
      <div className="absolute inset-0">
        <LightSpeed speed={speed} intensity={intensity} particleCount={800} />
      </div>
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'arriving' || phase === 'done' ? 1 : 0 }}
        transition={{ duration: 1 }}
      />
      <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase === 'idle' ? 1 : 0,
          }}
          transition={{ duration: 0.2, delay: phase === 'idle' ? 0.25 : 0 }}
        >
          <LoginForm onLogin={handleLogin} />
        </motion.div>
      </div>
    </div>
  );
}
