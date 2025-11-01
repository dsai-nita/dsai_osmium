import { useState, useEffect } from 'react'
import { Play, Trophy, Star, Clock, CheckCircle, XCircle, RotateCcw, Code, Brain, Gamepad2, Target, Award, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { motion, AnimatePresence } from 'motion/react'
import quizData from '../../assets/quizquestion'

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