import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ModuleGrid from '@/components/dashboard/ModuleGrid';
import { Building2, BarChart3, PieChart, FileText, TrendingUp, Bell, Calendar } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const StatCard = ({ title, value, description, icon, trend }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div className="flex items-center space-x-2">
        {icon}
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </div>
      {trend && (
        <div className={`flex items-center text-xs ${trend.positive ? 'text-emerald-600' : 'text-red-600'}`}>
          <span>{trend.positive ? '+' : ''}{trend.value}</span>
        </div>
      )}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
    </CardContent>
  </Card>
);

/**
 * The ModuleDashboard component displays analytics, 
 * module access buttons, and key stats for institutional users
 */
const ModuleDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const userType = user?.role || '';
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const getUserTypeDisplay = () => {
    switch(userType) {
      case USER_TYPES.PENSION_FUND:
        return 'Pension Fund';
      case USER_TYPES.INSURANCE:
        return 'Insurance';
      case USER_TYPES.DFI:
        return 'Development Finance Institution';
      case USER_TYPES.ASSET_MANAGER:
        return 'Asset Manager';
      case USER_TYPES.SOVEREIGN_FUND:
        return 'Sovereign Fund';
      case USER_TYPES.HNWI:
        return 'High-Net-Worth Individual';
      case USER_TYPES.INSTITUTIONAL_BORROWER:
        return 'Institutional Issuer';
      case USER_TYPES.ADMIN:
        return 'Administrator';
      case USER_TYPES.REGULATOR:
        return 'Regulatory Authority';
      default:
        return 'User';
    }
  };
  
  // Mock data - would be replaced with real data from API
  const stats = [
    { 
      title: 'Portfolio Value',
      value: '$245.8M',
      description: 'Total portfolio value as of today',
      icon: <PieChart className="h-4 w-4 text-blue-600" />,
      trend: { value: '2.4%', positive: true }
    },
    { 
      title: 'Active Deals',
      value: '12',
      description: 'Syndication deals in progress',
      icon: <FileText className="h-4 w-4 text-emerald-600" />,
      trend: { value: '3', positive: true }
    },
    { 
      title: 'Weighted Yield',
      value: '8.7%',
      description: 'Average yield across all positions',
      icon: <TrendingUp className="h-4 w-4 text-amber-600" />,
      trend: { value: '0.3%', positive: true }
    },
    { 
      title: 'Upcoming Events',
      value: '5',
      description: 'Events in the next 30 days',
      icon: <Calendar className="h-4 w-4 text-purple-600" />
    },
  ];
  
  const recentNotifications = [
    { id: 1, title: "New valuation report available", time: "2 hours ago" },
    { id: 2, title: "Portfolio review reminder", time: "Yesterday" },
    { id: 3, title: "Market update: Africa private credit", time: "3 days ago" },
    { id: 4, title: "Documentation update required", time: "1 week ago" }
  ];
  
  // Adjust stats based on user type
  const adjustedStats = () => {
    if (userType === USER_TYPES.INSTITUTIONAL_BORROWER) {
      return [
        { 
          title: 'Credit Facilities',
          value: '$45.2M',
          description: 'Total active credit facilities',
          icon: <PieChart className="h-4 w-4 text-blue-600" />
        },
        { 
          title: 'Upcoming Payments',
          value: '3',
          description: 'Due in the next 30 days',
          icon: <Calendar className="h-4 w-4 text-amber-600" />
        },
        { 
          title: 'Average Rate',
          value: '7.2%',
          description: 'Weighted average interest rate',
          icon: <TrendingUp className="h-4 w-4 text-emerald-600" />,
          trend: { value: '0.1%', positive: false }
        },
        { 
          title: 'Documents',
          value: '18',
          description: 'Credit documents in your portal',
          icon: <FileText className="h-4 w-4 text-purple-600" />
        },
      ];
    }
    
    if (userType === USER_TYPES.REGULATOR) {
      return [
        { 
          title: 'Institutions',
          value: '34',
          description: 'Financial institutions under oversight',
          icon: <Building2 className="h-4 w-4 text-blue-600" />
        },
        { 
          title: 'Compliance Alerts',
          value: '7',
          description: 'Active compliance issues',
          icon: <Bell className="h-4 w-4 text-red-600" />
        },
        { 
          title: 'Document Reviews',
          value: '12',
          description: 'Pending document reviews',
          icon: <FileText className="h-4 w-4 text-amber-600" />
        },
        { 
          title: 'Reporting Cycle',
          value: '18 days',
          description: 'Until next reporting deadline',
          icon: <Calendar className="h-4 w-4 text-purple-600" />
        },
      ];
    }
    
    return stats;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-3xl font-bold">{getGreeting()}, {user?.name}</h1>
        <p className="text-slate-500">{getUserTypeDisplay()} Dashboard | {user?.organization || "Korbly Africa Credit"}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {adjustedStats().map((stat, i) => (
          <StatCard 
            key={i}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>
      
      <Separator />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                  <CardDescription>Performance overview for your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border border-dashed rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto text-slate-300" />
                      <p className="text-sm text-slate-500 mt-2">Analytics visualization will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Your latest updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNotifications.map(notification => (
                    <div key={notification.id} className="flex items-start space-x-3">
                      <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-slate-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="modules">
          <h2 className="text-lg font-medium mb-4">Available Modules</h2>
          <ModuleGrid />
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-500 pl-4 py-1">
                  <p className="text-sm">You accessed <span className="font-medium">Valuation Module</span></p>
                  <p className="text-xs text-slate-500">Today at 10:23 AM</p>
                </div>
                <div className="border-l-2 border-emerald-500 pl-4 py-1">
                  <p className="text-sm">New document uploaded: <span className="font-medium">Q2 Financial Report</span></p>
                  <p className="text-xs text-slate-500">Yesterday at 4:15 PM</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-4 py-1">
                  <p className="text-sm">Portfolio valuation updated</p>
                  <p className="text-xs text-slate-500">Jun 9, 2025 at 9:00 AM</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-4 py-1">
                  <p className="text-sm">User profile information updated</p>
                  <p className="text-xs text-slate-500">Jun 7, 2025 at 11:32 AM</p>
                </div>
                <div className="border-l-2 border-slate-300 pl-4 py-1">
                  <p className="text-sm">Accessed <span className="font-medium">Compliance Module</span></p>
                  <p className="text-xs text-slate-500">Jun 5, 2025 at 3:45 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModuleDashboard;
