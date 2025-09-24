import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Code, Cpu, Shield, Zap, Globe, Lock } from "lucide-react"

export function Technology() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
            Technology Stack & Performance
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with modern web technologies and enterprise-grade security architecture 
            for maximum performance and reliability.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Code className="h-6 w-6 text-blue-500" />
                <CardTitle className="text-lg">Frontend Technologies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">HTML5</Badge>
                <Badge variant="outline">CSS3</Badge>
                <Badge variant="outline">JavaScript ES6+</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Bulma CSS v0.9.4</Badge>
                <Badge variant="outline">Dark Theme</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Native JavaScript DOM manipulation for seamless Gmail integration
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="h-6 w-6 text-purple-500" />
                <CardTitle className="text-lg">AI & API Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">OpenRouter DeepSeek R1</Badge>
                <Badge variant="outline">VirusTotal API v3</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">RESTful APIs</Badge>
                <Badge variant="outline">Async/Await</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced AI model with structured JSON handling and parallel API calls
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-6 w-6 text-green-500" />
                <CardTitle className="text-lg">Extension Architecture</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Content Scripts</Badge>
                <Badge variant="outline">Background Scripts</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Git Workflow</Badge>
                <Badge variant="outline">Chrome/Firefox</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Non-intrusive Gmail content injection with efficient API orchestration
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12">Performance Metrics & Achievements</h3>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">{"<10s"}</div>
                <div className="text-sm text-muted-foreground">Complete threat analysis time</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">80+</div>
                <div className="text-sm text-muted-foreground">Security engines via VirusTotal</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">👥</div>
                <div className="text-3xl font-bold text-foreground mb-2">90%+</div>
                <div className="text-sm text-muted-foreground">User satisfaction rate</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">⚡</div>
                <div className="text-3xl font-bold text-foreground mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Scalability (browser-based)</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Architecture */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-12">Security Architecture</h3>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-6 w-6 text-green-500" />
                  <CardTitle className="text-xl">Privacy-First Design</CardTitle>
                </div>
                <CardDescription>
                  Your email data stays secure and private
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Local-only processing of email content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">VirusTotal API keys stored locally with consent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">No third-party sharing of email content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">All API interactions via secure HTTPS</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-blue-500" />
                  <CardTitle className="text-xl">Threat Detection Methodology</CardTitle>
                </div>
                <CardDescription>
                  Multi-layered security analysis approach
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-400">1</span>
                    </div>
                    <div>
                      <div className="font-medium">VirusTotal Engine Check</div>
                      <div className="text-sm text-muted-foreground">80+ security scanners</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-400">2</span>
                    </div>
                    <div>
                      <div className="font-medium">AI-Based Heuristics</div>
                      <div className="text-sm text-muted-foreground">Zero-day & social engineering detection</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-400">3</span>
                    </div>
                    <div>
                      <div className="font-medium">Cross-Component Correlation</div>
                      <div className="text-sm text-muted-foreground">Interconnected threat reasoning</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-400">4</span>
                    </div>
                    <div>
                      <div className="font-medium">Human-Readable Output</div>
                      <div className="text-sm text-muted-foreground">Risk scores + actionable insights</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Business Impact */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Business Impact</h3>
            <div className="grid gap-6 md:grid-cols-3 text-sm">
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">15-20 min</div>
                <div className="text-muted-foreground">Saved per suspicious email analysis</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 mb-2">Zero</div>
                <div className="text-muted-foreground">Infrastructure cost (browser extension)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-2">Enterprise</div>
                <div className="text-muted-foreground">Grade security for everyone</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
