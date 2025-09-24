import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { useState, useEffect } from "react"
import { 
  Shield, 
  Brain, 
  Target, 
  Eye, 
  TrendingUp, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Bot, 
  Cpu, 
  Search, 
  Lightbulb,
  Crown,
  Rocket,
  Globe,
  Bell,
  X,
  User,
  Mail,
  Briefcase
} from "lucide-react"
import { 
  submitUserRegistration, 
  trackButtonClick, 
  trackFormStart,
  trackFormSubmission,
  initializeAnalytics
} from "../lib/dataCollection"
import { DownloadForm } from "../components/DownloadForm"
import { useDownloadPermission } from "../hooks/useDownloadPermission"

export function AiAnalytics() {
  const [showNotifyPopup, setShowNotifyPopup] = useState(false)
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const { hasPermission, grantPermission } = useDownloadPermission()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    useCase: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Initialize analytics only when user interacts
  useEffect(() => {
    // Analytics will be initialized when user performs meaningful actions
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNotifyClick = async () => {
    // Initialize analytics on first user interaction
    await initializeAnalytics();
    
    // Track button click
    await trackButtonClick('notify-me-hero-button', '/premium-ai');
    setShowNotifyPopup(true);
    
    // Track form start
    await trackFormStart('early-access-form');
  };

  const handleDemoClick = async () => {
    await initializeAnalytics();
    await trackButtonClick('demo-button', '/premium-ai');
    window.open('/demo', '_self');
  };

  const handleDownloadClick = async () => {
    await initializeAnalytics();
    await trackButtonClick('download-button', '/premium-ai');
    
    if (hasPermission) {
      // User has already submitted form, proceed with download
      window.open('https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/', '_blank')
    } else {
      // Show form first
      setShowDownloadForm(true)
    }
  };

  // Handle download form submission
  const handleDownloadFormSubmit = (userData: any) => {
    grantPermission(userData)
    setShowDownloadForm(false)
    // Proceed with download after form submission
    setTimeout(() => {
      window.open('https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/', '_blank')
    }, 500)
  }

  const handleWatchDemoClick = async () => {
    await trackButtonClick('watch-demo-button', '/premium-ai');
    window.open('/demo', '_self');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Track form submission
      await trackFormSubmission('early-access-form', formData.email);
      
      // Submit to Firebase
      const signupId = await submitUserRegistration(formData);
      console.log('Early Access Registration successful:', signupId);
      
      // Check if user was already registered
      if (signupId === 'ALREADY_REGISTERED') {
        console.log('✅ User already registered, granting download access');
        setIsSubmitted(true);
        setSubmitError('Welcome back! You already have access. You can now download the extension.');
        
        // Close popup after 3 seconds and allow download
        setTimeout(() => {
          setShowNotifyPopup(false);
          setIsSubmitted(false);
          setFormData({ name: '', email: '', occupation: '', useCase: '' });
        }, 3000);
        
        return;
      }
      
      setIsSubmitted(true)
      
      // Close popup after 3 seconds
      setTimeout(() => {
        setShowNotifyPopup(false)
        setIsSubmitted(false)
        setFormData({ name: '', email: '', occupation: '', useCase: '' })
      }, 3000)
      
    } catch (error) {
      console.error('Error submitting early access signup:', error);
      setSubmitError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6 animate-in slide-in-from-top-4 duration-700">
              <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border-purple-500/30 hover:scale-105 transition-transform duration-300">
                <Crown className="h-5 w-5 mr-2 animate-pulse" />
                AI Analytics
              </Badge>
              <Badge className="text-sm px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30 animate-bounce">
                NEW
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl mb-6 animate-in slide-in-from-bottom-4 duration-700">
              Advanced AI-Powered
              <span className="block gradient-text-animated mt-2 sm:mt-4">
                Threat Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-in slide-in-from-bottom-4 duration-700 delay-400">
              Go beyond basic URL scanning with advanced AI analysis that understands filename patterns, 
              double extensions, and sophisticated social engineering techniques visible in Gmail's interface.
            </p>

            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 group animate-in slide-in-from-left-4 duration-700 delay-100 hover:scale-105 transition-all">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                  <Brain className="h-6 w-6 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">AI Context Analysis</div>
                  <div className="text-sm text-muted-foreground">Understands email context</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 group animate-in slide-in-from-bottom-4 duration-700 delay-200 hover:scale-105 transition-all">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                  <Target className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Pattern Recognition</div>
                  <div className="text-sm text-muted-foreground">Detects sophisticated attacks</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 group animate-in slide-in-from-right-4 duration-700 delay-300 hover:scale-105 transition-all">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">
                  <TrendingUp className="h-6 w-6 text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Smart Scoring</div>
                  <div className="text-sm text-muted-foreground">Intelligent threat rating</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 duration-700 delay-500"
                onClick={handleNotifyClick}
              >
                <Bell className="h-6 w-6 mr-3 animate-pulse" />
                Notify Me When Ready
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 duration-700 delay-600"
                onClick={handleDemoClick}
              >
                <Rocket className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Experience AI Analytics
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI vs Traditional Comparison */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6 animate-in slide-in-from-bottom-4 duration-700">
                Why AI-Powered Analysis?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-700 delay-200">
                Basic tools only check URL reputation. Our AI analyzes comprehensive VirusTotal data, sender domains, filenames, and body content patterns for enhanced protection.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Traditional Analysis */}
              <Card className="bg-gradient-to-br from-red-500/5 to-orange-500/5 border-red-500/20 animate-in slide-in-from-left-4 duration-700 delay-100 hover:scale-105 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                      <Search className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <div>Traditional VirusTotal Only</div>
                      <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs mt-1">Basic Detection</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Basic VirusTotal IOC analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Limited sender domain analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Binary safe/unsafe classification</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Basic double extension detection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Simple filename pattern matching</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Misses social engineering tactics</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI-Powered Analysis */}
              <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-500/20 relative overflow-hidden animate-in slide-in-from-right-4 duration-700 delay-200 hover:scale-105 transition-all group">
                <div className="absolute top-4 right-4 animate-pulse">
                  <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border-purple-500/30">
                    <Crown className="h-3 w-3 mr-1 group-hover:rotate-12 transition-transform duration-300" />
                    Premium AI
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Brain className="h-6 w-6 text-purple-500 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div>
                      <div>AI-Powered Intelligence</div>
                      <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs mt-1">Advanced Detection</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Enhanced VirusTotal IOC analysis with AI context</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Advanced sender domain reputation analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Gmail body domains analysis (when flagged)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>AI-powered filename & extension analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Intelligent threat scoring (1-10 scale)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Social engineering pattern correlation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Premium AI Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
                Exclusive AI-Powered Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Advanced capabilities that set our AI analysis apart from traditional security tools
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contextual Analysis */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-500/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Brain className="h-8 w-8 text-purple-500" />
                  </div>
                  <CardTitle className="text-center">Contextual Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    AI analyzes visible email content, filenames, and URL patterns to identify sophisticated threats within Gmail's interface.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Email content semantic analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Filename pattern correlation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Body domains (when Gmail flags them)</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-xs text-blue-400">
                      Note: Some domains in email body are flagged by Gmail as attachments - we analyze these when available
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Pattern Detection */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Target className="h-8 w-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-center">Pattern Recognition</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Detects suspicious filename patterns and advanced attachment-based social engineering tactics beyond basic double extension checks.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Advanced filename pattern analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Filename-based phishing attempts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Social engineering file naming patterns</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Smart Threat Scoring */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-cyan-500/5 to-green-500/5 border-cyan-500/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-8 w-8 text-cyan-500" />
                  </div>
                  <CardTitle className="text-center">Intelligent Scoring</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Advanced scoring based on visible URL patterns, filename analysis, and email content without accessing email servers.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>1-10 threat severity scale</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Multiple factor correlation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Detailed risk explanation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Brand Protection */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-500/5 to-teal-500/5 border-green-500/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="h-8 w-8 text-green-500" />
                  </div>
                  <CardTitle className="text-center">Brand Protection</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Detects domain spoofing and brand impersonation attempts through URL and filename analysis.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Homograph domain detection in URLs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Brand impersonation in filenames</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Typosquatting detection</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deep Content Analysis */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-teal-500/5 to-purple-500/5 border-teal-500/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Eye className="h-8 w-8 text-teal-500" />
                  </div>
                  <CardTitle className="text-center">Deep Content Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    AI analyzes visible email content, subject lines, and attachment names for psychological manipulation patterns.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Content semantic analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Psychological manipulation detection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Urgency and pressure tactics</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Real-time Learning */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-500/5 to-red-500/5 border-orange-500/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Cpu className="h-8 w-8 text-orange-500" />
                  </div>
                  <CardTitle className="text-center">Adaptive Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    AI continuously learns from new URL patterns, filename techniques, and emerging social engineering methods.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Pattern learning from URLs & filenames</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Emerging attack technique recognition</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Social engineering evolution tracking</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Stack */}
      <section className="py-20 bg-gradient-to-r from-background/50 to-purple-500/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
                Powered by Advanced AI Models
              </h2>
              <p className="text-xl text-muted-foreground">
                Built on cutting-edge AI technology for unparalleled threat detection accuracy
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-blue-500" />
                    Advanced AI Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Utilizing cutting-edge AI language models for sophisticated analysis of visible email content and attachments.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Advanced natural language processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Filename pattern reasoning</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Multi-factor threat correlation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-purple-500" />
                    Intelligent Processing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Custom-trained models optimized for email security analysis using Gmail's accessible content without server access.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Gmail interface specialization</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Filename & URL pattern optimization</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Privacy-preserving analysis</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tease */}
      <section className="py-20 bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-cyan-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="mb-6 text-lg px-6 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border-purple-500/30">
                <Crown className="h-5 w-5 mr-2" />
                Premium AI - Final Optimization
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                AI Features Ready - Perfecting Performance
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our AI-powered analysis is built and demonstrated in our video, currently undergoing final optimization for the best user experience
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleDownloadClick}
              >
                <Rocket className="h-6 w-6 mr-3" />
                Download Current Version
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-purple-500/10 transition-all duration-300"
                onClick={handleWatchDemoClick}
              >
                <Eye className="h-6 w-6 mr-3" />
                Watch AI Demo Video
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-semibold mb-1">Current Version</h3>
                <p className="text-sm text-muted-foreground">Basic VirusTotal analysis available now</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-1">Premium AI</h3>
                <p className="text-sm text-muted-foreground">In final optimization - shown in demo</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-1">Enterprise</h3>
                <p className="text-sm text-muted-foreground">Custom solutions for organizations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notify Me Popup - Enhanced with animations */}
      {showNotifyPopup && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowNotifyPopup(false)
            }
          }}
        >
          <div className="bg-background border border-purple-500/20 rounded-lg max-w-md w-full mx-4 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center animate-pulse">
                    <Bell className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Get Early Access</h3>
                    <p className="text-sm text-muted-foreground">Be first to know when AI features launch</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNotifyPopup(false)}
                  className="w-8 h-8 p-0 hover:scale-110 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="animate-in slide-in-from-left-2 duration-300 delay-100">
                    <label className="block text-sm font-medium mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background transition-all duration-200 hover:border-purple-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="animate-in slide-in-from-left-2 duration-300 delay-150">
                    <label className="block text-sm font-medium mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background transition-all duration-200 hover:border-purple-300"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="animate-in slide-in-from-left-2 duration-300 delay-200">
                    <label className="block text-sm font-medium mb-2">
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      What do you do? *
                    </label>
                    <select
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background transition-all duration-200 hover:border-purple-300"
                    >
                      <option value="">Select your role</option>
                      <option value="business-owner">Business Owner</option>
                      <option value="it-professional">IT Professional</option>
                      <option value="security-analyst">Security Analyst</option>
                      <option value="consultant">Consultant</option>
                      <option value="developer">Developer</option>
                      <option value="manager">Manager</option>
                      <option value="student">Student</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="animate-in slide-in-from-left-2 duration-300 delay-250">
                    <label className="block text-sm font-medium mb-2">
                      How will you use AI Analytics?
                    </label>
                    <textarea
                      name="useCase"
                      value={formData.useCase}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background resize-none transition-all duration-200 hover:border-purple-300"
                      placeholder="Tell us about your use case (optional)"
                    />
                  </div>

                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 animate-in slide-in-from-bottom-2 duration-300">
                      <p className="text-sm text-red-400">{submitError}</p>
                    </div>
                  )}

                  <div className="animate-in slide-in-from-bottom-2 duration-300 delay-300">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Submitting...
                        </div>
                      ) : (
                        <>
                          <Bell className="h-4 w-4 mr-2" />
                          Notify Me When Ready
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 animate-in zoom-in-95 fade-in duration-500">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 animate-in slide-in-from-bottom-2 duration-300 delay-100">Thank You for Your Interest!</h3>
                  <p className="text-muted-foreground mb-4 animate-in slide-in-from-bottom-2 duration-300 delay-200">
                    {formData.name ? `Thank you, ${formData.name}! ` : 'Thank you! '}
                    We've added you to our early access list for AI Analytics.
                  </p>
                  <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20 animate-in slide-in-from-bottom-2 duration-300 delay-300">
                    <p className="text-sm text-purple-400">
                      🚀 You'll be among the first to experience our AI-powered threat detection when it launches!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Download Form Modal */}
      <DownloadForm
        isOpen={showDownloadForm}
        onSubmit={handleDownloadFormSubmit}
        onClose={() => setShowDownloadForm(false)}
      />
    </main>
  )
}
