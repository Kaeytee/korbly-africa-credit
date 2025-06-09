
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import PortfolioSection from '@/components/dashboard/PortfolioSection';
import InvestmentOpportunities from '@/components/dashboard/InvestmentOpportunities';
import MarketInsights from '@/components/dashboard/MarketInsights';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4 lg:space-y-6">
            <DashboardOverview />
          </div>
        );
      case 'portfolio':
        return (
          <div className="space-y-4 lg:space-y-6">
            <PortfolioSection />
          </div>
        );
      case 'opportunities':
        return (
          <div className="space-y-4 lg:space-y-6">
            <InvestmentOpportunities />
          </div>
        );
      case 'insights':
        return (
          <div className="space-y-4 lg:space-y-6">
            <MarketInsights />
          </div>
        );
      default:
        return (
          <div className="space-y-4 lg:space-y-6">
            <DashboardOverview />
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-korbly-blue rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
