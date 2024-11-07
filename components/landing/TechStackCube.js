'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function Cube() {
  const meshRef = React.useRef<THREE.Mesh>(null)
  const textures = useTexture({
    react: '/placeholder.svg?height=256&width=256',
    vue: '/placeholder.svg?height=256&width=256',
    angular: '/placeholder.svg?height=256&width=256',
    node: '/placeholder.svg?height=256&width=256',
    python: '/placeholder.svg?height=256&width=256',
    javascript: '/placeholder.svg?height=256&width=256',
  })

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.2
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 3, 3]} />
      {Object.values(textures).map((texture, index) => (
        <meshStandardMaterial key={index} attachArray="material" map={texture} />
      ))}
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Cube />
      <OrbitControls enableZoom={false} />
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Tech Stack
      </Text>
    </>
  )
}

export default function TechStackCube() {
  return (
    <div className="w-full h-[400px] bg-gray-100">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas camera={{ position: [5, 5, 5] }}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}