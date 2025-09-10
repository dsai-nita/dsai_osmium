import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

interface MLKeyword {
  text: string
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  size: number
}

const mlKeywords = [
  'Neural Networks', 'Deep Learning', 'Machine Learning', 'Computer Vision',
  'Natural Language Processing', 'Reinforcement Learning', 'Data Science',
  'Artificial Intelligence', 'Gradient Descent', 'Backpropagation',
  'Convolutional Neural Networks', 'Recurrent Neural Networks', 'Transformer',
  'Random Forest', 'Support Vector Machine', 'K-Means Clustering',
  'Feature Engineering', 'Model Training', 'Cross Validation', 'Overfitting',
  'Regularization', 'Ensemble Methods', 'Hyperparameters', 'Loss Function',
  'Activation Function', 'Attention Mechanism', 'Transfer Learning', 'GANs',
  'LSTM', 'CNN', 'RNN', 'API', 'Big Data', 'IoT', 'Cloud Computing',
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV'
]

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const keywordsRef = useRef<MLKeyword[]>([])
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(150, Math.floor(window.innerWidth / 10))
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: ['#1a237e', '#00bcd4', '#64ffda', '#9c27b0'][Math.floor(Math.random() * 4)]
        })
      }
    }

    const initKeywords = () => {
      keywordsRef.current = []
      const keywordCount = Math.min(15, Math.floor(window.innerWidth / 100))
      
      for (let i = 0; i < keywordCount; i++) {
        keywordsRef.current.push({
          text: mlKeywords[Math.floor(Math.random() * mlKeywords.length)],
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.1,
          size: Math.random() * 8 + 10
        })
      }
    }

    const drawParticles = () => {
      particlesRef.current.forEach(particle => {
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Add glow effect
        ctx.save()
        ctx.globalAlpha = particle.opacity * 0.3
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    const drawConnections = () => {
      const connectionDistance = 100
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
          
          if (distance < connectionDistance) {
            const opacity = (connectionDistance - distance) / connectionDistance * 0.2
            ctx.save()
            ctx.globalAlpha = opacity
            ctx.strokeStyle = '#64ffda'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    const drawKeywords = () => {
      keywordsRef.current.forEach(keyword => {
        ctx.save()
        ctx.globalAlpha = keyword.opacity
        ctx.font = `${keyword.size}px 'Inter', sans-serif`
        ctx.fillStyle = '#64ffda'
        ctx.textAlign = 'center'
        ctx.fillText(keyword.text, keyword.x, keyword.y)
        
        // Add subtle glow to text
        ctx.shadowColor = '#64ffda'
        ctx.shadowBlur = 10
        ctx.fillText(keyword.text, keyword.x, keyword.y)
        ctx.restore()
      })
    }

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Subtle opacity pulsing
        particle.opacity += (Math.random() - 0.5) * 0.01
        particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity))
      })
    }

    const updateKeywords = () => {
      keywordsRef.current.forEach(keyword => {
        keyword.x += keyword.vx
        keyword.y += keyword.vy

        // Wrap around edges
        if (keyword.x < -100) keyword.x = canvas.width + 100
        if (keyword.x > canvas.width + 100) keyword.x = -100
        if (keyword.y < -50) keyword.y = canvas.height + 50
        if (keyword.y > canvas.height + 50) keyword.y = -50

        // Subtle opacity animation
        keyword.opacity += (Math.random() - 0.5) * 0.005
        keyword.opacity = Math.max(0.05, Math.min(0.4, keyword.opacity))
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      drawConnections()
      drawParticles()
      drawKeywords()
      
      updateParticles()
      updateKeywords()
      
      animationIdRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    initKeywords()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initParticles()
      initKeywords()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-25 dark:opacity-60"
        style={{ background: 'transparent' }}
      />
      
      {/* Additional floating elements - Reduced count for light mode */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute w-1 h-1 bg-accent rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: 0
            }}
            animate={{
              x: [
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
              ],
              y: [
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)
              ],
              scale: [0, 0.8, 0],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Subtle gradient overlays - Optimized for both themes */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none dark:from-primary/5 dark:to-accent/5" />
      <div className="absolute inset-0 bg-gradient-to-tl from-secondary/2 via-transparent to-primary/2 pointer-events-none dark:from-secondary/5 dark:to-primary/5" />
    </div>
  )
}