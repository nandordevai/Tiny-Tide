import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, Sky, SoftShadows } from '@react-three/drei'
import * as THREE from 'three'
import { Sidebar } from './Sidebar'
import { Model } from './Model'
import './App.css'
import { useStore } from './store'

export default function App() {
  const [count, setCount] = useState(0)
  const store = useStore()

  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.on('vite:beforeUpdate', () => {
        setCount(prev => prev + 1)
      })
    }
  }, [])

  return (
    <>
      <main className='viewport'>
        <Canvas
          className="canvas"
          camera={{ position: [10, 12, 10], fov: 40 }}
          dpr={[1, 2]}
          key={count}
          shadows
        >
          {/* <Environment preset='' /> */}
          <ambientLight intensity={0.8} />
          <Sky sunPosition={[100, 100, 100]} />
          <directionalLight
            castShadow
            color={'rgb(255, 255, 240)'}
            intensity={5}
            position={[10, 20, -10]}
            shadow-bias={-0.001}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-camera-near={0.5}
            shadow-camera-far={40}
            shadow-mapSize={[2048, 2048]}
          />
          <ContactShadows
            opacity={1}
            scale={10}
            blur={2.5}
            far={4.5}
          />

          <Model />

          {/* <OrbitControls makeDefault /> */}
          {/* <gridHelper args={[10, 10]} /> */}

        </Canvas>
      </main>
      <Sidebar />
    </>
  )
}