# Firebase Integration for Gmail Threat Analyzer

## Setup Instructions

### 1. Install Firebase
```bash
npm install firebase
```

### 2. Firebase Configuration
The Firebase configuration is already set up in `src/lib/firebase.ts` with your project details:

- **Project ID**: threat-analyzer-a77cc
- **Auth Domain**: threat-analyzer-a77cc.firebaseapp.com
- **Storage Bucket**: threat-analyzer-a77cc.firebasestorage.app

### 3. Switch from Fallback to Firebase
Once Firebase is installed, update the import in `src/pages/AiAnalytics.tsx`:

```typescript
// Change this line:
import { ... } from "../lib/dataCollectionFallback"

// To this:
import { ... } from "../lib/dataCollection"
```

## Data Collections Structure

### Collection: `early_access_signups`
Stores user signups for AI Analytics early access.

**Document Structure:**
```json
{
  "id": "auto-generated-document-id",
  "name": "John Doe",
  "email": "john@example.com",
  "occupation": "business-owner",
  "useCase": "Protecting my company emails",
  "timestamp": "2025-08-05T10:30:00Z",
  "sourcePage": "/premium-ai",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://google.com"
}
```

### Collection: `page_analytics`
Stores detailed page interaction analytics.

**Document Structure:**
```json
{
  "id": "auto-generated-document-id",
  "eventType": "page_view|button_click|form_start|form_complete|scroll_depth|time_on_page",
  "page": "/premium-ai",
  "elementId": "notify-me-button",
  "timestamp": "2025-08-05T10:30:00Z",
  "sessionId": "session_1733400000000_abc123",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://google.com",
  "scrollDepth": 75,
  "timeOnPage": 120,
  "additionalData": {
    "occupation": "business-owner",
    "hasUseCase": true
  }
}
```

### Collection: `daily_stats`
Aggregated daily statistics for quick reporting.

**Document Structure:**
```json
{
  "date": "2025-08-05",
  "early_access_signups": 15,
  "page_views": 234,
  "lastUpdated": "2025-08-05T23:45:00Z",
  "created": "2025-08-05T00:15:00Z"
}
```

## Analytics Events Tracked

### Automatic Tracking
- **Page Views**: Every time someone visits `/premium-ai`
- **Scroll Depth**: At 25%, 50%, 75%, 90%, and 100% scroll milestones
- **Time on Page**: How long users spend on the page

### Button Click Tracking
- **notify-me-hero-button**: Main "Notify Me When Ready" CTA
- **demo-button**: "Experience AI Analytics" button
- **download-button**: "Download Current Version" button
- **watch-demo-button**: "Watch AI Demo Video" button

### Form Tracking
- **form_start**: When user opens the "Notify Me" popup
- **form_complete**: When user successfully submits the form

## Current Implementation (Temporary)

Right now, the app uses `dataCollectionFallback.ts` which:
- ✅ Stores data in localStorage (temporary)
- ✅ Logs all events to console for development
- ✅ Provides same interface as Firebase version
- ✅ Tracks all the same metrics

**To view current data (in browser console):**
```javascript
// Import the fallback functions
import { getStoredData } from './src/lib/dataCollectionFallback'

// View all stored data
console.log(getStoredData())
```

## Firebase Security Rules (REQUIRED - Update Now!)

**⚠️ UPDATED: Optimized rules for comprehensive analytics and spam protection:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User sessions with comprehensive tracking
    match /user_sessions/{document} {
      allow create: if 
        request.resource.data.keys().hasAll(['sessionId', 'device', 'referrer', 'landingPage']) &&
        request.resource.data.sessionId is string &&
        request.resource.data.sessionId.size() < 100 &&
        request.resource.data.landingPage is string &&
        request.resource.data.landingPage.size() < 200;
      
      allow update: if 
        resource != null &&
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['totalPageViews', 'totalTimeSpent', 'lastActivity', 'conversionEvents', 'isConverted', 'userId']);
      
      allow read: if false; // Privacy protection
    }
    
    // Page events tracking
    match /page_events/{document} {
      allow create: if 
        request.resource.data.keys().hasAll(['sessionId', 'eventId', 'eventType', 'page']) &&
        request.resource.data.eventType in ['page_view', 'button_click', 'form_start', 'form_complete', 'download', 'scroll_milestone', 'time_milestone'] &&
        request.resource.data.page is string &&
        request.resource.data.page.size() < 200 &&
        request.resource.data.sessionId is string &&
        request.resource.data.eventId is string;
      
      allow read: if false; // Privacy protection
    }
    
    // User registrations with enhanced validation
    match /user_registrations/{document} {
      allow create: if 
        request.resource.data.keys().hasAll(['userId', 'sessionId', 'name', 'email', 'occupation']) &&
        request.resource.data.name is string &&
        request.resource.data.email is string &&
        request.resource.data.occupation is string &&
        request.resource.data.email.matches('.*@.*\\..*') &&
        request.resource.data.name.size() < 100 &&
        request.resource.data.email.size() < 100 &&
        request.resource.data.occupation.size() < 50 &&
        (
          !('useCase' in request.resource.data) || 
          request.resource.data.useCase.size() < 500
        ) &&
        request.resource.data.email != '' &&
        request.resource.data.name != '';
      
      allow read: if false; // Privacy protection
    }
    
    // Daily aggregated stats (public read for dashboard)
    match /daily_aggregated/{document} {
      allow read: if true; // Public dashboard access
      allow create, update: if 
        document.matches('[0-9]{4}-[0-9]{2}-[0-9]{2}') &&
        request.resource.data.keys().hasAll(['stats', 'lastUpdated']);
    }
    
    // Hourly aggregated stats (public read for dashboard)
    match /hourly_aggregated/{document} {
      allow read: if true; // Public dashboard access
      allow create, update: if 
        document.matches('[0-9]{4}-[0-9]{2}-[0-9]{2}_[0-9]{2}') &&
        request.resource.data.keys().hasAll(['stats', 'lastUpdated']);
    }
    
    // Real-time metrics (public read for dashboard)
    match /realtime_metrics/{document} {
      allow read: if true; // Public dashboard access
      allow create, update: if true; // Allow real-time updates
    }
  }
}
```

## 🛡️ **Enhanced Protection Features:**

### **1. Comprehensive Session Tracking**
- ✅ **IP Location**: Automatic geographic tracking with multiple API fallbacks
- ✅ **Device Detection**: Browser, platform, mobile/desktop identification
- ✅ **Session Analytics**: Page views, time tracking, conversion path
- ✅ **Real-time Updates**: Live session activity monitoring

### **2. Event-Based Analytics** 
- ✅ **Granular Tracking**: Every click, scroll, and interaction
- ✅ **Conversion Funnel**: Complete user journey from landing to conversion
- ✅ **Behavioral Insights**: Scroll depth, time on page, click patterns
- ✅ **Attribution Tracking**: Referrer sources and campaign tracking

### **3. Automated Data Aggregation**
- ✅ **Daily Stats**: Comprehensive daily summaries with geographic breakdowns
- ✅ **Hourly Stats**: Detailed hourly activity patterns
- ✅ **Real-time Metrics**: Live visitor counts and activity
- ✅ **Smart Batching**: Efficient database writes to minimize costs

### **4. Advanced Spam Protection** 
- ✅ **Multi-layer Validation**: Email format, field lengths, required data
- ✅ **Rate Limiting**: Time-based submission controls
- ✅ **Duplicate Prevention**: Email uniqueness enforcement
- ✅ **Input Sanitization**: XSS and injection protection

## 📊 **Analytics Data Structure:**

Your new Firebase collections will store:

### **`user_sessions`** - Complete user journeys
- Session ID, IP location, device info
- Total time spent, pages viewed
- Conversion events and outcomes
- Geographic and referrer data

### **`page_events`** - Granular interactions  
- Every button click with position tracking
- Scroll milestones (25%, 50%, 75%, 90%)
- Time milestones (30s, 1m, 2m, 5m)
- Form interactions and completions

### **`user_registrations`** - Enhanced user data
- Complete registration info with spam protection
- Conversion path (pages visited before signup)
- Time to conversion metrics
- Geographic data for regional analysis

### **`daily_aggregated`** & **`hourly_aggregated`** - Ready-to-graph data
- Visitor counts by country/city
- Browser and device breakdowns
- Conversion rates and funnel metrics
- Traffic sources and referrer analysis

## Next Steps

### **1. Update Firebase Rules** ⚠️
Copy the rules above into your Firebase Console → Firestore Database → Rules tab.

### **2. Test Spam Protection** 🛡️
Open browser console and test the protection:
```javascript
// Check current spam protection status
import { getSpamProtectionStatus } from './src/lib/dataCollection'
console.log(getSpamProtectionStatus())

// Try submitting the same email twice (should fail)
// Try submitting within 5 minutes (should fail)

// Admin functions (use carefully):
// clearRateLimits() - Reset rate limiting
// clearSubmittedEmails() - Clear email history
```

### **3. Monitor Protection** 📊
Your app now prevents:
- ✅ **Rate limiting**: Max 1 submission per 5 minutes
- ✅ **Duplicate emails**: Each email can only be used once  
- ✅ **Input validation**: Prevents malicious/oversized inputs
- ✅ **Required fields**: All necessary data must be provided
- ✅ **Spam cleanup**: Automatically sanitizes inputs

### **4. Next Steps**

1. **Install Firebase**: `npm install firebase`
2. **Test Connection**: Check Firebase console for incoming data
3. **Set up Authentication**: For admin dashboard access
4. **Create Analytics Dashboard**: View and analyze collected data
5. **Set up Email Notifications**: Alert when new signups occur

## Troubleshooting

### If Firebase install fails:
1. Clear npm cache: `npm cache clean --force`
2. Try with different registry: `npm install firebase --registry https://registry.npmjs.org/`
3. Use yarn instead: `yarn add firebase`

### If data isn't appearing:
1. Check browser console for errors
2. Verify Firebase project permissions
3. Ensure Firestore is enabled in Firebase console
4. Check network tab for failed requests

## Data Privacy Compliance

The current implementation:
- ✅ Only collects necessary data for early access notifications
- ✅ Doesn't track personal browsing outside the app
- ✅ Stores minimal user agent info (for analytics only)
- ✅ Uses session-based tracking (not permanent cookies)
- ✅ Provides clear opt-in for data collection (form submission)

Consider adding:
- Privacy policy link
- Data deletion requests handling
- GDPR compliance notices (if targeting EU users)
