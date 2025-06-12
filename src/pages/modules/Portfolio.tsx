import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  PieChart,
  LineChart,
  BarChart4,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

/**
 * Portfolio Analytics Module
 * Institutional-grade portfolio analytics and reporting for private credit
 */
const Portfolio = () => {
  const navigate = useNavigate();
  const { userType } = useParams();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white"
                onClick={() => navigate(`/institutional/${userType}/dashboard`)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold">Portfolio Analytics</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 px-3 py-1 rounded-full text-xs font-medium text-gray-900">
                Institutional Access
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
            <TabsTrigger value="concentration">Risk Concentration</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="reports">Reports & Documents</TabsTrigger>
          </TabsList>
          
          {/* Portfolio Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-5 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Private Credit AUM</p>
                    <p className="text-2xl font-semibold text-gray-900">$235.4M</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <PieChart className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">5.3%</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">vs. previous quarter</span>
                </div>
              </Card>
              
              <Card className="p-5 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Annualized Return</p>
                    <p className="text-2xl font-semibold text-gray-900">8.7%</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <LineChart className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">0.8%</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">vs. benchmark</span>
                </div>
              </Card>
              
              <Card className="p-5 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Credit Positions</p>
                    <p className="text-2xl font-semibold text-gray-900">27</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <BarChart4 className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center text-purple-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">new positions this quarter</span>
                </div>
              </Card>
              
              <Card className="p-5 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Weighted Avg. Duration</p>
                    <p className="text-2xl font-semibold text-gray-900">3.8 yrs</p>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center text-red-600">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">0.3 yrs</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">vs. previous quarter</span>
                </div>
              </Card>
            </div>
            
            {/* Portfolio Allocation Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Portfolio Allocation</h3>
              
              {/* This would normally be a real chart component */}
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <PieChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Portfolio Allocation Chart</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm font-medium">Project Finance</span>
                  </div>
                  <p className="text-xl font-semibold">32%</p>
                  <p className="text-xs text-gray-500">$75.3M</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium">Structured Trade</span>
                  </div>
                  <p className="text-xl font-semibold">28%</p>
                  <p className="text-xs text-gray-500">$65.9M</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm font-medium">Corp. Loans</span>
                  </div>
                  <p className="text-xl font-semibold">24%</p>
                  <p className="text-xs text-gray-500">$56.5M</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm font-medium">Mezzanine</span>
                  </div>
                  <p className="text-xl font-semibold">16%</p>
                  <p className="text-xs text-gray-500">$37.7M</p>
                </div>
              </div>
            </Card>
            
            {/* Latest Portfolio Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Portfolio Activity</h3>
              
              <div className="space-y-4">
                <div className="flex items-start p-3 border-l-4 border-green-500 bg-green-50 rounded">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">New Investment: Agricultural Processing Facility</p>
                    <p className="text-sm text-gray-600">$12.5M committed on June 5, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                  <FileText className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Term Sheet Executed: Tech Manufacturing Working Capital</p>
                    <p className="text-sm text-gray-600">$8.3M commitment signed on June 3, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 border-l-4 border-amber-500 bg-amber-50 rounded">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Covenant Monitoring Alert: Healthcare Portfolio</p>
                    <p className="text-sm text-gray-600">DSCR approaching minimum threshold - review required</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Other tabs are placeholders */}
          <TabsContent value="concentration" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Risk Concentration Analysis</h3>
              <p className="text-gray-500 mb-6">
                Analyze your private credit portfolio's concentration risk across sectors, 
                geographies, and counterparties to ensure proper diversification.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Sector Concentration</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Agriculture</span>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Manufacturing</span>
                        <span className="text-sm font-medium">22%</span>
                      </div>
                      <Progress value={22} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Healthcare</span>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                      <Progress value={18} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Technology</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Infrastructure</span>
                        <span className="text-sm font-medium">12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Other</span>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Geographic Concentration</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-600">Geographic Distribution Map</p>
                      <p className="text-sm text-gray-500 mt-1">Regional breakdown of credit exposure</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Performance Analytics</h3>
              <p className="text-gray-500">
                Detailed performance metrics for your private credit portfolio, including
                risk-adjusted returns, yield analysis, and benchmark comparisons.
              </p>
              
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mt-6">
                <div className="text-center">
                  <LineChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">This module is under development</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Reports & Documents</h3>
              <p className="text-gray-500">
                Access institutional-grade reports and documentation for your private credit portfolio.
              </p>
              
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center mt-6">
                <div className="text-center">
                  <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">This module is under development</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;
