import { useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Helper, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from './store'
import { Sidebar } from './Sidebar'
import { Model } from './Model'
import { ScreenshotController } from './ScreenshotController'
import { SkySphere } from './SkySphere'
import { MorningMist } from './MorningMist'
import { Stars } from './Stars'
import { StartAnimation } from './StartAnimation'
import { Rain } from './Rain'
import { StormClouds } from './StormClouds'
import './App.css'

const debug = false

export default function App() {
  const [count, setCount] = useState(0)
  const store = useStore()
  const orbitRef = useRef<any>(null)

  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.on('vite:beforeUpdate', () => {
        setCount(prev => prev + 1)
      })
    }
  }, [])

  const getSunVector = (radius: number, z: number): [number, number, number] => {
    const angle = store.sunPosition * Math.PI
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, z]
  }

  const getSunLightPosition = () => getSunVector(20, -5)

  const getDaylightFactor = () => {
    if (store.isRaining) return 0

    const angle = store.sunPosition * Math.PI
    return Math.max(0, Math.sin(angle))
  }

  const getLightIntensity = () => getDaylightFactor() * 4 + 1

  const getAmbientIntensity = () => getDaylightFactor() * 0.5 + 0.5

  const getExposure = () => getDaylightFactor() * 0.5 + 0.75

  const getSunlightColor = () => {
    const daylightFactor = getDaylightFactor()
    const r = Math.round(255 * (0.5 + daylightFactor * 0.5))
    const g = Math.round(255 * (0.5 + daylightFactor * 0.5))
    const b = Math.round(255 * (0.7 + daylightFactor * 0.3))
    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <>
      <main className='viewport'>
        <Canvas
          className="canvas"
          camera={{ position: [10, 12, 10], fov: 40 }}
          dpr={[1, 2]}
          key={count}
          shadows
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: getExposure(),
            antialias: true,
            preserveDrawingBuffer: true
          }}
        >
          <ambientLight intensity={getAmbientIntensity()} />
          <SkySphere />
          <Stars />
          <directionalLight
            castShadow
            color={getSunlightColor()}
            intensity={getLightIntensity()}
            position={getSunLightPosition()}
            shadow-bias={-0.002}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-camera-near={0.5}
            shadow-camera-far={40}
            shadow-mapSize={[2048, 2048]}
          >
            {debug && <Helper type={THREE.DirectionalLightHelper} args={[0.5, 'hotpink']} />}
          </directionalLight>
          <ContactShadows
            opacity={1}
            scale={10}
            blur={2.5}
            far={4.5}
          />
          <Environment preset="forest" background={false} frames={1} environmentIntensity={0.25} />
          <fog attach="fog" args={['#ade8ff', 15, 40]} />
          {!store.isRaining && <MorningMist />}
          <Model />
          <StartAnimation orbitRef={orbitRef} />
          <OrbitControls
            ref={orbitRef}
            makeDefault
            maxDistance={20}
            minDistance={6}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2}
            target={[0, 1.5, 0]}
          />

          <ScreenshotController
            trigger={store.capturing}
            onComplete={() => store.setCapturing(false)}
          />
          {store.isRaining &&
            <>
              <Rain />
              <StormClouds />
            </>
          }
        </Canvas>
      </main>
      <Sidebar />
    </>
  )
}