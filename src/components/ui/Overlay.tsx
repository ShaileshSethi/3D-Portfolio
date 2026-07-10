import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Code, Briefcase } from 'lucide-react';

export function Overlay() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between p-8 md:p-12">
      {/* Header */}
      <header className="flex justify-between items-start pointer-events-auto w-full max-w-7xl mx-auto">
        <div>
          <h1 className="text-white font-syne text-xl tracking-wide font-bold">{PORTFOLIO_DATA.hero.name}</h1>
          <p className="text-aluminum-dim font-inter text-xs tracking-widest uppercase mt-1">Industrial Designer / Dev</p>
        </div>
        <div className="flex gap-4">
          <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noreferrer" className="text-aluminum-dim hover:text-white transition-colors" title="GitHub">
            <Code size={18} />
          </a>
          <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noreferrer" className="text-aluminum-dim hover:text-white transition-colors" title="LinkedIn">
            <Briefcase size={18} />
          </a>
        </div>
      </header>

      {/* Footer / Hint */}
      <footer className="flex justify-between items-end pointer-events-auto w-full max-w-7xl mx-auto">
        <div className="text-aluminum-dim font-inter text-sm max-w-sm">
          {PORTFOLIO_DATA.hero.summary}
        </div>
        <div className="text-walnut font-mono text-xs tracking-widest uppercase animate-pulse">
          Scroll to explore
        </div>
      </footer>
    </div>
  );
}
