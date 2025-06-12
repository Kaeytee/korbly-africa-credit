import React, { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';
import ModuleCard from './ModuleCard';
import { 
  FileBarChart, 
  PieChart, 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  BarChart4
} from 'lucide-react';

const ModuleGrid = () => {
  const { user } = useAuth();
  const userType = user?.role || '';

  // Get available modules based on user type
  const availableModules = useMemo(() => {
    const baseModules = [];
    
    // Check each module against user permissions
    const hasPermission = (moduleKey: string) => {
      switch(userType) {
        case USER_TYPES.PENSION_FUND:
        case USER_TYPES.INSURANCE:
        case USER_TYPES.ASSET_MANAGER:
        case USER_TYPES.SOVEREIGN_FUND:
          return ['PORTFOLIO', 'SYNDICATION', 'VALUATION', 'DOCUMENTATION', 'COMPLIANCE'].includes(moduleKey);
          
        case USER_TYPES.DFI:
          return true; // All modules
          
        case USER_TYPES.HNWI:
          return ['PORTFOLIO', 'DOCUMENTATION'].includes(moduleKey);
          
        case USER_TYPES.INSTITUTIONAL_BORROWER:
          return ['CREDIT_ENGINE', 'DOCUMENTATION'].includes(moduleKey);
          
        case USER_TYPES.ADMIN:
          return true; // All modules
          
        case USER_TYPES.REGULATOR:
          return ['COMPLIANCE', 'DOCUMENTATION'].includes(moduleKey);
          
        default:
          return false;
      }
    };

    // Portfolio module
    if (hasPermission('PORTFOLIO')) {
      baseModules.push({
        title: 'Portfolio Analytics',
        description: 'Track and analyze your investment portfolio performance',
        icon: PieChart,
        href: `${SECURE_ROUTES.MODULES.PORTFOLIO}/${userType}`,
        lastUpdated: new Date().toLocaleDateString()
      });
    }
    
    // Valuation module
    if (hasPermission('VALUATION')) {
      baseModules.push({
        title: 'Valuation Workbench',
        description: 'Mark-to-market and valuation tools for your portfolio',
        icon: FileBarChart,
        href: `${SECURE_ROUTES.MODULES.VALUATION}/${userType}`,
        status: 'updated',
        lastUpdated: new Date().toLocaleDateString()
      });

      // Enhanced Valuation as a newer alternative
      baseModules.push({
        title: 'Enhanced Valuation',
        description: 'Next-generation valuation tools with advanced features',
        icon: FileBarChart,
        href: `/institutional/${userType}/enhanced-valuation`,
        status: 'new',
        lastUpdated: new Date().toLocaleDateString()
      });
    }
    
    // Syndication module
    if (hasPermission('SYNDICATION')) {
      baseModules.push({
        title: 'Syndication Console',
        description: 'Manage syndicated investments and partnerships',
        icon: CreditCard,
        href: `${SECURE_ROUTES.MODULES.SYNDICATION}/${userType}`,
        lastUpdated: new Date().toLocaleDateString()
      });
    }
    
    // Documentation module
    if (hasPermission('DOCUMENTATION')) {
      baseModules.push({
        title: 'Documentation',
        description: 'Access and manage all legal and investment documents',
        icon: FileText,
        href: `${SECURE_ROUTES.MODULES.DOCUMENTATION}/${userType}`,
        lastUpdated: new Date().toLocaleDateString()
      });
    }
    
    // Compliance module
    if (hasPermission('COMPLIANCE')) {
      baseModules.push({
        title: 'Compliance Center',
        description: 'Regulatory compliance and reporting tools',
        icon: ShieldCheck,
        href: `${SECURE_ROUTES.MODULES.COMPLIANCE}/${userType}`,
        lastUpdated: new Date().toLocaleDateString()
      });
    }
    
    // Credit Engine module
    if (hasPermission('CREDIT_ENGINE')) {
      baseModules.push({
        title: 'Credit Engine',
        description: 'Credit analysis and risk assessment tools',
        icon: BarChart4,
        href: `${SECURE_ROUTES.MODULES.CREDIT_ENGINE}/${userType}`,
        lastUpdated: new Date().toLocaleDateString()
      });
    }
    
    return baseModules;
  }, [userType]);

  if (!availableModules.length) {
    return (
      <div className="p-6 text-center border rounded-md bg-slate-50">
        <p className="text-slate-500">No modules available for your user role.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {availableModules.map((module, index) => (
        <ModuleCard
          key={index}
          title={module.title}
          description={module.description}
          icon={module.icon}
          href={module.href}
          status={module.status}
          lastUpdated={module.lastUpdated}
        />
      ))}
    </div>
  );
};

export default ModuleGrid;
