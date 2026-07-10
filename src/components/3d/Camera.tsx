import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function Camera() {
  const scroll = useScroll();

  useFrame((state) => {
    const s = scroll.offset;

    const pos = new THREE.Vector3();
    const look = new THREE.Vector3();

    // Simple orbital motion around the turntable based on scroll
    // Start at Z=8, orbit to X=-6, Z=4
    const angle = s * Math.PI * 0.5; // Orbit 90 degrees
    const targetRadius = 14;
    const targetHeight = 6;

    pos.x = -Math.sin(angle) * targetRadius;
    pos.y = targetHeight - (s * 1.5); // Slightly lower as we scroll
    pos.z = Math.cos(angle) * targetRadius;

    look.set(0, -0.5, 0); // Always look at turntable center

    // Add subtle breathing movement
    const time = state.clock.getElapsedTime();
    pos.y += Math.sin(time * 0.5) * 0.1;
    pos.x += Math.cos(time * 0.3) * 0.1;

    state.camera.position.lerp(pos, 0.05);

    if (!state.camera.userData.target) {
      state.camera.userData.target = look.clone();
    }
    state.camera.userData.target.lerp(look, 0.05);
    state.camera.lookAt(state.camera.userData.target);
  });

  return null;
}
