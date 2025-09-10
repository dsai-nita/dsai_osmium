import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { toast } from 'sonner@2.0.3'
import { useAuth } from '../App'

export function LoginPage() {
  const navigate = useNavigate()
  const { handleLogin: authLogin } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  // Mock user data for demonstration
  const mockUsers = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@nita.ac.in",
      password: "password123",
      role: "President",
      department: "Computer Science & Engineering",
      year: "4th Year",
      rollNumber: "2021UCS001",
      joinDate: "January 2023",
      projects: 8,
      events: 15,
      achievements: ["Best Project Award 2024", "AI Innovation Challenge Winner"],
      bio: "Passionate about machine learning and computer vision. Leading the DSAI club with a vision to make AI accessible to everyone.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY0OTczNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      name: "Demo User",
      email: "demo@nita.ac.in",
      password: "demo123",
      role: "Member",
      department: "Electronics & Communication",
      year: "3rd Year",
      rollNumber: "2022UEC045",
      joinDate: "March 2024",
      projects: 3,
      events: 8,
      achievements: ["Workshop Completion Certificate"],
      bio: "Exploring the intersection of AI and hardware design.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY0OTczODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock authentication
    const user = mockUsers.find(u => u.email === loginData.email && u.password === loginData.password)
    
    if (user) {
      toast.success(`Welcome back, ${user.name}!`)
      authLogin(user)
      navigate('/member-dashboard')
    } else {
      toast.error('Invalid email or password. Contact Admin')
    }

    setIsLoading(false)
  }



  return (
    <div className="min-h-screen pt-24 pb-24 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">DSAI Member Portal</h1>
          <p className="text-muted-foreground">
            Secure login for DSAI club members only
          </p>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.LogIn className="h-5 w-5 text-accent" />
              Member Login
            </CardTitle>
            <CardDescription>
              Enter your member credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email Address</Label>
                <div className="relative">
                  <Icons.Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@nita.ac.in"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Icons.Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 px-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Icons.EyeOff className="h-4 w-4" />
                    ) : (
                      <Icons.Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={loginData.rememberMe}
                    onCheckedChange={(checked) => 
                      setLoginData(prev => ({ ...prev, rememberMe: checked as boolean }))
                    }
                  />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Button variant="link" className="text-accent p-0 h-auto">
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign In to Dashboard'
                )}
              </Button>

              {/* Demo Credentials */}
              {/* <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm font-medium mb-2">Demo Credentials:</p>
                <p className="text-xs text-muted-foreground mb-1">
                  Email: demo@nita.ac.in
                </p>
                <p className="text-xs text-muted-foreground">
                  Password: demo123
                </p>
              </div> */}
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <Icons.Lock className="h-8 w-8 text-accent mx-auto mb-3" />
            <p className="text-sm font-medium mb-2">Members Only Access</p>
            <p className="text-xs text-muted-foreground">
              This portal is exclusively for registered DSAI club members. 
              If you're interested in joining, please check out our {' '}
              <Button 
                variant="link" 
                className="text-accent p-0 h-auto text-xs"
                asChild
              >
                <Link to="/aispire">AIspire orientation program</Link>
              </Button>
              .
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Need help accessing your account? {' '}
            <Button 
              variant="link" 
              className="text-accent p-0 h-auto"
              asChild
            >
              <Link to="/contact">Contact our support team</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}