import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

export function Bot(props: any) {
  const botRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const thrustGlowRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const glowMatRef = useRef<THREE.MeshPhongMaterial>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 2; 
    
    if (botRef.current) {
      botRef.current.position.y = Math.sin(time) * 0.2;
    }
    if (headRef.current) {
      const mouseX = state.pointer.x * 0.5;
      const mouseY = -state.pointer.y * 0.5;
      headRef.current.rotation.y += (mouseX * 1.5 - headRef.current.rotation.y) * 0.1;
      headRef.current.rotation.x += (mouseY * 1.5 - headRef.current.rotation.x) * 0.1;
    }
    if (thrustGlowRef.current) {
      const scale = 1 + Math.sin(time * 5) * 0.2;
      thrustGlowRef.current.scale.setScalar(scale);
    }
    if (glowMatRef.current) {
      glowMatRef.current.emissiveIntensity = 1 + Math.sin(time * 5) * 0.5;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 0.5) * 0.1 + 0.2;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.sin(time * 0.5) * 0.1 - 0.2;
    }
  });

  return (
    <group {...props}>
      {/* Welcome Message */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
        <Html transform center position={[0, 2.8, 0]}>
          <div 
            className="font-syne text-5xl font-bold whitespace-nowrap text-[#00ffff]"
            style={{ textShadow: '0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 80px #00ffff' }}
          >
            Welcome to my portfolio!
          </div>
        </Html>
      </Float>

      {/* Bot group */}
      <group ref={botRef}>
        {/* Body */}
        <mesh>
          <cylinderGeometry args={[0.8, 1, 1.5, 6]} />
          <meshPhongMaterial color={0xcccccc} shininess={100} specular={0x444444} />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 1.3, 0]}>
          <mesh>
            <boxGeometry args={[1.2, 0.8, 1]} />
            <meshPhongMaterial color={0xcccccc} shininess={100} specular={0x444444} />
            {/* Visor */}
            <mesh position={[0, 0, 0.5]}>
              <boxGeometry args={[1.22, 0.3, 0.1]} />
              <meshPhongMaterial color={0x222222} shininess={80} />
            </mesh>
            {/* Eye */}
            <mesh position={[0, 0, 0.51]}>
              <boxGeometry args={[0.8, 0.05, 0.11]} />
              <meshPhongMaterial color={0x00ffff} emissive={0x00ffff} emissiveIntensity={1} />
            </mesh>
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-1.2, 0.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshPhongMaterial color={0x222222} shininess={80} />
          </mesh>
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
            <meshPhongMaterial color={0xcccccc} shininess={100} specular={0x444444} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[1.2, 0.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshPhongMaterial color={0x222222} shininess={80} />
          </mesh>
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
            <meshPhongMaterial color={0xcccccc} shininess={100} specular={0x444444} />
          </mesh>
        </group>

        {/* Thruster Base */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.5, 0.2, 0.4, 16]} />
          <meshPhongMaterial color={0x222222} shininess={80} />
        </mesh>

        {/* Thruster Glow */}
        <mesh ref={thrustGlowRef} position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.3, 0.1, 0.1, 16]} />
          <meshPhongMaterial ref={glowMatRef} color={0x00ffff} emissive={0x00ffff} emissiveIntensity={1} />
        </mesh>

        <pointLight position={[-3, 2, -3]} color={0x00ffff} intensity={0.8} distance={10} />
      </group>
    </group>
  );
}
