import React, { useState, useRef, useEffect, type MouseEvent } from 'react'
import './XYPad.css'

interface Position {
  x: number
  y: number
}

const XYPad: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const isDragging = useRef<boolean>(false)
  const offset = useRef<Position>({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!thumbRef.current) return

    isDragging.current = true
    const boxRect = thumbRef.current.getBoundingClientRect()

    offset.current = {
      x: e.clientX - boxRect.left,
      y: e.clientY - boxRect.top,
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!isDragging.current || !containerRef.current || !thumbRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const boxRect = thumbRef.current.getBoundingClientRect()

      let newX = e.clientX - containerRect.left - offset.current.x
      let newY = e.clientY - containerRect.top - offset.current.y

      const maxX = containerRect.width - boxRect.width
      const maxY = containerRect.height - boxRect.height

      // clamping
      newX = Math.max(0, Math.min(newX, maxX))
      newY = Math.max(0, Math.min(newY, maxY))

      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const thumbStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  }

  return (
    <div ref={containerRef} className='xypad'>
      <div
        className='thumb'
        style={thumbStyle}
        ref={thumbRef}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}

export { XYPad }