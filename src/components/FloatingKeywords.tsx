import { motion } from 'motion/react'

interface Keyword {
  text: string
  category: 'algorithms' | 'frameworks' | 'concepts' | 'applications'
  importance: 'high' | 'medium' | 'low'
}

const mlKeywords: Keyword[] = [
  // Algorithms
  { text: 'Neural Networks', category: 'algorithms', importance: 'high' },
  { text: 'Deep Learning', category: 'algorithms', importance: 'high' },
  { text: 'Random Forest', category: 'algorithms', importance: 'medium' },
  { text: 'SVM', category: 'algorithms', importance: 'medium' },
  { text: 'K-Means', category: 'algorithms', importance: 'medium' },
  { text: 'CNN', category: 'algorithms', importance: 'high' },
  { text: 'RNN', category: 'algorithms', importance: 'high' },
  { text: 'LSTM', category: 'algorithms', importance: 'high' },
  { text: 'Transformer', category: 'algorithms', importance: 'high' },
  { text: 'GAN', category: 'algorithms', importance: 'medium' },

  // Frameworks
  { text: 'TensorFlow', category: 'frameworks', importance: 'high' },
  { text: 'PyTorch', category: 'frameworks', importance: 'high' },
  { text: 'Scikit-learn', category: 'frameworks', importance: 'medium' },
  { text: 'Keras', category: 'frameworks', importance: 'medium' },
  { text: 'Pandas', category: 'frameworks', importance: 'medium' },
  { text: 'NumPy', category: 'frameworks', importance: 'medium' },
  { text: 'OpenCV', category: 'frameworks', importance: 'medium' },

  // Concepts
  { text: 'Gradient Descent', category: 'concepts', importance: 'high' },
  { text: 'Backpropagation', category: 'concepts', importance: 'high' },
  { text: 'Feature Engineering', category: 'concepts', importance: 'medium' },
  { text: 'Cross Validation', category: 'concepts', importance: 'medium' },
  { text: 'Regularization', category: 'concepts', importance: 'medium' },
  { text: 'Overfitting', category: 'concepts', importance: 'medium' },
  { text: 'Hyperparameters', category: 'concepts', importance: 'medium' },
  { text: 'Loss Function', category: 'concepts', importance: 'medium' },
  { text: 'Activation Function', category: 'concepts', importance: 'medium' },
  { text: 'Attention Mechanism', category: 'concepts', importance: 'high' },

  // Applications
  { text: 'Computer Vision', category: 'applications', importance: 'high' },
  { text: 'NLP', category: 'applications', importance: 'high' },
  { text: 'Recommendation Systems', category: 'applications', importance: 'medium' },
  { text: 'Autonomous Vehicles', category: 'applications', importance: 'medium' },
  { text: 'Medical AI', category: 'applications', importance: 'medium' },
  { text: 'Chatbots', category: 'applications', importance: 'low' },
  { text: 'Fraud Detection', category: 'applications', importance: 'low' }
]

interface FloatingKeywordsProps {
  count?: number
  area?: 'full' | 'header' | 'sidebar'
  opacity?: number
  className?: string
}

export function FloatingKeywords({ 
  count = 20, 
  area = 'full',
  opacity = 0.3,
  className = ''
}: FloatingKeywordsProps) {
  const getAreaStyle = () => {
    switch (area) {
      case 'header':
        return 'top-0 left-0 w-full h-64'
      case 'sidebar':
        return 'top-0 right-0 w-64 h-full'
      default:
        return 'inset-0'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'algorithms':
        return 'text-primary'
      case 'frameworks':
        return 'text-secondary'
      case 'concepts':
        return 'text-accent'
      case 'applications':
        return 'text-purple-400'
      default:
        return 'text-muted-foreground'
    }
  }

  const getImportanceSize = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'text-sm'
      case 'medium':
        return 'text-xs'
      case 'low':
        return 'text-xs'
      default:
        return 'text-xs'
    }
  }

  const selectedKeywords = mlKeywords
    .sort(() => Math.random() - 0.5)
    .slice(0, count)

  return (
    <div className={`absolute ${getAreaStyle()} pointer-events-none overflow-hidden ${className}`}>
      {selectedKeywords.map((keyword, index) => (
        <motion.div
          key={`${keyword.text}-${index}`}
          className={`absolute font-mono font-medium ${getCategoryColor(keyword.category)} ${getImportanceSize(keyword.importance)}`}
          initial={{
            x: Math.random() * (area === 'sidebar' ? 200 : window.innerWidth),
            y: Math.random() * (area === 'header' ? 200 : window.innerHeight),
            opacity: 0,
            scale: 0.8,
            rotate: Math.random() * 20 - 10
          }}
          animate={{
            x: [
              Math.random() * (area === 'sidebar' ? 200 : window.innerWidth),
              Math.random() * (area === 'sidebar' ? 200 : window.innerWidth),
              Math.random() * (area === 'sidebar' ? 200 : window.innerWidth)
            ],
            y: [
              Math.random() * (area === 'header' ? 200 : window.innerHeight),
              Math.random() * (area === 'header' ? 200 : window.innerHeight),
              Math.random() * (area === 'header' ? 200 : window.innerHeight)
            ],
            opacity: [0, opacity, opacity * 0.7, opacity, 0],
            scale: [0.8, 1, 0.9, 1, 0.8],
            rotate: [
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
              Math.random() * 20 - 10
            ]
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.5
          }}
          whileHover={{
            scale: 1.2,
            opacity: opacity * 1.5,
            transition: { duration: 0.2 }
          }}
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 5px currentColor",
                "0 0 10px currentColor",
                "0 0 5px currentColor"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {keyword.text}
          </motion.span>
        </motion.div>
      ))}
      
      {/* Additional binary code stream */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`binary-${i}`}
          className="absolute font-mono text-xs text-accent/15 dark:text-accent/20"
          initial={{
            x: Math.random() * (area === 'sidebar' ? 200 : window.innerWidth),
            y: -20,
            opacity: 0
          }}
          animate={{
            y: area === 'header' ? 280 : window.innerHeight + 20,
            opacity: [0, 0.3, 0.2, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5
          }}
        >
          {Array.from({ length: 20 }, () => Math.round(Math.random())).join('')}
        </motion.div>
      ))}

      {/* Geometric shapes for additional visual interest */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * (area === 'sidebar' ? 200 : window.innerWidth),
            y: Math.random() * (area === 'header' ? 200 : window.innerHeight),
            opacity: 0,
            rotate: 0
          }}
          animate={{
            x: [
              Math.random() * (area === 'sidebar' ? 200 : window.innerWidth),
              Math.random() * (area === 'sidebar' ? 200 : window.innerWidth)
            ],
            y: [
              Math.random() * (area === 'header' ? 200 : window.innerHeight),
              Math.random() * (area === 'header' ? 200 : window.innerHeight)
            ],
            opacity: [0, 0.1, 0],
            rotate: 360,
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className={`w-2 h-2 border border-accent/20 dark:border-accent/30 ${i % 2 === 0 ? 'rounded-full' : 'rotate-45'}`} />
        </motion.div>
      ))}
    </div>
  )
}