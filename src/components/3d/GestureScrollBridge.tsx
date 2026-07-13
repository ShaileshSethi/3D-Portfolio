import { useEffect } from 'react';
import { useScroll } from '@react-three/drei';

export function GestureScrollBridge() {
  const scroll = useScroll();

  useEffect(() => {
    const handleGestureScroll = (e: CustomEvent<{ delta: number }>) => {
      if (scroll.el) {
        // scroll.el is the HTML element created by ScrollControls
        scroll.el.scrollTop += e.detail.delta;
      }
    };
    
    window.addEventListener('gesture-scroll', handleGestureScroll as EventListener);
    
    return () => {
      window.removeEventListener('gesture-scroll', handleGestureScroll as EventListener);
    };
  }, [scroll]);

  return null;
}
