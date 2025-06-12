import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

const SmeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Navigation Menu */}
      <div className="mb-8">
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
          <button onClick={() => setActiveTab('overview')} className={activeTab==='overview'?'text-blue-600':''}>Overview</button>
          <button onClick={() => setActiveTab('submit-pitch')} className={activeTab==='submit-pitch'?'text-blue-600':''}>Submit Pitch</button>
          <button onClick={() => setActiveTab('funding-progress')} className={activeTab==='funding-progress'?'text-blue-600':''}>Funding Progress</button>
          <button onClick={() => setActiveTab('investor-engagement')} className={activeTab==='investor-engagement'?'text-blue-600':''}>Investor Engagement</button>
          <button onClick={() => setActiveTab('due-diligence')} className={activeTab==='due-diligence'?'text-blue-600':''}>Due Diligence Vault</button>
          <button onClick={() => setActiveTab('support')} className={activeTab==='support'?'text-blue-600':''}>Support & Help</button>
        </nav>
      </div>
      {/* Main Content */}
      <div>
        {activeTab === 'overview' && (
          <Card className="p-8 mb-8">
            <h1 className="text-3xl font-bold mb-2 text-korbly-navy">Raise Capital & Build Trust</h1>
            <p className="text-gray-600 mb-4">Welcome to your SME dashboard. Track your funding, submit pitches, and engage with investors.</p>
          </Card>
        )}
        {activeTab === 'submit-pitch' && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Submit Pitch</h2>
            {/* Pitch Submission Flow UI goes here */}
            <p className="text-gray-600">Pitch submission form coming soon.</p>
          </Card>
        )}
        {activeTab === 'funding-progress' && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Funding Progress</h2>
            <p className="text-gray-600">Track your funding status and progress here.</p>
          </Card>
        )}
        {activeTab === 'investor-engagement' && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Investor Engagement</h2>
            <p className="text-gray-600">See which investors have viewed or interacted with your pitch.</p>
          </Card>
        )}
        {activeTab === 'due-diligence' && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Due Diligence Vault</h2>
            <p className="text-gray-600">Upload and manage your due diligence documents securely.</p>
          </Card>
        )}
        {activeTab === 'support' && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Support & Help</h2>
            <p className="text-gray-600">Get help and support for your SME journey.</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SmeDashboard;
