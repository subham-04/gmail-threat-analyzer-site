import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Shield, Lock, Eye, Database, Globe, Mail, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

export function PrivacyPolicyPage() {
  return (
    <main className="pt-16">
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is our top priority. Learn how Gmail Threat Analyzer protects your data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: August 5, 2025
            </p>
          </div>

          {/* Privacy Highlights */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <Lock className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Local Processing Only</h3>
                <p className="text-sm text-muted-foreground">
                  Your emails are analyzed locally in your browser - never sent to external servers
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <Eye className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Data Collection</h3>
                <p className="text-sm text-muted-foreground">
                  We don't collect, store, or share any of your personal email data
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">API Security</h3>
                <p className="text-sm text-muted-foreground">
                  Only anonymized hashes sent to VirusTotal for threat analysis
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Policy Content */}
          <div className="space-y-8">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Data Collection Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-green-400">Current Data Collection Policy</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Gmail Threat Analyzer currently follows a strict no-data-collection policy. We do not collect, store, or transmit any personal data.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-400">Future Data Collection</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      In the future, we may implement optional, anonymous usage statistics collection to improve the extension. 
                      Any such changes will be clearly communicated and require user consent.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">What We Currently DON'T Collect:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Email content or messages</li>
                    <li>• Personal identifying information</li>
                    <li>• Email addresses or contact lists</li>
                    <li>• Browser history or activity</li>
                    <li>• Location data</li>
                    <li>• Usage statistics or analytics</li>
                    <li>• Error logs or debugging data</li>
                    <li>• Any user behavior tracking</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Potential Future Data Collection:</h4>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground mb-2">
                      We may introduce <strong>optional</strong> anonymous usage statistics in future versions to help improve the extension:
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Anonymous usage frequency (how often extension is used)</li>
                      <li>• Feature usage patterns (which features are most helpful)</li>
                      <li>• Performance metrics (analysis speed, success rates)</li>
                      <li>• Error statistics (to improve reliability)</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">
                      Important: Any future data collection would be clearly disclosed, completely anonymous, 
                      and require explicit user consent through extension settings.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">What We Store Locally:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• API keys (stored securely in Chrome's local storage)</li>
                    <li>• Extension preferences (local settings only)</li>
                    <li>• No data leaves your device except for security API calls</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Email Analysis Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">How Threat Analysis Works:</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li>1. Email content is parsed locally in your browser</li>
                    <li>2. URLs, domains, and file hashes are extracted</li>
                    <li>3. Only these identifiers are sent to security APIs (VirusTotal & OpenRouter)</li>
                    <li>4. Threat analysis results are returned and displayed</li>
                    <li>5. No personal data or email content is stored anywhere</li>
                    <li>6. Analysis results are shown once and not retained</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Third-Party API Usage:</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>VirusTotal:</strong> Receives URLs, domains, and file hashes for threat intelligence lookup. No email content shared.</p>
                    <p><strong>OpenRouter:</strong> Receives extracted data for AI-powered threat analysis. No personal information included.</p>
                    <p>Both services have their own privacy policies governing the data they receive.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Data Storage & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Local Storage:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Extension settings stored locally in your browser</li>
                    <li>• VirusTotal API key (if provided) stored locally with encryption</li>
                    <li>• Analysis cache for improved performance (automatically cleared)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Security Measures:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• All communications use HTTPS encryption</li>
                    <li>• No persistent storage of email data</li>
                    <li>• Regular security updates and vulnerability patches</li>
                    <li>• Open-source code for transparency and community review</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Third-Party Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">VirusTotal API:</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    We use VirusTotal's public API for threat intelligence. 
                    Please review VirusTotal's privacy policy for their data handling practices.
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Only anonymized domain/URL hashes are sent</li>
                    <li>• No email content or personal data shared</li>
                    <li>• Queries may be rate-limited for fair usage</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Your Rights & Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">You Have the Right To:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Disable the extension at any time</li>
                    <li>• Clear all local storage and cached data</li>
                    <li>• Use the extension without providing any personal information</li>
                    <li>• Review our open-source code for transparency</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Data Deletion:</h4>
                  <p className="text-sm text-muted-foreground">
                    Uninstalling the extension automatically removes all local data. 
                    No data is stored on our servers to delete.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Updates to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We may update this privacy policy from time to time. Any changes will be 
                  posted on this page with an updated revision date. We encourage you to 
                  review this policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Terms of Use & Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span className="font-semibold text-red-400">Important Legal Notice</span>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong>By downloading and using this extension, you agree to the following terms:</strong>
                    </p>
                    <ul className="space-y-2 list-disc list-inside pl-4">
                      <li>You use this extension entirely at your own risk</li>
                      <li>We are not liable for any damages, data loss, or security issues</li>
                      <li>You are responsible for your own email security decisions</li>
                      <li>Service availability depends on third-party APIs (VirusTotal, OpenRouter)</li>
                      <li>API outages or changes may affect extension functionality</li>
                      <li>You consent to future privacy policy updates regarding data collection</li>
                      <li>Future anonymous usage statistics (if implemented) will require separate consent</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">API Usage & Limitations:</h4>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                      <p className="font-medium text-yellow-400 mb-2">VirusTotal API Limits:</p>
                      <ul className="space-y-1 list-disc list-inside pl-2">
                        <li>Free accounts: 500 requests per day (not 1,000)</li>
                        <li>Each email may use multiple requests for different IOCs</li>
                        <li>URLs, domains, and file hashes each count as separate requests</li>
                        <li>Paid plans available for higher usage requirements</li>
                      </ul>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <p className="font-medium text-blue-400 mb-2">User Responsibilities:</p>
                      <ul className="space-y-1 list-disc list-inside pl-2">
                        <li>Secure storage and management of your API keys</li>
                        <li>Monitoring your API usage to avoid quota limits</li>
                        <li>Understanding that analysis results are for guidance only</li>
                        <li>Making final security decisions based on your judgment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Privacy & Access Clarification:</h4>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>This extension does NOT access your email servers</li>
                      <li>It only reads email content displayed in your browser</li>
                      <li>No direct connection to Gmail, Outlook, or other email services</li>
                      <li>All processing happens locally in your browser</li>
                      <li>Only extracted identifiers (URLs, hashes) are sent to security APIs</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-orange-400">Agreement Required</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    By downloading and using Gmail Threat Analyzer, you acknowledge that you have read, 
                    understood, and agree to these privacy terms and disclaimers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have any questions about this privacy policy or our data practices, 
                  please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@gmailthreatanalyzer.com</p>
                  <p><strong>GitHub:</strong> [Your GitHub Repository]</p>
                  <p><strong>License:</strong> GNU General Public License v3.0</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
