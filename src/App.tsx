import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Homepage } from './components/Homepage'
import { EventsPage } from './components/EventsPage'
import { InnovationsPage } from './components/InnovationsPage'
import { SquadPage } from './components/SquadPage'
import { Footer } from './components/Footer'
import { AboutPage } from './components/AboutPage'
import { AIspirePage } from './components/AIspirePage'
import { AIspireFormPage } from './components/AIspireFormPage'
import GalleryPage from './components/GalleryPage'
import { LoginPage } from './components/LoginPage'
import { MemberDashboard } from './components/MemberDashboard'
import { QuizPage } from './components/QuizPage'
import { FAQPage } from './components/FAQPage'
import { DevelopersPage } from './components/DevelopersPage'
import BlogPage from './components/BlogPage'
import { FoundersPage } from './components/FoundersPage'
import { Toaster } from './components/ui/sonner'
import { ChatBot } from './components/ChatBot'

// Import splash screen
import SplashScreen from './components/SplashScreen'

// ----------------- Auth Context -----------------
interface AuthContextType {
  userData: any
  isLoggedIn: boolean
  handleLogin: (user: any) => void
  handleLogout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

// ----------------- Protected Route -----------------
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}

// ----------------- Scroll To Top -----------------
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

// ----------------- Main Layout -----------------
function AppLayout() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Initialize theme & auth
  useEffect(() => {
    const savedTheme = localStorage.getItem('dsai-theme')
    if (savedTheme) {
      const isDark = savedTheme === 'dark'
      setIsDarkMode(isDark)
      document.documentElement.classList.toggle('dark', isDark)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('dsai-theme', 'dark')
    }

    const savedUser = localStorage.getItem('dsai-user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserData(user)
      setIsLoggedIn(true)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    document.documentElement.classList.toggle('dark', newTheme)
    localStorage.setItem('dsai-theme', newTheme ? 'dark' : 'light')
  }

  const handleLogin = (user: any) => {
    setUserData(user)
    setIsLoggedIn(true)
    localStorage.setItem('dsai-user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setUserData(null)
    setIsLoggedIn(false)
    localStorage.removeItem('dsai-user')
  }

  const authValue = { userData, isLoggedIn, handleLogin, handleLogout }

  return (
    <AuthContext.Provider value={authValue}>
      <div className="min-h-screen bg-background text-foreground">
        <ScrollToTop />
        <Navigation
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          userData={userData}
        />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/innovations" element={<InnovationsPage />} />
            <Route path="/squad" element={<SquadPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/aispire" element={<AIspirePage />} />
            <Route path="/aispire-form" element={<AIspireFormPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/member-dashboard"
              element={
                <ProtectedRoute>
                  <MemberDashboard userData={userData} />
                </ProtectedRoute>
              }
            />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/founders" element={<FoundersPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
        <Toaster />
      </div>
    </AuthContext.Provider>
  )
}

// ----------------- Main App -----------------
export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} /> 
        
      ) : (
        <AppLayout />
      )}
    </Router>
  )
}