/**
 * Custom hook for secure navigation in institutional modules
 * Provides URL validation and secure routing with audit trail
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';
import { sanitizeUrlParam, isValidUrlParam } from '@/lib/urlSecurity';
import { logAuditEvent } from '@/lib/audit';
import { useAuth } from '@/contexts/AuthContext';

interface UseSecureModuleReturn {
  isValidAccess: boolean;
  userType: string | null;
  getSecureDashboardPath: () => string;
}

/**
 * Hook for securing institutional module access
 * Validates URL parameters, checks permissions, and logs access
 */
export const useSecureModule = (moduleName: string): UseSecureModuleReturn => {
  const { userType } = useParams<{ userType: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const validUserTypes = Object.values(USER_TYPES);
  
  // Use state to manage validation status and sanitized user type
  const [isValidAccess, setIsValidAccess] = useState(false);
  const [sanitizedUserType, setSanitizedUserType] = useState<string | null>(null);
  
  // Validate URL parameters on component mount
  useEffect(() => {
    // First validate authentication
    if (!isAuthenticated) {
      console.error(`[SECURITY] Unauthenticated access attempt to ${moduleName}`);
      navigate('/login');
      return;
    }
    
    // Sanitize and validate user type parameter
    const sanitized = sanitizeUrlParam(userType);
    
    if (!sanitized || !isValidUrlParam(sanitized, validUserTypes)) {
      console.error(`[SECURITY] Invalid user type in URL: ${userType}`);
      // Redirect to user's specific dashboard instead of generic dashboard
      const userDashboardPath = user?.role && SECURE_ROUTES.DASHBOARD[user.role as keyof typeof SECURE_ROUTES.DASHBOARD];
      navigate(userDashboardPath || '/dashboard');
      
      // Log security incident
      logAuditEvent(
        user?.id || 'unknown',
        user?.email || 'unknown', 
        user?.role || 'unknown',
        'access_denied',
        { 
          reason: 'invalid_url_parameter',
          parameter: 'userType',
          value: userType,
          module: moduleName
        }
      );
      return;
    }
    
    // Check if URL user type matches the user's actual role
    if (user?.role && sanitized !== user.role) {
      console.error(`[SECURITY] URL user type (${sanitized}) doesn't match user's role (${user.role})`);
      const userDashboardPath = SECURE_ROUTES.DASHBOARD[user.role as keyof typeof SECURE_ROUTES.DASHBOARD];
      navigate(userDashboardPath || '/dashboard');
      
      // Log security incident
      logAuditEvent(
        user?.id || 'unknown',
        user?.email || 'unknown',
        user?.role || 'unknown',
        'access_denied',
        {
          reason: 'user_type_mismatch',
          urlUserType: sanitized,
          actualUserType: user.role,
          module: moduleName
        }
      );
      return;
    }
    
    // Now check if this user type has permission for this module
    const userHasPermission = checkPermission(sanitized, moduleName);
    
    if (!userHasPermission) {
      console.error(`[SECURITY] User type ${sanitized} has no permission for ${moduleName}`);
      // Redirect to user's specific dashboard
      const userDashboardPath = SECURE_ROUTES.DASHBOARD[sanitized as keyof typeof SECURE_ROUTES.DASHBOARD] || '/dashboard';
      navigate(userDashboardPath);
      
      // Log security incident
      logAuditEvent(
        user?.id || 'unknown',
        user?.email || 'unknown',
        user?.role || 'unknown',
        'access_denied',
        {
          reason: 'insufficient_permissions',
          userType: sanitized,
          module: moduleName
        }
      );
      return;
    }
    
    // Valid access, log for audit trail
    logAuditEvent(
      user?.id || 'unknown',
      user?.email || 'unknown',
      sanitized,
      'document_access',
      { module: moduleName },
      `${moduleName.toLowerCase()}_module`,
      'module'
    );
    
    setIsValidAccess(true);
    setSanitizedUserType(sanitized);
  }, [userType, navigate, isAuthenticated, user, moduleName, validUserTypes]);

  /**
   * Check if a user type has permission to access a specific module
   */
  const checkPermission = (userType: string, moduleName: string): boolean => {
    // Map modules to their permission keys
    const modulePermissionMap: Record<string, string> = {
      'Syndication': 'SYNDICATION',
      'CreditEngine': 'CREDIT_ENGINE',
      'Valuation': 'VALUATION',
      'Portfolio': 'PORTFOLIO',
      'Documentation': 'DOCUMENTATION',
      'Compliance': 'COMPLIANCE'
    };
    
    const moduleKey = modulePermissionMap[moduleName];
    if (!moduleKey) return false;
    
    // Get the appropriate route for this module
    const moduleRoute = SECURE_ROUTES.MODULES[moduleKey as keyof typeof SECURE_ROUTES.MODULES];
    if (!moduleRoute) return false;
    
    // Check user type permissions based on the predefined mappings
    switch(userType) {
      case USER_TYPES.PENSION_FUND:
      case USER_TYPES.INSURANCE:
        // These can access portfolio, syndication, valuation, documentation, compliance
        return ['PORTFOLIO', 'SYNDICATION', 'VALUATION', 'DOCUMENTATION', 'COMPLIANCE'].includes(moduleKey);
        
      case USER_TYPES.DFI:
        // DFIs can access all modules
        return true;
        
      case USER_TYPES.ASSET_MANAGER:
      case USER_TYPES.SOVEREIGN_FUND:
        // Same as pension funds
        return ['PORTFOLIO', 'SYNDICATION', 'VALUATION', 'DOCUMENTATION', 'COMPLIANCE'].includes(moduleKey);
        
      case USER_TYPES.HNWI:
        // More limited access
        return ['PORTFOLIO', 'DOCUMENTATION'].includes(moduleKey);
        
      case USER_TYPES.INSTITUTIONAL_BORROWER:
        // Borrowers see credit engine and documentation
        return ['CREDIT_ENGINE', 'DOCUMENTATION'].includes(moduleKey);
        
      case USER_TYPES.ADMIN:
        // Admins see everything
        return true;
        
      case USER_TYPES.REGULATOR:
        // Regulators only see compliance and documentation
        return ['COMPLIANCE', 'DOCUMENTATION'].includes(moduleKey);
        
      default:
        return false;
    }
  };
  
  /**
   * Get the secure path back to the appropriate dashboard
   */
  const getSecureDashboardPath = (): string => {
    // Ensure we have a valid user type
    if (!sanitizedUserType) {
      return '/dashboard';
    }
    
    // Get the dashboard route for this user type
    const dashboardRoute = SECURE_ROUTES.DASHBOARD[sanitizedUserType as keyof typeof SECURE_ROUTES.DASHBOARD];
    
    if (!dashboardRoute) {
      console.warn(`[SECURITY] No dashboard route defined for user type: ${sanitizedUserType}`);
      return '/dashboard';
    }
    
    return dashboardRoute;
  };
  
  return {
    isValidAccess,
    userType: sanitizedUserType,
    getSecureDashboardPath
  };
};
