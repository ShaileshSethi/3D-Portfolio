import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function Camera() {
  const scroll = useScroll();

  useFrame((state) => {
    const s = scroll.offset;

    const pos = new THREE.Vector3();
    const look = new THREE.Vector3();

    if (s < 0.85) {
      // Phase 1: Orbit Turntable (0 to 0.85 scroll)
      const normalizedScroll = s / 0.85; // 0 to 1
      const angle = normalizedScroll * Math.PI * 0.5; // Orbit 90 degrees
      const targetRadius = 14;
      const targetHeight = 6;

      pos.x = -Math.sin(angle) * targetRadius;
      pos.y = targetHeight - (normalizedScroll * 1.5); // Slightly lower as we scroll
      pos.z = Math.cos(angle) * targetRadius;

      look.set(0, -0.5, 0); // Always look at turntable center
    } else {
      // Phase 2: Enter New Dimension (0.85 to 1.0 scroll)
      // Interpolate from Turntable to Social Dimension
      const normalizedScroll = (s - 0.85) / 0.15; // 0 to 1
      
      // Start position (end of Phase 1)
      const startAngle = Math.PI * 0.5;
      const startPos = new THREE.Vector3(
        -Math.sin(startAngle) * 14,
        6 - 1.5,
        Math.cos(startAngle) * 14
      );
      
      // Target position in Social Dimension (y=50)
      const endPos = new THREE.Vector3(0, 50, 15);
      
      // Interpolate position using ease function for smooth takeoff
      const easePos = 1 - Math.pow(1 - normalizedScroll, 3);
      pos.lerpVectors(startPos, endPos, easePos);

      // Interpolate look target
      const startLook = new THREE.Vector3(0, -0.5, 0);
      const endLook = new THREE.Vector3(0, 50, 0);
      look.lerpVectors(startLook, endLook, easePos);
    }

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
