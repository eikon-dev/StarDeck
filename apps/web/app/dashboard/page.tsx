import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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

  return <div className="items-center justify-center">Dashboard</div>;
}
