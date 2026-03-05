import { useMemo } from 'react'

export function StormClouds({ boxSize = 6 }) {
  const color = '#2d3748'

  const clouds = useMemo(() => {
    const items = []
    const density = 1.5 // spheres per unit
    const count = Math.pow(boxSize * density, 2)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * boxSize
      const z = (Math.random() - 0.5) * boxSize

      const y = 9 + (Math.random() - 0.5) * 1.5
      const scale = 0.8 + Math.random() * 1.2
      const rotation = Math.random() * Math.PI

      items.push({ x, y, z, scale, rotation })
    }
    return items
  }, [boxSize])

  return (
    <group>
      {clouds.map((cloud, i) => (
        <mesh
          key={i}
          position={[cloud.x, cloud.y, cloud.z]}
          scale={cloud.scale}
          rotation-y={cloud.rotation}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshLambertMaterial
            color={color}
            flatShading={true}
            roughness={1}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}