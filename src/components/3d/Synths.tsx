import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../../data/portfolio';

const aluminum = new THREE.MeshStandardMaterial({ color: '#B5B5B5', roughness: 0.3, metalness: 0.7 });
const matteBlack = new THREE.MeshStandardMaterial({ color: '#151515', roughness: 0.8, metalness: 0.2 });

export function Synths() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const skills = PORTFOLIO_DATA.skills.flatMap(s => s.items).slice(0, 8); // Take top 8 skills

  useFrame(() => {
    if (groupRef.current) {
      // Bring synths up at the end of the scroll
      const targetY = scroll.offset > 0.7 ? -1.8 : -5;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[3, -5, -1]}>
      {/* Synth Base */}
      <mesh position={[0, 0, 0]} material={matteBlack} castShadow receiveShadow>
        <boxGeometry args={[4, 0.4, 2]} />
      </mesh>
      
      {/* Knobs */}
      {skills.map((skill, i) => {
        const x = (i % 4) * 0.8 - 1.2;
        const z = Math.floor(i / 4) * 0.8 - 0.4;
        return (
          <group key={skill} position={[x, 0.2, z]}>
            <mesh material={aluminum} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.2, 32]} />
            </mesh>
            <mesh position={[0, 0.11, 0.1]} material={matteBlack}>
              <boxGeometry args={[0.05, 0.05, 0.15]} />
            </mesh>
            <Text
              position={[0, 0.15, -0.35]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.08}
              color="#a0a0a0"
              anchorX="center"
              anchorY="middle"
            >
              {skill}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
