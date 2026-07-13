import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import * as THREE from 'three';
import { Scene } from './components/3d/Scene';
import { Overlay } from './components/ui/Overlay';
import { HtmlProjects } from './components/ui/HtmlProjects';
import { PORTFOLIO_DATA } from './data/portfolio';
import { GestureController } from './components/gesture/GestureController';
import { GestureIndicator } from './components/gesture/GestureIndicator';
import { GestureScrollBridge } from './components/3d/GestureScrollBridge';

function App() {
  const [gestureMode, setGestureMode] = useState(false);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* Hand Tracking Engine */}
      {gestureMode && <GestureController />}
      
      {/* Hand Tracking UI Indicator */}
      <GestureIndicator />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 4, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={PORTFOLIO_DATA.projects.length + 2} damping={0.1}>
            <GestureScrollBridge />
            <Scene />
            <HtmlProjects />
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* HTML Overlay wrapped in Scroll */}
      <Overlay gestureMode={gestureMode} setGestureMode={setGestureMode} />
    </div>
  );
}

export default App;
