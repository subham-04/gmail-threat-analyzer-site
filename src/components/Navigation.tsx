import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Shield, Menu, X, ChevronDown } from "lucide-react"
import { trackPageNavigation } from "../lib/dataCollection"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false)
  const location = useLocation()

  // Track navigation when location changes
  useEffect(() => {
    trackPageNavigation(location.pathname).catch(console.error);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "AI Analytics", path: "/premium-ai" },
    { name: "Demo", path: "/demo" },
    { name: "Download", path: "/download" },
    { name: "Technology", path: "/technology" },
    { name: "Usage", path: "/usage" },
  ]

  // Split nav items for tablet view
  const visibleNavItems = navItems.slice(0, 4) // First 4 items
  const moreNavItems = navItems.slice(4) // Remaining items

  const isActive = (path: string) => location.pathname === path

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setIsMoreDropdownOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMoreDropdownOpen(false)
    }
    
    if (isMoreDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMoreDropdownOpen])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-xl border-border/50 shadow-sm' 
        : 'bg-background/80 backdrop-blur-lg border-border'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo - Responsive sizing */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            <span className="text-lg sm:text-xl font-bold text-foreground truncate">
              <span className="hidden sm:inline">Gmail Threat Analyzer</span>
              <span className="sm:hidden">GTA</span>
            </span>
          </Link>

          {/* Desktop Navigation - Better spacing and hover effects */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-accent/50 hover:scale-105 relative group ${
                  isActive(item.path) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {/* Animated underline on hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Tablet Navigation - Enhanced with More dropdown */}
          <div className="hidden md:flex lg:hidden items-center">
            <div className="flex items-center space-x-1">
              {/* Visible nav items */}
              {visibleNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    isActive(item.path) 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* More dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMoreDropdownOpen(!isMoreDropdownOpen)
                  }}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap flex items-center gap-1 ${
                    moreNavItems.some(item => isActive(item.path))
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  More
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${
                    isMoreDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* Dropdown menu */}
                {isMoreDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-lg min-w-[120px] z-50">
                    <div className="py-1">
                      {moreNavItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block px-3 py-2 text-sm transition-colors hover:bg-accent/50 ${
                            isActive(item.path)
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          onClick={() => setIsMoreDropdownOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop CTA - Responsive sizing */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs xl:text-sm hover:scale-105 transition-all duration-200"
              onClick={() => window.open('https://www.youtube.com/watch?v=sSqZGpjCEHE', '_blank')}
            >
              <span className="hidden xl:inline">Watch Demo</span>
              <span className="xl:hidden">Demo</span>
            </Button>
          </div>

          {/* Mobile menu button - Better touch target */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-accent/50 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`} 
                />
                <X 
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`} 
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced with animations */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-6 space-y-1 bg-background/95 backdrop-blur-sm border-t border-border/50">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 transform ${
                  isActive(item.path) 
                    ? "text-primary bg-primary/10 border-l-4 border-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                }`}
                style={{ 
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isOpen ? 1 : 0
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile CTA buttons */}
            <div className="flex flex-col gap-3 px-2 pt-6 border-t border-border/30">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full justify-center"
                onClick={() => {
                  window.open('https://www.youtube.com/watch?v=sSqZGpjCEHE', '_blank')
                  setIsOpen(false)
                }}
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  )
}
