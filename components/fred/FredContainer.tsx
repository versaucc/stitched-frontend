'use client'

import { ReactNode, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import FredMessageBubble from './FredMessageBubble'

function FredGLBModel() {
  const { scene } = useGLTF('/fred/context/freds/results/loose-fit/models/color.glb')
  return <primitive object={scene} scale={1.2} />
}

export default function FredContainer({
  message,
  flagA,
  flagB,
  children,
}: {
  message: string
  flagA: boolean
  flagB: boolean
  children: ReactNode
}) {
  return (
    <div className="relative w-full h-full">
      {/* Fred 3D Model and Message */}
      <div className="absolute top-1/2 left-[-20%] transform -translate-y-1/2 z-10 w-[600px] h-[600px]">
        <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }}>
          <ambientLight intensity={8} />
          <directionalLight position={[3, 5, 3]} intensity={10} />
          <directionalLight position={[-3, 5, -3]} intensity={8} />
          <directionalLight position={[-3, 5, 3]} intensity={8} />
          <Suspense fallback={null}>
            <FredGLBModel />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>

        <FredMessageBubble message={message} />
        
      </div>

      {/* Main Content */}
      <div className="ml-[320px]">
        {children}
      </div>
    </div>
  )
}

