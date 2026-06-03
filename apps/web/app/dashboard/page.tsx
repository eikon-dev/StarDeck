import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import DashboardScene from '@/widgets/dashboard-scene/ui/dashboard-scene';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login');
  }

  const res = await fetch(
    `${process.env.API_URL || 'http://localhost:3001'}/auth/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token.value}`,
      },
    },
  );

  return <DashboardScene />;
}
