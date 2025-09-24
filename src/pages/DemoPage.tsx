import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Globe, 
  FileText,
  Eye,
  Play,
  ExternalLink,
  Zap,
  TrendingUp,
  Users,
  Star,
  ArrowRight
} from "lucide-react"

export function DemoPage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 text-lg px-4 py-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
              📺 Live Demo
            </Badge>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl mb-6">
              See Gmail Threat Analyzer in Action
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Watch how our extension instantly identifies email threats, analyzes suspicious links, 
              and provides comprehensive security insights in real-time.
            </p>

            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-green-500" />
                </div>
                <span className="font-medium">10-Second Analysis</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-500" />
                </div>
                <span className="font-medium">80+ Security Engines</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Eye className="h-4 w-4 text-purple-500" />
                </div>
                <span className="font-medium">Real-time Protection</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open('https://www.youtube.com/watch?v=sSqZGpjCEHE', '_blank')}
            >
              <Play className="h-6 w-6 mr-3" />
              Watch Interactive Demo
              <ArrowRight className="h-5 w-5 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Scenarios */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
              Real Security Scenarios
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how Gmail Threat Analyzer handles different types of email threats
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 mb-16">
            {/* Safe Email Demo */}
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <CardTitle className="text-green-400">Safe Email Detection</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Legitimate business communication</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background/50 rounded-lg p-4 border border-green-500/20">
                  <div className="text-sm font-mono mb-3">
                    <div className="text-green-400">From: notifications@github.com</div>
                    <div className="text-muted-foreground">Subject: Security alert: New sign-in</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Domain: github.com (Verified)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Links: 2 URLs scanned - All safe</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Reputation: Excellent (0/80 engines flagged)</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-green-500/30 hover:bg-green-500/10">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Suspicious Email Demo */}
            <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <CardTitle className="text-red-400">Threat Detection</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Phishing attempt identified</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background/50 rounded-lg p-4 border border-red-500/20">
                  <div className="text-sm font-mono mb-3">
                    <div className="text-red-400">From: security@paypaI.com</div>
                    <div className="text-muted-foreground">Subject: Urgent: Verify your account</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span>Domain: Suspicious (Similar to paypal.com)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span>Links: 1 URL flagged as malicious</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span>Reputation: Poor (23/80 engines flagged)</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-red-500/30 hover:bg-red-500/10">
                  <Eye className="h-4 w-4 mr-2" />
                  View Threat Details
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Feature Showcase */}
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2 text-blue-400">Domain Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive sender verification with WHOIS data and reputation scoring
                </p>
                <Badge variant="outline" className="border-blue-500/30 text-blue-400">Live Demo Available</Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2 text-purple-400">URL Scanning</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time threat detection for all embedded links and attachments
                </p>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">Interactive Preview</Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="font-semibold mb-2 text-orange-400">Risk Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed threat analysis with actionable security recommendations
                </p>
                <Badge variant="outline" className="border-orange-500/30 text-orange-400">Step-by-Step Guide</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Try It Yourself
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to experience Gmail Threat Analyzer? Install the extension and start protecting your inbox immediately.
            </p>

            <div className="grid gap-6 md:grid-cols-2 mb-12">
              <Card className="bg-card border-border text-left">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Live Environment</h3>
                      <p className="text-sm text-muted-foreground">Test with your actual Gmail</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Install the extension and immediately start analyzing your real emails. 
                    No test environment needed - full production ready.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border text-left">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Community Support</h3>
                      <p className="text-sm text-muted-foreground">Join our user community</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get help from other users, share experiences, and contribute to 
                    making Gmail Threat Analyzer even better.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('https://www.youtube.com/watch?v=sSqZGpjCEHE', '_blank')}
              >
                <Play className="h-6 w-6 mr-3" />
                Watch Interactive Demo
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-border hover:bg-accent"
                onClick={() => window.open('https://github.com/subham-04/gmail-threat-analyzer-sources', '_blank')}
              >
                <Star className="h-6 w-6 mr-3" />
                View Documentation
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Free forever • No registration required • Privacy protected
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
