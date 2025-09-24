import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { Shield, Mail, Globe, Heart } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-background/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Gmail Threat Analyzer</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Enterprise-grade email security analysis powered by VirusTotal and AI. 
              Protect yourself from phishing, malware, and sophisticated threats with one click.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Built with security and privacy in mind</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/features" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/demo" className="hover:text-foreground transition-colors">
                  AI Demo
                </Link>
              </li>
              <li>
                <Link to="/download" className="hover:text-foreground transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link to="/technology" className="hover:text-foreground transition-colors">
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a 
                  href="https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Firefox Add-on
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/watch?v=sSqZGpjCEHE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  YouTube Demo
                </a>
              </li>
              <li>
                <Link to="/demo" className="hover:text-foreground transition-colors">
                  AI Waitlist
                </Link>
              </li>
              <li>
                <a href="mailto:support@gmailthreatanalyzer.com" className="hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/license" className="hover:text-foreground transition-colors">
                  GPL-3.0 License
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/subham-04/gmail-threat-analyzer-sources" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Source Code
                </a>
              </li>
              <li>
                <a 
                  href="https://www.gnu.org/licenses/gpl-3.0.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GPL-3.0 Details
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            <div>© {currentYear} Gmail Threat Analyzer. All rights reserved.</div>
            <div className="mt-1">
              Licensed under{" "}
              <Link to="/license" className="text-primary hover:underline">
                GPL-3.0
              </Link>
              {" "}• Open Source Security Tool
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/', '_blank')}
            >
              <Globe className="h-4 w-4 mr-2" />
              Download Extension
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://www.youtube.com/watch?v=sSqZGpjCEHE', '_blank')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
