/**
 * Security utilities for preventing URL exploitation and securing routes
 * These functions help enforce secure routing patterns across the platform
 */

import { USER_TYPES, SECURE_ROUTES } from './constants';

/**
 * Validates if a route is permitted for the given user type
 * This prevents URL manipulation attacks where users try to access unauthorized routes
 */
export const isRoutePermittedForUserType = (route: string, userType: string): boolean => {
  // Map of user types to their permitted route prefixes
  const permittedRoutePrefixes: Record<string, string[]> = {
    [USER_TYPES.PENSION_FUND]: ['/institutional/pension', '/institutional/pension/dashboard'],
    [USER_TYPES.INSURANCE]: ['/institutional/insurance', '/institutional/insurance/dashboard'],
    [USER_TYPES.DFI]: ['/institutional/dfi', '/institutional/dfi/dashboard'],
    [USER_TYPES.ASSET_MANAGER]: ['/institutional/asset-manager', '/institutional/asset-manager/dashboard'],
    [USER_TYPES.SOVEREIGN_FUND]: ['/institutional/sovereign', '/institutional/sovereign/dashboard'],
    [USER_TYPES.HNWI]: ['/wealth', '/wealth/dashboard'],
    [USER_TYPES.INSTITUTIONAL_BORROWER]: ['/issuer', '/issuer/dashboard'],
    [USER_TYPES.ADMIN]: ['/admin', '/admin/dashboard'],
    [USER_TYPES.REGULATOR]: ['/regulator', '/regulator/dashboard'],
  };

  // Get permitted routes for this user type
  const permittedPrefixes = permittedRoutePrefixes[userType] || [];
  
  // Check if route starts with any permitted prefix
  return permittedPrefixes.some(prefix => route.startsWith(prefix));
};

/**
 * Validates if a module is accessible for the given user type
 * Different institutional users have different module permissions
 */
export const isModulePermittedForUserType = (modulePath: string, userType: string): boolean => {
  // Map of user types to their permitted modules
  const permittedModules: Record<string, string[]> = {
    [USER_TYPES.PENSION_FUND]: [
      SECURE_ROUTES.MODULES.PORTFOLIO,
      SECURE_ROUTES.MODULES.SYNDICATION,
      SECURE_ROUTES.MODULES.VALUATION,
      SECURE_ROUTES.MODULES.DOCUMENTATION,
      SECURE_ROUTES.MODULES.COMPLIANCE,
    ],
    [USER_TYPES.INSURANCE]: [
      SECURE_ROUTES.MODULES.PORTFOLIO,
      SECURE_ROUTES.MODULES.SYNDICATION,
      SECURE_ROUTES.MODULES.VALUATION,
      SECURE_ROUTES.MODULES.DOCUMENTATION, 
      SECURE_ROUTES.MODULES.COMPLIANCE,
    ],
    [USER_TYPES.DFI]: [
      SECURE_ROUTES.MODULES.PORTFOLIO,
      SECURE_ROUTES.MODULES.SYNDICATION,
      SECURE_ROUTES.MODULES.CREDIT_ENGINE,
      SECURE_ROUTES.MODULES.VALUATION,
      SECURE_ROUTES.MODULES.DOCUMENTATION,
      SECURE_ROUTES.MODULES.COMPLIANCE,
    ],
    [USER_TYPES.ASSET_MANAGER]: [
      SECURE_ROUTES.MODULES.PORTFOLIO,
      SECURE_ROUTES.MODULES.SYNDICATION,
      SECURE_ROUTES.MODULES.VALUATION,
      SECURE_ROUTES.MODULES.DOCUMENTATION,
      SECURE_ROUTES.MODULES.COMPLIANCE,
    ],
    [USER_TYPES.SOVEREIGN_FUND]: [
      SECURE_ROUTES.MODULES.PORTFOLIO,
      SECURE_ROUTES.MODULES.SYNDICATION,
      SECURE_ROUTES.MODULES.VALUATION,
      SECURE_ROUTES.MODULES.DOCUMENTATION,
      SECURE_ROUTES.MODULES.COMPLIANCE,
    ],
    [USER_TYPES.HNWI]: [
      SECURE_ROUTES.MODULES.PORTFOLIO,
      SECURE_ROUTES.MODULES.DOCUMENTATION,
    ],
    [USER_TYPES.INSTITUTIONAL_BORROWER]: [
      SECURE_ROUTES.MODULES.CREDIT_ENGINE,
      SECURE_ROUTES.MODULES.DOCUMENTATION,
    ],
    [USER_TYPES.ADMIN]: [
      SECURE_ROUTES.MODULES.PORTFOLIO,
      SECURE_ROUTES.MODULES.SYNDICATION,
      SECURE_ROUTES.MODULES.CREDIT_ENGINE,
      SECURE_ROUTES.MODULES.VALUATION,
      SECURE_ROUTES.MODULES.DOCUMENTATION,
      SECURE_ROUTES.MODULES.COMPLIANCE,
    ],
    [USER_TYPES.REGULATOR]: [
      SECURE_ROUTES.MODULES.COMPLIANCE,
      SECURE_ROUTES.MODULES.DOCUMENTATION,
    ],
  };

  // Get permitted modules for this user type
  const allowedModules = permittedModules[userType] || [];
  
  // Check if the module is allowed for this user
  return allowedModules.some(module => modulePath.includes(module));
};

/**
 * Validates user permissions for a specific feature
 * Used for granular access control within modules
 */
export const hasFeaturePermission = (userType: string, featureKey: string): boolean => {
  // Features available by user type
  const featurePermissions: Record<string, Record<string, boolean>> = {
    [USER_TYPES.PENSION_FUND]: {
      viewSyndicationDeals: true,
      createSyndicationDeals: false,
      modifyTermSheet: true,
      viewCreditAnalysis: true,
      runValuationModels: true,
    },
    [USER_TYPES.INSURANCE]: {
      viewSyndicationDeals: true,
      createSyndicationDeals: false,
      modifyTermSheet: true,
      viewCreditAnalysis: true,
      runValuationModels: true,
    },
    [USER_TYPES.DFI]: {
      viewSyndicationDeals: true,
      createSyndicationDeals: true,
      modifyTermSheet: true,
      viewCreditAnalysis: true,
      runValuationModels: true,
    },
    [USER_TYPES.ASSET_MANAGER]: {
      viewSyndicationDeals: true,
      createSyndicationDeals: true,
      modifyTermSheet: true,
      viewCreditAnalysis: true,
      runValuationModels: true,
    },
    [USER_TYPES.ADMIN]: {
      viewSyndicationDeals: true,
      createSyndicationDeals: true,
      modifyTermSheet: true,
      viewCreditAnalysis: true,
      runValuationModels: true,
      adminControls: true,
    },
  };

  // Default to no permission if user type or feature not found
  return featurePermissions[userType]?.[featureKey] || false;
};

/**
 * Logs security-related events for audit purposes
 */
export const logSecurityEvent = (
  eventType: 'access' | 'authentication' | 'authorization' | 'modification',
  user: string,
  details: Record<string, unknown>
): void => {
  // In production, this would write to a secure audit log
  console.log(`[SECURITY EVENT] ${eventType.toUpperCase()} | User: ${user} | ${new Date().toISOString()} | Details: ${JSON.stringify(details)}`);
};
