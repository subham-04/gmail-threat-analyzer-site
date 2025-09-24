// Temporary fallback for data collection - replace with actual Firebase once installed
// This version stores data locally and logs to console for development

// Types for our data structures (same as Firebase version)
export interface EarlyAccessSignup {
  name: string;
  email: string;
  occupation: string;
  useCase: string;
  timestamp: string;
  sourcePage: string;
  userAgent: string;
  referrer: string;
  ipLocation?: string;
}

export interface PageAnalytics {
  eventType: 'page_view' | 'button_click' | 'form_start' | 'form_complete' | 'scroll_depth' | 'time_on_page';
  page: string;
  elementId?: string;
  timestamp: string;
  sessionId: string;
  userAgent: string;
  referrer: string;
  scrollDepth?: number;
  timeOnPage?: number;
  additionalData?: any;
}

// Temporary storage keys
const STORAGE_KEYS = {
  EARLY_ACCESS: 'early_access_signups',
  PAGE_ANALYTICS: 'page_analytics'
};

// Early Access Signup Functions (Temporary Implementation)
export const submitEarlyAccessSignup = async (formData: {
  name: string;
  email: string;
  occupation: string;
  useCase: string;
}): Promise<string> => {
  const signupData: EarlyAccessSignup = {
    ...formData,
    timestamp: new Date().toISOString(),
    sourcePage: window.location.pathname,
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'direct',
  };

  // Store locally (temporary)
  const existingData = localStorage.getItem(STORAGE_KEYS.EARLY_ACCESS);
  const signups = existingData ? JSON.parse(existingData) : [];
  const signupId = `signup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  signups.push({ id: signupId, ...signupData });
  localStorage.setItem(STORAGE_KEYS.EARLY_ACCESS, JSON.stringify(signups));

  // Log for development
  console.log('📧 Early Access Signup (Temporary Storage):', signupData);
  console.log('🎯 Total Signups:', signups.length);

  // Track analytics
  await trackAnalytics({
    eventType: 'form_complete',
    page: window.location.pathname,
    elementId: 'early-access-form',
    additionalData: { 
      occupation: formData.occupation,
      hasUseCase: !!formData.useCase 
    }
  });

  return signupId;
};

// Page Analytics Functions (Temporary Implementation)
export const trackAnalytics = async (data: Omit<PageAnalytics, 'timestamp' | 'sessionId' | 'userAgent' | 'referrer'>): Promise<void> => {
  const analyticsData: PageAnalytics = {
    ...data,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'direct'
  };

  // Store locally (temporary)
  const existingData = localStorage.getItem(STORAGE_KEYS.PAGE_ANALYTICS);
  const analytics = existingData ? JSON.parse(existingData) : [];
  analytics.push(analyticsData);
  
  // Keep only last 100 analytics events to prevent storage overflow
  if (analytics.length > 100) {
    analytics.splice(0, analytics.length - 100);
  }
  
  localStorage.setItem(STORAGE_KEYS.PAGE_ANALYTICS, JSON.stringify(analytics));

  // Log for development
  console.log('📊 Analytics Event (Temporary Storage):', analyticsData);
};

// Track page view
export const trackPageView = async (page: string): Promise<void> => {
  console.log('👁️ Page View:', page);
  await trackAnalytics({
    eventType: 'page_view',
    page
  });
};

// Track button clicks
export const trackButtonClick = async (elementId: string, page: string): Promise<void> => {
  console.log('🖱️ Button Click:', elementId, 'on', page);
  await trackAnalytics({
    eventType: 'button_click',
    page,
    elementId
  });
};

// Track form interactions
export const trackFormStart = async (formId: string, page: string): Promise<void> => {
  console.log('📝 Form Start:', formId, 'on', page);
  await trackAnalytics({
    eventType: 'form_start',
    page,
    elementId: formId
  });
};

// Track scroll depth
export const trackScrollDepth = async (depth: number, page: string): Promise<void> => {
  console.log('📜 Scroll Depth:', depth + '%', 'on', page);
  await trackAnalytics({
    eventType: 'scroll_depth',
    page,
    scrollDepth: depth
  });
};

// Track time on page
export const trackTimeOnPage = async (timeSeconds: number, page: string): Promise<void> => {
  console.log('⏱️ Time on Page:', timeSeconds + 's', 'on', page);
  await trackAnalytics({
    eventType: 'time_on_page',
    page,
    timeOnPage: timeSeconds
  });
};

// Utility Functions
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Auto-track scroll depth (call this on component mount)
export const initScrollTracking = (page: string): (() => void) => {
  let maxScrollDepth = 0;
  const trackingThresholds = [25, 50, 75, 90, 100];
  const trackedThresholds = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;
      
      // Track milestone thresholds
      trackingThresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          trackScrollDepth(threshold, page);
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Auto-track time on page (call this on component mount)
export const initTimeTracking = (page: string): (() => void) => {
  const startTime = Date.now();
  let isActive = true;
  
  const trackTime = () => {
    if (isActive) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 5) { // Only track if user spent more than 5 seconds
        trackTimeOnPage(timeSpent, page);
      }
    }
  };

  // Track time when page is hidden/user leaves
  const handleVisibilityChange = () => {
    if (document.hidden) {
      isActive = false;
      trackTime();
    } else {
      isActive = true;
    }
  };

  const handleBeforeUnload = () => {
    trackTime();
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('beforeunload', handleBeforeUnload);

  // Return cleanup function
  return () => {
    isActive = false;
    trackTime();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};

// Helper function to view stored data (for development)
export const getStoredData = () => {
  const signups = localStorage.getItem(STORAGE_KEYS.EARLY_ACCESS);
  const analytics = localStorage.getItem(STORAGE_KEYS.PAGE_ANALYTICS);
  
  return {
    earlyAccessSignups: signups ? JSON.parse(signups) : [],
    pageAnalytics: analytics ? JSON.parse(analytics) : []
  };
};

// Helper function to clear stored data (for development)
export const clearStoredData = () => {
  localStorage.removeItem(STORAGE_KEYS.EARLY_ACCESS);
  localStorage.removeItem(STORAGE_KEYS.PAGE_ANALYTICS);
  console.log('🗑️ Temporary storage cleared');
};
