import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Shield, Brain, Link, FileText, Clock, AlertTriangle, CheckCircle, Star } from "lucide-react"

export function Features() {
  return (
    <section className="py-20 lg:py-32 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
            Core Features & Functionality
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Two powerful analysis modes: Basic VirusTotal integration (available now) and 
            AI-powered advanced threat intelligence (coming soon)
          </p>
        </div>

        {/* Normal Analysis Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Shield className="h-8 w-8 text-green-500" />
            <h3 className="text-2xl font-bold text-foreground">Normal Analysis</h3>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Available Now</Badge>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Sender Domain Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Domain reputation via VirusTotal API</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Domain age & registrar verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>DNS and WHOIS data correlation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>80+ security engines detection</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Link className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">URL Security Scanning</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Extract all embedded links</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time VirusTotal URL checks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Threat classification system</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>URL shortening detection</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Attachment Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span>Risk level assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>File extension validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Threat tagging system</span>
                </div>
                <div className="text-sm">
                  <Badge variant="outline" className="mr-1">Critical</Badge>
                  <Badge variant="outline" className="mr-1">High</Badge>
                  <Badge variant="outline" className="mr-1">Medium</Badge>
                  <Badge variant="outline">Low</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Email Content Parsing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>DOM extraction of subject</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Email body analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Header information extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>Under 10 second analysis</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-16" />

        {/* AI Analysis Section */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-12">
            <Brain className="h-8 w-8 text-purple-500" />
            <h3 className="text-2xl font-bold text-foreground">AI Analysis</h3>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Premium • Coming Soon</Badge>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-xl">Advanced Threat Intelligence</CardTitle>
                <CardDescription>
                  AI model analyzes full email context with comprehensive threat detection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Data Fed to AI Model:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Full email content (subject, body)</li>
                    <li>• Sender details + domain reputation</li>
                    <li>• Extracted URLs with threat reports</li>
                    <li>• Attachment scan results</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-xl">Intelligent Analysis Output</CardTitle>
                <CardDescription>
                  Comprehensive risk assessment with actionable insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">AI-Provided Analysis:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Risk Scoring: 1–10 scale with confidence %</li>
                    <li>• Component-wise scoring breakdown</li>
                    <li>• Pattern recognition & social engineering detection</li>
                    <li>• Threat classification with behavioral analysis</li>
                    <li>• Correlation engine for suspicious elements</li>
                    <li>• Actionable mitigation recommendations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Star className="h-4 w-4 text-purple-400" />
              <span className="text-purple-400 font-medium">
                Advanced threat classification: Phishing, BEC, Malware, Spam detection
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
