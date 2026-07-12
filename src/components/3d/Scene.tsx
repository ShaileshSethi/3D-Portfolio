import { Environment, Sparkles } from '@react-three/drei';
import { Turntable } from './Turntable';
import { Camera } from './Camera';
import { StitchEnvironment } from './StitchEnvironment';
import { Bot } from './Bot';
import { SocialDimension } from './SocialDimension';

export function Scene() {
  return (
    <>
      <StitchEnvironment />

      {/* Global Environment */}
      <Environment preset="studio" environmentIntensity={0.2} />

      {/* Floating Dust Particles around the turntable */}
      <Sparkles count={50} scale={10} position={[0, 2, 0]} size={2} speed={0.2} opacity={0.1} color="#FFF" />

      {/* Scene Elements */}
      <Turntable />
      <Bot position={[3, 0.5, -2]} rotation={[0, -0.5, 0]} scale={[0.6, 0.6, 0.6]} />
      <Camera />
      
      {/* The New Dimension */}
      <SocialDimension />
    </>
  );
}
