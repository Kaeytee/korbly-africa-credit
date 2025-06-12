
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { USER_TYPES, SECURE_ROUTES } from "@/lib/constants";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import NewDashboard from "./pages/NewDashboard";
import NotFound from "./pages/NotFound";
import SmeDashboard from "./pages/SmeDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";

// Import institutional dashboard pages
import InstitutionalPensionDashboard from "./pages/institutional/PensionDashboard";
import EnhancedPensionDashboard from "./pages/institutional/EnhancedPensionDashboard";
import InstitutionalInsuranceDashboard from "./pages/institutional/InsuranceDashboard";
import EnhancedInsuranceDashboard from "./pages/institutional/EnhancedInsuranceDashboard";
import InstitutionalDfiDashboard from "./pages/institutional/DfiDashboard";
import InstitutionalAssetManagerDashboard from "./pages/institutional/AssetManagerDashboard";
import InstitutionalSovereignDashboard from "./pages/institutional/SovereignDashboard";
import WealthDashboard from "./pages/institutional/WealthDashboard";
import IssuerDashboard from "./pages/institutional/IssuerDashboard";
import AdminDashboard from "./pages/institutional/AdminDashboard";
import RegulatorDashboard from "./pages/institutional/RegulatorDashboard";

// Import institutional module pages
import CreditEngine from "./pages/modules/CreditEngine";
import Syndication from "./pages/modules/Syndication";
import Valuation from "./pages/modules/Valuation";
import EnhancedValuation from "./pages/modules/EnhancedValuation";
import Documentation from "./pages/modules/Documentation";
import Portfolio from "./pages/modules/Portfolio";
import Compliance from "./pages/modules/Compliance";

const queryClient = new QueryClient();

import { isRoutePermittedForUserType, isModulePermittedForUserType, logSecurityEvent } from '@/lib/security';

// Protected Route HOC with enhanced security checks
const ProtectedRoute = ({ children, requiredUserType = null }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = window.location.pathname;
  
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading security context...</div>;
  }
  
  if (!isAuthenticated) {
    // Log unauthorized access attempt
    logSecurityEvent('access', 'anonymous', { 
      attemptedRoute: location,
      status: 'rejected',
      reason: 'not_authenticated'
    });
    return <Navigate to="/login" replace />;
  }
  
  // If a specific user type is required, check it
  if (requiredUserType && user?.role !== requiredUserType) {
    // Log unauthorized access attempt for security audit
    logSecurityEvent('authorization', user?.email || 'unknown', {
      attemptedRoute: location,
      requiredUserType: requiredUserType,
      actualUserType: user?.role,
      status: 'rejected',
      reason: 'insufficient_permissions'
    });
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Additional security check: validate if this route is allowed for the user type
  const isModuleRoute = location.includes('/institutional/') && 
    (location.includes(SECURE_ROUTES.MODULES.CREDIT_ENGINE) || 
     location.includes(SECURE_ROUTES.MODULES.SYNDICATION) || 
     location.includes(SECURE_ROUTES.MODULES.VALUATION) ||
     location.includes(SECURE_ROUTES.MODULES.DOCUMENTATION) ||
     location.includes(SECURE_ROUTES.MODULES.PORTFOLIO) ||
     location.includes(SECURE_ROUTES.MODULES.COMPLIANCE));
  
  if (isModuleRoute && !isModulePermittedForUserType(location, user?.role)) {
    // Log unauthorized module access attempt
    logSecurityEvent('authorization', user?.email || 'unknown', {
      attemptedModule: location,
      userType: user?.role,
      status: 'rejected',
      reason: 'module_not_permitted'
    });
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Log successful access for audit trail
  logSecurityEvent('access', user?.email || 'unknown', {
    route: location,
    userType: user?.role,
    status: 'granted'
  });
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Professional Dashboard with sidebar and navbar */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <NewDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Legacy Dashboard - Kept for reference */}
            <Route 
              path="/dashboard/legacy" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* SME and Basic Investor Routes */}
            <Route 
              path="/sme/dashboard" 
              element={
                <ProtectedRoute>
                  <SmeDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/investor/dashboard" 
              element={
                <ProtectedRoute>
                  <InvestorDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Institutional Dashboard Routes - Secured by user type */}
            <Route 
              path={SECURE_ROUTES.DASHBOARD[USER_TYPES.PENSION_FUND]} 
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.PENSION_FUND}>
                  <InstitutionalPensionDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={`${SECURE_ROUTES.DASHBOARD[USER_TYPES.PENSION_FUND]}/enhanced`}
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.PENSION_FUND}>
                  <EnhancedPensionDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={SECURE_ROUTES.DASHBOARD[USER_TYPES.INSURANCE]} 
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.INSURANCE}>
                  <InstitutionalInsuranceDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={`${SECURE_ROUTES.DASHBOARD[USER_TYPES.INSURANCE]}/enhanced`}
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.INSURANCE}>
                  <EnhancedInsuranceDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={SECURE_ROUTES.DASHBOARD[USER_TYPES.DFI]} 
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.DFI}>
                  <InstitutionalDfiDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={SECURE_ROUTES.DASHBOARD[USER_TYPES.ASSET_MANAGER]} 
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.ASSET_MANAGER}>
                  <InstitutionalAssetManagerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={SECURE_ROUTES.DASHBOARD[USER_TYPES.SOVEREIGN_FUND]} 
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.SOVEREIGN_FUND}>
                  <InstitutionalSovereignDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={SECURE_ROUTES.DASHBOARD[USER_TYPES.HNWI]} 
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.HNWI}>
                  <WealthDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={SECURE_ROUTES.DASHBOARD[USER_TYPES.INSTITUTIONAL_BORROWER]} 
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.INSTITUTIONAL_BORROWER}>
                  <IssuerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={SECURE_ROUTES.DASHBOARD[USER_TYPES.ADMIN]} 
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.ADMIN}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={SECURE_ROUTES.DASHBOARD[USER_TYPES.REGULATOR]} 
              element={
                <ProtectedRoute requiredUserType={USER_TYPES.REGULATOR}>
                  <RegulatorDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Module Routes - Used by different institutional dashboards */}
            <Route path="/institutional/:userType/credit-engine" element={<ProtectedRoute><CreditEngine /></ProtectedRoute>} />
            <Route path="/institutional/:userType/syndication" element={<ProtectedRoute><Syndication /></ProtectedRoute>} />
            <Route path="/institutional/:userType/valuation" element={<ProtectedRoute><Valuation /></ProtectedRoute>} />
            {/* Enhanced Valuation Module with Pro Dashboard */}
            <Route path="/institutional/:userType/enhanced-valuation" element={<ProtectedRoute><EnhancedValuation /></ProtectedRoute>} />
            <Route path="/institutional/:userType/documentation" element={<ProtectedRoute><Documentation /></ProtectedRoute>} />
            <Route path="/institutional/:userType/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
            <Route path="/institutional/:userType/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />
            
            {/* Unauthorized Access Page */}
            <Route path="/unauthorized" element={<div className="h-screen flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold mb-2">Unauthorized Access</h1>
              <p className="text-gray-600 mb-4">You do not have permission to access this resource.</p>
              <button 
                onClick={() => window.location.href = '/login'} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Return to Login
              </button>
            </div>} />
            
            {/* Catch-all - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
