import { Float, Text, Edges, Sparkles } from '@react-three/drei';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Bot } from './Bot';

export function SocialDimension() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
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
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = Math.sin(t * 0.3) * 0.5;
      ring3Ref.current.rotation.x += 0.01;
    }
  });

  const Card = ({ position, rotation, url, label, color, icon }: any) => {
    const [hovered, setHovered] = useState(false);
    
    // Smooth hover animation using math
    const scale = hovered ? 1.05 : 1;
    
    return (
      <Float floatIntensity={2} rotationIntensity={0.5} speed={2}>
        <group 
          position={position} 
          rotation={rotation}
          scale={[scale, scale, scale]}
          onPointerOver={(e) => { 
            e.stopPropagation();
            document.body.style.cursor = 'pointer'; 
            setHovered(true); 
            window.dispatchEvent(new CustomEvent('bot-action', { detail: { active: true, text: `Connecting to ${label}...` } }));
          }}
          onPointerOut={() => { 
            document.body.style.cursor = 'auto'; 
            setHovered(false); 
            window.dispatchEvent(new CustomEvent('bot-action', { detail: { active: false, text: 'Welcome to my portfolio!' } }));
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(url, '_blank');
          }}
        >
          {/* Main Card Body (Wide button shape) */}
          <mesh>
            <boxGeometry args={[6, 1.8, 0.1]} />
            <meshStandardMaterial 
              color="#000000" 
              transparent 
              opacity={0.7}
              roughness={0.5}
            />
            {/* White border / Glowing edges on hover */}
            <Edges scale={1.01} threshold={15}>
              <lineBasicMaterial color={hovered ? color : "#ffffff"} transparent opacity={hovered ? 1 : 0.1} toneMapped={false} />
            </Edges>
          </mesh>

          {/* Icon (Front) */}
          <Text
            position={[-1.5, 0, 0.06]}
            fontSize={0.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>

          {/* Text (Front) */}
          <Text
            position={[0.5, 0, 0.06]}
            fontSize={0.4}
            color={hovered ? color : "#ffffff"}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            {label}
            <meshBasicMaterial color={hovered ? color : "#ffffff"} toneMapped={false} />
          </Text>

          {/* Icon (Back) */}
          <Text
            position={[1.5, 0, -0.06]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>

          {/* Text (Back) */}
          <Text
            position={[-0.5, 0, -0.06]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.4}
            color={hovered ? color : "#ffffff"}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            {label}
            <meshBasicMaterial color={hovered ? color : "#ffffff"} toneMapped={false} />
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
        icon="💻"
      />

      {/* LinkedIn */}
      <Card
        position={[0, 0, -8]}
        rotation={[0, 0, 0]}
        url={PORTFOLIO_DATA.contact.linkedin}
        label="LINKEDIN"
        color="#00ffff"
        icon="👔"
      />

      {/* Instagram */}
      <Card
        position={[10, 0, 2]}
        rotation={[0, -0.4, 0]}
        url={PORTFOLIO_DATA.contact.instagram}
        label="INSTAGRAM"
        color="#ff00ff"
        icon="📷"
      />

      {/* Guide Bot in Social Dimension */}
      <Bot isSocialDimension position={[0, 5, 0]} scale={1.2} />
    </group>
  );
}
