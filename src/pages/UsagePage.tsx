import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Play,
  Zap,
  ArrowRight,
  Key,
  Download,
  Settings,
  Lightbulb,
  AlertCircle,
  Info
} from "lucide-react"

export function UsagePage() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 text-base px-6 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-green-500/30">
              📚 Complete Usage Guide
            </Badge>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4">
              How to Use Gmail Threat Analyzer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step-by-step instructions to set up and master your email security extension
            </p>
          </div>
          
          {/* Quick Navigation */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <a href="#installation" className="p-4 rounded-lg bg-card border border-border hover:border-blue-500/50 transition-colors text-center group">
                <Download className="h-6 w-6 mx-auto mb-2 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Installation</span>
              </a>
              <a href="#setup" className="p-4 rounded-lg bg-card border border-border hover:border-green-500/50 transition-colors text-center group">
                <Key className="h-6 w-6 mx-auto mb-2 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">API Setup</span>
              </a>
              <a href="#usage" className="p-4 rounded-lg bg-card border border-border hover:border-purple-500/50 transition-colors text-center group">
                <Play className="h-6 w-6 mx-auto mb-2 text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Usage</span>
              </a>
              <a href="#troubleshooting" className="p-4 rounded-lg bg-card border border-border hover:border-orange-500/50 transition-colors text-center group">
                <AlertCircle className="h-6 w-6 mx-auto mb-2 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Help</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">What is Gmail Threat Analyzer?</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      A powerful Chrome extension that provides comprehensive security analysis for Gmail emails using VirusTotal API and AI-powered threat detection. It analyzes email senders, URLs, attachments, and content patterns to identify potential security threats.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section id="installation" className="py-16 bg-gradient-to-r from-background/50 to-blue-500/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Installation Guide</h2>
              <p className="text-muted-foreground">Get started in just 3 simple steps</p>
            </div>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                      <span className="text-blue-500 font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-3">
                        <Download className="h-5 w-5 text-blue-500" />
                        Download the Extension
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          Download or clone the extension files to your local machine
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          Ensure all files are in the gmail-vt-extension folder
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                      <span className="text-green-500 font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-3">
                        <Settings className="h-5 w-5 text-green-500" />
                        Load Extension in Chrome
                      </h3>
                      <div className="space-y-3">
                        <ol className="space-y-2 text-muted-foreground list-decimal list-inside pl-4">
                          <li>Open Chrome browser</li>
                          <li>Navigate to <code className="bg-muted px-2 py-1 rounded text-sm font-mono">chrome://extensions/</code></li>
                          <li>Enable "Developer mode" (toggle in top right)</li>
                          <li>Click "Load unpacked" button</li>
                          <li>Select the gmail-vt-extension folder</li>
                          <li>The extension icon should appear in your Chrome toolbar</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
                      <span className="text-purple-500 font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-500" />
                        Verify Installation
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          Extension appears as "Gmail Threat Analyzer" in extensions list
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          Icon shows in Chrome toolbar when visiting Gmail
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* API Setup */}
      <section id="setup" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">API Keys Setup</h2>
              <p className="text-muted-foreground">Configure your API keys for full functionality</p>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2">
              {/* VirusTotal API */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border-yellow-500/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Key className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <div className="text-yellow-400">VirusTotal API Key</div>
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">Required</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 font-bold text-xs">1</span>
                      <span>Visit <a href="https://www.virustotal.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">VirusTotal</a></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 font-bold text-xs">2</span>
                      <span>Create free account or login</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 font-bold text-xs">3</span>
                      <span>Go to your profile → API Key section</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 font-bold text-xs">4</span>
                      <span>Copy your API key</span>
                    </div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-400">API Usage Limits</span>
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p><strong>Free Tier:</strong> 500 requests per day</p>
                      <p><strong>Important:</strong> Each email may use multiple requests (URLs, domains, attachments = separate IOCs)</p>
                      <p><strong>Paid Plans:</strong> Higher limits available for heavy usage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* OpenRouter API */}
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-blue-400">OpenRouter API Key</div>
                      <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">Required for AI</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 font-bold text-xs">1</span>
                      <span>Visit <a href="https://openrouter.ai" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">OpenRouter.ai</a></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 font-bold text-xs">2</span>
                      <span>Create account and login</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 font-bold text-xs">3</span>
                      <span>Go to Keys section</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 font-bold text-xs">4</span>
                      <span>Create and copy new API key</span>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-400">AI Model</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Uses DeepSeek R1 model with free tier available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Extension Usage</h2>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Play className="h-6 w-6 text-green-500" />
                  Accessing the Extension
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                  <li>Open Gmail in Chrome browser</li>
                  <li>Navigate to any email (inbox, sent, drafts)</li>
                  <li>Click the extension icon in Chrome toolbar</li>
                  <li>Extension popup opens with two analysis options</li>
                </ol>
              </CardContent>
            </Card>

            <div className="grid gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-blue-500" />
                    Tab 1: VirusTotal Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">First-Time Setup</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      <li>• Paste your VirusTotal API key in the input field</li>
                      <li>• Check "Remember API Key" to save for future use</li>
                      <li>• Status indicator shows green when key is valid</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Running Analysis</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      <li>• Click "Analyze Email" button</li>
                      <li>• Loading process shows "Analyzing email..." with spinner</li>
                      <li>• Extension extracts email data automatically</li>
                      <li>• Results display in ~5-15 seconds</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-purple-500" />
                    Tab 2: AI-Powered Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Setup Requirements</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      <li>• Enter both VirusTotal and OpenRouter API keys</li>
                      <li>• Both keys can be saved separately</li>
                      <li>• Green indicators for valid keys</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">AI Analysis Process</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      <li>• Click "Analyze with AI" button</li>
                      <li>• Collects VirusTotal data first</li>
                      <li>• Sends comprehensive data to AI model</li>
                      <li>• Results display in ~10-30 seconds</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Results */}
      <section className="py-16 bg-gradient-to-r from-background/50 to-purple-500/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Understanding Your Results</h2>
              <p className="text-muted-foreground">Learn how to interpret threat scores and analysis results</p>
            </div>
            
            {/* Threat Score Legend */}
            <Card className="mb-8 bg-gradient-to-r from-muted/5 to-muted/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                  Threat Score Guide (0-10 Scale)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 transition-colors">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                    <div>
                      <div className="font-semibold text-green-400">LOW (0-3)</div>
                      <div className="text-xs text-muted-foreground">Generally safe</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/15 transition-colors">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">!</div>
                    <div>
                      <div className="font-semibold text-yellow-400">MEDIUM (4-6)</div>
                      <div className="text-xs text-muted-foreground">Use caution</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/15 transition-colors">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">⚠</div>
                    <div>
                      <div className="font-semibold text-orange-400">HIGH (7-8)</div>
                      <div className="text-xs text-muted-foreground">Avoid interaction</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 transition-colors">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">🚨</div>
                    <div>
                      <div className="font-semibold text-red-400">CRITICAL (9-10)</div>
                      <div className="text-xs text-muted-foreground">Immediate threat</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Components */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Sender Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Domain reputation score</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Malicious detections count</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Domain age & registration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Security categories</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">URL Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>Individual link scores</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>Malicious/suspicious flags</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>Analysis status indicators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span>URL classification tags</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Attachment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span>File hash analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span>Malware scan results</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span>File intelligence data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span>Risk assessment score</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Best Practices</h2>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                    Daily Usage Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Analyze Suspicious Emails:</strong> Any unexpected or unusual emails</li>
                    <li>• <strong>Check External Links:</strong> Before clicking unfamiliar URLs</li>
                    <li>• <strong>Verify Attachments:</strong> Scan files from unknown senders</li>
                    <li>• <strong>Monitor Patterns:</strong> Watch for campaign-style attacks</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-red-500" />
                    Security Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Never Override Malicious VT Findings:</strong> If VirusTotal flags as malicious, treat as threat</li>
                    <li>• <strong>Investigate Mixed Signals:</strong> High AI risk + clean VT = needs verification</li>
                    <li>• <strong>Use Alternative Verification:</strong> Contact senders through separate channels</li>
                    <li>• <strong>Report Threats:</strong> Share findings with IT security teams</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="py-16 bg-gradient-to-r from-orange-500/5 to-red-500/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Troubleshooting & Support</h2>
              <p className="text-muted-foreground">Common issues and their solutions</p>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6 text-orange-500" />
                    Common Issues
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-orange-400">Extension Not Loading</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-orange-500" />
                        <span>Refresh Gmail page</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-orange-500" />
                        <span>Check extension is enabled in chrome://extensions/</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-orange-500" />
                        <span>Reload extension if needed</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">API Key Errors</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-yellow-500" />
                        <span>Verify key format and validity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-yellow-500" />
                        <span>Check API quota limits</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-yellow-500" />
                        <span>Ensure proper account permissions</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-400">Analysis Failures</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-red-500" />
                        <span>Check internet connection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-red-500" />
                        <span>Verify Gmail email is loaded</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-3 w-3 text-red-500" />
                        <span>Try re-analysis for temporary failures</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Info className="h-6 w-6 text-blue-500" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-400">Current Data Handling</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <Shield className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                        <span>No data collection - extension doesn't store user data</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                        <span>Email content sent only to security APIs for analysis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                        <span>API keys stored locally in Chrome storage only</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                        <span>No tracking, analytics, or data retention currently</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                        <span>All communications use secure HTTPS</span>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-400">Future Enhancements</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Future versions may include optional anonymous usage statistics to improve the extension. 
                        Any such features would require explicit user consent and remain completely anonymous.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-400">Privacy First Approach</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Current zero data collection policy - your privacy is completely protected. 
                      Any future analytics would be optional, anonymous, and require your explicit consent.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimers */}
      <section className="py-16 bg-gradient-to-r from-red-500/5 to-orange-500/5 border-y border-red-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Important Disclaimers</h2>
              <p className="text-muted-foreground">Please read before downloading and using the extension</p>
            </div>
            
            <div className="grid gap-6">
              <Card className="border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-red-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                    Service Availability & Liability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p>
                        <strong>Third-Party API Dependencies:</strong> This extension relies on VirusTotal and OpenRouter APIs. 
                        Service outages, rate limiting, or changes to these APIs may affect functionality.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p>
                        <strong>No Liability:</strong> We are not liable for any damages, data loss, security breaches, 
                        or issues resulting from the use of this extension. Use at your own risk.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p>
                        <strong>User Responsibility:</strong> By downloading and using this extension, you acknowledge 
                        that you are responsible for your own email security decisions.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p>
                        <strong>No Email Server Access:</strong> This extension operates locally in your browser 
                        and does not access your email servers or accounts directly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-orange-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Info className="h-6 w-6 text-yellow-500" />
                    API Usage & Limitations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p>
                        <strong>VirusTotal Limits:</strong> Free accounts are limited to 500 requests per day. 
                        Each email may consume multiple requests for different IOCs (URLs, domains, files).
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p>
                        <strong>Quota Management:</strong> Monitor your API usage to avoid hitting daily limits. 
                        Consider paid plans for higher usage requirements.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p>
                        <strong>API Key Security:</strong> Keep your API keys secure and never share them. 
                        You are responsible for all usage under your keys.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Secure Your Gmail?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Download the extension and start protecting your inbox with advanced threat analysis
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('/download', '_self')}
              >
                <Download className="h-6 w-6 mr-3" />
                Download Extension
                <ArrowRight className="h-5 w-5 ml-3" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-blue-500/10 transition-all duration-300"
                onClick={() => window.open('https://www.youtube.com/watch?v=sSqZGpjCEHE', '_blank')}
              >
                <Play className="h-6 w-6 mr-3" />
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-semibold mb-1">Easy Setup</h3>
                <p className="text-sm text-muted-foreground">Install in 3 simple steps</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-1">Advanced Analysis</h3>
                <p className="text-sm text-muted-foreground">AI + VirusTotal protection</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-1">Real-time</h3>
                <p className="text-sm text-muted-foreground">Instant threat detection</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
