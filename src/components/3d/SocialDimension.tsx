import { Float, Text, Edges, Sparkles } from '@react-three/drei';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';

export function SocialDimension() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  
  // Rotating the entire dimension and rings
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.5;
      ring1Ref.current.rotation.y += 0.01;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.cos(t * 0.4) * 0.5;
      ring2Ref.current.rotation.y -= 0.015;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = Math.sin(t * 0.3) * 0.5;
      ring3Ref.current.rotation.x += 0.01;
    }
  });

  const Card = ({ position, rotation, url, label, color }: any) => {
    const [hovered, setHovered] = useState(false);
    const scale = hovered ? 1.1 : 1;
    
    // Create an HDR color for glowing
    const hdrColor = useMemo(() => new THREE.Color(color).multiplyScalar(hovered ? 3 : 1), [color, hovered]);
    
    return (
      <Float floatIntensity={hovered ? 1 : 3} rotationIntensity={0.5} speed={hovered ? 4 : 2}>
        <group 
          position={position} 
          rotation={rotation}
          scale={[scale, scale, scale]}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
          onClick={() => window.open(url, '_blank')}
        >
          {/* Main Card Body */}
          <mesh>
            <boxGeometry args={[4.5, 6, 0.2]} />
            <meshPhysicalMaterial 
              color={hovered ? color : "#050505"} 
              transparent 
              opacity={hovered ? 0.9 : 0.7}
              roughness={0.1}
              metalness={0.9}
              transmission={0.5}
              thickness={0.5}
            />
            {/* Glowing Edges */}
            <Edges scale={1.02} threshold={15}>
              <lineBasicMaterial color={hdrColor} toneMapped={false} />
            </Edges>
          </mesh>

          {/* Text inside the card */}
          <Text
            position={[0, 0, 0.15]}
            fontSize={0.7}
            color={hovered ? "#ffffff" : color}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            {label}
            <meshBasicMaterial color={hdrColor} toneMapped={false} />
          </Text>
        </group>
      </Float>
    );
  };

  return (
    <group ref={groupRef} position={[0, 50, 0]}>
      {/* Dynamic Sparkles around the portal */}
      <Sparkles count={200} scale={15} size={3} speed={0.4} opacity={0.5} color="#00ffff" />

      {/* Central energy core / portal */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} toneMapped={false} />
      </mesh>
      
      {/* Central glowing core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color={new THREE.Color("#00ffff").multiplyScalar(2)} transparent opacity={0.8} toneMapped={false} />
      </mesh>

      {/* Orbiting Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[4.5, 0.05, 16, 100]} />
        <meshBasicMaterial color={new THREE.Color("#ff00ff").multiplyScalar(1.5)} toneMapped={false} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[5.5, 0.02, 16, 100]} />
        <meshBasicMaterial color={new THREE.Color("#00ffff").multiplyScalar(2)} toneMapped={false} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[6.5, 0.02, 16, 100]} />
        <meshBasicMaterial color={new THREE.Color("#ffffff").multiplyScalar(1)} toneMapped={false} />
      </mesh>

      {/* GitHub */}
      <Card
        position={[-10, 0, 2]}
        rotation={[0, 0.4, 0]}
        url={PORTFOLIO_DATA.contact.github}
        label="GITHUB"
        color="#ffffff"
      />

      {/* LinkedIn */}
      <Card
        position={[0, 0, -8]}
        rotation={[0, 0, 0]}
        url={PORTFOLIO_DATA.contact.linkedin}
        label="LINKEDIN"
        color="#00ffff"
      />

      {/* Instagram */}
      <Card
        position={[10, 0, 2]}
        rotation={[0, -0.4, 0]}
        url={PORTFOLIO_DATA.contact.instagram}
        label="INSTAGRAM"
        color="#ff00ff"
      />
    </group>
  );
}
