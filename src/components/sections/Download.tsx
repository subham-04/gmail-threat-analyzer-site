import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Download as DownloadIcon, Globe, Shield, Clock, Users, CheckCircle } from "lucide-react"
import { useState } from "react"
import { DownloadForm } from "../DownloadForm"
import { useDownloadPermission } from "../../hooks/useDownloadPermission"

export function Download() {
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const { hasPermission, grantPermission } = useDownloadPermission()

  // Handle download button click
  const handleDownloadClick = () => {
    if (hasPermission) {
      // User has already submitted form, proceed with download
      window.open('https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/', '_blank')
    } else {
      // Show form first
      setShowDownloadForm(true)
    }
  }

  // Handle download form submission
  const handleDownloadFormSubmit = (userData: any) => {
    grantPermission(userData)
    setShowDownloadForm(false)
    // Proceed with download after form submission
    setTimeout(() => {
      window.open('https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/', '_blank')
    }, 500)
  }

  return (
    <section className="py-20 lg:py-32 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
            Download Gmail Threat Analyzer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant email security analysis powered by VirusTotal's 80+ security engines. 
            Install our Firefox extension and protect yourself today.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Download Card */}
          <Card className="bg-card border-border mb-12 overflow-hidden">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe className="h-8 w-8 text-orange-500" />
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Available Now
                </Badge>
              </div>
              <CardTitle className="text-2xl">Firefox Extension</CardTitle>
              <CardDescription className="text-lg">
                Full-featured email threat analysis with VirusTotal integration
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Features Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-green-500" />
                  </div>
                  <h4 className="font-semibold mb-1">80+ Security Engines</h4>
                  <p className="text-sm text-muted-foreground">VirusTotal integration</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <h4 className="font-semibold mb-1">Under 10 Seconds</h4>
                  <p className="text-sm text-muted-foreground">Lightning-fast analysis</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <h4 className="font-semibold mb-1">90%+ Satisfaction</h4>
                  <p className="text-sm text-muted-foreground">User-tested and approved</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-orange-500" />
                  </div>
                  <h4 className="font-semibold mb-1">One-Click Analysis</h4>
                  <p className="text-sm text-muted-foreground">Zero learning curve</p>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-background/50 rounded-lg p-6">
                <h4 className="font-semibold mb-4 text-center">What's Included in the Firefox Extension:</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Domain Reputation Analysis</div>
                      <div className="text-sm text-muted-foreground">Complete sender verification with WHOIS data</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">URL Security Scanning</div>
                      <div className="text-sm text-muted-foreground">Real-time threat detection for all links</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Attachment Risk Assessment</div>
                      <div className="text-sm text-muted-foreground">File extension validation and threat tagging</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Privacy-First Design</div>
                      <div className="text-sm text-muted-foreground">Local processing, no data sharing</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-orange-600 hover:bg-orange-700"
                  onClick={handleDownloadClick}
                >
                  <Globe className="h-6 w-6 mr-2" />
                  Install from Firefox Add-ons
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Free download • No registration required • Instant protection
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Target Users */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-card/50 border-border">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Primary Users</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Non-technical Gmail users who need instant security analysis without complexity
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Security Professionals</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Security analysts and IT professionals requiring detailed threat intelligence
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader className="text-center">
                <DownloadIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <CardTitle className="text-lg">Small Business</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Small business owners without dedicated cybersecurity teams
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Download Form Modal */}
      <DownloadForm
        isOpen={showDownloadForm}
        onSubmit={handleDownloadFormSubmit}
        onClose={() => setShowDownloadForm(false)}
      />
    </section>
  )
}
