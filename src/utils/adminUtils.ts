// Admin utilities for spam protection monitoring
// Access these functions in browser console for debugging

import { 
  getSpamProtectionStatus, 
  clearRateLimits, 
  clearSubmittedEmails, 
  getSubmittedEmailsCount,
  debugCurrentSession,
  exportAnalyticsData
} from '../lib/dataCollection'

// Make functions available globally for console access
declare global {
  interface Window {
    adminUtils: {
      checkSpamStatus: () => void
      clearRateLimit: () => void
      clearEmails: () => void
      getEmailCount: () => number
      debugSession: () => any
      exportData: () => Promise<any>
      showHelp: () => void
    }
  }
}

// Admin utility functions
const adminUtils = {
  // Check current spam protection status
  checkSpamStatus: () => {
    const status = getSpamProtectionStatus()
    console.group('🛡️ Spam Protection Status')
    console.log('Can Submit:', status.canSubmit ? '✅ Yes' : '❌ No')
    console.log('Last Submission:', status.lastSubmissionTime || 'Never')
    console.log('Rate Limit:', `${status.rateLimitMinutes} minutes`)
    console.log('Total Emails Submitted:', status.totalSubmittedEmails)
    console.groupEnd()
    return status
  },

  // Clear rate limiting (admin only)
  clearRateLimit: () => {
    if (confirm('⚠️ Clear rate limits? This will allow immediate resubmission.')) {
      clearRateLimits()
      console.log('✅ Rate limits cleared')
    }
  },

  // Clear submitted emails (admin only - dangerous!)
  clearEmails: () => {
    if (confirm('⚠️ DANGER: Clear all submitted emails? This will allow duplicate submissions!')) {
      clearSubmittedEmails()
      console.log('✅ Submitted emails cleared')
    }
  },

  // Get count of submitted emails
  getEmailCount: () => {
    const count = getSubmittedEmailsCount()
    console.log(`📧 Total submitted emails: ${count}`)
    return count
  },

  // Debug current session with correlation info
  debugSession: () => {
    return debugCurrentSession()
  },

  // Export all analytics data with correlation
  exportData: async () => {
    try {
      const data = await exportAnalyticsData()
      console.log('📤 Analytics data exported - check return value')
      return data
    } catch (error) {
      console.error('Failed to export data:', error)
      return null
    }
  },

  // Show help
  showHelp: () => {
    console.group('🔧 Admin Utils Help')
    console.log('adminUtils.checkSpamStatus() - Check protection status')
    console.log('adminUtils.clearRateLimit() - Clear rate limiting')
    console.log('adminUtils.clearEmails() - Clear submitted emails (DANGER)')
    console.log('adminUtils.getEmailCount() - Get submitted email count')
    console.log('adminUtils.debugSession() - Show current session correlation')
    console.log('adminUtils.exportData() - Export all analytics data')
    console.log('adminUtils.showHelp() - Show this help')
    console.groupEnd()
  }
}

// Make available globally
if (typeof window !== 'undefined') {
  window.adminUtils = adminUtils
}

export { adminUtils }
