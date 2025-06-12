import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProDashboard from '@/components/dashboard/ProDashboard';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';

interface DynamicLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedUserTypes?: string[];
}

/**
 * DynamicLayout - Smart layout component that handles:
 * - Authentication checks
 * - User role-based access control
 * - Appropriate redirects
 * - Consistent UI across the application
 */
const DynamicLayout = ({ 
  children, 
  requireAuth = true,
  allowedUserTypes = [] 
}: DynamicLayoutProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = useParams<{ userType: string }>();

  useEffect(() => {
    // Skip checks if not requiring authentication
    if (!requireAuth) return;

    // Handle authentication check
    if (!isLoading && !isAuthenticated) {
      console.log("[Layout] User not authenticated, redirecting to login");
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    // If we have specific allowed user types, check them
    if (
      !isLoading &&
      isAuthenticated &&
      user?.role &&
      allowedUserTypes.length > 0 &&
      !allowedUserTypes.includes(user.role)
    ) {
      console.log(`[Layout] User type ${user.role} not allowed for this page`);
      
      // Get appropriate dashboard for this user
      const dashboardPath = SECURE_ROUTES.DASHBOARD[user.role as keyof typeof SECURE_ROUTES.DASHBOARD] || '/dashboard';
      navigate(dashboardPath);
      return;
    }

    // Check if URL userType param matches the user's role
    if (
      !isLoading &&
      isAuthenticated && 
      userType && 
      user?.role && 
      userType !== user.role
    ) {
      console.log(`[Layout] URL userType (${userType}) doesn't match user role (${user.role})`);
      
      // Correct the URL to match the user's actual role
      const correctedPath = location.pathname.replace(`/${userType}/`, `/${user.role}/`);
      navigate(correctedPath);
      return;
    }

  }, [
    isLoading,
    isAuthenticated,
    user,
    requireAuth,
    allowedUserTypes,
    userType,
    navigate,
    location.pathname
  ]);

  // Show loading state
  if (requireAuth && isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // For public pages or when auth check passes
  if (!requireAuth || isAuthenticated) {
    return <ProDashboard>{children}</ProDashboard>;
  }

  // Default - should not reach here due to redirects in useEffect
  return null;
};

export default DynamicLayout;
