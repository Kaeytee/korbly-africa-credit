import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSecureModule } from '@/hooks/useSecureModule';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
 * Valuation Workbench Module
 * Institutional-grade tool for marking-to-market and scenario analysis
 */
const Valuation = () => {
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
      { date: 'Mar 2025', value: 239.5, change: -0.42 },
      { date: 'Feb 2025', value: 241.1, change: 1.25 }
    ]
  };

  // Simulated valuation run
  const runValuation = useCallback(() => {
    setLoading(true);
    // Simulate API call and processing time
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get header color based on user type for institutional branding
  const getHeaderColor = () => {
    // Use the user's actual role from AuthContext first, then fall back to URL parameter
    const effectiveUserType = user?.role || userType;
    
    if (!effectiveUserType) return 'bg-gray-900';
    
    switch (effectiveUserType) {
      case USER_TYPES.PENSION_FUND:
        return 'bg-blue-900';
      case USER_TYPES.INSURANCE:
        return 'bg-indigo-900';
      case USER_TYPES.DFI:
        return 'bg-green-900';
      case USER_TYPES.ASSET_MANAGER:
        return 'bg-purple-900';
      default:
        return 'bg-gray-900';
    }
  };

  // Get badge color based on user type
  const getBadgeColor = () => {
    if (!userType) return 'bg-purple-500';
    
    switch (userType) {
      case USER_TYPES.PENSION_FUND:
        return 'bg-blue-500';
      case USER_TYPES.INSURANCE:
        return 'bg-indigo-500';
      case USER_TYPES.DFI:
        return 'bg-green-500';
      case USER_TYPES.ASSET_MANAGER:
        return 'bg-purple-500';
      default:
        return 'bg-purple-500';
    }
  };

  // Get organization icon based on user type
  const getOrgIcon = () => {
    if (!userType) return <Calculator className="h-5 w-5" />;
    
    switch (userType) {
      case USER_TYPES.PENSION_FUND:
        return <Landmark className="h-5 w-5" />;
      case USER_TYPES.INSURANCE:
        return <Shield className="h-5 w-5" />;
      default:
        return <Calculator className="h-5 w-5" />;
    }
  };

  const headerColor = getHeaderColor();
  const badgeColor = getBadgeColor();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`${headerColor} text-white px-6 py-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white"
                onClick={() => {
                  const dashboardPath = getSecureDashboardPath();
                  console.log(`[Navigation] Returning to dashboard: ${dashboardPath}`);
                  navigate(dashboardPath);
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold">Valuation Workbench</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${badgeColor.replace('bg-', 'bg-opacity-80 bg-')} flex items-center justify-center`}>
                  {getOrgIcon()}
                </div>
                <span className="text-sm hidden md:inline">{user?.organization || 'Institutional User'}</span>
              </div>
              <div className={`${badgeColor} px-3 py-1 rounded-full text-xs font-medium`}>
                Institutional Access
              </div>
              <Button
                variant="destructive"
                onClick={logout}
                className="ml-2"
                size="sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="p-4 bg-white shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <Calculator className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Portfolio Value</p>
                <p className="text-xl font-semibold text-gray-900">{valuationMetrics.portfolioValue}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-white shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Weighted Yield</p>
                <p className="text-xl font-semibold text-green-600">{valuationMetrics.weightedYield}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-white shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Weighted Duration</p>
                <p className="text-xl font-semibold text-gray-900">{valuationMetrics.weightedDuration}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-white shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                <CalendarDays className="h-5 w-5 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Last Valuation</p>
                <p className="text-xl font-semibold text-gray-900">{valuationMetrics.lastValuationDate}</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="mark-to-market" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-2">
            <TabsTrigger value="mark-to-market">Mark-to-Market</TabsTrigger>
            <TabsTrigger value="scenario-analysis">Scenario Analysis</TabsTrigger>
            <TabsTrigger value="reporting">Valuation Reports</TabsTrigger>
          </TabsList>
          
          {/* Mark-to-Market Tab */}
          <TabsContent value="mark-to-market" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 col-span-1 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Valuation Parameters</h3>
                  <Badge variant="outline" className="text-xs bg-blue-50">
                    Institutional
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="valuation-date">Valuation Date</Label>
                    <Input 
                      id="valuation-date" 
                      type="date" 
                      defaultValue="2025-06-12"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="pricing-method">Pricing Method</Label>
                    <select 
                      id="pricing-method"
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm mt-1"
                    >
                      {settings.allowedMethods.includes('dcf') && <option value="dcf">Discounted Cash Flow</option>}
                      {settings.allowedMethods.includes('comparable') && <option value="comparable">Comparable Securities</option>}
                      {settings.allowedMethods.includes('market') && <option value="market">Market Approach</option>}
                      {settings.allowedMethods.includes('option') && <option value="option">Option-Adjusted Spread</option>}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="discount-rate">Discount Rate (bps)</Label>
                    <Input 
                      id="discount-rate" 
                      type="number" 
                      defaultValue={settings.defaultRate}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="add-stress">Stress Test (%)</Label>
                    <Input 
                      id="add-stress" 
                      type="number" 
                      defaultValue={2.5}
                      className="mt-1"
                    />
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <button
                      type="button"
                      onClick={() => toggleSection('assetClasses')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="font-medium">Asset Classes</span>
                      {expandedSections.assetClasses ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.assetClasses && (
                      <div className="pl-2 mt-2 space-y-2">
                        <div className="flex items-center">
                          <Checkbox id="corporate-bonds" defaultChecked />
                          <Label htmlFor="corporate-bonds" className="ml-2">Corporate Bonds</Label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="sovereign-debt" defaultChecked />
                          <Label htmlFor="sovereign-debt" className="ml-2">Sovereign Debt</Label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="private-credit" defaultChecked />
                          <Label htmlFor="private-credit" className="ml-2">Private Credit</Label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="structured" defaultChecked />
                          <Label htmlFor="structured" className="ml-2">Structured Products</Label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <button
                      type="button"
                      onClick={() => toggleSection('yieldCurve')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="font-medium">Yield Curve</span>
                      {expandedSections.yieldCurve ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.yieldCurve && (
                      <div className="mt-2 space-y-2">
                        <div>
                          <Label htmlFor="curve-type" className="text-sm">Curve Type</Label>
                          <select 
                            id="curve-type"
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm mt-1"
                          >
                            <option value="treasury">Treasury Curve</option>
                            <option value="swap">Swap Curve</option>
                            <option value="ois">OIS Curve</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={runValuation}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : 'Run Valuation'}
                  </Button>
                </div>
              </Card>
              
              <Card className="p-6 col-span-2 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Valuation Results</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                {/* Portfolio composition */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Portfolio Composition</h4>
                    <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden">
                      {valuationMetrics.assetClasses.map((assetClass, i) => (
                        <div 
                          key={i} 
                          className={`h-full ${assetClass.color} inline-block`}
                          style={{ width: `${assetClass.value}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {valuationMetrics.assetClasses.map((assetClass, i) => (
                        <div key={i} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${assetClass.color} mr-1`} />
                          <span className="text-xs">{assetClass.name} ({assetClass.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-64 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">Portfolio Value Distribution</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-white border">
                      <p className="text-sm text-gray-600 mb-1">Current Net Value</p>
                      <p className="text-xl font-bold">$236.92M</p>
                      <p className="text-sm text-red-500 flex items-center">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        -1.49% from last valuation
                      </p>
                    </Card>
                    <Card className="p-4 bg-white border">
                      <p className="text-sm text-gray-600 mb-1">Stress Tested Value</p>
                      <p className="text-xl font-bold">$230.91M</p>
                      <p className="text-sm text-amber-500 flex items-center">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        -4.00% from current value
                      </p>
                    </Card>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Historical Valuation</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value ($M)</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {valuationMetrics.historicalChanges.map((item, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{item.value.toFixed(1)}</td>
                              <td className={`px-3 py-2 whitespace-nowrap text-sm ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          {/* Scenario Analysis Tab */}
          <TabsContent value="scenario-analysis" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="p-6 lg:col-span-1 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Scenario Parameters</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="scenario-name">Scenario Name</Label>
                    <Input 
                      id="scenario-name" 
                      placeholder="e.g., Interest Rate Spike Q3 2025"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="scenario-type">Scenario Type</Label>
                    <select 
                      id="scenario-type"
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm mt-1"
                    >
                      <option value="interest_rate">Interest Rate Shock</option>
                      <option value="credit_spread">Credit Spread Widening</option>
                      <option value="default">Default Wave</option>
                      <option value="liquidity">Liquidity Crisis</option>
                      <option value="custom">Custom Scenario</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="severity">Severity (%)</Label>
                    <Input 
                      id="severity" 
                      type="number" 
                      defaultValue={10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time-horizon">Time Horizon (months)</Label>
                    <Input 
                      id="time-horizon" 
                      type="number" 
                      defaultValue={12}
                      className="mt-1"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <button
                      type="button"
                      onClick={() => toggleSection('riskFactors')}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="font-medium">Risk Factors</span>
                      {expandedSections.riskFactors ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.riskFactors && (
                      <div className="pl-2 mt-2 space-y-2">
                        <div>
                          <Label htmlFor="interest-shock" className="text-sm">Interest Rate Shock (bps)</Label>
                          <Input 
                            id="interest-shock" 
                            type="number" 
                            defaultValue={150}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="credit-widening" className="text-sm">Credit Spread Widening (bps)</Label>
                          <Input 
                            id="credit-widening" 
                            type="number" 
                            defaultValue={200}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="default-rate" className="text-sm">Default Rate (%)</Label>
                          <Input 
                            id="default-rate" 
                            type="number" 
                            defaultValue={3.5}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 flex flex-col space-y-2">
                    <Button>Run Simulation</Button>
                    <Button variant="outline">Save Scenario</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 lg:col-span-3 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Scenario Results</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50">Pre-configured</Badge>
                    <Button variant="outline" size="sm">
                      Load Saved Scenarios
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {settings.defaultScenarios.map((scenario, idx) => (
                    <Card key={idx} className="p-4 bg-white border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{scenario}</h4>
                          <p className="text-sm text-gray-500">Horizon: 12 months</p>
                        </div>
                        <Badge className={idx === 0 ? 'bg-green-100 text-green-800' : idx === 1 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}>
                          {idx === 0 ? 'Low Impact' : idx === 1 ? 'Medium Impact' : 'High Impact'}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Expected portfolio value</p>
                        <p className="text-xl font-bold">${idx === 0 ? '235.6M' : idx === 1 ? '217.2M' : '250.1M'}</p>
                        <p className={`text-sm ${idx === 0 ? 'text-red-500' : idx === 1 ? 'text-red-500' : 'text-green-600'} flex items-center`}>
                          {idx === 0 ? <ChevronDown className="h-3 w-3 mr-1" /> : idx === 1 ? <ChevronDown className="h-3 w-3 mr-1" /> : <ChevronUp className="h-3 w-3 mr-1" />}
                          {idx === 0 ? '-2.0%' : idx === 1 ? '-10.7%' : '+3.9%'}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="h-64 bg-gray-50 rounded border border-gray-200 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <LineChart className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Scenario Comparison Chart</p>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Stress Test Warning</h4>
                    <p className="text-sm text-amber-700">
                      Under the severe scenario, portfolio value declines below risk tolerance threshold (-10%). 
                      Consider adjusting allocation to reduce exposure to affected sectors.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          {/* Reporting Tab */}
          <TabsContent value="reporting" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="p-6 lg:col-span-1 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Report Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-type">Report Type</Label>
                    <select 
                      id="report-type"
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm mt-1"
                    >
                      <option value="monthly">Monthly Valuation</option>
                      <option value="quarterly">Quarterly Analysis</option>
                      <option value="annual">Annual Review</option>
                      <option value="custom">Custom Report</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="report-date-range">Date Range</Label>
                    <select 
                      id="report-date-range"
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm mt-1"
                    >
                      <option value="june-2025">June 2025</option>
                      <option value="q2-2025">Q2 2025</option>
                      <option value="h1-2025">H1 2025</option>
                      <option value="ytd-2025">YTD 2025</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="report-format">Format</Label>
                    <select 
                      id="report-format"
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm mt-1"
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="excel">Excel Spreadsheet</option>
                      <option value="web">Web Dashboard</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Report Content</Label>
                    <div className="space-y-1.5">
                      <div className="flex items-center">
                        <Checkbox id="include-summary" defaultChecked />
                        <Label htmlFor="include-summary" className="ml-2 text-sm">Executive Summary</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="include-details" defaultChecked />
                        <Label htmlFor="include-details" className="ml-2 text-sm">Detailed Analysis</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="include-charts" defaultChecked />
                        <Label htmlFor="include-charts" className="ml-2 text-sm">Charts & Graphs</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="include-raw" />
                        <Label htmlFor="include-raw" className="ml-2 text-sm">Raw Data Tables</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="include-appendix" />
                        <Label htmlFor="include-appendix" className="ml-2 text-sm">Technical Appendix</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">Generate Report</Button>
                </div>
              </Card>
              
              <Card className="p-6 lg:col-span-3 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Valuation Reports</h3>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate New Report
                  </Button>
                </div>
                
                <div className="overflow-hidden bg-white border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { name: 'June 2025 Monthly Valuation', date: '12 June 2025', type: 'Monthly', format: 'PDF' },
                        { name: 'Q1 2025 Quarterly Report', date: '15 April 2025', type: 'Quarterly', format: 'Excel' },
                        { name: 'Year-End 2024 Valuation', date: '22 January 2025', type: 'Annual', format: 'PDF' },
                        { name: 'October 2024 Monthly Valuation', date: '10 November 2024', type: 'Monthly', format: 'PDF' },
                        { name: 'Stress Test Scenario Analysis', date: '05 May 2025', type: 'Custom', format: 'Web' }
                      ].map((report, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Badge variant="outline" className={
                              report.type === 'Monthly' ? 'bg-blue-50 text-blue-800' :
                              report.type === 'Quarterly' ? 'bg-purple-50 text-purple-800' :
                              report.type === 'Annual' ? 'bg-green-50 text-green-800' :
                              'bg-amber-50 text-amber-800'
                            }>
                              {report.type}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.format}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded p-4 flex items-start mt-4">
              <Information className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800">Regulatory Compliance Notice</h4>
                <p className="text-sm text-blue-700">
                  All valuation reports meet IFRS 9, IAS 39, and local regulatory requirements. 
                  Reports are automatically archived for 7 years in compliance with record retention policies.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Component for Checkbox since it wasn't imported
const Checkbox = ({ id, defaultChecked }: { id: string, defaultChecked?: boolean }) => {
  return (
    <div className="h-4 w-4 rounded border border-gray-300 flex items-center justify-center bg-white">
      {defaultChecked && <Check className="h-3 w-3 text-blue-600" />}
    </div>
  );
};

// Component for Information icon
const Information = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
};

// Component for Shield icon
const Shield = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
};

export default Valuation;
