import { Clouds, Cloud } from '@react-three/drei'
import * as THREE from 'three'

export function StormClouds() {
  const color = '#999999'

  return (
    <group>
      <Clouds
        material={THREE.MeshLambertMaterial}
        position={[0, 8, 0]}
        limit={1000}
      >
        <Cloud
          seed={909}
          segments={100}
          bounds={[4, 1, 4]}
          volume={1}
          fade={1}
          speed={0.0}
          color={color}
        />
      </Clouds>
    </group>
  )
}