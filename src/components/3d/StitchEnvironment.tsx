import { useRef } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { Sparkles, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    nebulaMaterial: any;
  }
}

const NebulaMaterial = shaderMaterial(
  { u_time: 0, u_resolution: new THREE.Vector2() },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    precision highp float;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec2 u_resolution;

    float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
        vec2 uv = vUv;
        vec2 p = uv * 2.0 - 1.0;
        // Fix aspect ratio if u_resolution is passed, else assume wide
        p.x *= u_resolution.x > 0.0 ? u_resolution.x / u_resolution.y : 16.0/9.0;

        // Deep space dark background
        vec3 color = vec3(0.01, 0.01, 0.03);

        // Floating Nebula
        float t = u_time * 0.2;
        for(float i = 1.0; i < 4.0; i++){
            p.x += 0.3 / i * sin(i * 3.0 * p.y + t + noise(p * i));
            p.y += 0.3 / i * cos(i * 3.0 * p.x + t + noise(p * i));
        }
        
        float f = 0.5 + 0.5 * sin(p.x + p.y);
        vec3 nebula = vec3(0.1, 0.0, 0.2) * f; 
        nebula += vec3(0.0, 0.05, 0.1) * (1.0 - f); 
        
        color += nebula * 0.4;

        // Subtle star field
        float s = noise(uv * 100.0 + u_time * 0.0001);
        if (s > 0.995) {
            float sparkle = sin(u_time * 2.0 + s * 10.0) * 0.5 + 0.5;
            color += vec3(1.0) * sparkle * 0.3;
        }

        gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Register the material with R3F
extend({ NebulaMaterial });

export function StitchEnvironment() {
  const materialRef = useRef<any>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.u_time = state.clock.elapsedTime;
      materialRef.current.u_resolution.set(size.width, size.height);
    }
  });

  return (
    <>
      {/* Massive Background Plane far deep in the scene */}
      <mesh position={[0, 0, -120]}>
        <planeGeometry args={[400, 200]} />
        <nebulaMaterial ref={materialRef} depthWrite={false} />
      </mesh>

      {/* Floating Particles from Stitch Screen 1 (0x8888ff) */}
      <Sparkles count={500} scale={[30, 20, 150]} position={[0, 0, -50]} size={1.5} speed={0.1} opacity={0.6} color="#8888ff" />

      {/* Accent Light from Stitch Screen 1 (0xff00ff) */}
      <pointLight position={[-3, 2, 2]} intensity={2} color="#ff00ff" distance={15} />
    </>
  );
}
