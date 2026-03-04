import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from './store'

const vertexShader = `
  varying vec3 vPosition;
  void main() {
    vPosition = position; // Use local coordinates
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  varying vec3 vPosition;

  void main() {
      // 1. Normalize height to a 0-1 range based on the top half of the sphere
      // We use a slight offset (0.1) to move the "bottom" of the gradient
      // below the actual horizon line.
      float h = vPosition.y * 0.5 + 0.5;

      // 2. Smoothstep creates an S-curve.
      // This removes the "sharp change" by easing into the bottom color.
      // Adjust 0.1 and 0.9 to compress or expand the transition area.
      float finalHeight = smoothstep(0.1, 0.9, h);

      gl_FragColor = vec4(mix(bottomColor, topColor, finalHeight), 1.0);
  }
`

export function SkySphere() {
  const { sunPosition } = useStore()

  const scale = 500

  const uniforms = useRef({
    topColor: { value: new THREE.Color() },
    bottomColor: { value: new THREE.Color() }
  })

  useFrame(() => {
    const day = { top: '#ade8ff', bottom: '#4fa9d1' }
    const night = { top: '#050515', bottom: '#010103' }

    uniforms.current.topColor.value.set(day.top)
      .lerp(new THREE.Color(night.top), Math.abs(sunPosition * 2 - 1))
    uniforms.current.bottomColor.value.set(day.bottom)
      .lerp(new THREE.Color(night.bottom), Math.abs(sunPosition * 2 - 1))
  })

  return (
    <mesh scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        side={THREE.BackSide}
        depthWrite={false} // This helps prevent the "strange polygon" clipping
      />
    </mesh>
  )
}

// state.scene.background = dayTop.clone().lerp(nightTop, Math.abs(sunPosition * 2 - 1))