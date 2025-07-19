// components/fred/FredModel.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function FredGLBModel() {
  const { scene } = useGLTF('/fred/context/freds/results/loose-fit/models/color.glb')
  return <primitive object={scene} scale={1.2} />
}

export default function FredModelViewer() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={10} />
      <directionalLight position={[3, 5, 3]} intensity={15} />
      <directionalLight position={[-3, 5, -3]} intensity={15} />
      <FredGLBModel />
      <OrbitControls enableZoom={true} />
    </Canvas>
  )
}
