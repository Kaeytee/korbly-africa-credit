import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  ArrowLeft, 
  BarChart, 
  PieChart, 
  FileText,
  AlertCircle,
  Download,
  Upload,
  Scale,
  Shield
} from 'lucide-react';

import { useSecureModule } from '@/hooks/useSecureModule';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Credit Risk Engine Module
 * Institutional-grade tool for analyzing and pricing private credit deals
 */
const CreditEngine = () => {
  const navigate = useNavigate();
  // Use secure module hook to validate access and get validated user type
  const { isValidAccess, userType, getSecureDashboardPath } = useSecureModule('CreditEngine');
  const [activeTab, setActiveTab] = useState('risk-analysis');
  const { logout } = useAuth();

  // In a real implementation, we would likely fetch specific settings
  // and models based on the institutional user type
  const getRiskModelParams = () => {
    // Handle undefined or invalid user types securely
    if (!userType) {
      return { 
        defaultSpread: 450, // default basis points
        minAcceptableRating: 'B+',
        maxConcentration: 5 // percent
      };
    }
    
    switch (userType) {
      case USER_TYPES.PENSION_FUND:
        return { 
          defaultSpread: 450, // basis points
          minAcceptableRating: 'B+',
          maxConcentration: 5 // percent
        };
      case USER_TYPES.INSURANCE:
        return { 
          defaultSpread: 400,
          minAcceptableRating: 'BB-',
          maxConcentration: 3
        };
      case USER_TYPES.DFI:
        return { 
          defaultSpread: 500,
          minAcceptableRating: 'B',
          maxConcentration: 7
        };
      default:
        return { 
          defaultSpread: 450,
          minAcceptableRating: 'B+',
          maxConcentration: 5
        };
    }
  };

  const riskParams = getRiskModelParams();
  
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
                onClick={() => navigate(getSecureDashboardPath())}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold">Credit Risk Engine</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 px-3 py-1 rounded-full text-xs font-medium text-gray-900">
                Institutional Access
              </div>
              {/* Logout Button */}
              <Button
                variant="destructive"
                onClick={logout}
                className="ml-4"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="risk-analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
            <TabsTrigger value="pricing">Deal Pricing</TabsTrigger>
            <TabsTrigger value="covenant-builder">Covenant Builder</TabsTrigger>
          </TabsList>
          
          {/* Risk Analysis Tab */}
          <TabsContent value="risk-analysis" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Model Configuration */}
              <Card className="p-6 col-span-1">
                <h3 className="text-lg font-medium mb-4">Risk Model Parameters</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="industry">Industry Sector</Label>
                    <select 
                      id="industry" 
                      className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option>Agriculture</option>
                      <option>Manufacturing</option>
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Energy</option>
                      <option>Financial Services</option>
                      <option>Retail & Consumer</option>
                      <option>Infrastructure</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="loan-size">Loan Size (USD)</Label>
                    <Input 
                      id="loan-size" 
                      type="number" 
                      defaultValue="5000000" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tenor">Tenor (Years)</Label>
                    <Input 
                      id="tenor" 
                      type="number" 
                      defaultValue="5" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="collateral">Collateral Coverage (%)</Label>
                    <Input 
                      id="collateral" 
                      type="number" 
                      defaultValue="120" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="debt-service">Debt Service Coverage Ratio</Label>
                    <Input 
                      id="debt-service" 
                      type="number" 
                      defaultValue="1.35" 
                    />
                  </div>

                  <Button className="w-full mt-2">
                    Run Risk Analysis
                  </Button>
                </div>
              </Card>
              
              {/* Risk Output */}
              <Card className="p-6 col-span-2">
                <h3 className="text-lg font-medium mb-4">Risk Assessment Output</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Internal Rating</p>
                    <p className="text-2xl font-bold">BB-</p>
                    <p className="text-xs text-gray-500 mt-1">Medium-Low Risk</p>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Default Probability</p>
                    <p className="text-2xl font-bold">3.5%</p>
                    <p className="text-xs text-gray-500 mt-1">5-Year Cumulative</p>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Loss Given Default</p>
                    <p className="text-2xl font-bold">35%</p>
                    <p className="text-xs text-gray-500 mt-1">With Recovery</p>
                  </div>
                </div>
                
                {/* Risk Chart Placeholder */}
                <div className="h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Risk Distribution Chart</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Risk Assessment Summary</h4>
                      <p className="text-sm text-gray-500">Based on institutional risk model parameters</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Scale className="h-4 w-4 mr-2" />
                        Run Scenario
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mr-3 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-blue-800">Risk Analysis Recommendation</h5>
                        <p className="text-sm text-blue-700 mt-1">
                          This transaction meets minimum risk parameters for {userType} investors, with appropriate 
                          mitigating factors for the identified sector risks. Recommended spread: 
                          {riskParams.defaultSpread} bps over reference rate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          {/* Deal Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Deal Pricing Calculator</h3>
              <p className="text-gray-500 mb-6">
                The pricing module allows institutional investors to calculate appropriate 
                pricing for private credit transactions based on risk parameters.
              </p>
              
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">This module is under development</p>
                  <p className="text-sm text-gray-500 mt-1">Coming July 2025</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Covenant Builder Tab */}
          <TabsContent value="covenant-builder" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Covenant Structure Builder</h3>
              <p className="text-gray-500 mb-6">
                Design appropriate covenant structures for private credit transactions based on
                risk profile and institutional requirements.
              </p>
              
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">This module is under development</p>
                  <p className="text-sm text-gray-500 mt-1">Coming August 2025</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreditEngine;
