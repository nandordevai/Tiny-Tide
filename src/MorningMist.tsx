import { Clouds, Cloud } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { use, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from './store'

export function MorningMist() {
  const { lightOpacity, sunPosition } = useStore()
  const cloudsRef = useRef<THREE.Group>()

  const getOpacity = () => {
    const sunRise = 0.16
    const isDawn = Math.abs(sunPosition - sunRise) < 0.017
    const opacity = isDawn ? Math.max(0, 0.4 - Math.abs(sunPosition - sunRise)) : 0
    return opacity
  }

  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = getOpacity()
          child.material.transparent = child.material.opacity < 1
          child.material.color.set(lightOpacity > 0.5 ? "#101020" : "#ade8ff")
        }
      })
    }
  })

  return (
    <group ref={cloudsRef}>
      <Clouds
        material={THREE.MeshBasicMaterial}
        position={[0, 2, 0]}
      >
        {useMemo(() => (
          <Cloud
            seed={1}
            segments={100}
            bounds={[4, 1, 4]}
            volume={0.1}
            fade={20}
            speed={0.0}
          />
        ), [])
        }
      </Clouds>
    </group>
  )
}