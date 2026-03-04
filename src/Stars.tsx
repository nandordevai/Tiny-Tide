import { useMemo, useRef } from 'react'
import { Stars as DreiStars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from './store'

export function Stars() {
  const starsRef = useRef<THREE.Points>(null!)
  const { lightOpacity } = useStore()

  const starField = useMemo(() => (
    <DreiStars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={8}
      saturation={0}
      fade
      speed={0}
    />
  ), [])

  useFrame(() => {
    if (!starsRef.current?.material) return

    const material = starsRef.current.material as THREE.PointsMaterial
    material.transparent = true
    material.opacity = THREE.MathUtils.smoothstep(lightOpacity, 0.2, 0.6)
    starsRef.current.visible = material.opacity > 0
  })

  return (
    <group>
      {starField}
    </group>
  )
}