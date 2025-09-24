import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { 
  Shield, 
  Brain, 
  Target, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Bot, 
  Cpu, 
  Search, 
  Lightbulb,
  Crown,
  Rocket,
  Globe
} from "lucide-react"

export function PremiumAIPage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border-purple-500/30">
                <Crown className="h-5 w-5 mr-2" />
                Premium AI Features
              </Badge>
              <Badge className="text-sm px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30">
                NEW
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl mb-6">
              Next-Generation AI 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Threat Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Go beyond basic threat detection with advanced AI-powered analysis that understands context, 
              patterns, and sophisticated attack techniques that traditional scanners miss.
            </p>

            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">AI Context Analysis</div>
                  <div className="text-sm text-muted-foreground">Understands email context</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Pattern Recognition</div>
                  <div className="text-sm text-muted-foreground">Detects sophisticated attacks</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-cyan-500" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Smart Scoring</div>
                  <div className="text-sm text-muted-foreground">Intelligent threat rating</div>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Rocket className="h-6 w-6 mr-3" />
              Experience Premium AI
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* AI vs Traditional Comparison */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
                Why AI-Powered Analysis?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Traditional security tools miss sophisticated threats. Our AI goes deeper, understanding context and intent.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Traditional Analysis */}
              <Card className="bg-gradient-to-br from-red-500/5 to-orange-500/5 border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>High false positive rates</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Can't detect brand impersonation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI-Powered Analysis */}
              <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-500/20 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border-purple-500/30">
                    <Crown className="h-3 w-3 mr-1" />
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
                <CardContent className="space-y-4">
                  <div className="space-y-3">
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
                      <span>Email spoofing & impersonation detection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Reduced false positives with smart analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Brand protection & homograph detection</span>
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
                    AI understands email context, sender relationships, and communication patterns to identify sophisticated threats.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Sender behavior analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Communication pattern recognition</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Contextual threat assessment</span>
                    </div>
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
                    Detects sophisticated attack patterns, social engineering tactics, and emerging threat techniques.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Spear phishing detection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Business email compromise (BEC)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Social engineering tactics</span>
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
                    Advanced AI scoring system provides nuanced threat assessment beyond simple safe/unsafe classification.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>1-10 threat severity scale</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Confidence level indicators</span>
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
                    Advanced detection of brand impersonation, homograph attacks, and domain spoofing attempts.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Homograph domain detection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Brand impersonation alerts</span>
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
                    AI analyzes email content semantics, language patterns, and psychological manipulation techniques.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Semantic content analysis</span>
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
                    AI continuously learns from new threats and adapts to emerging attack vectors in real-time.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Continuous threat learning</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Emerging threat adaptation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Zero-day threat recognition</span>
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
                    DeepSeek R1 Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Leveraging state-of-the-art DeepSeek R1 language model for sophisticated threat analysis and reasoning.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Advanced natural language processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Complex reasoning capabilities</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Multi-modal threat analysis</span>
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
                    Custom-trained models specifically optimized for email security and threat detection scenarios.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Email security specialization</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Threat pattern optimization</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Low false positive rates</span>
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
                Premium AI Coming Soon
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Experience the Future of Email Security
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Advanced AI features will be available as premium add-on to enhance your email protection
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('/download', '_self')}
              >
                <Rocket className="h-6 w-6 mr-3" />
                Start with Free Version
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-purple-500/10 transition-all duration-300"
                onClick={() => window.open('/demo', '_self')}
              >
                <Eye className="h-6 w-6 mr-3" />
                See AI Demo
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-semibold mb-1">Free Forever</h3>
                <p className="text-sm text-muted-foreground">Basic VirusTotal analysis always included</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-1">Premium AI</h3>
                <p className="text-sm text-muted-foreground">Advanced features for power users</p>
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
    </main>
  )
}
