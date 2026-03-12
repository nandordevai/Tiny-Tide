import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function ScreenshotController({ trigger, onComplete }: { trigger: boolean, onComplete: () => void }) {
  const { gl, scene, camera } = useThree()
  useEffect(() => {
    if (trigger) {
      const runExport = async () => {
        const targetSize = 2048
        const originalSize = gl.getSize(new THREE.Vector2())
        const originalPixelRatio = gl.getPixelRatio()

        gl.setSize(targetSize, targetSize, false)
        gl.setPixelRatio(1)
        gl.render(scene, camera)

        const canvas2d = document.createElement('canvas')
        canvas2d.width = targetSize
        canvas2d.height = targetSize
        const ctx = canvas2d.getContext('2d')
        if (!ctx) {
          console.error('Failed to get 2D context')
          return
        }

        const padding = 50
        ctx.drawImage(gl.domElement, 0, 0)
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.font = "bold 40px Arial"
        ctx.textAlign = "right"
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
        ctx.shadowBlur = 10
        ctx.fillText("CREATED WITH TINY TIDE", targetSize - padding, targetSize - padding - 50)
        ctx.fillText("nandordevai.net/Tiny-Tide/", targetSize - padding, targetSize - padding)

        canvas2d.toBlob(async (blob) => {
          if (!blob) return

          const file = new File([blob], 'tiny-tide-scene.png', { type: 'image/png' })

          if (navigator.share && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({ files: [file], title: 'Tiny Tide Scene' })
            } catch (err) {
              if ((err as { name: string }).name !== 'AbortError') console.error(err)
            }
          } else {
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'tiny-tide-scene.png'
            link.click()
            URL.revokeObjectURL(url) // Clean up memory
          }
        }, 'image/png')

        gl.setSize(originalSize.x, originalSize.y, false)
        gl.setPixelRatio(originalPixelRatio)

        onComplete()
      }

      runExport()
    }
  }, [trigger, gl, scene, camera, onComplete])

  return null
}
