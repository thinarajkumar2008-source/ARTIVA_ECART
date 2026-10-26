import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Clay Mushroom
const ClayMushroom = ({ position = [-1.4, 0, 0] }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Stalk */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.25, 0.6, 20]} />
        <meshStandardMaterial color="#FFF9F5" roughness={0.4} />
      </mesh>
      {/* Red Cap */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.55, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FF6B9A" roughness={0.25} />
      </mesh>
      {/* Polka Dots */}
      <mesh position={[0.2, 0.35, 0.35]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      <mesh position={[-0.25, 0.3, 0.35]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
    </group>
  );
};

// Procedural 3D Clay Panda Head
const ClayPanda = ({ position = [0, 0.2, 0] }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Round Panda Head */}
      <mesh castShadow>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
      </mesh>
      {/* Black Ears */}
      <mesh position={[-0.45, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#27213C" roughness={0.2} />
      </mesh>
      <mesh position={[0.45, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#27213C" roughness={0.2} />
      </mesh>
      {/* Eye Patches */}
      <mesh position={[-0.22, 0.08, 0.58]} rotation={[0, 0, -0.3]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#27213C" roughness={0.2} />
      </mesh>
      <mesh position={[0.22, 0.08, 0.58]} rotation={[0, 0, 0.3]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#27213C" roughness={0.2} />
      </mesh>
      {/* White Pupils */}
      <mesh position={[-0.2, 0.1, 0.72]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
      </mesh>
      <mesh position={[0.2, 0.1, 0.72]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, -0.1, 0.64]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#27213C" roughness={0.2} />
      </mesh>
    </group>
  );
};

// Procedural 3D Clay Donut Charm
const ClayDonut = ({ position = [1.4, 0, 0] }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.9) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Donut Dough */}
      <mesh castShadow rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.45, 0.22, 20, 36]} />
        <meshStandardMaterial color="#D7A15C" roughness={0.5} />
      </mesh>
      {/* Chocolate Glaze */}
      <mesh position={[0, 0.03, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.45, 0.23, 20, 36, Math.PI * 1.6]} />
        <meshStandardMaterial color="#5C3A21" roughness={0.2} />
      </mesh>
      {/* Rainbow Sprinkles */}
      <mesh position={[0.2, 0.2, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#FFD166" roughness={0.3} />
      </mesh>
      <mesh position={[-0.2, 0.3, 0.2]} rotation={[0, 0, 1]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#8BE0C4" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.4, 0.15]} rotation={[0, 1, 0.5]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#FF6B9A" roughness={0.3} />
      </mesh>
    </group>
  );
};

const ClayStudioScene = () => {
  return (
    <div style={{ width: '100%', height: '360px', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0.4, 3.8], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} castShadow />
        <pointLight position={[-3, -1, 2]} intensity={0.5} color="#FFD166" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
            <ClayMushroom position={[-1.6, -0.2, 0]} />
            <ClayPanda position={[0, 0.1, 0.2]} />
            <ClayDonut position={[1.6, -0.1, 0]} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ClayStudioScene;
