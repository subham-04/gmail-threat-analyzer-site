import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { 
  Globe, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  Star, 
  Download as DownloadIcon,
  Zap,
  Award,
  TrendingUp,
  Heart,
  ArrowRight,
  FileText
} from "lucide-react"
import { useState } from "react"
import { DownloadForm } from "../components/DownloadForm"
import { useDownloadPermission } from "../hooks/useDownloadPermission"
import { trackButtonClick, trackDownloadAttempt, initializeAnalytics } from "../lib/dataCollection"

export function DownloadPage() {
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const { hasPermission, grantPermission } = useDownloadPermission()

  // Handle Firefox store download with tracking
  const handleFirefoxDownload = async () => {
    await initializeAnalytics();
    await trackButtonClick('firefox-download-btn', '/download', 'Install from Firefox Add-ons Store');
    await trackDownloadAttempt('firefox_store');
    window.open('https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/', '_blank');
  };

  // Handle direct ZIP download - now requires form submission
  const handleZipDownload = async () => {
    await initializeAnalytics();
    await trackButtonClick('zip-download-btn', '/download', hasPermission ? 'Download Extension ZIP File' : 'Get ZIP File (Registration Required)');
    
    if (hasPermission) {
      // User has already submitted form, proceed with download
      await trackDownloadAttempt('zip_manual');
      const link = document.createElement('a');
      link.href = '/gmail-threat-analyzer-extension.zip';
      link.download = 'gmail-threat-analyzer-extension.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Show form first
      setShowDownloadForm(true)
    }
  }

  // Handle download form submission for ZIP download
  const handleDownloadFormSubmit = async (userData: any) => {
    grantPermission(userData)
    setShowDownloadForm(false)
    // Proceed with ZIP download after form submission
    setTimeout(async () => {
      await trackDownloadAttempt('zip_manual');
      const link = document.createElement('a');
      link.href = '/gmail-threat-analyzer-extension.zip';
      link.download = 'gmail-threat-analyzer-extension.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500)
  }

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 text-lg px-4 py-2 bg-green-500/20 text-green-400 border-green-500/30">
              🚀 Available Now
            </Badge>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl mb-6">
              Download Gmail Threat Analyzer
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get instant email security analysis powered by VirusTotal's 80+ security engines. 
              Install our extension for Firefox from the official store, or complete quick registration to download the ZIP file for manual installation in Chrome, Edge, or Firefox.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center mb-12">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-sm font-medium">100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-blue-500" />
                </div>
                <span className="text-sm font-medium">Under 10s Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-purple-500" />
                </div>
                <span className="text-sm font-medium">Privacy-First</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-sm font-medium">90%+ Satisfaction</span>
              </div>
            </div>

            {/* Main Download CTA */}
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Primary Download - Firefox Store */}
              <Button 
                size="lg" 
                className="w-full text-lg px-8 py-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleFirefoxDownload}
              >
                <Globe className="h-6 w-6 mr-3" />
                Install from Firefox Add-ons Store
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
              
              {/* Alternative Download - Direct ZIP */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Or download for manual installation in Chrome, Edge, or Firefox
                  {!hasPermission && <span className="block text-xs text-purple-400 mt-1">✓ Registration required for ZIP download</span>}
                </p>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full text-lg px-8 py-6 border-2 border-blue-500/30 hover:border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300"
                  onClick={handleZipDownload}
                >
                  <DownloadIcon className="h-6 w-6 mr-3" />
                  {hasPermission ? 'Download Extension ZIP File' : 'Get ZIP File (Registration Required)'}
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
                <div className="mt-3 text-xs text-muted-foreground bg-muted/30 rounded-lg px-4 py-2 inline-block">
                  <FileText className="h-3 w-3 inline mr-1" />
                  gmail-threat-analyzer-extension.zip • Compatible with Chrome, Edge & Firefox
                </div>
              </div>
            </div>
            
            <div className="max-w-md mx-auto mt-6">
              <p className="text-sm text-muted-foreground text-center">
                No registration required • Instant protection • Free forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
              What You Get
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade email security features designed for everyone
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2 text-green-400">80+ Security Engines</h3>
                <p className="text-sm text-muted-foreground">
                  VirusTotal integration with comprehensive threat detection
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2 text-blue-400">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Complete analysis in under 10 seconds
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2 text-purple-400">User Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  One-click operation with zero learning curve
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="font-semibold mb-2 text-orange-400">Enterprise Grade</h3>
                <p className="text-sm text-muted-foreground">
                  Professional security for everyone
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Security Analysis */}
          <Card className="bg-card/50 border-border/50 overflow-hidden shadow-sm">
            <CardHeader className="bg-gradient-to-r from-muted/30 to-muted/10 border-b border-border/30">
              <CardTitle className="text-2xl text-center text-foreground font-light">
                Complete Security Analysis Suite
              </CardTitle>
              <p className="text-center text-muted-foreground mt-2">
                Enterprise-grade email security powered by VirusTotal's global threat intelligence
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Left Column - Core Features */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-foreground/70" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2 text-foreground">Advanced Domain Intelligence</h4>
                      <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                        Deep analysis of sender domains including WHOIS data, registration history, 
                        DNS records, and reputation scoring across 80+ security engines.
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Real-time domain reputation scoring</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Historical threat intelligence data</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Typosquatting and domain similarity detection</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-foreground/70" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2 text-foreground">Comprehensive URL Scanning</h4>
                      <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                        Every embedded link is analyzed for malicious content, phishing attempts, 
                        and suspicious redirects using multiple detection engines.
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Multi-engine malware detection</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Phishing and scam identification</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Redirect chain analysis</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-foreground/70" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2 text-foreground">Intelligent Risk Assessment</h4>
                      <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                        Advanced file extension analysis and attachment risk evaluation with 
                        contextual threat scoring and actionable recommendations.
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>File type security validation</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Contextual threat level indicators</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Security best practice recommendations</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Advanced Features */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-foreground/70" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2 text-foreground">Privacy-Centric Architecture</h4>
                      <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                        All analysis is performed with strict privacy controls - your email content 
                        never leaves your browser, and no personal data is collected or stored.
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>100% local email content processing</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Zero data collection or storage</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>End-to-end privacy protection</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="h-6 w-6 text-foreground/70" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2 text-foreground">Open Source Transparency</h4>
                      <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                        Fully open source under GPL-3.0 license with transparent code, 
                        community-driven development, and security audit capabilities.
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Complete source code access</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Community security audits</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Collaborative improvement process</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="h-6 w-6 text-foreground/70" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium mb-2 text-foreground">Continuous Evolution</h4>
                      <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                        Regular updates with new threat detection capabilities, enhanced security 
                        features, and improved user experience based on community feedback.
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Automatic security updates</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>New threat signature integration</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"></div>
                          <span>Feature enhancement pipeline</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Section */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-3 text-foreground">
                    Enterprise Security for Everyone
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm">
                    Experience professional-grade email security without the complexity or cost. 
                    Start protecting your inbox with just one click.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-foreground text-background hover:bg-foreground/90 shadow-sm transition-colors duration-200"
                    onClick={() => window.open('https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/', '_blank')}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Get Advanced Protection Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Installation Methods */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
              Installation Options
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose your preferred installation method - Firefox Add-ons Store for easy installation, or complete quick registration for manual ZIP installation (Chrome, Edge, and Firefox)
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto mb-16">
            {/* Method 1: Firefox Store */}
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-2xl text-orange-400">Firefox Add-ons Store</CardTitle>
                <p className="text-muted-foreground">Recommended • Automatic Updates</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-orange-400">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Click Install Button</h4>
                      <p className="text-sm text-muted-foreground">
                        Click the "Install from Firefox Add-ons Store" button above
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-orange-400">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Authorize Installation</h4>
                      <p className="text-sm text-muted-foreground">
                        Follow Firefox's prompts to authorize and install the extension
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-orange-400">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Start Using</h4>
                      <p className="text-sm text-muted-foreground">
                        Open Gmail and start analyzing emails immediately
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-orange-500/20">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Automatic security updates</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Verified by Mozilla</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>One-click installation</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Method 2: Direct ZIP Download */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DownloadIcon className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-2xl text-blue-400">Manual Installation</CardTitle>
                <p className="text-muted-foreground">Chrome, Edge & Firefox • Full Control</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-blue-400">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Complete Registration & Download ZIP</h4>
                      <p className="text-sm text-muted-foreground">
                        Fill out the quick registration form, then download the universal extension package
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-blue-400">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Extract & Load</h4>
                      <p className="text-sm text-muted-foreground">
                        Extract the ZIP file and load it in your browser's developer mode
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-blue-400">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Enable & Use</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable the extension and start analyzing emails in Gmail
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-500/20">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Works in Chrome, Edge & Firefox</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Full source code access</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Manual update control</span>
                    </div>
                  </div>
                </div>

                {/* Browser-specific Installation Guide */}
                <div className="pt-4 border-t border-blue-500/20">
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                      Show browser-specific installation steps →
                    </summary>
                    <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                      {/* Chrome Instructions */}
                      <div className="bg-background/50 rounded p-3 border border-border">
                        <p className="font-medium mb-2 flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Google Chrome:
                        </p>
                        <ol className="space-y-1 list-decimal list-inside text-xs pl-6">
                          <li>Download and extract the ZIP file</li>
                          <li>Open Chrome and go to <code className="bg-muted px-1 rounded">chrome://extensions/</code></li>
                          <li>Enable "Developer mode" (toggle in top right)</li>
                          <li>Click "Load unpacked" button</li>
                          <li>Select the extracted extension folder</li>
                          <li>Extension will be loaded and ready to use</li>
                        </ol>
                      </div>

                      {/* Edge Instructions */}
                      <div className="bg-background/50 rounded p-3 border border-border">
                        <p className="font-medium mb-2 flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Microsoft Edge:
                        </p>
                        <ol className="space-y-1 list-decimal list-inside text-xs pl-6">
                          <li>Download and extract the ZIP file</li>
                          <li>Open Edge and go to <code className="bg-muted px-1 rounded">edge://extensions/</code></li>
                          <li>Enable "Developer mode" (toggle in left sidebar)</li>
                          <li>Click "Load unpacked" button</li>
                          <li>Select the extracted extension folder</li>
                          <li>Extension will be loaded and ready to use</li>
                        </ol>
                      </div>

                      {/* Firefox Instructions */}
                      <div className="bg-background/50 rounded p-3 border border-border">
                        <p className="font-medium mb-2 flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Mozilla Firefox:
                        </p>
                        <ol className="space-y-1 list-decimal list-inside text-xs pl-6">
                          <li>Download and extract the ZIP file</li>
                          <li>Open Firefox and go to <code className="bg-muted px-1 rounded">about:debugging</code></li>
                          <li>Click "This Firefox" in the sidebar</li>
                          <li>Click "Load Temporary Add-on"</li>
                          <li>Select the manifest.json file from extracted folder</li>
                          <li>Extension will be loaded and ready to use</li>
                        </ol>
                      </div>
                    </div>
                  </details>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Features */}
          <Card className="bg-card border-border max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Both Methods Include</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3 text-center">
                <div className="space-y-2">
                  <Shield className="h-8 w-8 text-green-500 mx-auto" />
                  <h4 className="font-semibold">80+ Security Engines</h4>
                  <p className="text-sm text-muted-foreground">Complete VirusTotal integration</p>
                </div>
                <div className="space-y-2">
                  <Clock className="h-8 w-8 text-blue-500 mx-auto" />
                  <h4 className="font-semibold">10-Second Analysis</h4>
                  <p className="text-sm text-muted-foreground">Lightning-fast threat detection</p>
                </div>
                <div className="space-y-2">
                  <Heart className="h-8 w-8 text-pink-500 mx-auto" />
                  <h4 className="font-semibold">Privacy Protected</h4>
                  <p className="text-sm text-muted-foreground">Zero data collection policy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Secure Your Gmail?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust Gmail Threat Analyzer to protect their email communications.
            </p>
            
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 mb-8"
              onClick={() => window.open('https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/', '_blank')}
            >
              <DownloadIcon className="h-6 w-6 mr-3" />
              Download Now - It's Free!
            </Button>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free & Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No Registration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Instant Setup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Form Modal */}
      <DownloadForm
        isOpen={showDownloadForm}
        onSubmit={handleDownloadFormSubmit}
        onClose={() => setShowDownloadForm(false)}
      />
    </main>
  )
}
