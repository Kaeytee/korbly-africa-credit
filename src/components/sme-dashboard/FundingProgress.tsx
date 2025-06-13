import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  DollarSign,
  Calendar,
  FileText,
  ChevronRight,
  Download
} from 'lucide-react';

interface FundingGoal {
  target: number;
  raised: number;
  currency: string;
  deadline: string;
  investors: number;
}

interface Milestone {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
}

const FundingProgressSection: React.FC = () => {
  const [fundingGoal, setFundingGoal] = useState<FundingGoal>({
    target: 250000,
    raised: 87500,
    currency: 'USD',
    deadline: '2025-09-15',
    investors: 4
  });
  
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      title: 'Pitch Submission',
      date: '2025-06-01',
      status: 'completed',
      description: 'Initial pitch and business plan submitted to the platform'
    },
    {
      id: 2,
      title: 'Verification & Due Diligence',
      date: '2025-06-10',
      status: 'completed',
      description: 'Platform verification and basic due diligence completed'
    },
    {
      id: 3,
      title: 'First Funding Round',
      date: '2025-06-20',
      status: 'current',
      description: 'Active fundraising from initial investors'
    },
    {
      id: 4,
      title: 'Second Funding Round',
      date: '2025-07-15',
      status: 'upcoming',
      description: 'Additional funding from second round of investors'
    },
    {
      id: 5,
      title: 'Funding Completion',
      date: '2025-09-15',
      status: 'upcoming',
      description: 'Target funding amount reached'
    }
  ]);
  
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  
  useEffect(() => {
    const calculateDaysRemaining = () => {
      const deadlineDate = new Date(fundingGoal.deadline);
      const currentDate = new Date();
      const differenceInTime = deadlineDate.getTime() - currentDate.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setDaysRemaining(Math.max(0, differenceInDays));
    };
    
    calculateDaysRemaining();
    const timer = setInterval(calculateDaysRemaining, 86400000); // Update daily
    
    return () => clearInterval(timer);
  }, [fundingGoal.deadline]);

  const progressPercentage = (fundingGoal.raised / fundingGoal.target) * 100;
  const formattedRaised = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: fundingGoal.currency
  }).format(fundingGoal.raised);
  
  const formattedTarget = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: fundingGoal.currency
  }).format(fundingGoal.target);

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'current':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'upcoming':
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Funding Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
              <h3 className="font-medium">Funds Raised</h3>
            </div>
            <p className="text-3xl font-bold text-blue-800">{formattedRaised}</p>
            <p className="text-sm text-blue-600">of {formattedTarget} goal</p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 mr-2 text-amber-600" />
              <h3 className="font-medium">Investors</h3>
            </div>
            <p className="text-3xl font-bold text-amber-800">{fundingGoal.investors}</p>
            <p className="text-sm text-amber-600">committed to your business</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 mr-2 text-purple-600" />
              <h3 className="font-medium">Time Left</h3>
            </div>
            <p className="text-3xl font-bold text-purple-800">{daysRemaining} days</p>
            <p className="text-sm text-purple-600">until funding deadline</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Funding Progress</h3>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Start Date:</span>
              <span className="ml-1 font-medium">June 1, 2025</span>
            </div>
            <div className="text-right">
              <span className="text-gray-600">End Date:</span>
              <span className="ml-1 font-medium">September 15, 2025</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button className="w-full sm:w-auto">
            View Detailed Analytics
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
      
      <Card className="p-8">
        <h3 className="text-xl font-semibold mb-4">Funding Milestones</h3>
        
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-16 top-5 bottom-5 w-0.5 bg-gray-200" />
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex relative">
                <div className={`flex-shrink-0 w-8 h-8 mr-8 rounded-full flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-green-100' : 
                  milestone.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {getMilestoneIcon(milestone.status)}
                </div>
                
                <div className="flex-grow pb-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-medium">{milestone.title}</h4>
                    <Badge className={getMilestoneStatusColor(milestone.status)}>
                      {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(milestone.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      
      <Card className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Funding Reports</h3>
          <Button variant="outline" size="sm">
            Generate Report
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-3 text-blue-600" />
              <div>
                <h4 className="font-medium">June 2025 Investment Summary</h4>
                <p className="text-xs text-gray-500">Generated on July 1, 2025</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-3 text-blue-600" />
              <div>
                <h4 className="font-medium">Investment Progress Report</h4>
                <p className="text-xs text-gray-500">Generated on June 15, 2025</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FundingProgressSection;
