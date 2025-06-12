import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DynamicLayout from '@/components/layout/DynamicLayout';
import ModuleDashboard from '@/components/dashboard/ModuleDashboard';

const Dashboard = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    // Redirect to specific dashboard if user role suggests a specific destination
    if (!isLoading && isAuthenticated && user?.role) {
      const { role } = user;
      
      // If user is on generic dashboard but should have a specific one, redirect
      if (window.location.pathname === '/dashboard') {
        switch(role) {
          case 'pension_fund':
            navigate('/dashboards/pension_fund');
            break;
          case 'insurance':
            navigate('/dashboards/insurance');
            break;
          case 'dfi':
            navigate('/dashboards/dfi');
            break;
          case 'asset_manager':
            navigate('/dashboards/asset_manager');
            break;
          case 'sovereign_fund':
            navigate('/dashboards/sovereign_fund');
            break;
          case 'hnwi':
            navigate('/dashboards/hnwi');
            break;
          case 'institutional_borrower':
            navigate('/dashboards/institutional_borrower');
            break;
          case 'regulator':
            navigate('/dashboards/regulator');
            break;
          // Admin stays on the main dashboard
          case 'admin':
          default:
            // Stay on generic dashboard
            break;
        }
      }
    }
  }, [isAuthenticated, isLoading, navigate, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <DynamicLayout>
      <ModuleDashboard />
    </DynamicLayout>
  );
};

export default Dashboard;
