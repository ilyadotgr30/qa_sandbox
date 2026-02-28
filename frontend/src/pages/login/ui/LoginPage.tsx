import { LoginForm } from '@/features/auth';
import type { LoginPageProps } from '@/pages/login/model';

export default function LoginPage({ onLogin, isPending }: LoginPageProps) {
  return <LoginForm onLogin={onLogin} isPending={isPending} />;
}
