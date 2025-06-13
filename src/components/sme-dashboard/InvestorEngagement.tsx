import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Eye,
  MessageCircle,
  Calendar,
  Star,
  ThumbsUp,
  ExternalLink,
  ChevronRight,
  Clock,
  FileSpreadsheet,
  Users,
  Building
} from 'lucide-react';

interface Investor {
  id: string;
  name: string;
  organization: string;
  profileImage?: string;
  viewed: Date;
  engaged: boolean;
  interest: 'high' | 'medium' | 'low' | null;
  notesSent: boolean;
  meetingScheduled: boolean;
  rating: number;
}

interface EngagementMetrics {
  totalViews: number;
  activeEngagements: number;
  meetingsScheduled: number;
  averageInterest: number;
}

const InvestorEngagementSection: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [metrics, setMetrics] = useState<EngagementMetrics>({
    totalViews: 0,
    activeEngagements: 0,
    meetingsScheduled: 0,
    averageInterest: 0
  });
  const [activeTab, setActiveTab] = useState('all');
  
  // Fetch investor data (simulated)
  useEffect(() => {
    // In a real application, this would be an API call
    const mockInvestors: Investor[] = [
      {
        id: 'inv-001',
        name: 'Sarah Johnson',
        organization: 'Global Ventures Fund',
        profileImage: undefined,
        viewed: new Date('2025-06-10T14:30:00'),
        engaged: true,
        interest: 'high',
        notesSent: true,
        meetingScheduled: true,
        rating: 4
      },
      {
        id: 'inv-002',
        name: 'Michael Okafor',
        organization: 'East Africa Growth Capital',
        profileImage: undefined,
        viewed: new Date('2025-06-11T09:15:00'),
        engaged: true,
        interest: 'medium',
        notesSent: true,
        meetingScheduled: false,
        rating: 3
      },
      {
        id: 'inv-003',
        name: 'Jessica Chen',
        organization: 'Horizon Investments',
        profileImage: undefined,
        viewed: new Date('2025-06-09T16:45:00'),
        engaged: false,
        interest: 'low',
        notesSent: false,
        meetingScheduled: false,
        rating: 2
      },
      {
        id: 'inv-004',
        name: 'David Mwangi',
        organization: 'Savannah Angel Network',
        profileImage: undefined,
        viewed: new Date('2025-06-12T11:20:00'),
        engaged: true,
        interest: 'high',
        notesSent: true,
        meetingScheduled: true,
        rating: 5
      }
    ];
    
    setInvestors(mockInvestors);
    
    // Calculate metrics
    const totalViews = mockInvestors.length;
    const activeEngagements = mockInvestors.filter(inv => inv.engaged).length;
    const meetingsScheduled = mockInvestors.filter(inv => inv.meetingScheduled).length;
    
    // Calculate average interest (high=3, medium=2, low=1, null=0)
    const interestValues = mockInvestors.map(inv => 
      inv.interest === 'high' ? 3 : 
      inv.interest === 'medium' ? 2 : 
      inv.interest === 'low' ? 1 : 0
    );
    const averageInterest = interestValues.reduce((sum, val) => sum + val, 0) / 
      (interestValues.length || 1);
    
    setMetrics({
      totalViews,
      activeEngagements,
      meetingsScheduled,
      averageInterest: Number((averageInterest / 3 * 100).toFixed(1))  // Convert to percentage
    });
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  
  const getInterestColor = (interest: 'high' | 'medium' | 'low' | null) => {
    switch (interest) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredInvestors = investors.filter(investor => {
    if (activeTab === 'all') return true;
    if (activeTab === 'engaged') return investor.engaged;
    if (activeTab === 'meetings') return investor.meetingScheduled;
    if (activeTab === 'high-interest') return investor.interest === 'high';
    return true;
  });

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Investor Engagement</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-50 p-5 rounded-lg">
            <div className="flex items-center mb-2">
              <Eye className="h-5 w-5 mr-2 text-blue-600" />
              <h3 className="font-medium">Total Views</h3>
            </div>
            <p className="text-3xl font-bold text-blue-800">{metrics.totalViews}</p>
          </div>
          
          <div className="bg-purple-50 p-5 rounded-lg">
            <div className="flex items-center mb-2">
              <MessageCircle className="h-5 w-5 mr-2 text-purple-600" />
              <h3 className="font-medium">Engagements</h3>
            </div>
            <p className="text-3xl font-bold text-purple-800">{metrics.activeEngagements}</p>
          </div>
          
          <div className="bg-green-50 p-5 rounded-lg">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              <h3 className="font-medium">Meetings</h3>
            </div>
            <p className="text-3xl font-bold text-green-800">{metrics.meetingsScheduled}</p>
          </div>
          
          <div className="bg-amber-50 p-5 rounded-lg">
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 mr-2 text-amber-600" />
              <h3 className="font-medium">Interest</h3>
            </div>
            <p className="text-3xl font-bold text-amber-800">{metrics.averageInterest}%</p>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Investors</TabsTrigger>
            <TabsTrigger value="engaged">Engaged</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="high-interest">High Interest</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="pt-2">
            {filteredInvestors.length > 0 ? (
              <div className="space-y-4">
                {filteredInvestors.map(investor => (
                  <div 
                    key={investor.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12">
                          {investor.profileImage ? (
                            <AvatarImage src={investor.profileImage} alt={investor.name} />
                          ) : (
                            <AvatarFallback className="bg-blue-100 text-blue-800">
                              {getInitials(investor.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        
                        <div className="ml-4">
                          <h4 className="font-medium">{investor.name}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Building className="h-3 w-3 mr-1" />
                            {investor.organization}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          <Eye className="h-3 w-3 mr-1 text-gray-500" />
                          <span className="text-sm text-gray-500">
                            Viewed {getTimeAgo(investor.viewed)}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          {investor.interest && (
                            <Badge className={getInterestColor(investor.interest)}>
                              {investor.interest.charAt(0).toUpperCase() + investor.interest.slice(1)} Interest
                            </Badge>
                          )}
                          
                          {investor.meetingScheduled && (
                            <Badge className="bg-green-100 text-green-800">
                              Meeting Scheduled
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < investor.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" className="flex items-center">
                          View Profile
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No investors found in this category.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
      
      <Card className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Upcoming Meetings</h3>
          <Button variant="outline" size="sm">
            Schedule New Meeting
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-2 h-10 bg-green-500 rounded-full mr-4"></div>
              <div>
                <h4 className="font-medium">Pitch Meeting with Global Ventures Fund</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  June 18, 2025 · 10:00 AM
                  <span className="mx-2">•</span>
                  <Users className="h-3 w-3 mr-1" />
                  Sarah Johnson
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Join Meeting
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-2 h-10 bg-blue-500 rounded-full mr-4"></div>
              <div>
                <h4 className="font-medium">Due Diligence Session with Savannah Angel Network</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  June 24, 2025 · 2:30 PM
                  <span className="mx-2">•</span>
                  <Users className="h-3 w-3 mr-1" />
                  David Mwangi
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Prepare Docs
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="p-8">
        <h3 className="text-xl font-semibold mb-4">Boost Your Investor Engagement</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center mb-2">
              <FileSpreadsheet className="h-5 w-5 mr-2 text-blue-600" />
              <h4 className="font-medium">Complete Your Financial Projections</h4>
            </div>
            <p className="text-sm text-blue-700 mb-2">
              Investors are 3x more likely to engage with pitches that include detailed financial projections.
            </p>
            <Button size="sm" variant="outline" className="bg-white">
              Upload Financials
            </Button>
          </div>
          
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center mb-2">
              <MessageCircle className="h-5 w-5 mr-2 text-purple-600" />
              <h4 className="font-medium">Respond to Investor Questions</h4>
            </div>
            <p className="text-sm text-purple-700 mb-2">
              You have 3 unanswered questions from potential investors. Quick responses improve engagement.
            </p>
            <Button size="sm" variant="outline" className="bg-white">
              View Questions
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvestorEngagementSection;
