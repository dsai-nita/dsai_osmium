import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { motion } from 'framer-motion';
import { Home, Calendar, Lightbulb, Users, Sparkles, ClipboardList, BookOpen, Image, Info, Menu, Sun, Moon, User,Zap } from 'lucide-react';

// --- PROPS & DATA ---

interface NavigationProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isLoggedIn?: boolean;
  userData?: { name: string };
}

const allNavItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/events', label: 'Events', icon: Calendar },
  { path: '/innovations', label: 'Innovations', icon: Lightbulb },
  { path: '/squad', label: 'Squad', icon: Users },
  { path: '/aispire', label: 'AIspire', icon: Sparkles },
  { path: '/quiz', label: 'Quiz & Polls', icon: ClipboardList },
  { path: '/blog', label: 'Blog', icon: BookOpen },
  { path: '/gallery', label: 'Gallery', icon: Image },
  { path: '/developers', label: 'Developers', icon: Zap },
  { path: '/founders', label: 'Founders', icon: Sparkles },
  { path: '/about', label: 'About Us', icon: Info },
];

// --- LOGIC FOR DESKTOP & MOBILE ---

// DESKTOP: 5 main links, the rest go into the menu
const desktopNavPaths = ['/', '/events', '/innovations', '/squad', '/aispire'];
const desktopNavItems = allNavItems.filter(item => desktopNavPaths.includes(item.path));
const desktopMoreItems = allNavItems.filter(item => !desktopNavPaths.includes(item.path));

// MOBILE: 2 main links, the rest go into the menu
const mobileVisiblePaths = ['/', '/events'];
const mobileVisibleItems = allNavItems.filter(item => mobileVisiblePaths.includes(item.path));
const mobileMenuItems = allNavItems.filter(item => !mobileVisiblePaths.includes(item.path)); // Corrected Logic


// --- MAIN COMPONENT ---

export function Navigation({ isDarkMode, onToggleTheme, isLoggedIn, userData }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/logo.png" alt="DSAI Logo" className="h-10 w-10 rounded-full object-contain transition-transform group-hover:scale-105" />
            <span className="text-2xl font-bold gradient-text">DSAI</span>
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-1">
              {desktopNavItems.map((item) => (
                <NavLink key={item.path} item={item} currentPath={currentPath} />
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-1">
            {mobileVisibleItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${currentPath === item.path ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'}`}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggleButton isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
            {/* Mobile Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] max-w-xs bg-card/95 backdrop-blur-xl border-border flex flex-col">
                <div className="p-4 border-b border-border">
                  <Link to="/" className="flex items-center space-x-3">
                    <img src="/logo.png" alt="DSAI Logo" className="h-8 w-8 object-contain" />
                    <span className="text-xl font-bold gradient-text">DSAI Club</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {mobileMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-4 px-4 py-3 text-base font-medium rounded-lg transition-colors ${currentPath === item.path ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="p-4 border-t border-border mt-auto">
                  <AuthButton isLoggedIn={isLoggedIn} userData={userData} isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggleButton isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
            {/* Desktop Menu Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] max-w-xs bg-card/95 backdrop-blur-xl border-border flex flex-col">
                <div className="p-4 border-b border-border">
                  <Link to="/" className="flex items-center space-x-3">
                    <img src="/logo.png" alt="DSAI Logo" className="h-8 w-8 object-contain" />
                    <span className="text-xl font-bold gradient-text">More Options</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {desktopMoreItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-4 px-4 py-3 text-base font-medium rounded-lg transition-colors ${currentPath === item.path ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="p-4 border-t border-border mt-auto">
                  <AuthButton isLoggedIn={isLoggedIn} userData={userData} isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

// --- HELPER COMPONENTS ---

function NavLink({ item, currentPath }: { item: { path: string; label: string }, currentPath: string }) {
  const isActive = currentPath === item.path;
  return (
    <Link to={item.path} className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-foreground'}`}>
      {item.label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
          layoutId="active-nav-link"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}
    </Link>
  );
}

function ThemeToggleButton({ isDarkMode, onToggleTheme }: Pick<NavigationProps, 'isDarkMode' | 'onToggleTheme'>) {
  return (
    <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

function AuthButton({ isLoggedIn, userData, isMobile = false }: Pick<NavigationProps, 'isLoggedIn' | 'userData'> & { isMobile?: boolean }) {
  const buttonClass = isMobile ? "w-full text-base py-3" : "px-4";
  return isLoggedIn && userData ? (
    <Button asChild className={buttonClass}>
      <Link to="/member-dashboard">
        <User className="mr-2 h-4 w-4" />
        {userData.name.split(' ')[0]}
      </Link>
    </Button>
  ) : (
    <Button asChild className={buttonClass}>
      <Link to="/login">Login</Link>
    </Button>
  );
}
