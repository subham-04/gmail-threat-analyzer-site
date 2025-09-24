// Optimized Data Collection System for Firebase Firestore
// Comprehensive analytics with IP location tracking and automated aggregation

import { db } from './firebase';
import { 
  serverTimestamp, 
  doc, 
  updateDoc, 
  increment,
  getDoc,
  setDoc,
  writeBatch
} from 'firebase/firestore';

// Enhanced data structures with MANDATORY device ID and email correlation
export interface UserSession {
  deviceId: string; // MANDATORY - Persistent device identifier (primary key)
  sessionId: string; // Current session ID
  userEmail?: string; // Email for correlation (added after submission)
  userId?: string; // For registered users
  timestamp: any; // Firebase Timestamp
  ipAddress?: string;
  ipLocation?: {
    country: string;
    city: string;
  };
  device: {
    platform: string;
    browser: string;
    isMobile: boolean;
  };
  referrer: string;
  landingPage: string;
  totalPageViews: number;
  totalTimeSpent: number; // in seconds
  conversionEvents: string[]; // ['form_start', 'form_complete', 'download']
  isConverted: boolean;
  // Session tracking
  sessionCount: number; // How many sessions this device has had
  firstVisit: any; // Firebase Timestamp
  lastVisit: any; // Firebase Timestamp
}

export interface PageEvent {
  deviceId: string; // MANDATORY - Persistent device identifier
  userEmail?: string; // Email for correlation (added after submission)
  sessionId: string; // Current session ID
  eventId: string; // unique identifier - now used as document ID
  timestamp: any; // Firebase Timestamp
  eventType: 'page_view' | 'button_click' | 'form_start' | 'form_complete' | 'download' | 'scroll_milestone' | 'time_milestone';
  page: string;
  elementId?: string;
  eventData?: {
    scrollPercentage?: number;
    timeOnPage?: number;
    buttonText?: string;
    downloadType?: 'firefox_store' | 'zip_manual';
  };
  // Correlation metadata
  userId?: string; // Added when user registers
  sequenceNumber?: number; // Order of events in session
}

export interface UserRegistration {
  deviceId: string; // MANDATORY - Persistent device identifier
  userEmail: string; // Email for correlation (REQUIRED after submission)
  userId: string; // unique identifier - now used as document ID
  sessionId: string; // link to current session
  timestamp: any; // Firebase Timestamp
  name: string;
  email: string; // Same as userEmail for registration
  occupation: string;
  useCase: string;
  sourcePage: string;
  campaignSource?: string; // UTM tracking
  conversionPath: string[]; // pages visited before conversion
  timeToConversion: number; // seconds from first visit to signup
  ipAddress?: string; // IP address from session
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

// Collection names - simplified with Device ID strategy
const COLLECTIONS = {
  DEVICES: 'user_devices',               // One record per device (primary collection)
  EVENTS: 'device_events',               // All events linked to deviceId
  REGISTRATIONS: 'user_registrations',   // User signups linked to deviceId
  DAILY_STATS: 'daily_aggregated',       // Daily summaries
  HOURLY_STATS: 'hourly_aggregated',     // Hourly summaries
};

// Cookie management for persistent device ID and email correlation
const DEVICE_COOKIE_NAME = 'gta_device_id';
const EMAIL_COOKIE_NAME = 'gta_user_email';
const DEVICE_COOKIE_EXPIRES_DAYS = 365; // 1 year
const EMAIL_COOKIE_EXPIRES_DAYS = 365; // 1 year

// Set cookie with proper settings
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

// Get cookie value
const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Generate persistent device ID - REQUIRED for all data storage
const getOrCreateDeviceId = (): string => {
  let deviceId = getCookie(DEVICE_COOKIE_NAME);
  
  if (!deviceId) {
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setCookie(DEVICE_COOKIE_NAME, deviceId, DEVICE_COOKIE_EXPIRES_DAYS);
    console.log('🆔 New device ID created:', deviceId);
  }
  
  return deviceId;
};

// Get stored email for correlation (after submission)
const getStoredEmail = (): string | null => {
  return getCookie(EMAIL_COOKIE_NAME);
};

// Store email after successful submission
const storeEmailCorrelation = (email: string): void => {
  setCookie(EMAIL_COOKIE_NAME, email, EMAIL_COOKIE_EXPIRES_DAYS);
  console.log('📧 Email correlation stored:', email);
};

// Validation: Ensure device ID exists before any data operations
const validateDeviceId = (): string => {
  const deviceId = getOrCreateDeviceId();
  if (!deviceId) {
    throw new Error('Device ID is required for all data operations');
  }
  return deviceId;
};

// Session management with device ID
let currentSession: UserSession | null = null;
let sessionStartTime = Date.now();
let conversionPath: string[] = [];
let eventSequenceNumber = 0; // Track event order for correlation

// Spam protection constants
const RATE_LIMIT_KEY = 'last_signup_time';
const RATE_LIMIT_MINUTES = 5;
const SUBMITTED_EMAILS_KEY = 'submitted_emails';

// IP Location detection with ipify + geolocation fallback
const getIPLocation = async (): Promise<{ ipAddress: string, ipLocation: UserSession['ipLocation'] } | null> => {
  try {
    
    // Step 1: Get IP address from ipify (most reliable)
    const ipResponse = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!ipResponse.ok) {
      throw new Error(`ipify API failed: ${ipResponse.status}`);
    }
    
    const ipData = await ipResponse.json();
    const userIP = ipData.ip;
    
    if (!userIP) {
      throw new Error('No IP address received from ipify');
    }
    
    // Step 2: Get location data using the IP - with improved fallback
    const locationAPIs = [
      // Primary service - more reliable and has higher rate limits
      `https://ipapi.co/${userIP}/json/`,
      // Backup service - sometimes rate limited
      `https://ip-api.com/json/${userIP}`,
      // Additional fallback with different endpoint
      `https://ipinfo.io/${userIP}/json`
    ];
    
    for (const api of locationAPIs) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // Increased timeout to 5 seconds
        
        const response = await fetch(api, { 
          signal: controller.signal,
          headers: { 
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Gmail-Threat-Analyzer/1.0)'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          continue;
        }
        
        const data = await response.json();
        
        // Handle ipapi.co response format
        if (api.includes('ipapi.co')) {
          return {
            ipAddress: userIP,
            ipLocation: {
              country: data.country_name || data.country || 'Unknown',
              city: data.city || 'Unknown'
            }
          };
        }
        
        // Handle ip-api.com response format
        if (api.includes('ip-api.com')) {
          return {
            ipAddress: userIP,
            ipLocation: {
              country: data.country || 'Unknown',
              city: data.city || 'Unknown'
            }
          };
        }
        
        // Handle ipinfo.io response format
        if (api.includes('ipinfo.io')) {
          return {
            ipAddress: userIP,
            ipLocation: {
              country: data.country || 'Unknown',
              city: data.city || 'Unknown'
            }
          };
        }
        
      } catch (error) {
        console.warn(`Failed to get location from ${api}:`, error);
        continue;
      }
    }
    
    // If all location APIs fail, return the IP with unknown location
    return {
      ipAddress: userIP,
      ipLocation: {
        country: 'Unknown',
        city: 'Unknown'
      }
    };
    
  } catch (error) {
    console.warn('Failed to get IP from ipify:', error);
    
    // Fallback with no IP data
    return {
      ipAddress: 'unknown',
      ipLocation: {
        country: 'Unknown',
        city: 'Unknown'
      }
    };
  }
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
    platform,
    browser,
    isMobile
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

// Initialize or get current session with MANDATORY Device ID
export const initializeSession = async (): Promise<string> => {
  if (currentSession) return currentSession.sessionId;
  
  // STEP 1: Validate device ID exists (create if needed)
  const deviceId = validateDeviceId();
  const sessionId = generateSessionId();
  const storedEmail = getStoredEmail(); // Check if email already stored
  
  let ipLocation: UserSession['ipLocation'] | undefined;
  let ipAddress: string | undefined;
  
  try {
    const locationData = await getIPLocation();
    if (locationData) {
      ipAddress = locationData.ipAddress;
      ipLocation = locationData.ipLocation;
    }
  } catch (error) {
    console.warn('Failed to get IP location:', error);
    ipAddress = 'unknown';
    ipLocation = {
      country: 'Unknown',
      city: 'Unknown'
    };
  }
  
  const device = getDeviceInfo();
  
  // Initialize session count and first visit (no read required for privacy)
  let sessionCount = 1;
  let firstVisit = serverTimestamp();
  
  // Note: We don't read existing device data for privacy protection
  // Session count will be managed via updates only
  
  currentSession = {
    deviceId,
    sessionId,
    timestamp: serverTimestamp(),
    device,
    referrer: document.referrer || 'direct',
    landingPage: window.location.pathname,
    totalPageViews: 0,
    totalTimeSpent: 0,
    conversionEvents: [],
    isConverted: false,
    sessionCount,
    firstVisit,
    lastVisit: serverTimestamp()
  };
  
  // Add IP address if available
  if (ipAddress) {
    currentSession.ipAddress = ipAddress;
  }
  
  // Add email correlation if available
  if (storedEmail) {
    currentSession.userEmail = storedEmail;
  }
  
  // Only add ipLocation if it has valid data
  if (ipLocation) {
    currentSession.ipLocation = ipLocation;
  }
  
  // Add current page to conversion path
  conversionPath = [window.location.pathname];
  
  try {
    // Use deviceId as document ID for easy correlation
    const deviceRef = doc(db, COLLECTIONS.DEVICES, deviceId);
    
    // First, create/update the main session data
    await setDoc(deviceRef, currentSession, { merge: true });
    
    // Log the increment data being sent
    const incrementData = {
      sessionCount: increment(1),
      lastVisit: serverTimestamp()
    };
    
    // Then, increment session count using a separate update
    await updateDoc(deviceRef, incrementData);
    
    sessionStartTime = Date.now();
  } catch (error) {
    console.warn('❌ Failed to initialize session:', error);
  }
  
  return sessionId;
};

// Update session activity with Device ID
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
    if (eventType === 'page_view') {
      currentSession.totalPageViews++;
    }
    
    // Update device document with current session data
    const deviceRef = doc(db, COLLECTIONS.DEVICES, currentSession.deviceId);
    const updateData = {
      totalPageViews: currentSession.totalPageViews,
      totalTimeSpent: currentSession.totalTimeSpent,
      conversionEvents: currentSession.conversionEvents,
      isConverted: currentSession.isConverted,
      lastVisit: serverTimestamp()
    };
    
    await updateDoc(deviceRef, updateData);
    
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
        updateData[`stats.topCountries.${currentSession.ipLocation.country.replace(/[^a-zA-Z0-9]/g, '_')}`] = increment(1);
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

// Universal event tracking with Device ID
// Helper function to remove undefined values from objects for Firebase
const cleanObject = (obj: any): any => {
  if (obj === null || obj === undefined) return null;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(cleanObject);
  
  const cleaned: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = cleanObject(value);
    }
  }
  return cleaned;
};

export const trackEvent = async (
  eventType: PageEvent['eventType'],
  page: string,
  elementId?: string,
  eventData?: PageEvent['eventData']
): Promise<void> => {
  try {
    const sessionId = await initializeSession();
    const eventId = generateEventId();
    const deviceId = getOrCreateDeviceId();
    
    // Increment sequence for event ordering
    eventSequenceNumber++;
    
    const event: PageEvent = {
      deviceId,
      sessionId,
      eventId,
      timestamp: serverTimestamp(),
      eventType,
      page,
      sequenceNumber: eventSequenceNumber
    };
    
    // Add userId if user is registered
    if (currentSession?.userId) {
      event.userId = currentSession.userId;
    }
    
    // Only add optional fields if they have values
    if (elementId) {
      event.elementId = elementId;
    }
    
    if (eventData) {
      event.eventData = cleanObject(eventData);
    }
    
    // Clean the entire event object to ensure no undefined values
    const cleanedEvent = cleanObject(event);
    
    // Store event with consistent ID for correlation
    const eventRef = doc(db, COLLECTIONS.EVENTS, eventId);
    await setDoc(eventRef, cleanedEvent);
    
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
  buttonText?: string
): Promise<void> => {
  // Filter out undefined values for Firebase
  const eventData: any = {};
  if (buttonText !== undefined) {
    eventData.buttonText = buttonText;
  }
  
  await trackEvent('button_click', page, elementId, Object.keys(eventData).length > 0 ? eventData : undefined);
};

export const trackFormStart = async (formType: string): Promise<void> => {
  console.log('📝 User started form:', formType);
  await lazyInitialize();
  await trackEvent('form_start', window.location.pathname, formType);
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

    // Check if email or device has already been submitted
    const emailAlreadySubmitted = validateUniqueEmail(cleanData.email);
    const deviceId = validateDeviceId();
    const storedEmail = getStoredEmail();
    
    // If email already submitted OR device already has an email stored, allow download
    if (emailAlreadySubmitted || storedEmail) {
      console.log('✅ User already registered, allowing download access');
      
      // Store email correlation if not already stored
      if (!storedEmail) {
        storeEmailCorrelation(cleanData.email);
      }
      
      // Return a special success code indicating already registered
      return 'ALREADY_REGISTERED';
    }

    // Validate required fields
    if (!cleanData.name || !cleanData.email || !cleanData.occupation) {
      throw new Error('Please fill in all required fields');
    }

    const sessionId = await initializeSession();
    const timeToConversion = Math.floor((Date.now() - sessionStartTime) / 1000);
    const registrationId = `${deviceId}_${Date.now()}`; // Unique ID per device

    const registration: UserRegistration = {
      deviceId,
      sessionId,
      userEmail: cleanData.email, // Required field for correlation
      userId: registrationId, // Use registration ID as user ID
      timestamp: serverTimestamp(),
      name: cleanData.name,
      email: cleanData.email, // Same as userEmail for registration
      occupation: cleanData.occupation,
      useCase: cleanData.useCase,
      sourcePage: window.location.pathname,
      conversionPath: [...conversionPath],
      timeToConversion,
      ipAddress: currentSession?.ipAddress, // Include IP address
      ipLocation: currentSession?.ipLocation
    };

    // Log the registration data being sent
    console.log('📤 Sending registration data to Firebase:', {
      collection: COLLECTIONS.REGISTRATIONS,
      documentId: registrationId,
      registrationData: registration
    });

    // Store registration with device ID for correlation
    const registrationRef = doc(db, COLLECTIONS.REGISTRATIONS, registrationId);
    await setDoc(registrationRef, registration);
    console.log('✅ Registration data saved successfully');

    // Store email correlation in cookie after successful submission
    storeEmailCorrelation(cleanData.email);

    // Update current session with email if exists
    if (currentSession) {
      currentSession.userEmail = cleanData.email;
      const deviceRef = doc(db, COLLECTIONS.DEVICES, currentSession.deviceId);
      await updateDoc(deviceRef, { userEmail: cleanData.email });
    }

    // Track completion event
    await trackFormComplete('registration-form', window.location.pathname);

    // Mark as submitted and update rate limit
    markEmailSubmitted(cleanData.email);
    updateRateLimit();

    console.log('✅ User registration completed with device correlation:', { 
      deviceId, 
      email: cleanData.email,
      registrationId 
    });

    return registrationId;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Registration error:', error);
      throw error; // Re-throw validation errors as-is
    }
    throw new Error('Failed to submit registration. Please try again later.');
  }
};

// Check if current device/email already has download permission
export const hasDownloadPermission = (): boolean => {
  const storedEmail = getStoredEmail();
  
  if (storedEmail) {
    return true;
  }
  
  // Check if any email has been submitted from this device
  const submittedEmails = JSON.parse(
    localStorage.getItem(SUBMITTED_EMAILS_KEY) || '[]'
  );
  
  if (submittedEmails.length > 0) {
    return true;
  }
  
  return false;
};

// Get stored registration info for current device
export const getStoredRegistrationInfo = (): { email: string | null; deviceId: string } => {
  return {
    email: getStoredEmail(),
    deviceId: getOrCreateDeviceId()
  };
};

const checkRateLimit = (): boolean => {
  const lastTime = localStorage.getItem(RATE_LIMIT_KEY);
  if (!lastTime) return true;
  
  const timeDiff = Date.now() - parseInt(lastTime);
  const minutesPassed = timeDiff / (1000 * 60);
  
  return minutesPassed >= RATE_LIMIT_MINUTES;
};

const validateUniqueEmail = (email: string): boolean => {
  const submittedEmails = JSON.parse(
    localStorage.getItem(SUBMITTED_EMAILS_KEY) || '[]'
  );
  
  return submittedEmails.includes(email.toLowerCase());
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

// Data correlation and analytics helper functions with Device ID
export const getDeviceAnalytics = async (deviceId: string) => {
  try {
    const deviceRef = doc(db, COLLECTIONS.DEVICES, deviceId);
    const deviceSnap = await getDoc(deviceRef);
    
    if (!deviceSnap.exists()) {
      throw new Error('Device not found');
    }
    
    const deviceData = deviceSnap.data();
    
    // Get all events for this device - would use proper query in production
    // const eventsQuery = query(collection(db, COLLECTIONS.EVENTS), where('deviceId', '==', deviceId));
    
    // Get registration if exists
    let registration = null;
    if (deviceData.userId) {
      const regRef = doc(db, COLLECTIONS.REGISTRATIONS, deviceData.userId);
      const regSnap = await getDoc(regRef);
      if (regSnap.exists()) {
        registration = regSnap.data();
      }
    }
    
    return {
      device: deviceData,
      registration,
      deviceId,
      userId: deviceData.userId
    };
  } catch (error) {
    console.error('Failed to get device analytics:', error);
    throw error;
  }
};

// Get comprehensive user journey by device ID
export const getUserJourneyByDevice = async (deviceId: string) => {
  try {
    const journey = await getDeviceAnalytics(deviceId);
    
    return {
      deviceId,
      userId: journey.userId,
      registration: journey.registration,
      device: journey.device,
      sessionCount: journey.device.sessionCount,
      firstVisit: journey.device.firstVisit,
      totalPageViews: journey.device.totalPageViews,
      isConverted: journey.device.isConverted
    };
  } catch (error) {
    console.error('Failed to get user journey:', error);
    throw error;
  }
};

// Debug function to show current device/session correlation
export const debugCurrentSession = () => {
  const deviceId = getOrCreateDeviceId();
  
  if (!currentSession) {
    console.log('No active session');
    return { deviceId };
  }
  
  console.group('🔍 Current Device/Session Debug');
  console.log('Device ID:', deviceId);
  console.log('Session ID:', currentSession.sessionId);
  console.log('User ID:', currentSession.userId || 'Not registered');
  console.log('Session Count:', currentSession.sessionCount);
  console.log('Total Page Views:', currentSession.totalPageViews);
  console.log('Conversion Events:', currentSession.conversionEvents);
  console.log('IP Location:', currentSession.ipLocation);
  console.log('Device:', currentSession.device);
  console.log('Conversion Path:', conversionPath);
  console.log('Event Sequence:', eventSequenceNumber);
  console.groupEnd();
  
  return {
    deviceId,
    sessionId: currentSession.sessionId,
    userId: currentSession.userId,
    sessionCount: currentSession.sessionCount,
    conversionPath,
    currentSession
  };
};

// Enhanced data export for analytics with Device ID
export const exportAnalyticsData = async () => {
  try {
    console.group('📊 Analytics Data Export (Device ID Strategy)');
    
    // Current device/session info
    const session = debugCurrentSession();
    
    // Spam protection status
    const spamStatus = getSpamProtectionStatus();
    console.log('Spam Protection:', spamStatus);
    
    // Cookie info
    const deviceCookie = getCookie(DEVICE_COOKIE_NAME);
    console.log('Device Cookie:', deviceCookie);
    
    // Local event fallbacks
    const localEvents = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('event_')) {
        const event = JSON.parse(localStorage.getItem(key) || '{}');
        localEvents.push({ key, event });
      }
    }
    console.log('Local Fallback Events:', localEvents.length);
    
    console.groupEnd();
    
    return {
      session,
      spamStatus,
      localEvents,
      deviceCookie,
      correlationIds: {
        deviceId: session?.deviceId,
        sessionId: session?.sessionId,
        userId: session?.userId,
        sessionCount: session?.sessionCount,
        eventPrefix: 'event_' + Date.now(),
        registrationId: session?.userId
      }
    };
  } catch (error) {
    console.error('Failed to export analytics data:', error);
    throw error;
  }
};

// Selective Data Collection - Only track meaningful interactions
// Initialize analytics lazily when user performs meaningful actions

// Global tracking state
let isInitialized = false;
let currentSessionId: string | null = null;
let lastTrackedPage: string | null = null;
let downloadCount = 0;

// Lazy initialization - only when needed
const lazyInitialize = async (): Promise<string> => {
  if (isInitialized && currentSessionId) {
    return currentSessionId;
  }

  currentSessionId = await initializeSession();
  isInitialized = true;
  return currentSessionId;
};
// Selective tracking functions - only track meaningful user interactions

// Track page navigation (only when user navigates, not on first load)
export const trackPageNavigation = async (newPage: string): Promise<void> => {
  if (lastTrackedPage && lastTrackedPage !== newPage) {
    console.log('📄 User navigated from', lastTrackedPage, 'to', newPage);
    await lazyInitialize();
    await trackPageView(newPage);
  }
  lastTrackedPage = newPage;
};

// Track form submissions (enhanced)
export const trackFormSubmission = async (formType: string, email: string): Promise<void> => {
  console.log('✅ User submitted form:', formType, 'Email:', email);
  await lazyInitialize();
  await trackButtonClick(`form_submit_${formType}`, window.location.pathname);
};

// Track downloads with counting
export const trackDownloadAttempt = async (fileType: string): Promise<void> => {
  downloadCount++;
  console.log('⬇️ Download attempt #' + downloadCount + ':', fileType);
  await lazyInitialize();
  
  // Map fileType to valid download types
  const downloadType = fileType as 'firefox_store' | 'zip_manual';
  await trackDownload(downloadType, window.location.pathname);
};

// Get current download count
export const getDownloadCount = (): number => {
  return downloadCount;
};

// Get analytics summary
export const getAnalyticsSummary = (): { 
  downloadCount: number; 
  isInitialized: boolean; 
  lastTrackedPage: string | null 
} => {
  return {
    downloadCount,
    isInitialized,
    lastTrackedPage
  };
};

// Manual initialization for when user performs first meaningful action
export const initializeAnalytics = async (): Promise<void> => {
  if (!isInitialized) {
    await lazyInitialize();
    console.log('📊 Analytics initialized due to user interaction');
  }
};
