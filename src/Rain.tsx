import * as THREE from 'three'
import { useMemo } from 'react'

export function Rain() {
  const count = 3000
  const boxSize = 8

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 6)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * boxSize
      const z = (Math.random() - 0.5) * boxSize
      const y = Math.random() * 7 + 1

      pos[i * 6] = x
      pos[i * 6 + 1] = y
      pos[i * 6 + 2] = z

      pos[i * 6 + 3] = x + 0.1
      pos[i * 6 + 4] = y - 0.2
      pos[i * 6 + 5] = z
    }
    return pos
  }, [])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#94a3b8"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}