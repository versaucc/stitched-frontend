// components/FredModel.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function FredGLBModel() {
  const { scene } = useGLTF('/fred/3d/fred-wave-og-1-no-color.glb')
  return <primitive object={scene} scale={1.2} />
}

export default function FredModelViewer() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <FredGLBModel />
      <OrbitControls enableZoom={true} />
    </Canvas>
  )
}
