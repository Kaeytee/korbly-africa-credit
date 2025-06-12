import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';
import { sanitizeUrlParam, isValidUrlParam } from '@/lib/urlSecurity';
import { logAuditEvent } from '@/lib/audit';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Users,
  BarChart4,
  PieChart,
  FileText,
  Clock,
  Check,
  XCircle,
  Info,
  DollarSign,
  Shield,
  AlertTriangle,
  Lock
} from 'lucide-react';

import { useSecureModule } from '@/hooks/useSecureModule';
import {usePermissions}  from '@/hooks/usePermissions';
import { Feature } from '@/lib/permissions';
import { ProtectedFeature, ProtectedFeatureGroup } from '@/components/security/ProtectedFeature';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Syndication Console Module
 * Institutional-grade tool for managing participation in syndicated loan transactions
 */
const Syndication = () => {
  const navigate = useNavigate();
  // Use the secure module hook to validate access and handle URL security
  const { isValidAccess, userType, getSecureDashboardPath } = useSecureModule('Syndication');
  // Get permission checking functions
  const { can, canAny } = usePermissions();
  const { logout } = useAuth();
  
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
              <h1 className="text-2xl font-bold">Syndication Console</h1>
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
        {/* Security indicator based on user type */}
        {userType && (
          <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded flex items-center text-sm">
            <Shield className="h-4 w-4 text-yellow-600 mr-2" />
            <div>
              <span className="font-medium">Secure Access:</span> You're accessing this module as a{' '}
              <span className="font-medium">{userType.replace('_', ' ')}</span> user.
              {can(Feature.SYNDICATION_LEAD) && (
                <span className="ml-2 text-green-700 font-medium">• Lead Syndication Access</span>
              )}
            </div>
          </div>
        )}
        
        <Tabs defaultValue="active-deals" className="w-full">
          {/* Dynamic TabsList that changes based on permissions */}
          <TabsList className="grid w-full" style={{ 
            gridTemplateColumns: `repeat(${canAny([Feature.SYNDICATION_LEAD, Feature.ADMIN_SYSTEM_CONFIG]) ? 4 : 3}, minmax(0, 1fr))` 
          }}>
            <TabsTrigger value="active-deals">Active Deals</TabsTrigger>
            <TabsTrigger value="pipeline">Deal Pipeline</TabsTrigger>
            
            {/* Only show investor groups tab for users who can participate */}
            <ProtectedFeature 
              feature={Feature.SYNDICATION_PARTICIPATE} 
              fallback={<TabsTrigger value="term-sheets">Term Sheets</TabsTrigger>}
            >
              <TabsTrigger value="investor-groups">Investor Groups</TabsTrigger>
            </ProtectedFeature>
            
            {/* Only show term sheets tab for specific user types */}
            <ProtectedFeature feature={Feature.DOCS_CREATE}>
              <TabsTrigger value="term-sheets">Term Sheets</TabsTrigger>
            </ProtectedFeature>
          </TabsList>
          
          {/* Active Deals Tab */}
          <TabsContent value="active-deals" className="mt-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-medium">Active Syndicated Transactions</h2>
                  <p className="text-sm text-gray-500">Manage your participation in active syndicated deals</p>
                </div>
                <div>
                  <ProtectedFeature feature={Feature.DOCS_VIEW}>
                    <Button variant="outline" className="mr-2">
                      <FileText className="h-4 w-4 mr-2" />
                      Export List
                    </Button>
                  </ProtectedFeature>
                  
                  <ProtectedFeatureGroup
                    features={[Feature.SYNDICATION_LEAD, Feature.SYNDICATION_PARTICIPATE]}
                    requireAll={false}
                  >
                    <Button>
                      <Users className="h-4 w-4 mr-2" />
                      View Partners
                    </Button>
                  </ProtectedFeatureGroup>
                  
                  <ProtectedFeature 
                    feature={Feature.SYNDICATION_CREATE}
                    hideCompletely={false}
                    fallback={
                      <Button variant="outline" disabled className="ml-2" title="Requires lead syndication permissions">
                        <Lock className="h-4 w-4 mr-2" />
                        Create Deal
                      </Button>
                    }
                  >
                    <Button variant="outline" className="ml-2">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Create Deal
                    </Button>
                  </ProtectedFeature>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Allocation</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Savannah Agriculture Term Facility</div>
                        <div className="text-xs text-gray-500">Lead: AfDB</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">Project Finance</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$45,000,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$8,500,000 (18.9%)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Aug 15, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Due Diligence
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">TechnoVision Working Capital</div>
                        <div className="text-xs text-gray-500">Lead: African Export-Import Bank</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">Working Capital</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$28,000,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$5,000,000 (17.9%)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jul 22, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Legal Review
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Lagos Express Infrastructure</div>
                        <div className="text-xs text-gray-500">Lead: IFC</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">Infrastructure</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$120,000,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$15,000,000 (12.5%)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 10, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Term Sheet
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Portfolio Exposure by Sector</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Sector Allocation Chart</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Deal Pipeline Tab */}
          <TabsContent value="pipeline" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Deal Pipeline & Opportunities</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Healthcare Sector Opportunity</h4>
                        <p className="text-sm text-gray-500">Pan-African Hospital Group Expansion</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">New</Badge>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Deal Size</p>
                            <p className="font-medium">$35,000,000</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Target Return</p>
                            <p className="font-medium">8.5% IRR</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Syndication Close</p>
                            <p className="font-medium">Aug 30, 2025</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Opportunity to participate in the financing of a leading healthcare provider's 
                          expansion across East Africa. The transaction is structured as a senior secured 
                          facility with comprehensive security package.
                        </p>
                      </div>
                      <div className="ml-4">
                        <ProtectedFeature 
                          feature={Feature.SYNDICATION_PARTICIPATE}
                          fallback={
                            <Button variant="outline" disabled title="Requires syndication participation permission">
                              <Lock className="h-4 w-4 mr-2" />
                              Express Interest
                            </Button>
                          }
                        >
                          <Button>
                            Express Interest
                          </Button>
                        </ProtectedFeature>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Renewable Energy Portfolio</h4>
                        <p className="text-sm text-gray-500">Solar Projects in West Africa</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">In Progress</Badge>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Deal Size</p>
                            <p className="font-medium">$75,000,000</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Target Return</p>
                            <p className="font-medium">9.2% IRR</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Syndication Close</p>
                            <p className="font-medium">Sep 15, 2025</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Financing package for a portfolio of solar energy projects across multiple 
                          West African countries. The transaction includes both senior and mezzanine 
                          tranches with partial risk guarantees.
                        </p>
                      </div>
                      <div className="ml-4">
                        <Button>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Other tabs are placeholders */}
          <TabsContent value="investor-groups" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Investor Groups & Partners</h3>
              <p className="text-gray-500">
                Manage your syndication groups and view potential co-investors for transactions.
              </p>
              
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">This module is under development</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="term-sheets" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">Term Sheet Generator</h3>
                  <p className="text-gray-500">
                    Generate institutional-grade term sheets for private credit transactions.
                  </p>
                </div>
                
                <ProtectedFeatureGroup 
                  features={[Feature.DOCS_CREATE, Feature.SYNDICATION_LEAD]} 
                  requireAll={true}
                  fallback={
                    <Button variant="outline" disabled title="Requires document creation and lead syndication permissions">
                      <FileText className="h-4 w-4 mr-2" />
                      <Lock className="h-3 w-3 mr-1" />
                      Generate Term Sheet
                    </Button>
                  }
                >
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Term Sheet
                  </Button>
                </ProtectedFeatureGroup>
              </div>
              
              <ProtectedFeature 
                feature={Feature.DOCS_CREATE}
                fallback={
                  <div className="p-4 bg-gray-50 rounded border border-gray-200">
                    <div className="flex items-center text-amber-600">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <p className="font-medium">Limited Access</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Your account type doesn't have permission to create term sheets. 
                      Contact your administrator if you need this access.
                    </p>
                  </div>
                }
              >
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Term sheet generator interface coming soon</p>
                  </div>
                </div>
              </ProtectedFeature>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Syndication;
