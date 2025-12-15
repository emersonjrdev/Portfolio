import React, { useRef, useState, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial } from '@react-three/drei';

function RotatingBox({ position, color, speed = 1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function TechSphere({ position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        <icosahedronGeometry args={[0.5, 1]} />
        <MeshDistortMaterial
          color={hovered ? "#10b981" : "#14b8a6"}
          distort={hovered ? 0.5 : 0.2}
          speed={hovered ? 3 : 1}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const particlesRef = useRef();
  const particleCount = 200; // Reduzido de 1000 para 200

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005; // Reduzido
    }
  });

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#fbbf24" transparent opacity={0.4} />
    </points>
  );
}

const Scene3D = memo(function Scene3D() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#10b981" intensity={0.5} />
        
        <Stars radius={300} depth={60} count={500} factor={5} fade speed={0.5} />
        <ParticleField />
        
        <RotatingBox position={[-2, 0, 0]} color="#14b8a6" speed={0.5} />
        <RotatingBox position={[2, 0, 0]} color="#10b981" speed={0.7} />
        <RotatingBox position={[0, 2, -1]} color="#06b6d4" speed={0.6} />
        
        <TechSphere position={[-1, -1, 0]} />
        <TechSphere position={[1, -1, 0]} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
});

export default Scene3D;

