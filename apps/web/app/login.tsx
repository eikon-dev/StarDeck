import { LoginForm } from '@/components/login-form';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (token) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <LoginForm />
    </div>
  );
}
