import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SmeDashboardController from '@/components/sme-dashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * SmeDashboard - Main container for SME users
 * This component handles routing, navigation, and user state for the SME dashboard experience
 */
const SmeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userMetrics, setUserMetrics] = useState({
    pitchesSubmitted: 0,
    investorsEngaged: 0,
    fundingProgress: 0,
    documentsUploaded: 0
  });
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // For the demo version, we're not checking authentication
    // This allows users to view the dashboard after registration without logging in
    
    // In production, you would fetch user-specific metrics here
    // For demo purposes, we're setting some sample metrics
    fetchUserMetrics();
    
    // Add event listener for tab change events from child components
    const handleTabChange = (event: CustomEvent<string>) => {
      setActiveTab(event.detail);
    };
    
    window.addEventListener('changeTab', handleTabChange as EventListener);
    
    return () => {
      window.removeEventListener('changeTab', handleTabChange as EventListener);
    };
  }, []);
  
  const fetchUserMetrics = async () => {
    // Simulate API call to fetch user metrics
    // In production, replace with actual API call
    setTimeout(() => {
      setUserMetrics({
        pitchesSubmitted: 2,
        investorsEngaged: 5,
        fundingProgress: 35,
        documentsUploaded: 8
      });
    }, 500);
  };
  
  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Navigation Menu */}
      <div className="mb-8">
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
          <button data-tab="overview" onClick={() => setActiveTab('overview')} className={activeTab==='overview'?'text-blue-600':''}>Overview</button>
          <button data-tab="submit-pitch" onClick={() => setActiveTab('submit-pitch')} className={activeTab==='submit-pitch'?'text-blue-600':''}>Submit Pitch</button>
          <button data-tab="funding-progress" onClick={() => setActiveTab('funding-progress')} className={activeTab==='funding-progress'?'text-blue-600':''}>Funding Progress</button>
          <button data-tab="investor-engagement" onClick={() => setActiveTab('investor-engagement')} className={activeTab==='investor-engagement'?'text-blue-600':''}>Investor Engagement</button>
          <button data-tab="due-diligence" onClick={() => setActiveTab('due-diligence')} className={activeTab==='due-diligence'?'text-blue-600':''}>Due Diligence Vault</button>
          <button data-tab="support" onClick={() => setActiveTab('support')} className={activeTab==='support'?'text-blue-600':''}>Support & Help</button>
        </nav>
      </div>
      
      {/* Main Content - Using Controller Component */}
      <div>
        <SmeDashboardController 
          activeTab={activeTab} 
          userMetrics={userMetrics}
        />
      </div>
    </DashboardLayout>
  );
};

export default SmeDashboard;
