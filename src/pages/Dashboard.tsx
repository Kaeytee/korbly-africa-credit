
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import PortfolioSection from '@/components/dashboard/PortfolioSection';
import InvestmentOpportunities from '@/components/dashboard/InvestmentOpportunities';
import MarketInsights from '@/components/dashboard/MarketInsights';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'portfolio':
        return <PortfolioSection />;
      case 'opportunities':
        return <InvestmentOpportunities />;
      case 'insights':
        return <MarketInsights />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
