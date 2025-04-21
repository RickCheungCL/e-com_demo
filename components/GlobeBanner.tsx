'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import geoData from '@/assets/ne_110m_admin_0_countries.json'

const pinCoords = [
  { lat: 35.6895, lng: 139.6917, name: 'Tokyo' },
  { lat: 22.3193, lng: 114.1694, name: 'HKSAR' },
  { lat: 51.5074, lng: -0.1278, name: 'London' },
  { lat: 43.6532, lng: -79.3832, name: 'Toronto' },
  { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' }
]

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function InteractivePin({ position, name }: { position: THREE.Vector3; name: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#8A00C4" emissive="#8A00C4" emissiveIntensity={1.5} />
      </mesh>
      {hovered && (
        <Html distanceFactor={10} position={[0, 0.07, 0]} style={{ color: '#ffffff', fontSize: '0.6rem', textAlign: 'center' }}>
          {name}
        </Html>
      )}
    </group>
  )
}

function EarthSurface() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  const pins = pinCoords.map((p, i) => {
    const pos = latLngToVector3(p.lat, p.lng, 2.01)
    return <InteractivePin key={`pin-${i}`} position={pos} name={p.name} />
  })

  const landLines: JSX.Element[] = []
  const landMeshes: JSX.Element[] = []

  geoData.features.forEach((feature: any, i: number) => {
    const coords = feature.geometry.coordinates
    const type = feature.geometry.type
    const polygons = type === 'Polygon' ? [coords] : type === 'MultiPolygon' ? coords : []

    polygons.forEach((polygon: any) => {
      const shapePoints = polygon[0].map(([lng, lat]: [number, number]) => latLngToVector3(lat, lng, 2.009))
      const shape2D = new THREE.Shape(shapePoints.map(p => new THREE.Vector2(p.x, p.z)))
      landMeshes.push(
        <mesh key={`landmesh-${i}-${Math.random()}`} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <shapeGeometry args={[shape2D]} />
          <meshStandardMaterial
            color="#00ffaa"
            emissive="#00ffaa"
            emissiveIntensity={0.1}
            side={THREE.DoubleSide}
            transparent
            opacity={0.25}
          />
        </mesh>
      )

      polygon.forEach((ring: any) => {
        const points = ring.map(([lng, lat]: [number, number]) => latLngToVector3(lat, lng, 2.009))
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        landLines.push(
          <line key={`landline-${i}-${Math.random()}`} geometry={lineGeometry}>
            <lineBasicMaterial attach="material" color="#2D5987" linewidth={1} />
          </line>
        )
      })
    })
  })

  return (
    <group ref={groupRef} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#001122"
          emissive="#112244"
          emissiveIntensity={0.4}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.01, 2, 2]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>
      {pins}
      {landLines}
      {landMeshes}
    </group>
  )
}

export default function CyberEarthBanner() {
  return (
    <div className="w-full h-[400px] bg-black rounded-xl shadow overflow-hidden">
      <Canvas camera={{ position: [2, 1.5, 4], fov: 40 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <EarthSurface />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}