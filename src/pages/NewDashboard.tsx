import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DynamicLayout from '@/components/layout/DynamicLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import ModuleGrid from '@/components/dashboard/ModuleGrid';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
      {/* Main Dashboard Content */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <div className="mt-2 sm:mt-0">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Available Modules</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <DashboardOverview />
          </TabsContent>
          
          <TabsContent value="modules" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-medium text-slate-900">Your Modules</h2>
              <p className="text-sm text-slate-500">Access your available institutional modules</p>
            </div>
            <ModuleGrid />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="h-96 flex items-center justify-center border border-dashed rounded-lg bg-slate-50">
              <div className="text-center">
                <p className="text-slate-500">Advanced analytics will be available soon</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DynamicLayout>
  );
};

export default Dashboard;
