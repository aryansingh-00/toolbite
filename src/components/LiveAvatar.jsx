import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function AvatarHead({ aiVolume, status }) {
  const mouthRef = useRef();
  const brainRef = useRef();
  const eyesRef = useRef();
  
  // Smoothly interpolate scales and colors frame-by-frame
  useFrame((state, delta) => {
    // 1. Animate Mouth based on actual audio volume frequency mapping
    const speaking = status === 'ai-speaking' || status === 'ending';
    const targetMouthScale = speaking ? 0.3 + (aiVolume * 4.0) : 0.1;
    
    if (mouthRef.current) {
        // High lerp factor for instant audio-reactive mapping
        mouthRef.current.scale.y += (targetMouthScale - mouthRef.current.scale.y) * 20 * delta;
        mouthRef.current.material.emissiveIntensity = 0.5 + (aiVolume * 2);
    }
    
    // 2. Rotate and pulse the brain core based on State Machine
    if (brainRef.current) {
        brainRef.current.rotation.y += delta * 0.4;
        brainRef.current.rotation.z += delta * 0.15;
        
        if (status === 'ai-thinking') {
            // Processing mode - pulsing pink
            brainRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 6) * 0.08);
            brainRef.current.material.emissive.setHex(0xec4899); 
        } else if (status === 'user-speaking') {
            // Listening to user - intense purple
            brainRef.current.material.emissive.setHex(0x8b5cf6);
            brainRef.current.scale.setScalar(1);
        } else {
            // Default or Speaking - cyan reacting slightly to volume
            brainRef.current.material.emissive.setHex(0x06b6d4);
            brainRef.current.scale.setScalar(1 + (aiVolume * 0.1));
        }
    }

    // 3. Subtle eye movements / blinking
    if (eyesRef.current) {
        // Occasional random blink
        if (Math.random() > 0.995) {
            eyesRef.current.scale.y = 0.1; // Blink
        } else {
            eyesRef.current.scale.y += (1 - eyesRef.current.scale.y) * 10 * delta;
        }
    }
  });

  return (
    <group scale={0.7} position={[0, -0.2, 0]}>
      {/* Outer Glass Helmet Segment */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshPhysicalMaterial 
          transmission={0.9} 
          roughness={0.1}
          thickness={0.5}
          color="#0f172a"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Inner Glowing Neural Core (Brain) */}
      <mesh ref={brainRef} position={[0, 0.4, 0]}>
         <sphereGeometry args={[1.3, 32, 32]} />
         <meshStandardMaterial 
            color="#0ea5e9" 
            emissive="#06b6d4" 
            emissiveIntensity={0.8}
            wireframe
         />
      </mesh>

      {/* Robotic Eyes Wrapper */}
      <group ref={eyesRef}>
          {/* Left Eye */}
          <mesh position={[-0.7, 0.6, 1.8]}>
             <boxGeometry args={[0.5, 0.15, 0.2]} />
             <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
          {/* Right Eye */}
          <mesh position={[0.7, 0.6, 1.8]}>
             <boxGeometry args={[0.5, 0.15, 0.2]} />
             <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
      </group>

      {/* Dynamic Audio-Reactive Jaw / Mouth */}
      <mesh ref={mouthRef} position={[0, -0.6, 1.9]}>
         <boxGeometry args={[1.2, 0.2, 0.2]} />
         <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1} />
      </mesh>
      
      {/* Small aesthetic cheek nodes */}
      <mesh position={[-1.2, -0.6, 1.7]}>
         <sphereGeometry args={[0.15, 16, 16]} />
         <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={2} />
      </mesh>
      <mesh position={[1.2, -0.6, 1.7]}>
         <sphereGeometry args={[0.15, 16, 16]} />
         <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

export default function LiveAvatar({ aiVolume, status }) {
  return (
    <div className="canvas-container" style={{ width: '100%', height: '100%', cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 35 }}>
        <ambientLight intensity={0.6} />
        {/* Cinematic lighting setup */}
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8b5cf6" />
        <spotLight position={[0, 10, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        
        <AvatarHead aiVolume={aiVolume} status={status} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 1.7} 
          minPolarAngle={Math.PI / 2.5} 
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
