import { Environment, Sparkles, ContactShadows } from '@react-three/drei';
import { Turntable } from './Turntable';
import { Camera } from './Camera';
// import { Hologram } from './Hologram';
import { StitchEnvironment } from './StitchEnvironment';
import { Bot } from './Bot';

export function Scene() {
  return (
    <>
      <StitchEnvironment />

      {/* Global Environment */}
      <Environment preset="studio" environmentIntensity={0.2} />

      {/* Floating Dust Particles around the turntable */}
      <Sparkles count={100} scale={10} position={[0, 2, 0]} size={2} speed={0.2} opacity={0.1} color="#FFF" />

      {/* Scene Elements */}
      <Turntable />
      <Bot position={[3, 0.5, -2]} rotation={[0, -0.5, 0]} scale={[0.6, 0.6, 0.6]} />
      {/* <Hologram /> */}
      <Camera />

      {/* Local Shadows for Turntable */}
      <ContactShadows position={[0, -1.79, 0]} opacity={0.8} scale={15} blur={2.5} far={4} color="#000" />
    </>
  );
}
