import { useFrame } from '@react-three/fiber'

export function StartAnimation({ orbitRef }: { orbitRef: any }) {
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const duration = 4

    if (time < duration && orbitRef.current) {
      const intensity = Math.max(0, 1 - time / duration) *  0.05
      const angle = orbitRef.current.getAzimuthalAngle()
      orbitRef.current.setAzimuthalAngle(angle + Math.sin(time) * intensity)

      orbitRef.current.update()
    }
  })

  return null
}