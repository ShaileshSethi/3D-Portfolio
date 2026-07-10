import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../../data/portfolio';

// Materials matching Technics SL-1200G reference
const walnut = new THREE.MeshStandardMaterial({ color: '#2a1a0f', roughness: 0.8, metalness: 0.1 });
const aluminum = new THREE.MeshStandardMaterial({ color: '#e0e0e0', roughness: 0.2, metalness: 0.8 });
const matteBlack = new THREE.MeshStandardMaterial({ color: '#151515', roughness: 0.8, metalness: 0.2 });
const rubber = new THREE.MeshStandardMaterial({ color: '#050505', roughness: 0.9, metalness: 0 });
const chrome = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.05, metalness: 0.9 });
const redLed = new THREE.MeshStandardMaterial({ color: '#ff2222', emissive: '#ff2222', emissiveIntensity: 2, toneMapped: false });

export function Turntable() {
  const groupRef = useRef<THREE.Group>(null);
  const platterRef = useRef<THREE.Group>(null);
  const tonearmRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const count = PORTFOLIO_DATA.projects.length;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const playSpeed = useRef(0);

  useFrame((state, delta) => {
    // 1. Map scroll 0-1 to record rotation
    if (platterRef.current && tonearmRef.current) {
      if (isPlaying) {
        // Constant spinning when playing
        playSpeed.current = THREE.MathUtils.lerp(playSpeed.current, 1, 0.05);
        platterRef.current.rotation.y -= delta * playSpeed.current * 2;
        
        // Swing tonearm onto the record
        tonearmRef.current.rotation.y = THREE.MathUtils.lerp(tonearmRef.current.rotation.y, 0.1, 0.05);
      } else {
        // Map the scroll exactly to align the project markers.
        playSpeed.current = THREE.MathUtils.lerp(playSpeed.current, 0, 0.05);
        const sectionProgress = Math.max(0, Math.min(1, (scroll.offset - 0.15) / 0.7));
        const targetRotation = -sectionProgress * (count - 1) * ((Math.PI * 2) / count);

        // Add subtle constant needle/record wobble or momentum
        platterRef.current.rotation.y = THREE.MathUtils.lerp(
          platterRef.current.rotation.y,
          targetRotation,
          0.05
        );
        
        // Swing tonearm back to resting position
        tonearmRef.current.rotation.y = THREE.MathUtils.lerp(tonearmRef.current.rotation.y, 0.5, 0.05);
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, -1.8, 0]}
      onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      {/* Rubber Feet */}
      <mesh position={[-3, 0.1, -2]} material={rubber} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
      </mesh>
      <mesh position={[3, 0.1, -2]} material={rubber} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
      </mesh>
      <mesh position={[-3, 0.1, 2]} material={rubber} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
      </mesh>
      <mesh position={[3, 0.1, 2]} material={rubber} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
      </mesh>

      {/* Solid Walnut Base */}
      <mesh position={[0, 0.4, 0]} material={walnut} castShadow receiveShadow>
        <boxGeometry args={[8, 0.4, 6]} />
      </mesh>

      {/* Aluminum Top Plate */}
      <mesh position={[0, 0.65, 0]} material={aluminum} castShadow receiveShadow>
        <boxGeometry args={[7.8, 0.1, 5.8]} />
      </mesh>

      {/* Buttons & Knobs */}
      <mesh position={[-3.2, 0.75, 2.2]} material={chrome} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
      </mesh>
      <mesh position={[-2.7, 0.75, 2.2]} material={chrome} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
      </mesh>
      <mesh position={[-3.2, 0.75, 1.6]} material={redLed}>
        <cylinderGeometry args={[0.03, 0.03, 0.12, 16]} />
      </mesh>

      {/* The Platter and Vinyl */}
      <group ref={platterRef} position={[-0.8, 0.75, 0]}>
        {/* Platter Base */}
        <mesh material={aluminum} castShadow receiveShadow>
          <cylinderGeometry args={[2.4, 2.4, 0.2, 64]} />
        </mesh>

        {/* Rubber Mat */}
        <mesh position={[0, 0.11, 0]} material={matteBlack} receiveShadow>
          <cylinderGeometry args={[2.35, 2.35, 0.02, 64]} />
        </mesh>

        {/* Vinyl Record */}
        <mesh position={[0, 0.13, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.3, 2.3, 0.04, 64]} />
          {/* Use a very dark grey/black with low metalness so it stays black under bright spotlight */}
          <meshStandardMaterial color="#030303" roughness={0.4} metalness={0.1} />

          {/* Detailed Grooves */}
          {Array.from({ length: 15 }).map((_, i) => (
            <mesh key={i} position={[0, 0.021, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.0 + (i * 0.08), 1.02 + (i * 0.08), 64]} />
              <meshBasicMaterial color="#000000" opacity={0.3} transparent />
            </mesh>
          ))}

          {/* Engraved Project Markers */}
          {PORTFOLIO_DATA.projects.map((project, i) => {
            const angle = (i / count) * Math.PI * 2;
            const r = 1.9;
            return (
              <group key={project.id} rotation={[0, angle, 0]}>
                <mesh position={[0, 0.02, r]}>
                  <boxGeometry args={[0.02, 0.01, 0.2]} />
                  <meshStandardMaterial color="#444" />
                </mesh>
                <Text
                  position={[0, 0.03, r - 0.2]}
                  rotation={[-Math.PI / 2, 0, Math.PI]}
                  fontSize={0.06}
                  color="#666"
                  anchorX="center"
                  anchorY="middle"
                >
                  {project.title.toUpperCase()}
                </Text>
              </group>
            );
          })}
        </mesh>

        {/* Center Spindle & Label */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.01, 64]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
        <mesh position={[0, 0.2, 0]} material={chrome}>
          <cylinderGeometry args={[0.03, 0.03, 0.2, 16]} />
        </mesh>
      </group>

      {/* Tonearm Base */}
      <group position={[2.5, 0.8, -1.8]}>
        <mesh material={aluminum} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.2, 32]} />
        </mesh>
        <mesh position={[0, 0.3, 0]} material={chrome} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
        </mesh>
        {/* Tonearm Arm */}
        <group ref={tonearmRef} position={[0, 0.4, 0]} rotation={[0, 0.5, 0]}>
          <mesh position={[-1.6, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={chrome} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 3.2, 16]} />
          </mesh>
          {/* Headshell */}
          <mesh position={[-3.3, -0.05, 0]} material={matteBlack} castShadow>
            <boxGeometry args={[0.3, 0.1, 0.15]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
