import { useState } from 'react';
import { USER_TYPES } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Landmark, 
  PieChart,
  DollarSign,
  LineChart,
  ClipboardList,
  BarChart4
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Pension Fund Dashboard - Specialized institutional interface
 * Focused on portfolio allocation, risk management, and regulatory compliance
 */
const InstitutionalPensionDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { logout } = useAuth();

  // Navigate to specialized modules with secure URL structure
  const navigateToModule = (modulePath: string) => {
    console.log(`[Navigation] Navigating from pension dashboard to module: ${modulePath}`);
    navigate(`/institutional/pension_fund${modulePath}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Pension Fund Portal</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">Ghana National Pension Fund</span>
              <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center">
                <Landmark className="h-5 w-5" />
              </div>
              {/* Logout Button */}
              <Button
                variant="destructive"
                onClick={logout}
                className="ml-4"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Portfolio Overview
            </button>
            <button
              onClick={() => setActiveTab('allocation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'allocation' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Asset Allocation
            </button>
            <button
              onClick={() => setActiveTab('deals')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'deals' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Deal Pipeline
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'compliance' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Regulatory Compliance
            </button>
          </nav>
        </div>
        
        {/* Main Content Area */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="p-5 bg-white shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500">Total AUM</p>
                      <p className="text-2xl font-semibold text-gray-900">$1.7B</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5 bg-white shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500">Private Credit Allocation</p>
                      <p className="text-2xl font-semibold text-gray-900">$240M</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5 bg-white shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500">Active Deals</p>
                      <p className="text-2xl font-semibold text-gray-900">14</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5 bg-white shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                      <PieChart className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500">YTD Return</p>
                      <p className="text-2xl font-semibold text-green-600">+8.3%</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Module Access */}
              <h2 className="text-lg font-medium text-gray-900 mt-8 mb-4">Institutional Services</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Credit Risk Engine</h3>
                      <LineChart className="h-6 w-6 text-blue-200" />
                    </div>
                    <p className="mt-1 text-sm text-blue-200">Calculate risk-weighted returns and optimize portfolio allocation</p>
                  </div>
                  <div className="px-6 py-4 bg-white">
                    <Button 
                      onClick={() => navigateToModule('/credit-engine')}
                      variant="outline" 
                      className="w-full"
                    >
                      Access Engine
                    </Button>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-green-700 to-green-900 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Syndication Console</h3>
                      <BarChart4 className="h-6 w-6 text-green-200" />
                    </div>
                    <p className="mt-1 text-sm text-green-200">Manage participation in syndicated loan transactions</p>
                  </div>
                  <div className="px-6 py-4 bg-white">
                    <Button 
                      onClick={() => navigateToModule('/syndication')}
                      variant="outline" 
                      className="w-full"
                    >
                      Open Console
                    </Button>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Valuation Workbench</h3>
                      <ClipboardList className="h-6 w-6 text-purple-200" />
                    </div>
                    <p className="mt-1 text-sm text-purple-200">Mark-to-market and scenario analysis tools</p>
                  </div>
                  <div className="px-6 py-4 bg-white">
                    <Button 
                      onClick={() => navigateToModule('/valuation')}
                      variant="outline" 
                      className="w-full"
                    >
                      Open Workbench
                    </Button>
                  </div>
                </Card>
              </div>
            </>
          )}
          
          {activeTab !== 'overview' && (
            <Card className="p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                {activeTab === 'allocation' && 'Asset Allocation Dashboard'}
                {activeTab === 'deals' && 'Deal Pipeline Management'}
                {activeTab === 'compliance' && 'Regulatory Compliance Center'}
              </h2>
              <p className="text-gray-500">
                This section is under development. It will provide specialized tools for {activeTab === 'allocation' && 'portfolio allocation management'}{activeTab === 'deals' && 'tracking deal progress and approvals'}{activeTab === 'compliance' && 'regulatory reporting and compliance'}.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstitutionalPensionDashboard;
