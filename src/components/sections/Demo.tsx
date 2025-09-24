import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Play, Lock, Star } from "lucide-react"

export function Demo() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
            AI-Powered Analysis Demo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See the power of our AI threat detection in action. This premium feature showcases 
            advanced behavioral analysis and threat correlation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 border-border overflow-hidden">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  <Lock className="h-3 w-3 mr-1" />
                  Premium Feature
                </Badge>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  <Star className="h-3 w-3 mr-1" />
                  Demo Only
                </Badge>
              </div>
              <CardTitle className="text-2xl">AI Analysis Demo Video</CardTitle>
              <CardDescription className="text-lg">
                Watch how our AI model analyzes complex email threats that traditional filters miss
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* YouTube Video Embed */}
              <div className="relative aspect-video bg-muted rounded-lg mx-6 mb-6 overflow-hidden group cursor-pointer">
                <img 
                  src="https://img.youtube.com/vi/sSqZGpjCEHE/maxresdefault.jpg" 
                  alt="Gmail Threat Analyzer AI Demo"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg"
                    onClick={() => window.open('https://www.youtube.com/watch?v=sSqZGpjCEHE', '_blank')}
                  >
                    <Play className="h-6 w-6 mr-2" />
                    Watch Full Demo
                  </Button>
                </div>
              </div>
              
              {/* Feature Highlights */}
              <div className="px-6 pb-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-purple-400 mb-1">1-10</div>
                    <div className="text-sm text-muted-foreground">Risk Scoring Scale</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-blue-400 mb-1">95%+</div>
                    <div className="text-sm text-muted-foreground">Confidence Level</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-green-400 mb-1">5+</div>
                    <div className="text-sm text-muted-foreground">Threat Types Detected</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <h4 className="font-semibold text-purple-400 mb-2">What You'll See in the Demo:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Real-time behavioral analysis of suspicious emails</li>
                    <li>• Advanced social engineering pattern detection</li>
                    <li>• Cross-component threat correlation in action</li>
                    <li>• AI-generated risk assessment with explanations</li>
                    <li>• Actionable security recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Notify Me Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Want AI-Powered Analysis?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our AI analysis feature is coming soon for premium users. Be the first to know 
                  when advanced threat intelligence becomes available.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Notify Me When Available
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Join our waitlist for exclusive early access to AI-powered email security
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
