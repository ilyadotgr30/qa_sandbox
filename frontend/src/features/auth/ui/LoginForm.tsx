import { useState, type FormEvent } from 'react';
import { Lock } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import type { LoginCredentials } from '@/entities/auth';
import type { LoginFormProps } from '@/features/auth/model';

export function LoginForm({ onLogin, isPending }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isSuccess = await onLogin(credentials);
    if (isSuccess) {
      setCredentials({ email: '', password: '' });
    }
  };

  return (
    <section className="max-w-lg mx-auto p-10 border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-cyber-blue/10 via-transparent to-cyber-pink/10 pointer-events-none" />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
          <Lock size={18} className="text-cyber-blue" />
          Sign in
        </h2>
        <span className="text-[11px] font-mono text-white/60 uppercase tracking-[0.3em]">Secure sign-in</span>
      </div>
      <div className="mb-6 p-4 rounded-lg border border-cyber-blue/30 bg-cyber-blue/10 text-sm text-white/80">
        <p className="font-semibold text-cyber-blue mb-2">Как начать работу в этой песочнице</p>
        <ol className="list-decimal list-inside space-y-1 text-white/75">
          <li>Откройте документацию API: <a className="text-cyber-blue underline" href="/api/docs" target="_blank" rel="noreferrer">/api/docs</a>.</li>
          <li>Создайте пользователя через <span className="font-mono">POST /auth/register</span>.</li>
          <li>Войдите ниже тем же email и паролем.</li>
          <li>После входа можно создавать и редактировать товары.</li>
        </ol>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-white/50 font-mono">Email</label>
          <Input
            type="email"
            placeholder="you@gridmail.io"
            value={credentials.email}
            onChange={(event) => setCredentials((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-white/50 font-mono">Password</label>
          <Input
            type="password"
            placeholder="••••••••••"
            value={credentials.password}
            onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
            required
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          tone="light"
          size="lg"
          disabled={isPending}
          className="font-black uppercase tracking-[0.25em]"
        >
          {isPending ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </section>
  );
}
