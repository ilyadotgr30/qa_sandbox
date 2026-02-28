import { Lock, LogOut, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import type { AppHeaderProps } from '@/widgets/app-header/model';

export function AppHeader({ isLoggedIn, onLogout }: AppHeaderProps) {
  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
          Online store
        </p>
        <div className="flex items-baseline gap-3 mt-2">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            URBAN<span className="text-cyber-blue font-black">MARKET</span>
          </h1>
          <span className="text-cyber-pink font-mono text-xs border border-cyber-pink/60 px-2 py-1 uppercase tracking-[0.2em] rounded-sm bg-cyber-dark/60">
            v1.5
          </span>
        </div>
        <p className="text-sm text-white/70 mt-3 max-w-2xl">
          A curated mix of gadgets and accessories with fast delivery and trusted suppliers.
        </p>
        <a
          href="/api/docs"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-xs font-mono text-cyber-blue hover:text-white border border-cyber-blue/40 hover:border-cyber-blue px-3 py-2 rounded-md bg-white/5 hover:bg-cyber-blue/20 transition-all"
        >
          Swagger API docs -&gt; /api/docs
        </a>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <span className="px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-xs font-mono flex items-center gap-2">
            <Zap size={14} className="text-cyber-blue" /> Online
          </span>
          <span className="px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-xs font-mono flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" /> Secure connection
          </span>
        </div>
        {isLoggedIn ? (
          <Button onClick={onLogout} variant="outline" tone="light" size="sm" className="flex items-center gap-2">
            <LogOut size={14} /> Log out
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-cyber-blue/80 font-mono text-xs">
            <Lock size={14} /> Authorized users only
          </div>
        )}
      </div>
    </header>
  );
}
