import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function StitchEnvironment() {
  const pointsRef = useRef<THREE.Points>(null);

  // Floating particles matching code.html
  const particlesGeo = useMemo(() => {
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    return posArray;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      {/* Lights from code.html */}
      <ambientLight color="#ffffff" intensity={0.3} />
      <directionalLight color="#8888ff" intensity={1.5} position={[5, 5, 5]} />
      <pointLight color="#ff00ff" intensity={1} position={[-3, 2, 2]} distance={10} />

      {/* Floating Particles from code.html */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200}
            args={[particlesGeo, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#8888ff" transparent opacity={0.8} />
      </points>
    </>
  );
}
