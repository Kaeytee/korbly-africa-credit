import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSecureModule } from '@/hooks/useSecureModule';
import ModuleLayout from '@/components/layout/ModuleLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { USER_TYPES } from '@/lib/constants';
import { 
  ArrowLeft,
  BarChart3, 
  LineChart, 
  PieChart,
  Calculator,
  TrendingUp,
  FileText,
  Scale,
  Activity,
  Clock,
  Download,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Check,
  ChevronsUpDown,
  Ban,
  CalendarDays,
  Landmark
} from 'lucide-react';

/**
 * Valuation Workbench Module - Enhanced Version
 * Institutional-grade tool for marking-to-market and scenario analysis
 */
const EnhancedValuation = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('mark-to-market');
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    assetClasses: true,
    yieldCurve: false,
    riskFactors: false
  });
  
  // Use the secure module hook for access validation with proper error handling
  const { isValidAccess, userType, getSecureDashboardPath } = useSecureModule('Valuation');
  
  // Valuation settings based on user type
  const getValuationSettings = () => {
    if (!userType) {
      return {
        defaultRate: 550,
        defaultScenarios: ['Baseline', 'Stress Test', 'Recovery'],
        allowedMethods: ['dcf', 'comparable', 'market', 'option']
      };
    }
    
    switch (userType) {
      case USER_TYPES.PENSION_FUND:
        return {
          defaultRate: 450,
          defaultScenarios: ['Conservative', 'Moderate', 'Aggressive'],
          allowedMethods: ['dcf', 'comparable', 'market']
        };
      case USER_TYPES.INSURANCE:
        return {
          defaultRate: 475,
          defaultScenarios: ['Regulatory', 'Economic', 'Catastrophic'],
          allowedMethods: ['dcf', 'market', 'option']
        };
      default:
        return {
          defaultRate: 550,
          defaultScenarios: ['Baseline', 'Stress Test', 'Recovery'],
          allowedMethods: ['dcf', 'comparable', 'market', 'option']
        };
    }
  };

  // Calculate settings based on user type
  const settings = getValuationSettings();
  
  const valuationMetrics = {
    portfolioValue: '$240.5M',
    weightedYield: '9.8%',
    weightedDuration: '3.2 years',
    lastValuationDate: '10 June 2025',
    assetClasses: [
      { name: 'Corporate Bonds', value: 45, color: 'bg-blue-500' },
      { name: 'Sovereign Debt', value: 25, color: 'bg-green-500' },
      { name: 'Private Credit', value: 20, color: 'bg-purple-500' },
      { name: 'Structured Products', value: 10, color: 'bg-amber-500' }
    ],
    historicalChanges: [
      { date: 'May 2025', value: 238.2, change: -0.95 },
      { date: 'Apr 2025', value: 242.6, change: 0.87 },
      { date: 'Mar 2025', value: 240.5, change: 1.21 },
      { date: 'Feb 2025', value: 237.6, change: 0.42 },
      { date: 'Jan 2025', value: 236.6, change: -0.63 }
    ]
  };
  
  const handleBackClick = () => {
    const dashboardPath = getSecureDashboardPath();
    console.log(`[NAVIGATION] Navigating back to: ${dashboardPath}`);
    navigate(dashboardPath);
  };
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Get the appropriate header color based on user type
  const getHeaderColorByUserType = () => {
    // First check if we have a valid userType from the secure module
    if (userType) {
      switch(userType) {
        case USER_TYPES.PENSION_FUND:
          return 'bg-blue-700';
        case USER_TYPES.INSURANCE:
          return 'bg-emerald-700';
        case USER_TYPES.DFI:
          return 'bg-purple-700';
        case USER_TYPES.ASSET_MANAGER:
          return 'bg-indigo-700';
        case USER_TYPES.SOVEREIGN_FUND:
          return 'bg-amber-700';
        case USER_TYPES.ADMIN:
          return 'bg-slate-700';
        default:
          return 'bg-blue-700';
      }
    }
    
    // Fallback to check from auth context if secure module didn't provide a userType
    if (user?.role) {
      switch(user.role) {
        case USER_TYPES.PENSION_FUND:
          return 'bg-blue-700';
        case USER_TYPES.INSURANCE:
          return 'bg-emerald-700';
        case USER_TYPES.DFI:
          return 'bg-purple-700';
        case USER_TYPES.ASSET_MANAGER:
          return 'bg-indigo-700';
        case USER_TYPES.SOVEREIGN_FUND:
          return 'bg-amber-700';
        case USER_TYPES.ADMIN:
          return 'bg-slate-700';
        default:
          return 'bg-blue-700';
      }
    }
    
    return 'bg-blue-700'; // Default color
  };
  
  if (!isValidAccess) {
    // Access validation will redirect if needed
    return null;
  }

  return (
    <ModuleLayout moduleName="EnhancedValuation">
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-2"
              onClick={handleBackClick}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Valuation Workbench</h1>
            <p className="text-slate-500">Analyze and manage your portfolio valuations</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="flex gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="flex gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>
        </div>
        
        <Separator />
        
        {/* Portfolio valuation overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Portfolio Value</CardDescription>
              <CardTitle className="text-2xl">{valuationMetrics.portfolioValue}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
                <span className="text-emerald-500 font-medium">+2.3%</span>
                <span className="text-slate-500 ml-1">since last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Weighted Yield</CardDescription>
              <CardTitle className="text-2xl">{valuationMetrics.weightedYield}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
                <span className="text-emerald-500 font-medium">+0.2%</span>
                <span className="text-slate-500 ml-1">since last valuation</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Weighted Duration</CardDescription>
              <CardTitle className="text-2xl">{valuationMetrics.weightedDuration}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-blue-500" />
                <span className="text-slate-500">Updated daily</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Last Valuation</CardDescription>
              <CardTitle className="text-2xl">{valuationMetrics.lastValuationDate}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <CalendarDays className="h-4 w-4 mr-1 text-slate-500" />
                <span className="text-slate-500">2 days ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for different valuation features */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="mark-to-market">Mark-to-Market</TabsTrigger>
            <TabsTrigger value="scenario-analysis">Scenario Analysis</TabsTrigger>
            <TabsTrigger value="risk-metrics">Risk Metrics</TabsTrigger>
            <TabsTrigger value="historical">Historical Valuations</TabsTrigger>
          </TabsList>
          
          {/* Mark-to-Market tab content */}
          <TabsContent value="mark-to-market" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Asset Class Breakdown</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleSection('assetClasses')}
                  >
                    {expandedSections.assetClasses ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              
              {expandedSections.assetClasses && (
                <CardContent>
                  <div className="space-y-2">
                    {valuationMetrics.assetClasses.map((asset, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{asset.name}</span>
                          <span className="font-medium">{asset.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${asset.color}`} 
                            style={{ width: `${asset.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Asset Class Adjustment</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="asset-class">Asset Class</Label>
                        <select 
                          id="asset-class" 
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                        >
                          <option>Corporate Bonds</option>
                          <option>Sovereign Debt</option>
                          <option>Private Credit</option>
                          <option>Structured Products</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="allocation">Target Allocation (%)</Label>
                        <Input id="allocation" type="number" defaultValue="45" />
                      </div>
                    </div>
                    <Button size="sm" className="mt-4">Apply Changes</Button>
                  </div>
                </CardContent>
              )}
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Yield Curve Analysis</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleSection('yieldCurve')}
                    >
                      {expandedSections.yieldCurve ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                
                {expandedSections.yieldCurve && (
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                      <div className="text-center">
                        <LineChart className="h-16 w-16 mx-auto text-slate-300" />
                        <p className="text-sm text-slate-500 mt-2">Yield curve visualization will appear here</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge>3-Month: 5.2%</Badge>
                      <Badge>1-Year: 5.8%</Badge>
                      <Badge>2-Year: 6.1%</Badge>
                      <Badge>5-Year: 6.5%</Badge>
                      <Badge>10-Year: 6.8%</Badge>
                    </div>
                  </CardContent>
                )}
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Risk Factor Sensitivity</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleSection('riskFactors')}
                    >
                      {expandedSections.riskFactors ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                
                {expandedSections.riskFactors && (
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Interest Rate Sensitivity</span>
                        <Badge variant="outline">Medium</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Credit Spread Risk</span>
                        <Badge variant="outline">High</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Liquidity Risk</span>
                        <Badge variant="outline">Medium</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Currency Risk</span>
                        <Badge variant="outline">Low</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Inflation Risk</span>
                        <Badge variant="outline">Medium-High</Badge>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>
          
          {/* Other tabs would be implemented similarly */}
          <TabsContent value="scenario-analysis">
            <Card>
              <CardHeader>
                <CardTitle>Scenario Analysis</CardTitle>
                <CardDescription>
                  Model different economic scenarios and their impact on your portfolio valuation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                  <div className="text-center">
                    <Calculator className="h-16 w-16 mx-auto text-slate-300" />
                    <p className="text-sm text-slate-500 mt-2">Scenario analysis tools will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risk-metrics">
            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
                <CardDescription>
                  Comprehensive risk analysis for your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                  <div className="text-center">
                    <Activity className="h-16 w-16 mx-auto text-slate-300" />
                    <p className="text-sm text-slate-500 mt-2">Risk metrics visualization will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="historical">
            <Card>
              <CardHeader>
                <CardTitle>Historical Valuations</CardTitle>
                <CardDescription>
                  Track your portfolio's performance over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Value (USD)</th>
                        <th className="text-left py-3 px-4">Change (%)</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {valuationMetrics.historicalChanges.map((item, i) => (
                        <tr key={i} className="border-b hover:bg-slate-50">
                          <td className="py-3 px-4">{item.date}</td>
                          <td className="py-3 px-4">${item.value}M</td>
                          <td className={`py-3 px-4 ${item.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {item.change >= 0 ? '+' : ''}{item.change}%
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                              <Check className="h-3 w-3 mr-1" /> Finalized
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" size="sm">Previous</Button>
                <div className="text-sm text-slate-500">Page 1 of 4</div>
                <Button variant="outline" size="sm">Next</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ModuleLayout>
  );
};

export default EnhancedValuation;
