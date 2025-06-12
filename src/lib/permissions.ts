/**
 * Feature permission system for institutional users
 * Controls granular feature access based on user types and roles
 */

import { USER_TYPES } from './constants';

// Define all available features in the system
export enum Feature {
  // Syndication features
  SYNDICATION_VIEW = 'syndication_view',
  SYNDICATION_CREATE = 'syndication_create',
  SYNDICATION_PARTICIPATE = 'syndication_participate',
  SYNDICATION_LEAD = 'syndication_lead',
  
  // Credit engine features
  CREDIT_ENGINE_VIEW = 'credit_engine_view',
  CREDIT_ENGINE_CREATE = 'credit_engine_create',
  CREDIT_ENGINE_APPROVE = 'credit_engine_approve',
  
  // Portfolio features
  PORTFOLIO_VIEW = 'portfolio_view',
  PORTFOLIO_MANAGE = 'portfolio_manage',
  
  // Documentation features
  DOCS_VIEW = 'docs_view',
  DOCS_CREATE = 'docs_create',
  DOCS_SIGN = 'docs_sign',
  
  // Valuation features
  VALUATION_VIEW = 'valuation_view',
  VALUATION_CREATE = 'valuation_create',
  
  // Compliance features
  COMPLIANCE_VIEW = 'compliance_view',
  COMPLIANCE_MANAGE = 'compliance_manage',
  COMPLIANCE_APPROVE = 'compliance_approve',
  
  // Admin features
  ADMIN_USER_MANAGE = 'admin_user_manage',
  ADMIN_SYSTEM_CONFIG = 'admin_system_config',
}

// Permission mapping by user type
const permissionMatrix: Record<string, Record<Feature, boolean>> = {
  // Pension Fund permissions
  [USER_TYPES.PENSION_FUND]: {
    // Syndication
    [Feature.SYNDICATION_VIEW]: true,
    [Feature.SYNDICATION_CREATE]: false,
    [Feature.SYNDICATION_PARTICIPATE]: true,
    [Feature.SYNDICATION_LEAD]: false,
    
    // Credit engine
    [Feature.CREDIT_ENGINE_VIEW]: true,
    [Feature.CREDIT_ENGINE_CREATE]: false,
    [Feature.CREDIT_ENGINE_APPROVE]: false,
    
    // Portfolio
    [Feature.PORTFOLIO_VIEW]: true,
    [Feature.PORTFOLIO_MANAGE]: true,
    
    // Documentation
    [Feature.DOCS_VIEW]: true,
    [Feature.DOCS_CREATE]: true,
    [Feature.DOCS_SIGN]: true,
    
    // Valuation
    [Feature.VALUATION_VIEW]: true,
    [Feature.VALUATION_CREATE]: true,
    
    // Compliance
    [Feature.COMPLIANCE_VIEW]: true,
    [Feature.COMPLIANCE_MANAGE]: false,
    [Feature.COMPLIANCE_APPROVE]: false,
    
    // Admin
    [Feature.ADMIN_USER_MANAGE]: false,
    [Feature.ADMIN_SYSTEM_CONFIG]: false,
  },
  
  // Insurance permissions
  [USER_TYPES.INSURANCE]: {
    // Syndication
    [Feature.SYNDICATION_VIEW]: true,
    [Feature.SYNDICATION_CREATE]: false,
    [Feature.SYNDICATION_PARTICIPATE]: true,
    [Feature.SYNDICATION_LEAD]: false,
    
    // Credit engine
    [Feature.CREDIT_ENGINE_VIEW]: true,
    [Feature.CREDIT_ENGINE_CREATE]: false,
    [Feature.CREDIT_ENGINE_APPROVE]: false,
    
    // Portfolio
    [Feature.PORTFOLIO_VIEW]: true,
    [Feature.PORTFOLIO_MANAGE]: true,
    
    // Documentation
    [Feature.DOCS_VIEW]: true,
    [Feature.DOCS_CREATE]: true,
    [Feature.DOCS_SIGN]: true,
    
    // Valuation
    [Feature.VALUATION_VIEW]: true,
    [Feature.VALUATION_CREATE]: true,
    
    // Compliance
    [Feature.COMPLIANCE_VIEW]: true,
    [Feature.COMPLIANCE_MANAGE]: false,
    [Feature.COMPLIANCE_APPROVE]: false,
    
    // Admin
    [Feature.ADMIN_USER_MANAGE]: false,
    [Feature.ADMIN_SYSTEM_CONFIG]: false,
  },
  
  // DFI permissions - more lead syndication capabilities
  [USER_TYPES.DFI]: {
    // Syndication
    [Feature.SYNDICATION_VIEW]: true,
    [Feature.SYNDICATION_CREATE]: true,
    [Feature.SYNDICATION_PARTICIPATE]: true,
    [Feature.SYNDICATION_LEAD]: true,
    
    // Credit engine
    [Feature.CREDIT_ENGINE_VIEW]: true,
    [Feature.CREDIT_ENGINE_CREATE]: true,
    [Feature.CREDIT_ENGINE_APPROVE]: true,
    
    // Portfolio
    [Feature.PORTFOLIO_VIEW]: true,
    [Feature.PORTFOLIO_MANAGE]: true,
    
    // Documentation
    [Feature.DOCS_VIEW]: true,
    [Feature.DOCS_CREATE]: true,
    [Feature.DOCS_SIGN]: true,
    
    // Valuation
    [Feature.VALUATION_VIEW]: true,
    [Feature.VALUATION_CREATE]: true,
    
    // Compliance
    [Feature.COMPLIANCE_VIEW]: true,
    [Feature.COMPLIANCE_MANAGE]: true,
    [Feature.COMPLIANCE_APPROVE]: false,
    
    // Admin
    [Feature.ADMIN_USER_MANAGE]: false,
    [Feature.ADMIN_SYSTEM_CONFIG]: false,
  },
  
  // Asset Manager permissions
  [USER_TYPES.ASSET_MANAGER]: {
    // Syndication
    [Feature.SYNDICATION_VIEW]: true,
    [Feature.SYNDICATION_CREATE]: true,
    [Feature.SYNDICATION_PARTICIPATE]: true,
    [Feature.SYNDICATION_LEAD]: false,
    
    // Credit engine
    [Feature.CREDIT_ENGINE_VIEW]: true,
    [Feature.CREDIT_ENGINE_CREATE]: true,
    [Feature.CREDIT_ENGINE_APPROVE]: false,
    
    // Portfolio
    [Feature.PORTFOLIO_VIEW]: true,
    [Feature.PORTFOLIO_MANAGE]: true,
    
    // Documentation
    [Feature.DOCS_VIEW]: true,
    [Feature.DOCS_CREATE]: true,
    [Feature.DOCS_SIGN]: true,
    
    // Valuation
    [Feature.VALUATION_VIEW]: true,
    [Feature.VALUATION_CREATE]: true,
    
    // Compliance
    [Feature.COMPLIANCE_VIEW]: true,
    [Feature.COMPLIANCE_MANAGE]: false,
    [Feature.COMPLIANCE_APPROVE]: false,
    
    // Admin
    [Feature.ADMIN_USER_MANAGE]: false,
    [Feature.ADMIN_SYSTEM_CONFIG]: false,
  },
  
  // Institutional borrowers have limited permissions
  [USER_TYPES.INSTITUTIONAL_BORROWER]: {
    // Syndication
    [Feature.SYNDICATION_VIEW]: true,
    [Feature.SYNDICATION_CREATE]: false,
    [Feature.SYNDICATION_PARTICIPATE]: false,
    [Feature.SYNDICATION_LEAD]: false,
    
    // Credit engine
    [Feature.CREDIT_ENGINE_VIEW]: true,
    [Feature.CREDIT_ENGINE_CREATE]: true,
    [Feature.CREDIT_ENGINE_APPROVE]: false,
    
    // Portfolio
    [Feature.PORTFOLIO_VIEW]: true,
    [Feature.PORTFOLIO_MANAGE]: false,
    
    // Documentation
    [Feature.DOCS_VIEW]: true,
    [Feature.DOCS_CREATE]: true,
    [Feature.DOCS_SIGN]: true,
    
    // Valuation
    [Feature.VALUATION_VIEW]: false,
    [Feature.VALUATION_CREATE]: false,
    
    // Compliance
    [Feature.COMPLIANCE_VIEW]: true,
    [Feature.COMPLIANCE_MANAGE]: false,
    [Feature.COMPLIANCE_APPROVE]: false,
    
    // Admin
    [Feature.ADMIN_USER_MANAGE]: false,
    [Feature.ADMIN_SYSTEM_CONFIG]: false,
  },
  
  // Admin has full permissions
  [USER_TYPES.ADMIN]: {
    // Syndication
    [Feature.SYNDICATION_VIEW]: true,
    [Feature.SYNDICATION_CREATE]: true,
    [Feature.SYNDICATION_PARTICIPATE]: true,
    [Feature.SYNDICATION_LEAD]: true,
    
    // Credit engine
    [Feature.CREDIT_ENGINE_VIEW]: true,
    [Feature.CREDIT_ENGINE_CREATE]: true,
    [Feature.CREDIT_ENGINE_APPROVE]: true,
    
    // Portfolio
    [Feature.PORTFOLIO_VIEW]: true,
    [Feature.PORTFOLIO_MANAGE]: true,
    
    // Documentation
    [Feature.DOCS_VIEW]: true,
    [Feature.DOCS_CREATE]: true,
    [Feature.DOCS_SIGN]: true,
    
    // Valuation
    [Feature.VALUATION_VIEW]: true,
    [Feature.VALUATION_CREATE]: true,
    
    // Compliance
    [Feature.COMPLIANCE_VIEW]: true,
    [Feature.COMPLIANCE_MANAGE]: true,
    [Feature.COMPLIANCE_APPROVE]: true,
    
    // Admin
    [Feature.ADMIN_USER_MANAGE]: true,
    [Feature.ADMIN_SYSTEM_CONFIG]: true,
  },
  
  // Regulators have mainly view permissions
  [USER_TYPES.REGULATOR]: {
    // Syndication
    [Feature.SYNDICATION_VIEW]: true,
    [Feature.SYNDICATION_CREATE]: false,
    [Feature.SYNDICATION_PARTICIPATE]: false,
    [Feature.SYNDICATION_LEAD]: false,
    
    // Credit engine
    [Feature.CREDIT_ENGINE_VIEW]: true,
    [Feature.CREDIT_ENGINE_CREATE]: false,
    [Feature.CREDIT_ENGINE_APPROVE]: false,
    
    // Portfolio
    [Feature.PORTFOLIO_VIEW]: true,
    [Feature.PORTFOLIO_MANAGE]: false,
    
    // Documentation
    [Feature.DOCS_VIEW]: true,
    [Feature.DOCS_CREATE]: false,
    [Feature.DOCS_SIGN]: false,
    
    // Valuation
    [Feature.VALUATION_VIEW]: true,
    [Feature.VALUATION_CREATE]: false,
    
    // Compliance
    [Feature.COMPLIANCE_VIEW]: true,
    [Feature.COMPLIANCE_MANAGE]: false,
    [Feature.COMPLIANCE_APPROVE]: true, // Can approve compliance items
    
    // Admin
    [Feature.ADMIN_USER_MANAGE]: false,
    [Feature.ADMIN_SYSTEM_CONFIG]: false,
  },
};

/**
 * Check if a user has permission to use a specific feature
 */
export const hasPermission = (userType: string, feature: Feature): boolean => {
  // If user type doesn't exist in our matrix, deny access
  if (!permissionMatrix[userType]) {
    return false;
  }
  
  // If the feature isn't defined in the matrix for this user type, deny access
  if (permissionMatrix[userType][feature] === undefined) {
    return false;
  }
  
  // Return the permission value
  return permissionMatrix[userType][feature];
};

/**
 * Get all features available to a user type
 */
export const getAvailableFeaturesForUserType = (userType: string): Feature[] => {
  // If user type doesn't exist in our matrix, return empty array
  if (!permissionMatrix[userType]) {
    return [];
  }
  
  // Filter features that are true for the user type
  return Object.entries(permissionMatrix[userType])
    .filter(([_, hasAccess]) => hasAccess)
    .map(([featureKey]) => featureKey as Feature);
};

/**
 * Check if a user has any of the specified permissions
 * Useful for conditional UI rendering
 */
export const hasAnyPermission = (userType: string, features: Feature[]): boolean => {
  return features.some(feature => hasPermission(userType, feature));
};

/**
 * Check if a user has all of the specified permissions
 * Useful for actions requiring multiple permissions
 */
export const hasAllPermissions = (userType: string, features: Feature[]): boolean => {
  return features.every(feature => hasPermission(userType, feature));
};
