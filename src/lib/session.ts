/**
 * Secure session management utilities for the institutional platform
 * Handles session creation, validation, and termination with appropriate security controls
 */

import { USER_TYPES } from './constants';
import { logSecurityEvent } from './security';

// Session timeout durations in milliseconds
const SESSION_TIMEOUTS = {
  [USER_TYPES.PENSION_FUND]: 20 * 60 * 1000, // 20 minutes
  [USER_TYPES.INSURANCE]: 20 * 60 * 1000,
  [USER_TYPES.DFI]: 20 * 60 * 1000,
  [USER_TYPES.ASSET_MANAGER]: 20 * 60 * 1000,
  [USER_TYPES.SOVEREIGN_FUND]: 20 * 60 * 1000,
  [USER_TYPES.HNWI]: 20 * 60 * 1000,
  [USER_TYPES.INSTITUTIONAL_BORROWER]: 20 * 60 * 1000,
  [USER_TYPES.ADMIN]: 15 * 60 * 1000, // 15 minutes for admin (stricter)
  [USER_TYPES.REGULATOR]: 20 * 60 * 1000,
  DEFAULT: 30 * 60 * 1000, // 30 minutes default
};

// Session storage keys
const SESSION_KEY = 'korbly_session';
const LAST_ACTIVITY_KEY = 'korbly_last_activity';

/**
 * Create a secure session for the authenticated user
 */
export const createSession = (
  email: string, 
  userType: string,
  organizationName?: string
): void => {
  // In production this would use JWT or similar with proper encryption
  const sessionData = {
    email,
    userType,
    organizationName: organizationName || 'Unknown Organization',
    created: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    // Would include actual JWT or session token in production
    sessionId: `session_${Math.random().toString(36).substring(2)}`,
  };

  // Store session data
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  localStorage.setItem(LAST_ACTIVITY_KEY, new Date().toISOString());
  
  // Log session creation
  logSecurityEvent('authentication', email, {
    action: 'session_created',
    userType,
    sessionId: sessionData.sessionId,
  });
};

/**
 * Update the last activity timestamp to prevent session timeout
 */
export const updateLastActivity = (): void => {
  localStorage.setItem(LAST_ACTIVITY_KEY, new Date().toISOString());
};

/**
 * Check if the current session is valid or has timed out
 */
export const isSessionValid = (): boolean => {
  const sessionData = localStorage.getItem(SESSION_KEY);
  const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
  
  if (!sessionData || !lastActivity) {
    return false;
  }
  
  try {
    const session = JSON.parse(sessionData);
    const lastActivityTime = new Date(lastActivity).getTime();
    const currentTime = new Date().getTime();
    const timeoutDuration = SESSION_TIMEOUTS[session.userType] || SESSION_TIMEOUTS.DEFAULT;
    
    // Session has timed out
    if (currentTime - lastActivityTime > timeoutDuration) {
      // Log timeout event
      logSecurityEvent('authentication', session.email, {
        action: 'session_timeout',
        userType: session.userType,
        sessionId: session.sessionId,
        inactiveFor: `${Math.floor((currentTime - lastActivityTime) / (60 * 1000))} minutes`,
      });
      
      // Clear the invalid session
      terminateSession();
      return false;
    }
    
    return true;
  } catch (error) {
    // Session data is corrupt
    terminateSession();
    return false;
  }
};

/**
 * Get current session data, if valid
 */
export const getSessionData = () => {
  if (!isSessionValid()) {
    return null;
  }
  
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch {
    terminateSession();
    return null;
  }
};

/**
 * Terminate the current session (logout)
 */
export const terminateSession = (): void => {
  try {
    // Get session data for logging before removal
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (sessionData) {
      const session = JSON.parse(sessionData);
      logSecurityEvent('authentication', session.email || 'unknown', {
        action: 'session_terminated',
        userType: session.userType,
        sessionId: session.sessionId,
      });
    }
  } catch (error) {
    // Ignore parsing errors during termination
  }
  
  // Clear session data
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(LAST_ACTIVITY_KEY);
};

/**
 * Setup session activity monitoring
 * Call this when the app initializes
 */
export const initializeSessionMonitoring = (): (() => void) => {
  // Check session validity every minute
  const intervalId = setInterval(() => {
    if (!isSessionValid()) {
      // Redirect to login if session becomes invalid
      window.location.href = '/login?reason=session_expired';
    }
  }, 60 * 1000);
  
  // Setup activity listeners to update last activity
  const updateActivity = () => updateLastActivity();
  window.addEventListener('click', updateActivity);
  window.addEventListener('keypress', updateActivity);
  window.addEventListener('scroll', updateActivity);
  window.addEventListener('mousemove', updateActivity);
  
  // Return cleanup function
  return () => {
    clearInterval(intervalId);
    window.removeEventListener('click', updateActivity);
    window.removeEventListener('keypress', updateActivity);
    window.removeEventListener('scroll', updateActivity);
    window.removeEventListener('mousemove', updateActivity);
  };
};
