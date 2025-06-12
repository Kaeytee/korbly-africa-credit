import { ReactNode } from 'react';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';
import { isModulePermittedForUserType, hasFeaturePermission } from '../../lib/security';

interface InstitutionalDashboardProps {
  children: ReactNode;
  userType: string;
  userName?: string;
  organization?: string;
}

/**
 * Enhanced institutional dashboard layout that includes proper security controls
 * and adapts the UI based on the institutional user type
 */
const InstitutionalDashboard = ({ 
  children, 
  userType,
  userName = "Institutional User",
  organization = "Financial Institution" 
}: InstitutionalDashboardProps) => {
  
  // Determine access level and permissible modules based on user type with security checks
  const getModulesByUserType = () => {
    const baseModules = [
      { id: 'overview', label: 'Dashboard Overview', route: '/overview' },
    ];
    
    // Define all potential modules
    const allModules = [
      { 
        id: 'portfolio', 
        label: 'Portfolio Analytics', 
        route: SECURE_ROUTES.MODULES.PORTFOLIO,
        requiredPermission: 'viewPortfolio'
      },
      { 
        id: 'syndication', 
        label: 'Syndication Console', 
        route: SECURE_ROUTES.MODULES.SYNDICATION,
        requiredPermission: 'viewSyndicationDeals'
      },
      { 
        id: 'valuation', 
        label: 'Valuation Workbench', 
        route: SECURE_ROUTES.MODULES.VALUATION,
        requiredPermission: 'runValuationModels'
      },
      { 
        id: 'credit-engine', 
        label: 'Credit Risk Engine', 
        route: SECURE_ROUTES.MODULES.CREDIT_ENGINE,
        requiredPermission: 'viewCreditAnalysis'
      },
      { 
        id: 'documentation', 
        label: 'Legal Documentation', 
        route: SECURE_ROUTES.MODULES.DOCUMENTATION,
        requiredPermission: 'viewDocumentation'
      },
      { 
        id: 'compliance', 
        label: 'Compliance Center', 
        route: SECURE_ROUTES.MODULES.COMPLIANCE,
        requiredPermission: 'viewCompliance'
      },
    ];
    
    // Filter modules based on user type and permissions
    const permittedModules = allModules.filter(module => 
      isModulePermittedForUserType(module.route, userType) && 
      (hasFeaturePermission(userType, module.requiredPermission) || !module.requiredPermission)
    );
    
    // Different user types see different modules
    switch(userType) {
      case USER_TYPES.PENSION_FUND:
      case USER_TYPES.SOVEREIGN_FUND:
      case USER_TYPES.ASSET_MANAGER:
      case USER_TYPES.INSURANCE:
      case USER_TYPES.DFI:
        return [
          ...baseModules,
          ...permittedModules
        ];
      case USER_TYPES.INSTITUTIONAL_BORROWER:
        return [
          ...baseModules,
          { id: 'credit-application', label: 'Credit Applications', route: SECURE_ROUTES.MODULES.CREDIT_ENGINE },
          { id: 'documentation', label: 'Legal Documentation', route: SECURE_ROUTES.MODULES.DOCUMENTATION },
        ];
      case USER_TYPES.HNWI:
        return [
          ...baseModules,
          { id: 'portfolio', label: 'Portfolio Analytics', route: SECURE_ROUTES.MODULES.PORTFOLIO },
          { id: 'opportunities', label: 'Private Credit Opportunities', route: '/opportunities' },
        ];
      case USER_TYPES.ADMIN:
        return [
          ...baseModules,
          { id: 'admin-users', label: 'User Management', route: '/admin/users' },
          { id: 'admin-deals', label: 'Deal Management', route: '/admin/deals' },
          { id: 'credit-engine', label: 'Credit Engine', route: SECURE_ROUTES.MODULES.CREDIT_ENGINE },
          { id: 'compliance', label: 'Compliance Center', route: SECURE_ROUTES.MODULES.COMPLIANCE },
        ];
      case USER_TYPES.REGULATOR:
        return [
          ...baseModules,
          { id: 'audit', label: 'Audit Trail', route: '/audit' },
          { id: 'reports', label: 'Regulatory Reports', route: '/reports' },
          { id: 'compliance', label: 'Compliance Overview', route: SECURE_ROUTES.MODULES.COMPLIANCE },
        ];
      default:
        return baseModules;
    }
  };
  
  const modules = getModulesByUserType();
  
  // Get user type display name for UI
  const getUserTypeDisplay = () => {
    switch(userType) {
      case USER_TYPES.PENSION_FUND:
        return 'Pension Fund';
      case USER_TYPES.INSURANCE:
        return 'Insurance Capital';
      case USER_TYPES.DFI:
        return 'Development Finance Institution';
      case USER_TYPES.ASSET_MANAGER:
        return 'Asset Manager';
      case USER_TYPES.SOVEREIGN_FUND:
        return 'Sovereign Fund';
      case USER_TYPES.HNWI:
        return 'High-Net-Worth Individual';
      case USER_TYPES.INSTITUTIONAL_BORROWER:
        return 'Institutional Issuer';
      case USER_TYPES.ADMIN:
        return 'Administrator';
      case USER_TYPES.REGULATOR:
        return 'Regulatory Authority';
      default:
        return 'Institutional Client';
    }
  };

  // In a real implementation, we would use this to record user activity for audit logs
  const logUserActivity = (activity: string) => {
    const timestamp = new Date().toISOString();
    console.log(`[AUDIT LOG] ${timestamp} | ${userType} | ${userName} | ${activity}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Placeholder for the actual institutional dashboard implementation */}
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Institutional Dashboard</h1>
              <p className="text-sm text-slate-500">{getUserTypeDisplay()} | {organization}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                {userType === USER_TYPES.REGULATOR ? 'Regulatory Access' : 'Secure Session'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="mb-8 border-y border-slate-200 py-4">
          <nav className="flex space-x-6 overflow-x-auto">
            {modules.map(module => (
              <button 
                key={module.id}
                className="text-sm font-medium text-slate-700 whitespace-nowrap px-1 py-2 hover:text-blue-800 focus:outline-none"
                onClick={() => logUserActivity(`Navigated to ${module.label}`)}
              >
                {module.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Main content area */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InstitutionalDashboard;
