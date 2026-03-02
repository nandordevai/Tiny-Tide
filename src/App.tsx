import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Sky } from '@react-three/drei'
import { useStore } from './store'
import { Sidebar } from './Sidebar'
import { Model } from './Model'
import './App.css'

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

  const getSunVector = (radius: number, z: number): [number, number, number] => {
    const angle = store.sunPosition * Math.PI * 2
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, z]
  }

  const getSunPosition = () => getSunVector(100, 0)

  const getSunLightPosition = () => getSunVector(20, -5)

  const getDaylightFactor = () => {
    const angle = store.sunPosition * Math.PI * 2
    return Math.max(0, Math.sin(angle))
  }

  const getLightIntensity = () => getDaylightFactor() * 4 + 1

  const getAmbientIntensity = () => getDaylightFactor() * 0.5 + 0.5

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
          <ambientLight intensity={getAmbientIntensity()} />
          <Sky sunPosition={getSunPosition()} />
          <directionalLight
            castShadow
            color={'rgb(255, 255, 240)'}
            intensity={getLightIntensity()}
            position={getSunLightPosition()}
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

          <OrbitControls
            makeDefault
            enableZoom={false}
          />

        </Canvas>
      </main>
      <Sidebar />
    </>
  )
}