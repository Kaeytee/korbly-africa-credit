import { ReactNode, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DynamicLayout from './DynamicLayout';
import BreadcrumbNavigation from '@/components/navigation/BreadcrumbNavigation';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';

interface ModuleLayoutProps {
  children: ReactNode;
  moduleName: string;
}

/**
 * ModuleLayout - Specialized layout for institutional modules
 * Handles:
 * - Module access permissions
 * - URL validation with user role
 * - Proper redirection based on permissions
 * - Consistent UI for all modules
 */
const ModuleLayout = ({ children, moduleName }: ModuleLayoutProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { userType } = useParams<{ userType: string }>();

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    // Validate if this module is permitted for the user
    if (user?.role && userType) {
      const isPermitted = checkModulePermission(user.role, moduleName);
      
      if (!isPermitted) {
        console.log(`[MODULE] User ${user.role} doesn't have permission for module ${moduleName}`);
        
        // Redirect to appropriate dashboard
        const dashboardPath = SECURE_ROUTES.DASHBOARD[user.role as keyof typeof SECURE_ROUTES.DASHBOARD] || '/dashboard';
        navigate(dashboardPath);
      }
    }
  }, [isLoading, isAuthenticated, user, userType, moduleName, navigate]);

  /**
   * Check if a user type has permission to access a specific module
   */
  const checkModulePermission = (userRole: string, module: string): boolean => {
    // Map modules to their permission keys
    const modulePermissionMap: Record<string, string> = {
      'Syndication': 'SYNDICATION',
      'CreditEngine': 'CREDIT_ENGINE',
      'Valuation': 'VALUATION',
      'EnhancedValuation': 'VALUATION', // Same permissions as regular valuation
      'Portfolio': 'PORTFOLIO',
      'Documentation': 'DOCUMENTATION',
      'Compliance': 'COMPLIANCE'
    };
    
    const moduleKey = modulePermissionMap[module];
    if (!moduleKey) return false;
    
    // Check user type permissions based on the predefined mappings
    switch(userRole) {
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

  // All allowed user types for this application
  const allUserTypes = Object.values(USER_TYPES);
  const location = useLocation();
  
  // Generate breadcrumb items based on current module and user type
  const breadcrumbItems = useMemo(() => {
    if (!userType) return [];
    
    // Get user-friendly type name for display
    let userTypeDisplay = userType;
    switch(userType) {
      case USER_TYPES.PENSION_FUND:
        userTypeDisplay = 'Pension Fund';
        break;
      case USER_TYPES.INSURANCE:
        userTypeDisplay = 'Insurance';
        break;
      case USER_TYPES.DFI:
        userTypeDisplay = 'DFI';
        break;
      // Add other user types as needed
    }
    
    // Get dashboard path for this user type
    const dashboardPath = SECURE_ROUTES.DASHBOARD[userType as keyof typeof SECURE_ROUTES.DASHBOARD] || '/dashboard';
    
    return [
      { label: 'Dashboard', href: dashboardPath },
      { label: userTypeDisplay, href: dashboardPath },
      { label: moduleName }
    ];
  }, [userType, moduleName]);

  return (
    <DynamicLayout requireAuth={true} allowedUserTypes={allUserTypes}>
      <div className="mb-6">
        <BreadcrumbNavigation items={breadcrumbItems} />
      </div>
      {children}
    </DynamicLayout>
  );
};

export default ModuleLayout;
