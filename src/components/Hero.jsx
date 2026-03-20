import React, { useRef, useEffect, Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import './Hero.css'

/* ---- Three.js Holographic AI Platform ---- */
function HolographicAIPlatform() {
  const groupRef = useRef()
  const coreRef = useRef()
  const ringsRef = useRef()
  const particlesRef = useRef()

  const particleCount = 2000
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * 2 * Math.PI
        const phi = Math.acos((Math.random() * 2) - 1)
        const radius = 1.4 + (Math.random() * 1.2)
        pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    // Smooth mouse parallax
    const targetX = (state.pointer.x * 0.3)
    const targetY = (state.pointer.y * 0.3)
    
    if (groupRef.current) {
       groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y)
       groupRef.current.rotation.x += 0.05 * (-targetY - groupRef.current.rotation.x)
    }

    if (coreRef.current) {
        coreRef.current.rotation.y = t * 0.3
        coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.2
    }
    
    if (ringsRef.current) {
        ringsRef.current.rotation.z = t * 0.15
        ringsRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.15
    }

    if (particlesRef.current) {
        particlesRef.current.rotation.y = t * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Abstract Inner AI Core */}
        <Sphere ref={coreRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#3730a3"
            emissiveIntensity={1}
            wireframe={true}
          />
        </Sphere>
        
        {/* Inner glow solid */}
        <Sphere args={[1.0, 32, 32]}>
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </Sphere>

        {/* Orbiting Holographic Rings */}
        <group ref={ringsRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.2, 0.015, 16, 100]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[2.6, 0.01, 16, 100]} />
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, -Math.PI / 8, 0]}>
            <torusGeometry args={[3.0, 0.02, 16, 100]} />
            <meshBasicMaterial color="#ec4899" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>

        {/* Neural Particles Cloud */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.025}
            color="#a78bfa"
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
        
      </Float>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-10, -10, 5]} intensity={1} color="#06b6d4" />
      <pointLight position={[0, 5, -10]} intensity={0.8} color="#8b5cf6" />
      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />
      <HolographicAIPlatform />
    </>
  )
}

/* ---- Hero Component ---- */
export default function Hero() {
  const headlineRef = useRef()
  const subRef = useRef()
  const ctaRef = useRef()
  const badgeRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
  }, [])

  return (
    <section className="hero" id="hero" aria-label="Hero section">
      {/* Animated background */}
      <div className="hero__bg">
        <div className="blob" style={{ width: 600, height: 600, background: 'rgba(99,102,241,0.15)', top: '-10%', left: '-10%' }} />
        <div className="blob" style={{ width: 500, height: 500, background: 'rgba(6,182,212,0.1)', bottom: '-5%', right: '-5%', animationDelay: '3s' }} />
        <div className="grid-bg" />
      </div>

      <div className="hero__inner">
        {/* Content */}
        <div className="hero__content">
          <div ref={badgeRef} style={{ opacity: 0 }}>
            <span className="badge">
              <span className="badge__dot" />
              Now in Early Access
            </span>
          </div>

          <h1 ref={headlineRef} className="hero__headline" style={{ opacity: 0 }}>
            Talk to AI Like It's{' '}
            <span className="gradient-text">Human</span>
          </h1>

          <p ref={subRef} className="hero__sub" style={{ opacity: 0 }}>
            Have real-time voice conversations with a multilingual AI avatar that understands, responds, and speaks naturally.
          </p>

          <div ref={ctaRef} className="hero__cta" style={{ opacity: 0 }}>
            <a href="#waitlist" className="btn btn-primary hero__btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Start Free
            </a>
            <a href="#demo" className="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
              Watch Demo
            </a>
          </div>

          {/* Trust metrics */}
          <div className="hero__metrics">
            {[
              { value: '50+', label: 'Languages' },
              { value: '10M+', label: 'Conversations' },
              { value: '99.9%', label: 'Uptime' },
            ].map(m => (
              <div key={m.value} className="hero__metric">
                <span className="hero__metric-value">{m.value}</span>
                <span className="hero__metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Three.js Canvas */}
        <div className="hero__canvas-wrap" aria-hidden="true">
          <div className="hero__canvas-glow" />
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="hero__scroll-line" />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}
