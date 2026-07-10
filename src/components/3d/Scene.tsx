import { Environment, Sparkles, ContactShadows, SoftShadows } from '@react-three/drei';
import { Turntable } from './Turntable';
import { Camera } from './Camera';
// import { Hologram } from './Hologram';
import { StitchEnvironment } from './StitchEnvironment';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
export function Scene() {
  return (
    <>
      <StitchEnvironment />

      <SoftShadows size={20} samples={10} focus={0.5} />

      {/* Global Environment */}
      <Environment preset="studio" environmentIntensity={0.2} />

      {/* Floating Dust Particles around the turntable */}
      <Sparkles count={100} scale={10} position={[0, 2, 0]} size={2} speed={0.2} opacity={0.1} color="#FFF" />

      {/* Primary Warm Spotlight over Turntable */}
      <spotLight
        position={[2, 10, 2]}
        angle={0.6}
        penumbra={1}
        intensity={3}
        castShadow
        color="#FDE8D8"
      />

      {/* Cool Rim Light */}
      <pointLight position={[-4, 2, -4]} intensity={2} color="#A8C8E6" distance={15} />

      {/* Infinite Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050505" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Scene Elements */}
      <Turntable />
      {/* <Hologram /> */}
      <Camera />

      {/* Local Shadows for Turntable */}
      <ContactShadows position={[0, -1.79, 0]} opacity={0.8} scale={15} blur={2.5} far={4} color="#000" />
      
      {/* Cinematic Post-Processing */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}
