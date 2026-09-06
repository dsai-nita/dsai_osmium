import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, BrainCircuit } from 'lucide-react';
import { Icons } from './Icons';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '../Context/AuthContext';
import { motion } from 'motion/react';
import { AnimatedBackground } from './AnimatedBackground';
import { FloatingKeywords } from './FloatingKeywords';
import { Separator } from './ui/separator';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData(prev => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting login :', loginData);
      const user = await login(loginData.email, loginData.password);
      toast.success(`Welcome back, ${user.name}!`, {
        description: 'Redirecting you to your dashboard...',
      });
      navigate('/member-dashboard');
    } catch (err: any) {
      toast.error('Invalid Credentials', {
        description: err?.message || 'Please check your email and password, or contact an admin.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 pt-24 pb-12">
      <AnimatedBackground />
      <FloatingKeywords count={8} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-4xl"
      >
        <Card className="grid md:grid-cols-2 overflow-hidden shadow-2xl border-border/50">
          <div className="hidden md:flex flex-col text-center justify-center p-8 bg-gradient-to-br from-primary/20 to-accent/20">
            <div className="flex flex-col items-center justify-center">
                <BrainCircuit className="w-32 h-32 text-accent/50 mb-6" strokeWidth={1} />
                <h2 className="text-2xl font-bold text-foreground">Welcome Back to the Future of AI</h2>
                <p className="text-muted-foreground mt-2 text-sm max-w-xs">
                    Access your personalized dashboard, track your progress, and connect with fellow innovators.
                </p>
            </div>
            <p className="text-xs text-muted-foreground mt-auto pt-8">&copy; {new Date().getFullYear()} DSAI Club</p>
          </div>

          <div className="p-8">
            <CardHeader className="px-0">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icons.LogIn className="h-6 w-6 text-accent" />
                Member Portal Login
              </CardTitle>
              <CardDescription>
                Enter your credentials to access the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" value={loginData.email} onChange={handleChange} placeholder="your.email@nita.ac.in" className="pl-10" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? "text" : "password"} value={loginData.password} onChange={handleChange} placeholder="Enter your password" className="pl-10 pr-10" required />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Icons.EyeOff className="h-4 w-4" /> : <Icons.Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rememberMe" checked={loginData.rememberMe} onCheckedChange={(checked:boolean) => setLoginData(prev => ({ ...prev, rememberMe: !!checked }))} />
                    <Label htmlFor="rememberMe">Remember me</Label>
                  </div>
                <Button
  variant="link"
  className="text-accent p-0 h-auto"
  onClick={() => alert("Please contact administrator to reset your password.")}
>
  Forgot password?
</Button>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Icons.LogIn className="h-4 w-4 mr-2" />}
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              
              <Separator className="my-6">
                <span className="text-xs text-muted-foreground bg-card px-2">OR</span>
              </Separator>
              
              <div className="space-y-3">
                 <Button variant="outline" className="w-full" onClick={() => toast.info("Coming soon!")}>
                    <Icons.Github className="h-4 w-4 mr-2" />
                    Continue with GitHub
                 </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                New to DSAI Club?{' '}
                <Button variant="link" asChild className="text-accent p-0 h-auto">
                  <Link to="/register">Create an account</Link>
                </Button>
              </p>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}