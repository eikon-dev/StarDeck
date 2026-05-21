import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import DrawerTaskPanel from '@/widgets/task-panel/ui/drawer-task-panel';
import Synthesis from '@/components/synthesis';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login');
  }

  const res = await fetch('http://localhost:3001/api/auth/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token.value}`,
    },
  });

  return (
    <div className="sm:px-4 sm:pt-4 pb-0 w-full min-h-[100svh] flex justify-center items-end">
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
    </div>
  );
}
