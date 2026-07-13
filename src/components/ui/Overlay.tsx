import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Code, Briefcase, Hand } from 'lucide-react';

function playStartupSound() {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = 'sawtooth';
  osc2.type = 'square';

  filter.type = 'lowpass';
  filter.frequency.value = 100;

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;

  // Sci-fi power-up sweep
  osc1.frequency.setValueAtTime(50, now);
  osc1.frequency.exponentialRampToValueAtTime(300, now + 1.5);

  osc2.frequency.setValueAtTime(55, now);
  osc2.frequency.exponentialRampToValueAtTime(450, now + 1.5);

  filter.frequency.setValueAtTime(100, now);
  filter.frequency.exponentialRampToValueAtTime(5000, now + 1.0);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 2.5);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 3);
  osc2.stop(now + 3);
}

interface OverlayProps {
  gestureMode?: boolean;
  setGestureMode?: (mode: boolean) => void;
}

export function Overlay({ gestureMode = false, setGestureMode }: OverlayProps) {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
    playStartupSound();
  };

  return (
    <>
      {/* Intro Gate */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <button
              onClick={handleEnter}
              className="text-white font-syne text-xl uppercase tracking-[0.3em] hover:text-cyan-400 transition-colors duration-500 animate-pulse cursor-pointer border border-white/20 px-8 py-4 rounded hover:border-cyan-400/50 hover:bg-cyan-400/10"
            >
              Enter Experience
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Overlay UI */}
      {entered && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between p-8 md:p-12 z-40">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex justify-between items-start pointer-events-auto w-full max-w-7xl mx-auto"
          >
            <div>
              <h1 className="text-white font-syne text-xl tracking-wide font-bold">{PORTFOLIO_DATA.hero.name}</h1>
              <p className="text-aluminum-dim font-inter text-xs tracking-widest uppercase mt-1">Industrial Designer / Dev</p>
            </div>
            <div className="flex gap-4 items-center">
              {setGestureMode && (
                <button
                  onClick={() => setGestureMode(!gestureMode)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
                    gestureMode 
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                      : 'bg-white/5 border-white/10 text-aluminum hover:text-white hover:bg-white/10'
                  }`}
                  title="Toggle Neural Link (Webcam Gestures)"
                >
                  <Hand size={14} className={gestureMode ? 'animate-pulse' : ''} />
                  <span className="hidden sm:inline">GESTURE MODE</span>
                </button>
              )}
              <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noreferrer" className="text-aluminum-dim hover:text-white transition-colors" title="GitHub">
                <Code size={18} />
              </a>
              <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noreferrer" className="text-aluminum-dim hover:text-white transition-colors" title="LinkedIn">
                <Briefcase size={18} />
              </a>
            </div>
          </motion.header>

          {/* Footer / Hint */}
          <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="flex justify-between items-end pointer-events-auto w-full max-w-7xl mx-auto"
          >
            <div className="text-aluminum-dim font-inter text-sm max-w-sm">
              {PORTFOLIO_DATA.hero.summary}
            </div>
            <div className="text-walnut font-mono text-xs tracking-widest uppercase animate-pulse">
              {gestureMode ? 'Pinch & drag to explore' : 'Scroll to explore'}
            </div>
          </motion.footer>
        </div>
      )}
    </>
  );
}
