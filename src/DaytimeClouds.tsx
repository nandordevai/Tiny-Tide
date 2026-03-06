import { Clouds, Cloud } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useStore } from './store'

export function DaytimeClouds() {
  const color = '#ffffff'
  const { sunPosition } = useStore()
  const cloudsRef = useRef<THREE.Group>(null)
  const initialized = useRef(false)

  const getOpacity = () => {
    const isMidday = sunPosition > 0.4 && sunPosition < 0.6
    const opacity = isMidday ?
      Math.max(0, 1 - Math.abs(sunPosition - 0.5)) :
      0
    return opacity
  }

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

  const cloud = useMemo(() => (
    <Cloud
      seed={303}
      segments={10}
      bounds={[4, 1, 4]}
      volume={2}
      fade={1}
      speed={0}
      color={color}
    />
  ), [])

  return (
    <group ref={cloudsRef}>
      <Clouds
        material={THREE.MeshLambertMaterial}
        position={[0, 9, 0]}
        limit={1000}
        frustumCulled={false}
      >
        {cloud}
      </Clouds>
    </group>
  )
}