import { useState, useEffect } from 'react'
import { Play, Trophy, Star, Clock, CheckCircle, XCircle, RotateCcw, Code, Brain, Gamepad2, Target, Award, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { motion, AnimatePresence } from 'motion/react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  points: number
}

interface Quiz {
  id: string
  title: string
  description: string
  category: 'AI/ML' | 'Fun' | 'Coding'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  questions: Question[]
  totalPoints: number
  timeLimit: number // in minutes
  icon: any
}

const quizData: Quiz[] = [
  {
    id: 'ai-ml-basics',
    title: 'AI/ML Fundamentals',
    description: 'Test your knowledge of artificial intelligence and machine learning basics',
    category: 'AI/ML',
    difficulty: 'Easy',
    totalPoints: 150,
    timeLimit: 15,
    icon: Brain,
    questions: [
      {
        id: 1,
        question: "What does 'AI' stand for?",
        options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Adaptive Intelligence"],
        correctAnswer: 0,
        explanation: "AI stands for Artificial Intelligence, which refers to the simulation of human intelligence in machines.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "Which of the following is a supervised learning algorithm?",
        options: ["K-means clustering", "Linear Regression", "PCA", "DBSCAN"],
        correctAnswer: 1,
        explanation: "Linear Regression is a supervised learning algorithm used for predicting continuous values.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 3,
        question: "What is the primary goal of deep learning?",
        options: ["Data visualization", "Pattern recognition", "Data storage", "Web development"],
        correctAnswer: 1,
        explanation: "Deep learning aims to automatically learn and extract patterns from data using neural networks.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 4,
        question: "Which Python library is most commonly used for machine learning?",
        options: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
        correctAnswer: 2,
        explanation: "Scikit-learn is the most popular Python library specifically designed for machine learning.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 5,
        question: "What is overfitting in machine learning?",
        options: [
          "When a model performs well on both training and test data",
          "When a model performs well on training data but poorly on test data",
          "When a model performs poorly on both training and test data",
          "When a model takes too long to train"
        ],
        correctAnswer: 1,
        explanation: "Overfitting occurs when a model learns the training data too well, including noise, making it perform poorly on new data.",
        difficulty: 'Hard',
        points: 25
      },
      {
        id: 6,
        question: "What is the main difference between AI and Machine Learning?",
        options: [
          "AI and ML are the same thing",
          "AI is a subset of ML",
          "ML is a subset of AI",
          "They are completely unrelated"
        ],
        correctAnswer: 2,
        explanation: "Machine Learning is a subset of Artificial Intelligence that focuses on algorithms that can learn from data.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 7,
        question: "Which activation function is most commonly used in hidden layers of deep neural networks?",
        options: ["Sigmoid", "Tanh", "ReLU", "Linear"],
        correctAnswer: 2,
        explanation: "ReLU (Rectified Linear Unit) is widely used because it helps avoid the vanishing gradient problem and is computationally efficient.",
        difficulty: 'Hard',
        points: 20
      },
      {
        id: 8,
        question: "What does 'GPU' acceleration primarily help with in AI/ML?",
        options: [
          "Data storage",
          "Parallel computation for matrix operations",
          "Network connectivity",
          "Memory management"
        ],
        correctAnswer: 1,
        explanation: "GPUs excel at parallel processing, making them ideal for the matrix operations common in neural network training.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 9,
        question: "What is the purpose of the validation set in machine learning?",
        options: [
          "To train the model",
          "To test the final model performance",
          "To tune hyperparameters and prevent overfitting",
          "To store backup data"
        ],
        correctAnswer: 2,
        explanation: "The validation set is used to tune hyperparameters and select the best model while avoiding overfitting to the test set.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 10,
        question: "Which technique is used to handle the 'vanishing gradient problem' in deep networks?",
        options: [
          "Batch Normalization",
          "Dropout",
          "Data Augmentation",
          "Feature Scaling"
        ],
        correctAnswer: 0,
        explanation: "Batch Normalization helps stabilize training and mitigate the vanishing gradient problem by normalizing inputs to each layer.",
        difficulty: 'Hard',
        points: 25
      }
    ]
  },
  {
    id: 'fun-tech',
    title: 'Tech Trivia Challenge',
    description: 'Fun technology and programming trivia questions',
    category: 'Fun',
    difficulty: 'Medium',
    totalPoints: 80,
    timeLimit: 10,
    icon: Gamepad2,
    questions: [
      {
        id: 1,
        question: "Who is known as the father of computer science?",
        options: ["Bill Gates", "Steve Jobs", "Alan Turing", "Tim Berners-Lee"],
        correctAnswer: 2,
        explanation: "Alan Turing is widely considered the father of computer science and artificial intelligence.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 2,
        question: "What does 'HTTP' stand for?",
        options: ["HyperText Transfer Protocol", "HyperText Translation Protocol", "High Tech Transfer Protocol", "Home Tool Transfer Protocol"],
        correctAnswer: 0,
        explanation: "HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the web.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 3,
        question: "Which company created the programming language 'Go'?",
        options: ["Microsoft", "Apple", "Google", "Facebook"],
        correctAnswer: 2,
        explanation: "Go (also known as Golang) was created by Google in 2009.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 4,
        question: "What year was the first iPhone released?",
        options: ["2006", "2007", "2008", "2009"],
        correctAnswer: 1,
        explanation: "The first iPhone was released by Apple in June 2007.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 5,
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correctAnswer: 2,
        explanation: "JavaScript is often called the 'language of the web' as it's essential for web development.",
        difficulty: 'Easy',
        points: 10
      }
    ]
  },
  {
    id: 'python-coding',
    title: 'Python Programming Quiz',
    description: 'Test your Python programming knowledge with coding challenges',
    category: 'Coding',
    difficulty: 'Hard',
    totalPoints: 200,
    timeLimit: 25,
    icon: Code,
    questions: [
      {
        id: 1,
        question: "What will be the output of: print(type([]))?",
        options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'dict'>"],
        correctAnswer: 1,
        explanation: "[] creates an empty list, so type([]) returns <class 'list'>.",
        difficulty: 'Easy',
        points: 15
      },
      {
        id: 2,
        question: "Which method is used to add an element to the end of a list in Python?",
        options: ["add()", "append()", "insert()", "extend()"],
        correctAnswer: 1,
        explanation: "The append() method adds a single element to the end of a list.",
        difficulty: 'Easy',
        points: 15
      },
      {
        id: 3,
        question: "What is the output of: len('Hello\\nWorld')?",
        options: ["10", "11", "12", "Error"],
        correctAnswer: 1,
        explanation: "The string 'Hello\\nWorld' has 11 characters including the newline character \\n.",
        difficulty: 'Medium',
        points: 20
      },
      {
        id: 4,
        question: "What does the following code return: [x**2 for x in range(3)]?",
        options: ["[0, 1, 2]", "[0, 1, 4]", "[1, 4, 9]", "Error"],
        correctAnswer: 1,
        explanation: "This list comprehension squares each number in range(3), which is [0, 1, 2], resulting in [0, 1, 4].",
        difficulty: 'Medium',
        points: 25
      },
      {
        id: 5,
        question: "What is the difference between '==' and 'is' in Python?",
        options: [
          "No difference, they work the same",
          "'==' compares values, 'is' compares object identity",
          "'==' compares object identity, 'is' compares values",
          "Both are used for assignment"
        ],
        correctAnswer: 1,
        explanation: "'==' compares if two objects have the same value, while 'is' compares if two objects are the same object in memory.",
        difficulty: 'Hard',
        points: 30
      },
      {
        id: 6,
        question: "What is the output of: print(*[1, 2, 3], sep='-')?",
        options: ["1-2-3", "[1, 2, 3]", "1 2 3", "Error"],
        correctAnswer: 0,
        explanation: "The * operator unpacks the list, and sep='-' sets the separator for print(), resulting in '1-2-3'.",
        difficulty: 'Medium',
        points: 20
      },
      {
        id: 7,
        question: "Which Python library is primarily used for data manipulation and analysis?",
        options: ["NumPy", "Pandas", "Matplotlib", "TensorFlow"],
        correctAnswer: 1,
        explanation: "Pandas is the go-to library for data manipulation and analysis in Python.",
        difficulty: 'Easy',
        points: 15
      },
      {
        id: 8,
        question: "What does the 'lambda' keyword do in Python?",
        options: [
          "Creates a class",
          "Creates an anonymous function",
          "Imports a module",
          "Defines a variable"
        ],
        correctAnswer: 1,
        explanation: "Lambda creates anonymous functions that can be used inline, especially useful with functions like map(), filter(), and reduce().",
        difficulty: 'Medium',
        points: 20
      },
      {
        id: 9,
        question: "What is the output of: list(map(lambda x: x*2, [1, 2, 3]))?",
        options: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "Error"],
        correctAnswer: 1,
        explanation: "map() applies the lambda function (x*2) to each element in the list, doubling each value.",
        difficulty: 'Hard',
        points: 25
      },
      {
        id: 10,
        question: "Which of the following is NOT a mutable data type in Python?",
        options: ["List", "Dictionary", "Set", "Tuple"],
        correctAnswer: 3,
        explanation: "Tuples are immutable in Python, meaning their contents cannot be changed after creation.",
        difficulty: 'Medium',
        points: 20
      }
    ]
  },
  {
    id: 'career-poll',
    title: 'Will AI Take Your Job? Poll',
    description: 'Interactive poll about AI impact on various careers and job prospects',
    category: 'Fun',
    difficulty: 'Easy',
    totalPoints: 80,
    timeLimit: 10,
    icon: Target,
    questions: [
      {
        id: 1,
        question: "Do you think AI will completely replace software developers in the next 10 years?",
        options: ["Yes, completely", "Partially, for simple tasks", "No, but will augment their work", "Not at all"],
        correctAnswer: 2,
        explanation: "Most experts believe AI will augment developers' work rather than replace them completely, helping with routine tasks while humans focus on creative problem-solving.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "Which job role do you think is MOST safe from AI automation?",
        options: ["Data Entry Clerk", "Creative Artist", "Customer Service Rep", "Accountant"],
        correctAnswer: 1,
        explanation: "Creative roles requiring emotional intelligence, artistic vision, and human experience are generally considered safer from AI automation.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 3,
        question: "What percentage of current jobs do you think will be significantly impacted by AI by 2030?",
        options: ["Less than 25%", "25-50%", "50-75%", "More than 75%"],
        correctAnswer: 1,
        explanation: "Studies suggest 25-50% of jobs will be significantly impacted, but this includes both job displacement and job enhancement.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 4,
        question: "If you could choose one AI skill to learn today, what would it be?",
        options: ["Prompt Engineering", "Machine Learning", "AI Ethics", "Data Analysis"],
        correctAnswer: 1,
        explanation: "While all are valuable, Machine Learning provides the foundational understanding needed for the AI-driven future across multiple industries.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 5,
        question: "Do you think AI will create more jobs than it eliminates?",
        options: ["Yes, definitely", "Probably yes", "Probably no", "No, definitely not"],
        correctAnswer: 1,
        explanation: "Historical patterns with technology suggest new types of jobs typically emerge, though there may be transition challenges.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 6,
        question: "Which industry do you think will be MOST transformed by AI?",
        options: ["Healthcare", "Education", "Transportation", "Entertainment"],
        correctAnswer: 0,
        explanation: "Healthcare is seeing rapid AI adoption in diagnostics, drug discovery, personalized medicine, and treatment planning.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 7,
        question: "What's your biggest concern about AI in the workplace?",
        options: ["Job displacement", "Privacy issues", "Bias and fairness", "Over-dependence on technology"],
        correctAnswer: 2,
        explanation: "While all are valid concerns, bias and fairness in AI systems can have far-reaching societal impacts that need careful attention.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 8,
        question: "How prepared do you feel for the AI-driven job market?",
        options: ["Very prepared", "Somewhat prepared", "Not very prepared", "Not prepared at all"],
        correctAnswer: 1,
        explanation: "Most people fall into 'somewhat prepared' - awareness is growing, but continuous learning and adaptation are key.",
        difficulty: 'Easy',
        points: 10
      }
    ]
  },
  {
    id: 'ai-tools-quiz',
    title: 'AI Tools & Technologies',
    description: 'Test your knowledge of popular AI tools, frameworks, and technologies',
    category: 'AI/ML',
    difficulty: 'Medium',
    totalPoints: 120,
    timeLimit: 18,
    icon: Zap,
    questions: [
      {
        id: 1,
        question: "Which company developed the ChatGPT language model?",
        options: ["Google", "OpenAI", "Meta", "Microsoft"],
        correctAnswer: 1,
        explanation: "ChatGPT was developed by OpenAI, founded by Sam Altman and others.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 2,
        question: "What does 'GPT' stand for in ChatGPT?",
        options: [
          "General Purpose Technology",
          "Generative Pre-trained Transformer",
          "Global Processing Tool",
          "Generative Programming Tool"
        ],
        correctAnswer: 1,
        explanation: "GPT stands for Generative Pre-trained Transformer, a type of neural network architecture.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 3,
        question: "Which deep learning framework was developed by Google?",
        options: ["PyTorch", "TensorFlow", "Keras", "Caffe"],
        correctAnswer: 1,
        explanation: "TensorFlow was developed by Google and is one of the most popular deep learning frameworks.",
        difficulty: 'Easy',
        points: 10
      },
      {
        id: 4,
        question: "What is DALL-E primarily used for?",
        options: [
          "Text generation",
          "Image generation from text",
          "Speech recognition",
          "Language translation"
        ],
        correctAnswer: 1,
        explanation: "DALL-E is an AI system that generates images from textual descriptions.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 5,
        question: "Which technique is commonly used for training large language models?",
        options: [
          "Supervised learning only",
          "Unsupervised learning only",
          "Self-supervised learning",
          "Reinforcement learning only"
        ],
        correctAnswer: 2,
        explanation: "Self-supervised learning allows models to learn from large amounts of unlabeled text data.",
        difficulty: 'Hard',
        points: 20
      },
      {
        id: 6,
        question: "What is the primary advantage of using Jupyter Notebooks for data science?",
        options: [
          "Faster execution speed",
          "Interactive development and documentation",
          "Better security",
          "Lower memory usage"
        ],
        correctAnswer: 1,
        explanation: "Jupyter Notebooks allow interactive development with code, visualizations, and documentation in one place.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 7,
        question: "Which cloud platform offers pre-trained AI models through AutoML?",
        options: ["Only AWS", "Only Google Cloud", "Only Azure", "All major cloud platforms"],
        correctAnswer: 3,
        explanation: "AWS, Google Cloud, and Azure all offer AutoML services with pre-trained models.",
        difficulty: 'Medium',
        points: 15
      },
      {
        id: 8,
        question: "What is the main purpose of using Docker in AI/ML projects?",
        options: [
          "Data visualization",
          "Environment consistency and deployment",
          "Data storage",
          "Model training acceleration"
        ],
        correctAnswer: 1,
        explanation: "Docker ensures consistent environments across development, testing, and production for AI/ML applications.",
        difficulty: 'Hard',
        points: 20
      }
    ]
  }
]

export function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  // Timer effect
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && quizStarted && !quizCompleted) {
      handleQuizComplete()
    }
  }, [timeLeft, quizStarted, quizCompleted])

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setUserAnswers([])
    setShowResult(false)
    setTimeLeft(quiz.timeLimit * 60) // Convert minutes to seconds
    setQuizStarted(true)
    setQuizCompleted(false)
    setScore(0)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null && selectedQuiz) {
      const newAnswers = [...userAnswers, selectedAnswer]
      setUserAnswers(newAnswers)

      if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
      } else {
        handleQuizComplete(newAnswers)
      }
    }
  }

  const handleQuizComplete = (answers = userAnswers) => {
    if (!selectedQuiz) return

    let totalScore = 0
    answers.forEach((answer, index) => {
      if (answer === selectedQuiz.questions[index].correctAnswer) {
        totalScore += selectedQuiz.questions[index].points
      }
    })

    setScore(totalScore)
    setQuizCompleted(true)
    setQuizStarted(false)
    setShowResult(true)
  }

  const resetQuiz = () => {
    setSelectedQuiz(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setUserAnswers([])
    setShowResult(false)
    setTimeLeft(0)
    setQuizStarted(false)
    setQuizCompleted(false)
    setScore(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreGrade = (score: number, totalPoints: number) => {
    const percentage = (score / totalPoints) * 100
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-500', message: 'Outstanding!' }
    if (percentage >= 80) return { grade: 'A', color: 'text-green-400', message: 'Excellent!' }
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-400', message: 'Good job!' }
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-400', message: 'Keep learning!' }
    return { grade: 'D', color: 'text-red-400', message: 'Try again!' }
  }

  // Quiz Selection View
  if (!selectedQuiz) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-b from-background via-background to-card">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="gradient-text mb-6">
                Quiz & Learning Center
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Test your knowledge, learn new concepts, and earn points with our interactive quizzes
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
              <div className="bg-card border border-border rounded-lg p-6 glow-accent">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-card-foreground mb-2">Total Quizzes</h3>
                <p className="text-2xl font-bold gradient-text">{quizData.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 glow-cyan">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mx-auto mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-medium text-card-foreground mb-2">Total Questions</h3>
                <p className="text-2xl font-bold gradient-text">
                  {quizData.reduce((total, quiz) => total + quiz.questions.length, 0)}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 glow-primary">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-medium text-card-foreground mb-2">Max Points</h3>
                <p className="text-2xl font-bold gradient-text">
                  {quizData.reduce((total, quiz) => total + quiz.totalPoints, 0)}
                </p>
              </div>
            </motion.div>

            {/* Quiz Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizData.map((quiz, index) => {
                const Icon = quiz.icon
                const categoryColors = {
                  'AI/ML': 'bg-primary/10 text-primary border-primary/20',
                  'Fun': 'bg-secondary/10 text-secondary border-secondary/20',
                  'Coding': 'bg-accent/10 text-accent border-accent/20'
                }
                
                return (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="p-6 h-full hover:border-accent transition-all duration-300 group hover:glow-accent cursor-pointer">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${categoryColors[quiz.category]}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2">
                            {quiz.category}
                          </Badge>
                          <h3 className="font-medium text-card-foreground group-hover:text-accent transition-colors">
                            {quiz.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                        {quiz.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-6 text-sm">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {quiz.timeLimit}m
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                            {quiz.totalPoints} pts
                          </span>
                        </div>
                        <Badge variant={quiz.difficulty === 'Easy' ? 'default' : quiz.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                      
                      <Button 
                        onClick={() => startQuiz(quiz)}
                        className="w-full group-hover:glow-primary"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Quiz
                      </Button>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Quiz Result View
  if (showResult && selectedQuiz) {
    const gradeInfo = getScoreGrade(score, selectedQuiz.totalPoints)
    const percentage = Math.round((score / selectedQuiz.totalPoints) * 100)
    
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-b from-background via-background to-card flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 text-center glow-accent">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h2 className="gradient-text mb-2">Quiz Completed!</h2>
              <p className="text-muted-foreground">{selectedQuiz.title}</p>
            </div>
            
            <div className="mb-8">
              <div className="text-6xl font-bold mb-2 gradient-text">
                {percentage}%
              </div>
              <div className={`text-2xl font-bold mb-4 ${gradeInfo.color}`}>
                Grade: {gradeInfo.grade}
              </div>
              <p className="text-xl text-muted-foreground mb-4">
                {gradeInfo.message}
              </p>
              <p className="text-muted-foreground">
                You scored {score} out of {selectedQuiz.totalPoints} points
              </p>
            </div>
            
            <Progress value={percentage} className="mb-8" />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Another Quiz
              </Button>
              <Button onClick={() => startQuiz(selectedQuiz)}>
                <Play className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Quiz Taking View
  const currentQuestion = selectedQuiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-background via-background to-card">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quiz Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="gradient-text">{selectedQuiz.title}</h1>
              <p className="text-muted-foreground">
                Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary mb-1">
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-muted-foreground">Time remaining</p>
            </div>
          </div>
          <Progress value={progress} className="mb-4" />
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 glow-accent">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant={currentQuestion.difficulty === 'Easy' ? 'default' : currentQuestion.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                  {currentQuestion.difficulty}
                </Badge>
                <Badge variant="outline">
                  {currentQuestion.points} points
                </Badge>
              </div>
              <h2 className="text-xl font-medium text-card-foreground mb-6">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left border rounded-lg transition-all duration-300 ${
                    selectedAnswer === index
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-card-foreground hover:border-accent hover:bg-accent/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={resetQuiz}
              >
                Exit Quiz
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="glow-primary"
              >
                {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}