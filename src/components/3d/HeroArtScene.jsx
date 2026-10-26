import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import SceneFallback from './SceneFallback';

// 1. Interactive 3D ARTIVA Logo Centerpiece
const Logo3D = ({ pointer }) => {
  const groupRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/logo.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      setTexture(tex);
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Responsive 3D tilt tracking pointer coordinates
    const targetRotX = pointer.y * 0.28;
    const targetRotY = pointer.x * 0.35;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);

    // Subtle gentle floating bob
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.18, 1.18, 1.18]}>
      {/* 3D Gold & Purple Outer Frame with Depth */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 3.2, 0.24]} />
        <meshStandardMaterial
          color="#432080"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Gold Bevel Trim */}
      <mesh position={[0, 0, 0.02]} receiveShadow>
        <boxGeometry args={[3.08, 3.08, 0.22]} />
        <meshStandardMaterial
          color="#FFD166"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Inner White Matte Mounting Plate */}
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[2.92, 2.92]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>

      {/* Front Face: High-Resolution 3D Logo Texture */}
      <mesh position={[0, 0, 0.13]} castShadow>
        <planeGeometry args={[2.86, 2.86]} />
        {texture ? (
          <meshStandardMaterial
            map={texture}
            transparent
            roughness={0.15}
            metalness={0.05}
          />
        ) : (
          <meshStandardMaterial color="#6C2BD9" roughness={0.2} />
        )}
      </mesh>

      {/* Back Plate Accent with Brand Gradient Glow effect */}
      <mesh position={[0, 0, -0.13]}>
        <planeGeometry args={[3.15, 3.15]} />
        <meshStandardMaterial color="#6C2BD9" roughness={0.3} />
      </mesh>

      {/* Subtle Luminous Aura Halo behind the Logo */}
      <mesh position={[0, 0, -0.18]}>
        <ringGeometry args={[1.5, 2.2, 48]} />
        <meshBasicMaterial color="#FF6B9A" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 2. Floating 3D Artist Paintbrush
const FloatingBrush = ({ position = [1.8, -0.4, 0.8], rotation = [0.2, 0.4, -0.7] }) => {
  const brushRef = useRef();

  useFrame((state) => {
    if (!brushRef.current) return;
    const t = state.clock.elapsedTime;
    brushRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.12;
    brushRef.current.rotation.z = rotation[2] + Math.cos(t * 1.1) * 0.08;
  });

  return (
    <group ref={brushRef} position={position} rotation={rotation} scale={[0.8, 0.8, 0.8]}>
      {/* Wooden Handle */}
      <mesh position={[0, -0.9, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.04, 2.2, 16]} />
        <meshStandardMaterial color="#8D5B4C" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Chrome Ferrule */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.07, 0.35, 16]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Bristles Dipped in Paint */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <coneGeometry args={[0.09, 0.45, 16]} />
        <meshStandardMaterial color="#FF6B9A" roughness={0.3} />
      </mesh>
    </group>
  );
};

// 3. Floating Colorful Paint Pigment Particles
const AmbientPigments = ({ count = 30 }) => {
  const particles = useRef([]);
  const colors = ["#6C2BD9", "#FF6B9A", "#FF8264", "#FFD166", "#8BE0C4"];

  useEffect(() => {
    particles.current = Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 7.5,
        (Math.random() - 0.5) * 5.0,
        (Math.random() - 0.5) * 3.5 - 0.5
      ],
      scale: Math.random() * 0.09 + 0.04,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.8 + 0.5
    }));
  }, [count]);

  return (
    <group>
      {particles.current.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={1} floatIntensity={1.2}>
          <mesh position={p.position}>
            <sphereGeometry args={[p.scale, 16, 16]} />
            <meshStandardMaterial
              color={p.color}
              roughness={0.2}
              metalness={0.3}
              transparent
              opacity={0.85}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Main 3D Hero Scene
const HeroArtScene = () => {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };

    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  if (!hasWebGL) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '400px' }}>
        <img
          src="/logo.png"
          alt="ARTIVA 3D Logo"
          style={{ maxWidth: '320px', borderRadius: '24px', boxShadow: '0 20px 45px rgba(108, 43, 217, 0.25)' }}
        />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '460px', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.4], fov: 46 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        {/* Studio Lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[4, 5, 5]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3, 2, 3]} intensity={0.8} color="#FF6B9A" />
        <pointLight position={[3, -2, 3]} intensity={0.7} color="#8BE0C4" />
        <pointLight position={[0, -3, 2]} intensity={0.5} color="#FFD166" />

        <Suspense fallback={null}>
          {/* 3D Logo Centerpiece */}
          <Logo3D pointer={pointer} />

          {/* Floating Paintbrush */}
          <FloatingBrush position={[1.9, -0.6, 0.7]} rotation={[0.2, 0.3, -0.65]} />

          {/* Floating Ambient Particles */}
          <AmbientPigments count={32} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroArtScene;
