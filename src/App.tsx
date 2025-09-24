import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Navigation } from "./components/Navigation"
import { Footer } from "./components/sections/Footer"
import { HomePage } from "./pages/HomePage"
import { FeaturesPage } from "./pages/FeaturesPage"
import { DemoPage } from "./pages/DemoPage"
import { DownloadPage } from "./pages/DownloadPage"
import { TechnologyPage } from "./pages/TechnologyPage"
import { UsagePage } from "./pages/UsagePage"
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage"
import { LicensePage } from "./pages/LicensePage"
import { AiAnalytics } from "./pages/AiAnalytics"

// Import admin utilities for development debugging
import "./utils/adminUtils"

function App() {
  return (
    <Router>
      <div className="dark min-h-screen bg-background text-foreground">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/usage" element={<UsagePage />} />
          <Route path="/premium-ai" element={<AiAnalytics />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/license" element={<LicensePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
