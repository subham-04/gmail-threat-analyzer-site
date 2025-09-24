import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Shield, Zap, Users, Award, Globe } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { DownloadForm } from "../DownloadForm"
import { useDownloadPermission } from "../../hooks/useDownloadPermission"

export function Hero() {
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const { hasPermission, grantPermission, refreshPermissions } = useDownloadPermission()

  // Handle download button click
  const handleDownloadClick = () => {
    // First refresh permissions to ensure we have the latest state
    refreshPermissions()
    
    if (hasPermission) {
      // User has already submitted form, proceed with download immediately
      window.open('https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/', '_blank')
    } else {
      // Show form first
      setShowDownloadForm(true)
    }
  }

  // Handle form submission and grant download access
  const handleFormSubmit = (userData: any) => {
    grantPermission(userData)
    setShowDownloadForm(false)
    // Proceed with download after form submission
    setTimeout(() => {
      window.open('https://addons.mozilla.org/en-US/firefox/addon/gmail-threat-analyzer/', '_blank')
    }, 500)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/50 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Status Badge */}
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            🚀 Firefox Extension Available Now
          </Badge>
          
          {/* Main Heading */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Gmail Threat Analyzer
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
            Intelligent email security analysis powered by VirusTotal and AI. 
            Protect yourself from phishing, malware, and sophisticated threats with one click.
          </p>
          
          {/* Key Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Under 10s Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">80+ Security Engines</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">90%+ User Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Enterprise-Grade Security</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto" onClick={handleDownloadClick}>
              <Globe className="h-5 w-5 mr-3" />
              Download for Firefox
            </Button>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                Watch AI Demo
              </Button>
            </Link>
          </div>
          
          {/* Problem Statement */}
          <div className="mt-16 rounded-lg border bg-card p-8 text-left max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">The Problem We Solve</h2>
            <p className="text-muted-foreground leading-relaxed">
              Manual email security analysis is time-consuming, error-prone, and requires technical expertise. 
              Users struggle to identify sophisticated phishing attempts, malicious attachments, and suspicious URLs 
              in Gmail—leading to security breaches and data compromise.
            </p>
          </div>
        </div>
      </div>
      
      {/* Download Form Modal */}
      <DownloadForm
        isOpen={showDownloadForm}
        onSubmit={handleFormSubmit}
        onClose={() => setShowDownloadForm(false)}
      />
    </section>
  )
}
