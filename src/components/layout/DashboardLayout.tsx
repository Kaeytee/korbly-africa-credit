import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DynamicLayout from './DynamicLayout';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';

interface DashboardLayoutProps {
  children: ReactNode;
  userType: string;
}

/**
 * DashboardLayout - Specialized layout for institutional dashboards
 * Ensures users are viewing the proper dashboard for their role
 */
const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoading || !isAuthenticated) return;
    
    // Check if user is trying to access a dashboard they shouldn't
    if (user?.role && user.role !== userType) {
      console.log(`[DASHBOARD] User type ${user.role} doesn't match required type ${userType}`);
      
      // Redirect to the correct dashboard for their role
      const correctDashboard = SECURE_ROUTES.DASHBOARD[user.role as keyof typeof SECURE_ROUTES.DASHBOARD];
      if (correctDashboard) {
        navigate(correctDashboard);
      }
    }
  }, [isLoading, isAuthenticated, user, userType, navigate]);
  
  // Only allow this specific user type for this dashboard
  const allowedUserTypes = [userType];

  return (
    <DynamicLayout requireAuth={true} allowedUserTypes={allowedUserTypes}>
      {children}
    </DynamicLayout>
  );
};

export default DashboardLayout;
