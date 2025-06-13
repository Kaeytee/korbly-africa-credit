/**
 * Application-wide constants for institutional client types and secure routing
 */

export const USER_TYPES = {
  PENSION_FUND: 'pension_fund',
  INSURANCE: 'insurance',
  DFI: 'dfi',
  ASSET_MANAGER: 'asset_manager',
  SOVEREIGN_FUND: 'sovereign_fund',
  HNWI: 'hnwi',
  INSTITUTIONAL_BORROWER: 'institutional_borrower',
  SME: 'sme',
  ADMIN: 'admin',
  REGULATOR: 'regulator'
} as const;

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];

/**
 * Secure route definitions with appropriate access controls
 */
export const SECURE_ROUTES = {
  // Dashboard routes by user type
  DASHBOARD: {
    [USER_TYPES.PENSION_FUND]: '/institutional/pension/dashboard',
    [USER_TYPES.INSURANCE]: '/institutional/insurance/dashboard',
    [USER_TYPES.DFI]: '/institutional/dfi/dashboard',
    [USER_TYPES.ASSET_MANAGER]: '/institutional/asset-manager/dashboard',
    [USER_TYPES.SOVEREIGN_FUND]: '/institutional/sovereign/dashboard',
    [USER_TYPES.HNWI]: '/wealth/dashboard',
    [USER_TYPES.INSTITUTIONAL_BORROWER]: '/issuer/dashboard',
    [USER_TYPES.SME]: '/sme/dashboard',
    [USER_TYPES.ADMIN]: '/admin/dashboard',
    [USER_TYPES.REGULATOR]: '/regulator/dashboard',
  },
  
  // Common module routes
  MODULES: {
    CREDIT_ENGINE: '/credit-engine',
    SYNDICATION: '/syndication',
    VALUATION: '/valuation',
    DOCUMENTATION: '/documentation',
    PORTFOLIO: '/portfolio',
    COMPLIANCE: '/compliance',
  }
};

/**
 * Two-factor authentication requirements by user type
 */
export const REQUIRES_2FA = {
  [USER_TYPES.PENSION_FUND]: true,
  [USER_TYPES.INSURANCE]: true,
  [USER_TYPES.DFI]: true,
  [USER_TYPES.ASSET_MANAGER]: true,
  [USER_TYPES.SOVEREIGN_FUND]: true,
  [USER_TYPES.HNWI]: true,
  [USER_TYPES.INSTITUTIONAL_BORROWER]: true,
  [USER_TYPES.SME]: false,
  [USER_TYPES.ADMIN]: true,
  [USER_TYPES.REGULATOR]: true,
};
