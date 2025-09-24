// Optimized Data Collection System for Firebase Firestore
// Comprehensive analytics with IP location tracking and automated aggregation

import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  increment,
  getDoc,
  setDoc,
  writeBatch
} from 'firebase/firestore';

// Enhanced data structures for comprehensive analytics
export interface UserSession {
  sessionId: string;
  userId?: string; // For registered users
  timestamp: any; // Firebase Timestamp
  ipAddress?: string;
  ipLocation?: {
    country: string;
    countryCode: string;
    region: string;
    city: string;
    timezone: string;
    latitude?: number;
    longitude?: number;
  };
  device: {
    userAgent: string;
    platform: string;
    browser: string;
    isMobile: boolean;
    screenResolution?: string;
  };
  referrer: string;
  landingPage: string;
  totalPageViews: number;
  totalTimeSpent: number; // in seconds
  lastActivity: any; // Firebase Timestamp
  conversionEvents: string[]; // ['form_start', 'form_complete', 'download']
  isConverted: boolean;
}

export interface PageEvent {
  sessionId: string;
  eventId: string; // unique identifier
  timestamp: any; // Firebase Timestamp
  eventType: 'page_view' | 'button_click' | 'form_start' | 'form_complete' | 'download' | 'scroll_milestone' | 'time_milestone';
  page: string;
  elementId?: string;
  eventData?: {
    scrollPercentage?: number;
    timeOnPage?: number;
    buttonText?: string;
    formFields?: string[];
    downloadType?: 'firefox_store' | 'zip_manual';
    clickPosition?: { x: number; y: number };
  };
}

export interface UserRegistration {
  userId: string; // unique identifier
  sessionId: string; // link to session
  timestamp: any; // Firebase Timestamp
  name: string;
  email: string;
  occupation: string;
  useCase: string;
  sourcePage: string;
  campaignSource?: string; // UTM tracking
  conversionPath: string[]; // pages visited before conversion
  timeToConversion: number; // seconds from first visit to signup
  ipLocation?: UserSession['ipLocation']; // Copy from session
}

export interface AggregatedStats {
  date: string; // YYYY-MM-DD
  hour?: number; // 0-23 for hourly stats
  stats: {
    // Traffic metrics
    uniqueVisitors: number;
    totalPageViews: number;
    avgSessionDuration: number;
    bounceRate: number;
    
    // Geographic data
    topCountries: { [country: string]: number };
    topCities: { [city: string]: number };
    
    // Conversion metrics
    registrations: number;
    conversionRate: number;
    firefoxDownloads: number;
    zipDownloads: number;
    
    // User behavior
    topPages: { [page: string]: number };
    topReferrers: { [referrer: string]: number };
    avgScrollDepth: number;
    
    // Device/Browser stats
    deviceTypes: { mobile: number; desktop: number; tablet: number };
    browsers: { [browser: string]: number };
    
    // Time-based patterns
    hourlyActivity: number[]; // 24 elements for each hour
  };
  lastUpdated: any; // Firebase Timestamp
}

// Collection names - organized for efficient querying
const COLLECTIONS = {
  SESSIONS: 'user_sessions',           // Real-time session tracking
  EVENTS: 'page_events',              // All user interactions
  REGISTRATIONS: 'user_registrations', // User signups
  DAILY_STATS: 'daily_aggregated',    // Daily summaries
  HOURLY_STATS: 'hourly_aggregated',  // Hourly summaries
  REALTIME_STATS: 'realtime_metrics'  // Current active users, etc.
};

// Session management
let currentSession: UserSession | null = null;
let sessionStartTime = Date.now();
let conversionPath: string[] = [];

// Spam protection constants
const RATE_LIMIT_KEY = 'last_signup_time';
const RATE_LIMIT_MINUTES = 5;
const SUBMITTED_EMAILS_KEY = 'submitted_emails';

// IP Location detection with multiple fallbacks
const getIPLocation = async (): Promise<UserSession['ipLocation'] | null> => {
  const apis = [
    'https://ipapi.co/json/',
    'https://ip-api.com/json/',
    'https://api.ipify.org?format=json' // Just IP, no location
  ];
  
  for (const api of apis) {
    try {
      const response = await fetch(api);
      if (!response.ok) continue;
      
      const data = await response.json();
      
      if (api.includes('ipapi.co')) {
        return {
          country: data.country_name || 'Unknown',
          countryCode: data.country_code || 'XX',
          region: data.region || 'Unknown',
          city: data.city || 'Unknown',
          timezone: data.timezone || 'Unknown',
          latitude: data.latitude || undefined,
          longitude: data.longitude || undefined
        };
      }
      
      if (api.includes('ip-api.com')) {
        return {
          country: data.country || 'Unknown',
          countryCode: data.countryCode || 'XX',
          region: data.regionName || 'Unknown',
          city: data.city || 'Unknown',
          timezone: data.timezone || 'Unknown',
          latitude: data.lat || undefined,
          longitude: data.lon || undefined
        };
      }
      
    } catch (error) {
      console.warn(`Failed to get location from ${api}:`, error);
      continue;
    }
  }
  
  return null;
};

// Enhanced device detection
const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let platform = 'Unknown';
  
  // Browser detection
  if (ua.includes('Chrome') && !ua.includes('Edge')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  else if (ua.includes('Opera')) browser = 'Opera';
  
  // Platform detection
  if (ua.includes('Windows')) platform = 'Windows';
  else if (ua.includes('Mac')) platform = 'macOS';
  else if (ua.includes('Linux')) platform = 'Linux';
  else if (ua.includes('Android')) platform = 'Android';
  else if (ua.includes('iOS')) platform = 'iOS';
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  
  return {
    userAgent: ua,
    platform,
    browser,
    isMobile,
    screenResolution: screen.width && screen.height ? `${screen.width}x${screen.height}` : undefined
  };
};

// Session ID generation
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Event ID generation
const generateEventId = (): string => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// User ID generation
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Initialize or get current session
export const initializeSession = async (): Promise<string> => {
  if (currentSession) return currentSession.sessionId;
  
  const sessionId = generateSessionId();
  const ipLocation = await getIPLocation();
  const device = getDeviceInfo();
  
  currentSession = {
    sessionId,
    timestamp: serverTimestamp(),
    ipLocation: ipLocation || undefined,
    device,
    referrer: document.referrer || 'direct',
    landingPage: window.location.pathname,
    totalPageViews: 0,
    totalTimeSpent: 0,
    lastActivity: serverTimestamp(),
    conversionEvents: [],
    isConverted: false
  };
  
  // Add current page to conversion path
  conversionPath = [window.location.pathname];
  
  try {
    await addDoc(collection(db, COLLECTIONS.SESSIONS), currentSession);
    sessionStartTime = Date.now();
  } catch (error) {
    console.warn('Failed to initialize session:', error);
  }
  
  return sessionId;
};

// Update session activity
const updateSessionActivity = async (eventType: string, page: string) => {
  if (!currentSession) return;
  
  try {
    const timeSpent = Math.floor((Date.now() - sessionStartTime) / 1000);
    
    // Update conversion path
    if (!conversionPath.includes(page)) {
      conversionPath.push(page);
    }
    
    // Update conversion events
    if (['form_start', 'form_complete', 'download'].includes(eventType)) {
      if (!currentSession.conversionEvents.includes(eventType)) {
        currentSession.conversionEvents.push(eventType);
      }
      if (eventType === 'form_complete') {
        currentSession.isConverted = true;
      }
    }
    
    // Update session counters
    currentSession.totalTimeSpent = timeSpent;
    currentSession.lastActivity = serverTimestamp();
    if (eventType === 'page_view') {
      currentSession.totalPageViews++;
    }
    
    // Update session document (batch this to reduce writes)
    const sessionRef = doc(db, COLLECTIONS.SESSIONS, currentSession.sessionId);
    await updateDoc(sessionRef, {
      totalPageViews: currentSession.totalPageViews,
      totalTimeSpent: currentSession.totalTimeSpent,
      lastActivity: currentSession.lastActivity,
      conversionEvents: currentSession.conversionEvents,
      isConverted: currentSession.isConverted
    });
    
  } catch (error) {
    console.warn('Failed to update session:', error);
  }
};

// Ensure stats documents exist with proper structure
const ensureStatsDocument = async (docRef: any, isHourly = false) => {
  try {
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const initialStats: Partial<AggregatedStats> = {
        stats: {
          uniqueVisitors: 0,
          totalPageViews: 0,
          avgSessionDuration: 0,
          bounceRate: 0,
          topCountries: {},
          topCities: {},
          registrations: 0,
          conversionRate: 0,
          firefoxDownloads: 0,
          zipDownloads: 0,
          topPages: {},
          topReferrers: {},
          avgScrollDepth: 0,
          deviceTypes: { mobile: 0, desktop: 0, tablet: 0 },
          browsers: {},
          hourlyActivity: new Array(24).fill(0)
        },
        lastUpdated: serverTimestamp()
      };
      
      if (isHourly) {
        initialStats.hour = new Date().getHours();
      }
      
      await setDoc(docRef, initialStats);
    }
  } catch (error) {
    console.warn('Failed to ensure stats document:', error);
  }
};

// Real-time stats update with comprehensive data
const updateRealTimeStats = async (eventType: string, page: string) => {
  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const hour = now.getHours();
    
    const dailyStatsRef = doc(db, COLLECTIONS.DAILY_STATS, today);
    const hourlyStatsRef = doc(db, COLLECTIONS.HOURLY_STATS, `${today}_${hour.toString().padStart(2, '0')}`);
    
    // Ensure documents exist
    await ensureStatsDocument(dailyStatsRef);
    await ensureStatsDocument(hourlyStatsRef, true);
    
    const batch = writeBatch(db);
    
    // Common updates for both daily and hourly
    const updateData: any = {
      lastUpdated: serverTimestamp()
    };
    
    // Update based on event type
    if (eventType === 'page_view') {
      updateData[`stats.totalPageViews`] = increment(1);
      updateData[`stats.topPages.${page.replace(/[^a-zA-Z0-9]/g, '_')}`] = increment(1);
      
      // Add referrer tracking
      if (currentSession?.referrer && currentSession.referrer !== 'direct') {
        const referrerDomain = new URL(currentSession.referrer).hostname;
        updateData[`stats.topReferrers.${referrerDomain.replace(/[^a-zA-Z0-9]/g, '_')}`] = increment(1);
      }
      
      // Add geographic data
      if (currentSession?.ipLocation) {
        updateData[`stats.topCountries.${currentSession.ipLocation.countryCode}`] = increment(1);
        updateData[`stats.topCities.${currentSession.ipLocation.city.replace(/[^a-zA-Z0-9]/g, '_')}`] = increment(1);
      }
      
      // Add device data
      if (currentSession?.device) {
        const deviceType = currentSession.device.isMobile ? 'mobile' : 'desktop';
        updateData[`stats.deviceTypes.${deviceType}`] = increment(1);
        updateData[`stats.browsers.${currentSession.device.browser.replace(/[^a-zA-Z0-9]/g, '_')}`] = increment(1);
      }
    }
    
    if (eventType === 'form_complete') {
      updateData[`stats.registrations`] = increment(1);
    }
    
    if (eventType === 'download') {
      updateData[`stats.firefoxDownloads`] = increment(1);
    }
    
    // Update hourly activity for hourly stats
    const hourlyUpdateData = {
      ...updateData,
      [`stats.hourlyActivity.${hour}`]: increment(1)
    };
    
    batch.update(dailyStatsRef, updateData);
    batch.update(hourlyStatsRef, hourlyUpdateData);
    
    await batch.commit();
  } catch (error) {
    console.warn('Failed to update real-time stats:', error);
  }
};

// Universal event tracking
export const trackEvent = async (
  eventType: PageEvent['eventType'],
  page: string,
  elementId?: string,
  eventData?: PageEvent['eventData']
): Promise<void> => {
  try {
    const sessionId = await initializeSession();
    const eventId = generateEventId();
    
    const event: PageEvent = {
      sessionId,
      eventId,
      timestamp: serverTimestamp(),
      eventType,
      page,
      elementId,
      eventData
    };
    
    // Store event
    await addDoc(collection(db, COLLECTIONS.EVENTS), event);
    
    // Update session
    await updateSessionActivity(eventType, page);
    
    // Update real-time aggregations
    await updateRealTimeStats(eventType, page);
    
  } catch (error) {
    console.warn('Failed to track event:', error);
    // Store locally as fallback
    const fallbackEvent = { eventType, page, elementId, eventData, timestamp: new Date().toISOString() };
    localStorage.setItem(`event_${Date.now()}`, JSON.stringify(fallbackEvent));
  }
};

// Specific tracking functions
export const trackPageView = async (page: string): Promise<void> => {
  await trackEvent('page_view', page);
};

export const trackButtonClick = async (
  elementId: string, 
  page: string, 
  buttonText?: string,
  event?: MouseEvent
): Promise<void> => {
  const clickPosition = event ? { x: event.clientX, y: event.clientY } : undefined;
  await trackEvent('button_click', page, elementId, {
    buttonText,
    clickPosition
  });
};

export const trackFormStart = async (formId: string, page: string, formFields?: string[]): Promise<void> => {
  await trackEvent('form_start', page, formId, { formFields });
};

export const trackFormComplete = async (formId: string, page: string): Promise<void> => {
  await trackEvent('form_complete', page, formId);
};

export const trackDownload = async (
  downloadType: 'firefox_store' | 'zip_manual', 
  page: string
): Promise<void> => {
  await trackEvent('download', page, `download_${downloadType}`, { downloadType });
};

export const trackScrollMilestone = async (page: string, scrollPercentage: number): Promise<void> => {
  await trackEvent('scroll_milestone', page, `scroll_${scrollPercentage}`, { scrollPercentage });
};

export const trackTimeMilestone = async (page: string, timeOnPage: number): Promise<void> => {
  await trackEvent('time_milestone', page, `time_${timeOnPage}`, { timeOnPage });
};

// Enhanced user registration with comprehensive data
export const submitUserRegistration = async (formData: {
  name: string;
  email: string;
  occupation: string;
  useCase: string;
}): Promise<string> => {
  try {
    // Spam protection checks
    if (!checkRateLimit()) {
      throw new Error('Please wait 5 minutes between submissions to prevent spam');
    }

    // Sanitize inputs
    const cleanData = {
      name: sanitizeInput(formData.name, 99),
      email: sanitizeInput(formData.email, 99),
      occupation: sanitizeInput(formData.occupation, 49),
      useCase: sanitizeInput(formData.useCase || '', 499)
    };

    // Validate email format
    if (!validateEmail(cleanData.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Check for duplicate email
    validateUniqueEmail(cleanData.email);

    // Validate required fields
    if (!cleanData.name || !cleanData.email || !cleanData.occupation) {
      throw new Error('Please fill in all required fields');
    }

    const sessionId = await initializeSession();
    const userId = generateUserId();
    const timeToConversion = Math.floor((Date.now() - sessionStartTime) / 1000);

    const registration: UserRegistration = {
      userId,
      sessionId,
      timestamp: serverTimestamp(),
      ...cleanData,
      sourcePage: window.location.pathname,
      conversionPath,
      timeToConversion,
      ipLocation: currentSession?.ipLocation
    };

    // Store registration
    await addDoc(collection(db, COLLECTIONS.REGISTRATIONS), registration);

    // Update session with user ID
    if (currentSession) {
      currentSession.userId = userId;
      const sessionRef = doc(db, COLLECTIONS.SESSIONS, sessionId);
      await updateDoc(sessionRef, { userId });
    }

    // Track completion event
    await trackFormComplete('registration-form', window.location.pathname);

    // Mark as submitted and update rate limit
    markEmailSubmitted(cleanData.email);
    updateRateLimit();

    return userId;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Registration error:', error);
      throw error; // Re-throw validation errors as-is
    }
    throw new Error('Failed to submit registration. Please try again later.');
  }
};

// Spam protection functions (existing)
export const checkRateLimit = (): boolean => {
  const lastTime = localStorage.getItem(RATE_LIMIT_KEY);
  if (!lastTime) return true;
  
  const timeDiff = Date.now() - parseInt(lastTime);
  const minutesPassed = timeDiff / (1000 * 60);
  
  return minutesPassed >= RATE_LIMIT_MINUTES;
};

const validateUniqueEmail = (email: string): void => {
  const submittedEmails = JSON.parse(
    localStorage.getItem(SUBMITTED_EMAILS_KEY) || '[]'
  );
  
  if (submittedEmails.includes(email.toLowerCase())) {
    throw new Error('This email has already been submitted');
  }
};

const sanitizeInput = (input: string, maxLength: number): string => {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>\"'&]/g, '');
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
};

const markEmailSubmitted = (email: string): void => {
  const submittedEmails = JSON.parse(
    localStorage.getItem(SUBMITTED_EMAILS_KEY) || '[]'
  );
  submittedEmails.push(email.toLowerCase());
  localStorage.setItem(SUBMITTED_EMAILS_KEY, JSON.stringify(submittedEmails));
};

const updateRateLimit = (): void => {
  localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
};

// Admin utility functions
export const getSpamProtectionStatus = () => {
  const lastTime = localStorage.getItem(RATE_LIMIT_KEY);
  const submittedEmails = JSON.parse(localStorage.getItem(SUBMITTED_EMAILS_KEY) || '[]');
  
  return {
    canSubmit: checkRateLimit(),
    lastSubmissionTime: lastTime ? new Date(parseInt(lastTime)) : null,
    totalSubmittedEmails: submittedEmails.length,
    rateLimitMinutes: RATE_LIMIT_MINUTES
  };
};

export const clearRateLimits = () => {
  localStorage.removeItem(RATE_LIMIT_KEY);
  console.log('Rate limits cleared');
};

export const clearSubmittedEmails = () => {
  localStorage.removeItem(SUBMITTED_EMAILS_KEY);
  console.log('Submitted emails cleared');
};

export const getSubmittedEmailsCount = (): number => {
  const submittedEmails = JSON.parse(localStorage.getItem(SUBMITTED_EMAILS_KEY) || '[]');
  return submittedEmails.length;
};

// Auto-initialization on page load
if (typeof window !== 'undefined') {
  // Initialize session when module loads
  initializeSession().then(sessionId => {
    console.log('Analytics session initialized:', sessionId);
  });
  
  // Track page view automatically
  trackPageView(window.location.pathname);
  
  // Auto-track scroll milestones
  let scrollMilestones = [25, 50, 75, 90];
  let trackedMilestones = new Set();
  
  const handleScroll = () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    scrollMilestones.forEach(milestone => {
      if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        trackScrollMilestone(window.location.pathname, milestone);
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Auto-track time milestones
  const timeMilestones = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
  let trackedTimeMilestones = new Set();
  
  timeMilestones.forEach(seconds => {
    setTimeout(() => {
      if (!trackedTimeMilestones.has(seconds)) {
        trackedTimeMilestones.add(seconds);
        trackTimeMilestone(window.location.pathname, seconds);
      }
    }, seconds * 1000);
  });
}
