import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GestureState {
  active: boolean;
  pinched: boolean;
  x: number; // 0 to 1
  y: number; // 0 to 1
}

export function GestureIndicator() {
  const [state, setState] = useState<GestureState>({ active: false, pinched: false, x: 0.5, y: 0.5 });
  const [windowSize, setWindowSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);

    const handleGestureState = (e: CustomEvent<GestureState>) => {
      setState(e.detail);
    };
    window.addEventListener('gesture-state', handleGestureState as EventListener);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('gesture-state', handleGestureState as EventListener);
    };
  }, []);

  if (!state.active) return null;

  // Mirror x coordinate because webcam acts like a mirror
  const posX = (1 - state.x) * windowSize.w;
  const posY = state.y * windowSize.h;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-[9999] pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: posX, 
          y: posY,
        }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 800,
          damping: 30,
          opacity: { duration: 0.2 }
        }}
        style={{
          // Center the indicator on the coordinates
          marginLeft: -16,
          marginTop: -16,
        }}
      >
        {/* Outer Ring */}
        <motion.div
          className={`absolute rounded-full border-2 ${state.pinched ? 'border-green-400' : 'border-cyan-400/50'}`}
          animate={{
            width: state.pinched ? 24 : 48,
            height: state.pinched ? 24 : 48,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        
        {/* Inner Dot */}
        <motion.div
          className={`absolute rounded-full ${state.pinched ? 'bg-green-400' : 'bg-white'}`}
          animate={{
            width: state.pinched ? 12 : 8,
            height: state.pinched ? 12 : 8,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
