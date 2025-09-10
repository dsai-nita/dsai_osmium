import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from './Icons'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet'

interface NavigationProps {
  isDarkMode: boolean
  onToggleTheme: () => void
  isLoggedIn?: boolean
  userData?: any
}

export function Navigation({ isDarkMode, onToggleTheme, isLoggedIn, userData }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  // Core navigation items (always visible on desktop navbar)
  const coreNavItems = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/innovations', label: 'Innovations' },
    { path: '/squad', label: 'Squad' },
    { path: '/aispire', label: 'AIspire' }
  ]

  // Items that go in hamburger menu
  const menuItems = [
    { path: '/quiz', label: 'Quiz & Polls' },
    { path: '/blog', label: 'Blog' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About Us' },
    { path: '/faq', label: 'FAQ' },
    { path: '/founders', label: 'Founders' },
    { path: '/developers', label: 'Developers' }
  ]

  // Only menu items for mobile (core items excluded since they may be visible elsewhere)
  const mobileMenuItems = menuItems

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-lg p-2 group-hover:scale-110 transition-transform"> */}
                {/* <Icons.Brain className="h-full w-full text-accent-foreground" /> */}
                <img src="/logo.png" alt="DSAI Logo" className="h-12 w-12 object-contain" />
              {/* </div> */}
              <div className="absolute -inset-1 bg-accent/20 rounded-lg blur group-hover:blur-md transition-all opacity-0 group-hover:opacity-100" />
            </div>
            <span className="text-3xl font-bold gradient-text">DSAI</span>
          </Link>

          {/* Desktop Navigation - Core Items */}
          <div className="hidden lg:flex items-center space-x-6">
            {coreNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-lg font-medium transition-all duration-300 hover:text-accent ${
                  currentPath === item.path 
                    ? 'text-accent' 
                    : 'text-foreground hover:text-accent'
                }`}
              >
                {item.label}
                {currentPath === item.path && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent glow-accent" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Hamburger Menu for Additional Items */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 group ${
                    menuItems.some(item => item.path === currentPath) ? 'text-accent' : ''
                  }`}
                  aria-label="Open menu"
                >
                  <Icons.Menu className="h-5 w-5" />
                  <div className="absolute -inset-1 bg-accent/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-md border-border">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Additional navigation options and pages</SheetDescription>
                <div className="flex flex-col space-y-4 mt-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4 p-6 ml-4 gradient-text">More Options</h3>
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMenu}
                      className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                        currentPath === item.path 
                          ? 'text-accent bg-accent/10 border border-accent/20' 
                          : 'text-foreground hover:text-accent hover:bg-accent/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              className="relative text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 group"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative overflow-hidden">
                <Icons.Sun className={`h-5 w-5 transition-all duration-300 ${isDarkMode ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                <Icons.Moon className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${isDarkMode ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
              </div>
              <div className="absolute -inset-1 bg-accent/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            
            {/* Login/User Button */}
            {isLoggedIn && userData ? (
              <Button 
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary text-lg px-4 py-2"
              >
                <Link to="/member-dashboard">{userData.name.split(' ')[0]}</Link>
              </Button>
            ) : (
              <Button 
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary text-lg px-4 py-2"
              >
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Core Navigation - Horizontal Scroll */}
            <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide mr-2">
              {coreNavItems.slice(1).map((item) => ( // Skip home since logo serves that purpose
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-base font-medium whitespace-nowrap transition-all duration-300 hover:text-accent ${
                    currentPath === item.path 
                      ? 'text-accent' 
                      : 'text-foreground hover:text-accent'
                  }`}
                >
                  {item.label}
                  {currentPath === item.path && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent glow-accent" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              className="relative text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 flex-shrink-0"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative overflow-hidden">
                <Icons.Sun className={`h-5 w-5 transition-all duration-300 ${isDarkMode ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                <Icons.Moon className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${isDarkMode ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
              </div>
            </Button>

            {/* Mobile Hamburger Menu for Additional Items */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-foreground hover:text-accent flex-shrink-0 ${
                    menuItems.some(item => item.path === currentPath) ? 'text-accent' : ''
                  }`}
                  aria-label="Open menu"
                >
                  <Icons.Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-md border-border">
                <SheetTitle className="sr-only">Additional Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Additional pages and user options</SheetDescription>
                <div className="flex flex-col space-y-4 mt-8 ml-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4 gradient-text">More Pages</h3>
                  {mobileMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMenu}
                      className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                        currentPath === item.path 
                          ? 'text-accent bg-accent/10 border border-accent/20' 
                          : 'text-foreground hover:text-accent hover:bg-accent/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  {/* Mobile Login Button */}
                  <div className="border-t border-border pt-4 mt-6">
                    {isLoggedIn && userData ? (
                      <Button 
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3"
                      >
                        <Link to="/member-dashboard" onClick={closeMenu}>
                          Dashboard ({userData.name.split(' ')[0]})
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 mr-8"
                      >
                        <Link to="/login" onClick={closeMenu}>Login</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}