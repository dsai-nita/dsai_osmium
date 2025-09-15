import { useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'
import React from 'react'
import { useRef } from 'react'
import {BookAIcon, BookOpen, LucideIcon,Users, Video, Calendar} from 'lucide-react'
interface StatItem {
  id: string
  label: string
  value: number
  suffix: string
  icon: LucideIcon
  color: string
  description: string
  keywords: string[]
}


const statsData: StatItem[] = [
  {
    id: 'projects',
    label: 'AI Projects',
    value: 20,
    suffix: '+',
    icon: BookOpen, // represents learning/projects
    color: 'from-primary to-secondary',
    description: 'Machine Learning Projects Completed',
    keywords: ['TensorFlow', 'PyTorch', 'Deep Learning', 'Neural Networks']
  },
  {
    id: 'members',
    label: 'Active Members',
    value: 50,
    suffix: '+',
    icon: Users, // represents community/members
    color: 'from-secondary to-accent',
    description: 'Data Scientists and AI Enthusiasts',
    keywords: ['Data Science', 'AI Research', 'ML Engineers', 'Students']
  },
  {
    id: 'workshops',
    label: 'Workshops Conducted',
    value: 10,
    suffix: '+',
    icon: Video, // represents sessions/workshops
    color: 'from-accent to-primary',
    description: 'Learning Sessions & Technical Talks',
    keywords: ['Computer Vision', 'NLP', 'Reinforcement Learning', 'MLOps']
  },
  {
    id: 'events',
    label: 'Events',
    value: 8,
    suffix: '+',
    icon: Calendar, // represents scheduled events
    color: 'from-accent to-primary',
    description: 'Learning Sessions & Technical Talks',
    keywords: ['Computer Vision', 'NLP', 'Reinforcement Learning', 'MLOps']
  },
]


export function AnimatedStats() {
  const [counters, setCounters] = useState<Record<string, number>>({})
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    const animateCounters = () => {
      statsData.forEach((stat) => {
        let current = 0
        const increment = stat.value / 100
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.value) {
            current = stat.value
            clearInterval(timer)
          }
          setCounters(prev => ({ ...prev, [stat.id]: Math.floor(current) }))
        }, 30)
      })
    }

    const timeout = setTimeout(animateCounters, 200)
    return () => clearTimeout(timeout)
  }, [isInView])

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-pulse" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="gradient-text mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quantifying our journey in artificial intelligence and data science excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.15,
                rotateY: 5,
                z: 50
              }}
              className="group"
            >
              <div className="relative bg-card border border-border rounded-xl p-8 text-center overflow-hidden h-full hover:border-accent transition-all duration-500 hover:glow-accent">
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Floating keywords background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {stat.keywords.map((keyword, i) => (
                    <motion.div
                      key={keyword}
                      className="absolute text-xs text-muted-foreground/30 font-mono"
                      initial={{ 
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                        opacity: 0
                      }}
                      animate={{ 
                        x: [
                          Math.random() * 200 - 100,
                          Math.random() * 200 - 100,
                          Math.random() * 200 - 100
                        ],
                        y: [
                          Math.random() * 200 - 100,
                          Math.random() * 200 - 100,
                          Math.random() * 200 - 100
                        ],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 20 + i * 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      {keyword}
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Icon with animation */}
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {React.createElement(stat.icon, { className: `w-10 h-10` })}
                  </motion.div>

                  {/* Counter with glow effect */}
                  <div className="mb-2">
                    <motion.span
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      animate={{ 
                        textShadow: [
                          "0 0 10px rgba(100, 255, 218, 0.3)",
                          "0 0 20px rgba(100, 255, 218, 0.5)",
                          "0 0 10px rgba(100, 255, 218, 0.3)"
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {counters[stat.id] || 0}
                    </motion.span>
                    <span className="text-2xl font-bold text-accent ml-1">
                      {stat.suffix}
                    </span>
                  </div>

                  <h3 className="font-medium text-card-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {stat.label}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {stat.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-4 w-full bg-muted rounded-full h-1 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : { width: 0 }}
                      transition={{ 
                        duration: 2,
                        delay: index * 0.3 + 0.5,
                        ease: "easeOut"
                      }}
                    />
                  </div>

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-accent rounded-full"
                        initial={{ 
                          x: "50%",
                          y: "50%",
                          scale: 0
                        }}
                        animate={{ 
                          x: `${50 + (Math.random() - 0.5) * 100}%`,
                          y: `${50 + (Math.random() - 0.5) * 100}%`,
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-4 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-accent rounded-full border-t-transparent"
            />
            <span className="text-muted-foreground font-mono text-sm">
              Continuously evolving through machine learning
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-secondary rounded-full border-b-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}