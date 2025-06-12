import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  BarChart3, 
  FileText, 
  LineChart,
  AlertTriangle,
  Percent,
  Wallet,
  PieChart
} from 'lucide-react';

/**
 * Insurance Company Dashboard - Specialized institutional interface
 * Focused on liability matching, risk assessment, and capital allocation
 */
const InstitutionalInsuranceDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Navigate to specialized modules with secure URL structure
  const navigateToModule = (modulePath: string) => {
    console.log(`[Navigation] Navigating from insurance dashboard to module: ${modulePath}`);
    navigate(`/institutional/insurance${modulePath}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-emerald-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Insurance Capital Portal</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">African Re Insurance</span>
              <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
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
                  ? 'border-emerald-500 text-emerald-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Capital Overview
            </button>
            <button
              onClick={() => setActiveTab('liabilities')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'liabilities' 
                  ? 'border-emerald-500 text-emerald-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Liability Management
            </button>
            <button
              onClick={() => setActiveTab('investments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'investments' 
                  ? 'border-emerald-500 text-emerald-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Investment Pipeline
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'risk' 
                  ? 'border-emerald-500 text-emerald-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Risk Management
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
                    <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3">
                      <Wallet className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500">Investable Capital</p>
                      <p className="text-2xl font-semibold text-gray-900">$890M</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5 bg-white shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500">Private Credit</p>
                      <p className="text-2xl font-semibold text-gray-900">$175M</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5 bg-white shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                      <Percent className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500">Target Yield</p>
                      <p className="text-2xl font-semibold text-gray-900">7.8%</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5 bg-white shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500">Risk Warnings</p>
                      <p className="text-2xl font-semibold text-gray-900">2</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Module Access */}
              <h2 className="text-lg font-medium text-gray-900 mt-8 mb-4">Insurance Capital Tools</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Liability Matching</h3>
                      <LineChart className="h-6 w-6 text-emerald-200" />
                    </div>
                    <p className="mt-1 text-sm text-emerald-200">Match assets to insurance liabilities and optimize cash flow</p>
                  </div>
                  <div className="px-6 py-4 bg-white">
                    <Button 
                      onClick={() => navigateToModule('/valuation')}
                      variant="outline" 
                      className="w-full"
                    >
                      Open Dashboard
                    </Button>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Credit Portfolio</h3>
                      <PieChart className="h-6 w-6 text-blue-200" />
                    </div>
                    <p className="mt-1 text-sm text-blue-200">Analyze and optimize your private credit allocations</p>
                  </div>
                  <div className="px-6 py-4 bg-white">
                    <Button 
                      onClick={() => navigateToModule('/portfolio')}
                      variant="outline" 
                      className="w-full"
                    >
                      View Portfolio
                    </Button>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Regulatory Compliance</h3>
                      <FileText className="h-6 w-6 text-indigo-200" />
                    </div>
                    <p className="mt-1 text-sm text-indigo-200">Track and manage insurance regulatory requirements</p>
                  </div>
                  <div className="px-6 py-4 bg-white">
                    <Button 
                      onClick={() => navigateToModule('/compliance')}
                      variant="outline" 
                      className="w-full"
                    >
                      View Reports
                    </Button>
                  </div>
                </Card>
              </div>
            </>
          )}
          
          {activeTab !== 'overview' && (
            <Card className="p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                {activeTab === 'liabilities' && 'Liability Management Dashboard'}
                {activeTab === 'investments' && 'Investment Opportunity Pipeline'}
                {activeTab === 'risk' && 'Risk Management Console'}
              </h2>
              <p className="text-gray-500">
                This section is under development. It will provide specialized tools for {activeTab === 'liabilities' && 'managing insurance liabilities and asset-liability matching'}{activeTab === 'investments' && 'reviewing and allocating to new investment opportunities'}{activeTab === 'risk' && 'monitoring portfolio risk metrics and stress testing'}.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstitutionalInsuranceDashboard;
