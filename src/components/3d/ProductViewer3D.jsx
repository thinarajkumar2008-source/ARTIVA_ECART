import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, Play, Pause, Sparkles } from 'lucide-react';

// 3D Canvas Painting Mesh with Image Texture
const CanvasArtMesh = ({ imageUrl }) => {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (imageUrl) {
      new THREE.TextureLoader().load(
        imageUrl,
        (loaded) => setTexture(loaded),
        undefined,
        () => console.warn('Failed to load texture for 3D preview, using colored material')
      );
    }
  }, [imageUrl]);

  return (
    <group ref={meshRef}>
      {/* Wooden Stretcher Frame (Sides and Back) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 2.8, 0.12]} />
        <meshStandardMaterial color="#6E472A" roughness={0.7} />
      </mesh>

      {/* Front Textured Canvas Face */}
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[2.32, 2.72]} />
        {texture ? (
          <meshStandardMaterial map={texture} roughness={0.25} />
        ) : (
          <meshStandardMaterial color="#6C2BD9" roughness={0.3} />
        )}
      </mesh>
    </group>
  );
};

// 3D Clay Miniature Mesh on Pedestal
const ClayFigurineMesh = ({ color = "#FF6B9A" }) => {
  const groupRef = useRef();

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Studio Display Pedestal */}
      <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.25, 0.35, 32]} />
        <meshStandardMaterial color="#27213C" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Sculpted Clay Body */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.05} />
        </mesh>

        {/* Adorable Clay Ears / Accents */}
        <mesh position={[-0.45, 0.95, 0]} castShadow>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshStandardMaterial color="#FFD166" roughness={0.3} />
        </mesh>
        <mesh position={[0.45, 0.95, 0]} castShadow>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshStandardMaterial color="#FFD166" roughness={0.3} />
        </mesh>

        {/* Painted Cheeks & Eyes */}
        <mesh position={[-0.24, 0.35, 0.65]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#27213C" roughness={0.1} />
        </mesh>
        <mesh position={[0.24, 0.35, 0.65]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#27213C" roughness={0.1} />
        </mesh>
        <mesh position={[-0.38, 0.18, 0.6]}>
          <circleGeometry args={[0.1, 16]} />
          <meshStandardMaterial color="#FF6B9A" roughness={0.4} />
        </mesh>
        <mesh position={[0.38, 0.18, 0.6]}>
          <circleGeometry args={[0.1, 16]} />
          <meshStandardMaterial color="#FF6B9A" roughness={0.4} />
        </mesh>
      </Float>
    </group>
  );
};

const ProductViewer3D = ({ product }) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef();

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const isClay = product.category === 'Clay Art';

  return (
    <div style={{ position: 'relative', width: '100%', height: '420px', background: 'radial-gradient(circle at 50% 40%, #FFFFFF 0%, #F5EFEB 100%)', borderRadius: '20px', border: '1px solid #EFE7E2', overflow: 'hidden' }}>
      {/* 3D Viewer Header Controls Badge */}
      <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', padding: '0.35rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, color: '#6C2BD9', border: '1px solid #EFE7E2' }}>
        <Sparkles size={14} />
        <span>Interactive 3D Studio Inspection</span>
      </div>

      {/* Floating Toolbar Controls */}
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 10, display: 'flex', gap: '0.5rem' }}>
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className="action-icon-btn"
          style={{ width: '38px', height: '38px', background: '#FFFFFF' }}
          title={autoRotate ? 'Pause 360° Rotation' : 'Start 360° Rotation'}
        >
          {autoRotate ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          type="button"
          onClick={handleResetCamera}
          className="action-icon-btn"
          style={{ width: '38px', height: '38px', background: '#FFFFFF' }}
          title="Reset Camera View"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 10, fontSize: '0.75rem', color: '#777386', background: 'rgba(255, 255, 255, 0.85)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
        Click & Drag to rotate • Scroll to zoom
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 5]} intensity={1.4} castShadow />
        <pointLight position={[-4, -2, 2]} intensity={0.6} color="#FF6B9A" />

        <Suspense fallback={null}>
          {isClay ? (
            <ClayFigurineMesh color={product.subcategory === 'Small Clay Art' ? '#8BE0C4' : '#FF6B9A'} />
          ) : (
            <CanvasArtMesh imageUrl={product.image} />
          )}
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={1.8}
          minDistance={2.5}
          maxDistance={6.5}
        />
      </Canvas>
    </div>
  );
};

export default ProductViewer3D;
