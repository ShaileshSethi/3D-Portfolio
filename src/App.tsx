import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import * as THREE from 'three';
import { Scene } from './components/3d/Scene';
import { Overlay } from './components/ui/Overlay';
import { HtmlProjects } from './components/ui/HtmlProjects';
import { PORTFOLIO_DATA } from './data/portfolio';

function App() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 4, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={PORTFOLIO_DATA.projects.length + 1} damping={0.1}>
            <Scene />
            <HtmlProjects />
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* HTML Overlay wrapped in Scroll */}
      <Overlay />
    </div>
  );
}

export default App;
