'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function RotatingGlobe() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial color="#ffc2c2" wireframe={false} />
    </mesh>
  )
}

function FloatingTag({ angleOffset = 0 }: { angleOffset: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() + angleOffset
      const radius = 4
      ref.current.position.x = Math.cos(t) * radius
      ref.current.position.z = Math.sin(t) * radius
      ref.current.rotation.y = t
    }
  })

  return (
    <mesh>
      <boxGeometry args={[0.6, 0.3, 0.1]} />
      <meshStandardMaterial color="#505477" />
    </mesh>
  )
}

export default function SalesWorld() {
  return (
    <div className="w-full h-[400px] bg-pink1 rounded-xl shadow mb-6 overflow-hidden">
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate />

        <RotatingGlobe />
        <FloatingTag angleOffset={0} />
        <FloatingTag angleOffset={Math.PI / 2} />
        <FloatingTag angleOffset={Math.PI} />
      </Canvas>
    </div>
  )
}
