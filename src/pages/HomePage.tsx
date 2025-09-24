import { Hero } from "../components/sections/Hero"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { Link } from "react-router-dom"
import { 
  Shield, 
  Zap, 
  Brain, 
  Users, 
  Clock, 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  Star,
  Mail,
  Lock,
  TrendingUp,
  Award,
  Target,
  Sparkles,
  ArrowRight
} from "lucide-react"

export function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Important Disclaimers */}
      {/* Important Notices - Compact Design */}
      <section className="py-6 sm:py-8 bg-gradient-to-r from-muted/20 to-muted/10 border-y border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* AI Disclaimer - Compact */}
              <div className="flex items-start sm:items-center gap-3 p-3 sm:p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/10 hover:border-yellow-500/20 transition-colors">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                  <span className="text-yellow-500 text-xs font-bold">⚠</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <span className="font-medium text-yellow-400">AI Analysis:</span> May produce false positives. 
                    Always verify suspicious results and use personal judgment.
                  </p>
                </div>
              </div>

              {/* Data Privacy Notice - Compact */}
              <div className="flex items-start sm:items-center gap-3 p-3 sm:p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/20 transition-colors">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                  <Shield className="h-3 w-3 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <span className="font-medium text-blue-400">Privacy:</span> Currently zero data collection. 
                    Future versions may add optional anonymous usage stats with user consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Benefits Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
              Why Choose Gmail Threat Analyzer?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced email security made simple. Protect yourself from sophisticated threats 
              with enterprise-grade technology designed for everyone.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-xl">Enterprise-Grade Security</CardTitle>
                <CardDescription>
                  Powered by VirusTotal's 80+ security engines with real-time threat intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Multi-layered threat detection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Real-time reputation scoring
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Advanced correlation engine
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-xl">Lightning Fast Analysis</CardTitle>
                <CardDescription>
                  Complete threat assessment in under 10 seconds with zero learning curve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Sub-10 second analysis time
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    One-click operation
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    Saves 15-20 minutes per email
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-xl">Privacy-First Design</CardTitle>
                <CardDescription>
                  Your email data stays secure with local processing and no third-party sharing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-purple-500" />
                    Local-only email processing
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-500" />
                    Secure HTTPS communication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    No data collection or sharing
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Threat Detection Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Badge className="mb-4">Advanced Protection</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Comprehensive Threat Detection
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our multi-layered approach combines VirusTotal's vast threat intelligence 
                network with advanced correlation algorithms to detect even the most 
                sophisticated attacks.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phishing Detection</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced pattern recognition to identify sophisticated phishing attempts
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Malware & Virus Scanning</h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time scanning of attachments and embedded links for malicious content
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Business Email Compromise</h4>
                    <p className="text-sm text-muted-foreground">
                      Detect impersonation and social engineering tactics used in BEC attacks
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/features">
                  <Button className="mr-4">
                    Explore All Features
                  </Button>
                </Link>
                <Link to="/technology">
                  <Button variant="outline">
                    View Technology Stack
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">95%+</div>
                      <div className="text-sm text-muted-foreground">Detection Accuracy</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Industry-leading accuracy in identifying threats across multiple attack vectors
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">80+</div>
                      <div className="text-sm text-muted-foreground">Security Engines</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive coverage through VirusTotal's global security engine network
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Brain className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">AI</div>
                      <div className="text-sm text-muted-foreground">Coming Soon</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Advanced AI analysis for zero-day threat detection and behavioral analysis
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Premium AI Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-cyan-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border-purple-500/30">
                <Sparkles className="h-5 w-5 mr-2" />
                Coming Soon
              </Badge>
              <Badge className="text-sm px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30">
                NEW
              </Badge>
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
              Premium AI-Powered Analysis
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience next-generation threat detection with advanced AI that understands context, 
              patterns, and sophisticated attack techniques beyond traditional scanning.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto mb-12">
            <Card className="bg-gradient-to-br from-red-500/5 to-orange-500/5 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <div>Traditional VirusTotal Only</div>
                    <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs mt-1">Basic Detection</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Simple hash/URL reputation lookup</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Binary yes/no threat classification</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Misses social engineering tactics</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>No context understanding</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-500/20 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border-purple-500/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Premium AI
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <div>AI-Powered Intelligence</div>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs mt-1">Advanced Detection</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Contextual threat analysis & reasoning</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Intelligent threat scoring (1-10 scale)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Detects social engineering patterns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Brand protection & impersonation detection</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/premium-ai">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
              >
                <Brain className="h-6 w-6 mr-3" />
                Explore AI Analytics
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              Advanced AI features coming soon as premium add-on
            </p>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
              Perfect for Every User
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From casual email users to security professionals, Gmail Threat Analyzer 
              provides the right level of protection for everyone.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-card/50 border-border">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-xl">Non-Technical Users</CardTitle>
                <CardDescription>
                  Simple, one-click protection for everyday Gmail users
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• No technical knowledge required</li>
                  <li>• Instant threat alerts</li>
                  <li>• Clear, actionable recommendations</li>
                  <li>• Zero configuration needed</li>
                </ul>
                <Badge variant="secondary">Primary Target</Badge>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-xl">Security Professionals</CardTitle>
                <CardDescription>
                  Detailed threat intelligence and analysis tools
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Comprehensive threat reports</li>
                  <li>• Raw VirusTotal data access</li>
                  <li>• Advanced correlation insights</li>
                  <li>• Integration-ready architecture</li>
                </ul>
                <Badge variant="secondary">Secondary Target</Badge>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle className="text-xl">Small Business</CardTitle>
                <CardDescription>
                  Enterprise security without the enterprise cost
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• No dedicated IT team needed</li>
                  <li>• Cost-effective protection</li>
                  <li>• Scalable for team use</li>
                  <li>• Compliance support ready</li>
                </ul>
                <Badge variant="secondary">Tertiary Target</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Quick Start CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Start Protecting Your Gmail Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Install our Firefox extension and get instant email security analysis. 
              No registration required, no complex setup – just one-click protection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/download">
                <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                  <Globe className="h-5 w-5 mr-2" />
                  Download Firefox Extension
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                  <Star className="h-5 w-5 mr-2" />
                  Watch AI Demo
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Privacy-first design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Enterprise-grade security</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
