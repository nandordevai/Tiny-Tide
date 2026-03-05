import { Clouds, Cloud } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from './store'

export function MorningMist() {
  const { sunPosition } = useStore()
  const cloudsRef = useRef<THREE.Group>(null)
  const initialized = useRef(false)

  const getOpacity = () => {
    const sunRise = 0.14
    const isDawn = Math.abs(sunPosition - sunRise) < 0.025
    const opacity = isDawn ? Math.max(0, 0.4 - Math.abs(sunPosition - sunRise)) : 0
    return opacity
  }

  const clouds = useMemo(() => (
    <Cloud
      seed={1}
      segments={100}
      bounds={[4, 1, 4]}
      volume={0.1}
      fade={20}
      speed={0.0}
    />
  ), [])

  useFrame(() => {
    const targetOpacity = getOpacity()
    cloudsRef.current?.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshLambertMaterial

        if (!initialized.current) {
          material.transparent = true
          material.opacity = 0
        }
        material.transparent = true
        material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1)
        mesh.visible = material.opacity > 0.01
      }
    })
    initialized.current = true
  })

  return (
    <group
      ref={cloudsRef}
    >
      <Clouds
        material={THREE.MeshBasicMaterial}
        position={[0, 2, 0]}
      >
        {clouds}
      </Clouds>
    </group>
  )
}