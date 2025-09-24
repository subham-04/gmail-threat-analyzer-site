import React, { useState } from 'react'
import { Button } from './ui/button'
import { User, Mail, Briefcase, X, CheckCircle, Download } from 'lucide-react'
import { 
  submitUserRegistration, 
  trackFormStart, 
  trackFormSubmission, 
  initializeAnalytics 
} from '../lib/dataCollection'
import type { UserData } from '../hooks/useDownloadPermission'

interface DownloadFormProps {
  onSubmit: (userData: UserData) => void
  onClose: () => void
  isOpen: boolean
}

export function DownloadForm({ onSubmit, onClose, isOpen }: DownloadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    useCase: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false)

  // Track form start when opened
  React.useEffect(() => {
    if (isOpen && !hasTrackedFormStart) {
      initializeAnalytics().then(() => {
        trackFormStart('download-registration-form');
      });
      setHasTrackedFormStart(true);
    }
    if (!isOpen) {
      setHasTrackedFormStart(false);
    }
  }, [isOpen, hasTrackedFormStart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Track form submission
      await trackFormSubmission('download-registration-form', formData.email);
      
      // Submit to Firebase using optimized system
      const signupId = await submitUserRegistration({
        name: formData.name,
        email: formData.email,
        occupation: formData.occupation,
        useCase: formData.useCase
      });

      // Check if user was already registered
      if (signupId === 'ALREADY_REGISTERED') {
        console.log('✅ User already registered, granting download access');
        const userData: UserData = {
          ...formData,
          submittedAt: new Date().toISOString()
        };
        
        setIsSubmitted(true);
        
        // Show success message and grant permission immediately
        setTimeout(() => {
          onSubmit(userData);
        }, 1500);
        
        return;
      }

      const userData: UserData = {
        ...formData,
        submittedAt: new Date().toISOString()
      }

      setIsSubmitted(true)
      
      // Wait a moment for the success animation, then grant permission
      setTimeout(() => {
        onSubmit(userData)
      }, 2000)

    } catch (error) {
      console.error('Error submitting form:', error)
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes('wait 5 minutes')) {
          setSubmitError('⏱️ Please wait 5 minutes between submissions to prevent spam')
        } else if (error.message.includes('valid email')) {
          setSubmitError('📫 Please enter a valid email address')
        } else if (error.message.includes('fill in all required')) {
          setSubmitError('📝 Please fill in all required fields')
        } else if (error.message.includes('Database permissions')) {
          setSubmitError('🔒 Database connection issue. Please contact support.')
        } else if (error.message.includes('Network connection blocked')) {
          setSubmitError('🚫 Request blocked. Please disable ad blocker and try again.')
        } else {
          setSubmitError(`❌ ${error.message}`)
        }
      } else {
        setSubmitError('❌ Failed to submit form. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="bg-background border border-purple-500/20 rounded-lg max-w-md w-full mx-4 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 my-8 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center animate-pulse">
                <Download className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Download Access Required</h3>
                <p className="text-sm text-muted-foreground">Please provide your details to download</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="w-8 h-8 p-0 hover:scale-110 transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="animate-in slide-in-from-left-2 duration-300 delay-100">
                <label className="block text-sm font-medium mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background transition-all duration-200 hover:border-purple-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="animate-in slide-in-from-left-2 duration-300 delay-150">
                <label className="block text-sm font-medium mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background transition-all duration-200 hover:border-purple-300"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="animate-in slide-in-from-left-2 duration-300 delay-200">
                <label className="block text-sm font-medium mb-2">
                  <Briefcase className="h-4 w-4 inline mr-2" />
                  What do you do? *
                </label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background transition-all duration-200 hover:border-purple-300"
                >
                  <option value="">Select your role</option>
                  <option value="business-owner">Business Owner</option>
                  <option value="it-professional">IT Professional</option>
                  <option value="security-analyst">Security Analyst</option>
                  <option value="consultant">Consultant</option>
                  <option value="developer">Developer</option>
                  <option value="manager">Manager</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="animate-in slide-in-from-left-2 duration-300 delay-250">
                <label className="block text-sm font-medium mb-2">
                  How will you use this extension?
                </label>
                <textarea
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-background resize-none transition-all duration-200 hover:border-purple-300"
                  placeholder="Tell us about your use case (optional)"
                />
              </div>

              {submitError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 animate-in slide-in-from-bottom-2 duration-300">
                  <p className="text-sm text-red-400">{submitError}</p>
                </div>
              )}

              <div className="animate-in slide-in-from-bottom-2 duration-300 delay-300">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all duration-200"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Get Download Access
                    </>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 animate-in zoom-in-95 fade-in duration-500">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 animate-in slide-in-from-bottom-2 duration-300 delay-100">Access Granted!</h3>
              <p className="text-muted-foreground mb-4 animate-in slide-in-from-bottom-2 duration-300 delay-200">
                {formData.name ? `Thank you, ${formData.name}! ` : 'Thank you! '}
                Your download will start shortly.
              </p>
              <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20 animate-in slide-in-from-bottom-2 duration-300 delay-300">
                <p className="text-sm text-green-400">
                  🎉 You now have permanent access to download the extension!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
