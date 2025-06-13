import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, TrendingUp, Users, FileText, BarChart3 } from 'lucide-react';

interface OverviewProps {
  companyName?: string;
  metrics?: {
    pitchesSubmitted: number;
    investorsEngaged: number;
    fundingProgress: number;
    documentsUploaded: number;
  };
}

const OverviewSection: React.FC<OverviewProps> = ({ 
  companyName = "Your Business",
  metrics = {
    pitchesSubmitted: 0,
    investorsEngaged: 0,
    fundingProgress: 0,
    documentsUploaded: 0
  }
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-2 text-korbly-navy">
          Raise Capital & Build Trust
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to your SME dashboard. Track your funding, submit pitches, and engage with investors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            className="flex items-center justify-between w-full p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all"
            variant="ghost"
            onClick={() => (document.querySelector('button[data-tab="submit-pitch"]') as HTMLButtonElement | null)?.click()}
          >
            <span className="font-medium">Create New Pitch</span>
            <ChevronRight className="h-5 w-5" />
          </Button>

          <Button 
            className="flex items-center justify-between w-full p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-all"
            variant="ghost"
            onClick={() => (document.querySelector('button[data-tab="due-diligence"]') as HTMLButtonElement | null)?.click()}
          >
            <span className="font-medium">Upload Documents</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </Card>

      {/* Metrics Overview */}
      <Card className="p-8">
        <h2 className="text-xl font-semibold mb-4 text-korbly-navy">Your Dashboard Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-4">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-700">Pitches Submitted</p>
              <p className="text-2xl font-bold text-blue-900">{metrics.pitchesSubmitted}</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-4">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-700">Investors Engaged</p>
              <p className="text-2xl font-bold text-green-900">{metrics.investorsEngaged}</p>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg flex items-center">
            <div className="bg-amber-100 p-2 rounded-full mr-4">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-amber-700">Funding Progress</p>
              <p className="text-2xl font-bold text-amber-900">{metrics.fundingProgress}%</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg flex items-center">
            <div className="bg-purple-100 p-2 rounded-full mr-4">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-700">Documents</p>
              <p className="text-2xl font-bold text-purple-900">{metrics.documentsUploaded}</p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Recent Activity */}
      <Card className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-korbly-navy">Recent Activity</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {/* Activity items would be mapped from actual data */}
          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <p className="text-sm">New investor viewed your pitch</p>
            <p className="text-xs text-gray-500">Today at 14:35</p>
          </div>
          <div className="border-l-2 border-green-500 pl-4 py-1">
            <p className="text-sm">Document verification completed</p>
            <p className="text-xs text-gray-500">Yesterday at 09:12</p>
          </div>
          <div className="border-l-2 border-purple-500 pl-4 py-1">
            <p className="text-sm">Funding milestone reached</p>
            <p className="text-xs text-gray-500">3 days ago</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OverviewSection;
