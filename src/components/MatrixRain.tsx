import { useEffect, useRef } from 'react'

interface Drop {
  x: number
  y: number
  speed: number
  opacity: number
  char: string
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Binary and AI/ML related characters
    const chars = '01010101AIDEEPLEARNINGMLNEURALNETWORKDATASCIENCEAIML01010101'
    const fontSize = 12
    const columns = Math.floor(window.innerWidth / fontSize)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initDrops = () => {
      dropsRef.current = []
      for (let i = 0; i < columns; i++) {
        dropsRef.current.push({
          x: i * fontSize,
          y: Math.random() * canvas.height,
          speed: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          char: chars[Math.floor(Math.random() * chars.length)]
        })
      }
    }

    const animate = () => {
      // Create fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px 'Courier New', monospace`
      
      dropsRef.current.forEach((drop, index) => {
        // Set color with opacity
        ctx.fillStyle = `rgba(100, 255, 218, ${drop.opacity})`
        ctx.fillText(drop.char, drop.x, drop.y)
        
        // Move drop down
        drop.y += drop.speed
        
        // Reset drop when it goes off screen
        if (drop.y > canvas.height && Math.random() > 0.975) {
          drop.y = 0
          drop.char = chars[Math.floor(Math.random() * chars.length)]
          drop.opacity = Math.random() * 0.5 + 0.1
          drop.speed = Math.random() * 3 + 1
        }
        
        // Occasionally change character
        if (Math.random() > 0.995) {
          drop.char = chars[Math.floor(Math.random() * chars.length)]
        }
        
        // Subtle opacity variation
        drop.opacity += (Math.random() - 0.5) * 0.02
        drop.opacity = Math.max(0.05, Math.min(0.6, drop.opacity))
      })
      
      animationIdRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      initDrops()
    }

    resizeCanvas()
    initDrops()
    animate()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-50"
      style={{ background: 'transparent' }}
    />
  )
}