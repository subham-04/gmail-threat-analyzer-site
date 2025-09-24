import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { FileText, Download, Github, Scale, Shield, Users } from "lucide-react"

export function LicensePage() {
  return (
    <main className="pt-16">
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">License Information</h1>
            <p className="text-xl text-muted-foreground">
              Gmail Threat Analyzer is open source software licensed under GPL-3.0
            </p>
          </div>

          {/* License Overview */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <Scale className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">GPL-3.0 Licensed</h3>
                <p className="text-sm text-muted-foreground">
                  Free to use, modify, and distribute under open source terms
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Open source collaboration preventing proprietary commercialization
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Copyleft Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Derivative works must remain open source under GPL-3.0
                </p>
              </CardContent>
            </Card>
          </div>

          {/* License Details */}
          <div className="space-y-8">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    GNU General Public License v3.0
                  </CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Open Source
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-background/50 rounded-lg p-6 border border-border">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold mb-2">Copyright Notice</h3>
                  </div>
                  <div className="text-sm font-mono bg-muted/50 p-4 rounded border">
                    <p className="mb-4"><strong>GNU GENERAL PUBLIC LICENSE</strong></p>
                    <p className="mb-2">Version 3, 29 June 2007</p>
                    <p className="mb-4">Copyright (C) 2025 Gmail Threat Analyzer Extension</p>
                    
                    <p className="mb-2">This program is free software: you can redistribute it and/or modify</p>
                    <p className="mb-2">it under the terms of the GNU General Public License as published by</p>
                    <p className="mb-2">the Free Software Foundation, either version 3 of the License, or</p>
                    <p className="mb-4">(at your option) any later version.</p>
                    
                    <p className="mb-2">This program is distributed in the hope that it will be useful,</p>
                    <p className="mb-2">but WITHOUT ANY WARRANTY; without even the implied warranty of</p>
                    <p className="mb-2">MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the</p>
                    <p className="mb-4">GNU General Public License for more details.</p>
                    
                    <p className="mb-2">You should have received a copy of the GNU General Public License</p>
                    <p className="mb-2">along with this program. If not, see</p>
                    <p className="text-blue-400">&lt;https://www.gnu.org/licenses/&gt;</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Project Description</h4>
                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong>Gmail Threat Analyzer - Advanced Email Security Scanner</strong><br />
                      Copyright (C) 2025
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      This extension analyzes Gmail emails for potential security threats using 
                      the VirusTotal API. It performs comprehensive security analysis of:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                      <li>• Sender domain reputation analysis</li>
                      <li>• URL safety scanning and threat detection</li>
                      <li>• Attachment security assessment</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Contact: privacy@gmailthreatanalyzer.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>What GPL-3.0 Means for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-400">✅ You Can:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Use the software for any purpose</li>
                      <li>• Study and modify the source code</li>
                      <li>• Distribute original or modified versions</li>
                      <li>• Use it commercially (with restrictions)</li>
                      <li>• Contribute improvements back to the community</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-orange-400">⚠️ You Must:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Keep the same GPL-3.0 license</li>
                      <li>• Include copyright and license notices</li>
                      <li>• Provide source code when distributing</li>
                      <li>• Document any changes you make</li>
                      <li>• License derivative works under GPL-3.0</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Why We Choose GPL-3.0</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We've chosen the GNU General Public License v3.0 for Gmail Threat Analyzer to ensure:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Community Protection:</strong> Prevents proprietary commercialization while encouraging open collaboration</li>
                  <li>• <strong>User Freedom:</strong> Guarantees users' rights to use, study, modify, and share the software</li>
                  <li>• <strong>Copyleft Assurance:</strong> Any derivative works must remain open source and benefit the community</li>
                  <li>• <strong>Transparency:</strong> Maintains open source development for a security-focused tool</li>
                  <li>• <strong>Innovation:</strong> Encourages community contributions and collaborative improvement</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Source Code & Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Access the complete source code, contribute to development, or report issues:
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => window.open('https://github.com/subham-04/gmail-threat-analyzer-sources', '_blank')}
                  >
                    <Github className="h-4 w-4" />
                    View Source Code
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => window.open('https://www.gnu.org/licenses/gpl-3.0.txt', '_blank')}
                  >
                    <Download className="h-4 w-4" />
                    Download GPL-3.0 License
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>DISCLAIMER:</strong> This program is distributed in the hope that it will be useful, 
                    but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
                    FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
