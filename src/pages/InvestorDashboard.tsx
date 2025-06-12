import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Navigation Menu */}
      <div className="mb-8">
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
          <button onClick={() => setActiveTab('overview')} className={activeTab==='overview'?'text-blue-600':''}>Overview</button>
          <button onClick={() => setActiveTab('explore')} className={activeTab==='explore'?'text-blue-600':''}>Explore Opportunities</button>
          <button onClick={() => setActiveTab('saved-smes')} className={activeTab==='saved-smes'?'text-blue-600':''}>Saved SMEs</button>
          <button onClick={() => setActiveTab('due-diligence')} className={activeTab==='due-diligence'?'text-blue-600':''}>Due Diligence Room</button>
          <button onClick={() => setActiveTab('messages')} className={activeTab==='messages'?'text-blue-600':''}>Messages</button>
          <button onClick={() => setActiveTab('portfolio')} className={activeTab==='portfolio'?'text-blue-600':''}>My Portfolio</button>
        </nav>
      </div>
      {/* Main Content */}
      <div>
        {activeTab === 'overview' && (
          <Card className="p-8 mb-8">
            <h1 className="text-3xl font-bold mb-2 text-korbly-navy">Discover & Invest in Trusted SMEs</h1>
            <p className="text-gray-600 mb-4">Welcome to your Investor dashboard. Explore opportunities, manage your portfolio, and connect with SMEs.</p>
          </Card>
        )}
        {activeTab === 'explore' && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Explore Opportunities</h2>
            <p className="text-gray-600">Browse and filter SME investment opportunities here.</p>
          </Card>
        )}
        {activeTab === 'saved-smes' && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Saved SMEs</h2>
            <p className="text-gray-600">View SMEs you have saved for later review.</p>
          </Card>
        )}
        {activeTab === 'due-diligence' && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Due Diligence Room</h2>
            <p className="text-gray-600">Access and review SME due diligence documents.</p>
          </Card>
        )}
        {activeTab === 'messages' && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Messages</h2>
            <p className="text-gray-600">Communicate securely with SMEs.</p>
          </Card>
        )}
        {activeTab === 'portfolio' && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">My Portfolio</h2>
            <p className="text-gray-600">Track your investments and download documents.</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InvestorDashboard;
