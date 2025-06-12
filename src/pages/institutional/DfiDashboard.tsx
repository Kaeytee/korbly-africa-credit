import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

/**
 * Placeholder for DFI Dashboard
 */
const InstitutionalDfiDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">DFI Portal</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm">Development Finance Institution</span>
              <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center">
                <Building className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Development Finance Institution Dashboard</h2>
          <p className="text-gray-600 mb-6">
            This dashboard is specific to Development Finance Institutions for managing impact investments and development credit.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Button onClick={() => navigate('/institutional/dfi/credit-engine')}>
              Access Credit Engine
            </Button>
            <Button onClick={() => navigate('/institutional/dfi/syndication')}>
              Access Syndication Console
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            This dashboard is under development and will include impact tracking, development metrics, and geographic allocation tools.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionalDfiDashboard;
