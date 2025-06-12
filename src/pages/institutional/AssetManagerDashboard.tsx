import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

/**
 * Placeholder for Asset Manager Dashboard
 */
const InstitutionalAssetManagerDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-purple-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Asset Manager Portal</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">Institutional Asset Manager</span>
              <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Asset Manager Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Specialized dashboard for institutional asset managers focusing on private credit allocation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Button onClick={() => navigate('/institutional/asset-manager/portfolio')}>
              Access Portfolio Analytics
            </Button>
            <Button onClick={() => navigate('/institutional/asset-manager/valuation')}>
              Access Valuation Tools
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            This dashboard is under development and will include portfolio construction tools, client reporting, and performance attribution functionality.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionalAssetManagerDashboard;
