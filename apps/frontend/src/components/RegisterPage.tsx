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

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    branch: '',
    year: '',
    github: '',
    linkedin: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setRegisterData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!registerData.name.trim()) {
      toast.error('Validation Error', { description: 'Name is required' });
      return false;
    }
    if (!registerData.email.trim()) {
      toast.error('Validation Error', { description: 'Email is required' });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(registerData.email)) {
      toast.error('Validation Error', { description: 'Please provide a valid email' });
      return false;
    }
    if (!registerData.password) {
      toast.error('Validation Error', { description: 'Password is required' });
      return false;
    }
    if (registerData.password.length < 8) {
      toast.error('Validation Error', { description: 'Password must be at least 8 characters' });
      return false;
    }
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Validation Error', { description: 'Passwords do not match' });
      return false;
    }
    if (!agreeToTerms) {
      toast.error('Validation Error', { description: 'Please agree to the terms and conditions' });
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const user = await register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        branch: registerData.branch || undefined,
        year: registerData.year ? parseInt(registerData.year) : undefined,
      });
      
      toast.success('Registration Successful!', {
        description: `Welcome to DSAI Club, ${user.name}! Redirecting to dashboard...`,
      });
      navigate('/member-dashboard');
    } catch (err: any) {
      toast.error('Registration Failed', {
        description: err?.message || 'Please check your information and try again.',
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
        className="relative z-10 w-full max-w-6xl"
      >
        <Card className="grid md:grid-cols-2 overflow-hidden shadow-2xl border-border/50">
          <div className="hidden md:flex flex-col text-center justify-center p-8 bg-gradient-to-br from-accent/20 to-primary/20">
            <div className="flex flex-col items-center justify-center">
              <BrainCircuit className="w-32 h-32 text-accent/50 mb-6" strokeWidth={1} />
              <h2 className="text-2xl font-bold text-foreground">Join the Future of AI</h2>
              <p className="text-muted-foreground mt-2 text-sm max-w-xs">
                Connect with innovators, learn cutting-edge AI technologies, and grow with DSAI Club.
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-auto pt-8">&copy; {new Date().getFullYear()} DSAI Club</p>
          </div>

          <div className="p-8">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icons.UserPlus className="h-6 w-6 text-accent" />
                Create Account
              </CardTitle>
              <CardDescription>
                Join DSAI Club and start your AI journey
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <Icons.User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      value={registerData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={registerData.email}
                      onChange={handleChange}
                      placeholder="your.email@nita.ac.in"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={handleChange}
                      placeholder="At least 8 characters"
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
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

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={registerData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <Icons.EyeOff className="h-4 w-4" />
                      ) : (
                        <Icons.Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="branch">Branch (Optional)</Label>
                  <div className="relative">
                    <Icons.GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="branch"
                      type="text"
                      value={registerData.branch}
                      onChange={handleChange}
                      placeholder="e.g., CSE, ECE, ME"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="year">Year (Optional)</Label>
                 <input type="number" id="year" value={registerData.year} onChange={handleChange} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>

                <div>
                  <Label htmlFor="github">GitHub Profile (Optional)</Label>
                  <div className="relative">
                    <Icons.Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="github"
                      type="text"
                      value={registerData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                  <div className="relative">
                    <Icons.Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="linkedin"
                      type="text"
                      value={registerData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked: boolean) => setAgreeToTerms(!!checked)}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                    I agree to the terms and conditions
                  </Label>
                </div>

                <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Icons.UserPlus className="h-4 w-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>

              <Separator className="my-6">
                <span className="text-xs text-muted-foreground bg-card px-2">OR</span>
              </Separator>

              <div className="space-y-3">
                <Button variant="outline" className="w-full" onClick={() => toast.info('Coming soon!')}>
                  <Icons.Github className="h-4 w-4 mr-2" />
                  Sign up with GitHub
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{' '}
                <Button variant="link" asChild className="text-accent p-0 h-auto">
                  <Link to="/login">Sign in here</Link>
                </Button>
              </p>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
