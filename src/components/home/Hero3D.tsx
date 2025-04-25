import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Environment, Float, PerspectiveCamera, Text3D, useFont } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.3;
    mesh.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    mesh.current.rotation.z = Math.cos(time * 0.5) * 0.2;
  });

  const springs = useSpring({
    scale: [1, 1, 1],
    from: { scale: [0, 0, 0] },
    config: { mass: 2, tension: 150, friction: 50 },
  });

  return (
    <animated.mesh ref={mesh} position={position} scale={springs.scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.8} />
    </animated.mesh>
  );
}

function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    textRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    textRef.current.rotation.y = Math.cos(time * 0.3) * 0.1;
  });

  return (
    <Text3D 
      ref={textRef}
      position={[0, 0, -2]}
      font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
      size={1}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
    >
      RAFIM
      <meshNormalMaterial />
    </Text3D>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <FloatingShape position={[-4, 2, -5]} color="#EC4899" speed={1.2} />
        <FloatingShape position={[4, -2, -8]} color="#3B82F6" speed={0.8} />
        <FloatingShape position={[0, 3, -6]} color="#8B5CF6" speed={1} />
      </Float>
      
      <AnimatedText />
      <Environment preset="city" />
    </>
  );
}

const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Hero3D;