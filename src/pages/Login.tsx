import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  Shield, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle, 
  Globe, 
  Star, 
  Loader2,
  Building2,
  Zap,
  BarChart3,
  UserPlus,
  HelpCircle,
  ChevronRight,
  FileText,
  Landmark
} from 'lucide-react';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';
import { createSession } from '@/lib/session';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    verificationCode: '' // For 2FA
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');

  // Enhanced security: Determine user type from institutional email domain
  const determineUserType = (email: string): string => {
    // Map institutional email domains to user types for enhanced security
    if (email.includes('pension') || email.endsWith('.pf.gov') || email.endsWith('.pensionfund.com')) {
      return USER_TYPES.PENSION_FUND;
    } else if (email.includes('insur') || email.endsWith('.ins.gov') || email.endsWith('.insurance.com')) {
      return USER_TYPES.INSURANCE;
    } else if (email.includes('dfi') || email.includes('development') || email.endsWith('.dfi.org')) {
      return USER_TYPES.DFI;
    } else if (email.includes('asset') || email.includes('fund') || email.endsWith('.am.com')) {
      return USER_TYPES.ASSET_MANAGER;
    } else if (email.includes('sovereign') || email.includes('swf') || email.endsWith('.swf.gov')) {
      return USER_TYPES.SOVEREIGN_FUND;
    } else if (email.includes('hnwi') || email.includes('wealth') || email.endsWith('.wealth.com')) {
      return USER_TYPES.HNWI;
    } else if (email.includes('issuer') || email.includes('borrower') || email.endsWith('.corp.com')) {
      return USER_TYPES.INSTITUTIONAL_BORROWER;
    } else if (email.includes('admin') || email.includes('korbly.internal')) {
      return USER_TYPES.ADMIN;
    } else if (email.includes('regulator') || email.endsWith('.gov') || email.endsWith('.reg.org')) {
      return USER_TYPES.REGULATOR;
    }
    
    // Default to institutional borrower if no match
    return USER_TYPES.INSTITUTIONAL_BORROWER;
  };

  // Handle initial login step
  const handleCredentialsSubmit = async () => {
    setIsLoading(true);
    setLoginError('');
    
    // Validate institutional email format
    if (!validateInstitutionalEmail(formData.email)) {
      setLoginError('Please enter a valid institutional email address.');
      setIsLoading(false);
      return;
    }
    
    // Simulate API credential verification
    setTimeout(() => {
      if (formData.email && formData.password) {
        // For most institutional users, proceed to 2FA verification
        const userType = determineUserType(formData.email);
        
        // Log access attempt for compliance records
        logAccessAttempt(formData.email, userType);
        
        setStep('verification');
        setIsLoading(false);
      } else {
        setLoginError('Please enter your institutional email and password.');
        setIsLoading(false);
      }
    }, 2000);
  };
  
  // Handle 2FA verification
  const handleVerificationSubmit = () => {
    setIsLoading(true);
    // Simulate 2FA verification API call
    setTimeout(() => {
      // Accept 123456 as the valid code
      if (formData.verificationCode === '123456') {
        const userType = determineUserType(formData.email);
        createUserSession(formData.email, userType);
        const userObj = {
          id: `user_${Math.random().toString(36).substring(2)}`,
          email: formData.email,
          name: formData.email.split('@')[0],
          role: userType,
          organization: 'Institutional User'
        };
        localStorage.setItem('korbly_user', JSON.stringify(userObj));
        setIsLoading(false);
        // Navigate to appropriate institutional dashboard
        const dashboardRoute = SECURE_ROUTES.DASHBOARD[userType] || SECURE_ROUTES.DASHBOARD[USER_TYPES.INSTITUTIONAL_BORROWER];
        navigate(dashboardRoute);
      } else {
        setLoginError('Please enter a valid verification code. (Hint: 123456)');
        setIsLoading(false);
        // Log failed verification attempt for security monitoring
        console.log(`[SECURITY] Failed 2FA verification attempt for ${formData.email} at ${new Date().toISOString()}`);
      }
    }, 1500);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const validateInstitutionalEmail = (email: string): boolean => {
    // Basic validation plus institutional domain requirements
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    // For demo purposes, allow any email, but in production would validate institutional domains
    return true;
  };
  
  const logAccessAttempt = (email: string, userType: string) => {
    // In production, this would log to a secure audit trail with IP, timestamp, etc.
    console.log(`[AUDIT] Login attempt: ${email} as ${userType} at ${new Date().toISOString()}`);
  };
  
  const createUserSession = (email: string, userType: string, orgName: string = 'Unknown Organization') => {
    // Use the imported createSession function
    createSession(email, userType, orgName);
    console.log(`[SECURITY] Creating secure session for ${userType} with appropriate ACLs`);
  };

  // Handle demo account login for development purposes
  const handleDemoLogin = async (email: string, password: string, demoUserType: string) => {
    setFormData({ ...formData, email, password });
    setIsLoading(true);
    setLoginError('');
    // Use the login function from AuthContext with the correct demo password
    // Accept both 'Demo123!@#' and 'demo123' as valid demo passwords
    const demoPasswords = ['Demo123!@#', 'demo123'];
    let success = false;
    for (const demoPass of demoPasswords) {
      // Try both demo passwords
      // eslint-disable-next-line no-await-in-loop
      success = await login(email, demoPass);
      if (success) break;
    }
    setIsLoading(false);
    if (success) {
      // Mark as demo account in session data for security monitoring
      console.log(`[DEMO] Created demo session for ${demoUserType} with limited permissions`);
      // Map demo account types to actual user types
      let userType: (typeof USER_TYPES)[keyof typeof USER_TYPES] = USER_TYPES.INSTITUTIONAL_BORROWER;
      if (demoUserType.includes('Pension')) userType = USER_TYPES.PENSION_FUND;
      else if (demoUserType.includes('Insurance')) userType = USER_TYPES.INSURANCE;
      else if (demoUserType.includes('Asset')) userType = USER_TYPES.ASSET_MANAGER;
      else if (demoUserType.includes('DFI')) userType = USER_TYPES.DFI;
      else if (demoUserType.includes('Sovereign')) userType = USER_TYPES.SOVEREIGN_FUND;
      else if (demoUserType.includes('HNWI') || demoUserType.includes('Wealth')) userType = USER_TYPES.HNWI;
      else if (demoUserType.includes('Admin')) userType = USER_TYPES.ADMIN;
      else if (demoUserType.includes('Regulator')) userType = USER_TYPES.REGULATOR;
      // Navigate to appropriate institutional dashboard
      const dashboardRoute = SECURE_ROUTES.DASHBOARD[userType];
      navigate(dashboardRoute);
    } else {
      setLoginError('Demo login failed. Please try again.');
    }
  };

  const demoAccounts = [
    {
      type: 'Pension Fund Manager',
      email: 'demo.pension@korbly.com',
      password: 'Demo123!@#',
      icon: <Landmark className="w-5 h-5" />,
      description: 'Access pension fund management console',
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'Insurance Capital Allocation',
      email: 'demo.insurance@korbly.com', 
      password: 'Demo123!@#',
      icon: <Shield className="w-5 h-5" />,
      description: 'Access insurance capital deployment tools',
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'Asset Manager (Institutional)',
      email: 'demo.asset@korbly.com',
      password: 'Demo123!@#', 
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Explore institutional private credit allocation',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-blue-300/30 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-purple-300/30 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-amber-200/15 to-orange-200/25 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Welcome Content */}
            <div className="text-center lg:text-left">
              {/* Announcement Bar */}
              <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
                <span>Welcome back to Korbly</span>
                <ChevronRight className="w-4 h-4 ml-2" />
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 tracking-tight leading-none">
                Sign in to your
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  dashboard.
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Access your institutional private credit portfolio and manage investments with confidence.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <TrendingUp className="w-6 h-6" />, label: "Real-time Analytics" },
                  { icon: <Shield className="w-6 h-6" />, label: "Secure Access" },
                  { icon: <Award className="w-6 h-6" />, label: "Compliance Ready" },
                  { icon: <Globe className="w-6 h-6" />, label: "Global Markets" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-blue-600">{feature.icon}</div>
                    <span className="text-gray-700 font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Live Portfolio Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Portfolio Overview</h3>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 text-sm font-medium">Live</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">$2.3B</div>
                    <div className="text-gray-600 text-sm">Total AUM</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">+12.4%</div>
                    <div className="text-gray-600 text-sm">YTD Return</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            {step === 'credentials' ? (
              <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Sign In
                  </h2>
                  <p className="text-gray-600">
                    Access your institutional dashboard
                  </p>
                </div>

                {/* Demo Accounts Toggle */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-700 hover:bg-blue-100 transition-all duration-200"
                  >
                    <Star className="w-4 h-4" />
                    <span className="font-medium">Try Demo Accounts</span>
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  
                  {showDemoAccounts && (
                    <div className="mt-4 space-y-3">
                      {demoAccounts.map((account, index) => (
                        <button
                          key={index}
                          onClick={() => handleDemoLogin(account.email, account.password, account.type)}
                          disabled={isLoading}
                          className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-all duration-200 text-left disabled:opacity-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${account.color}`}>
                              <div className="text-white">{account.icon}</div>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-sm">{account.type}</div>
                              <div className="text-gray-600 text-xs">{account.description}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Login Form */}
                <div className="space-y-6">
                  {/* Error message */}
                  {loginError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm">
                      {loginError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                        placeholder="Enter your institutional email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => handleChange('rememberMe', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      onClick={() => alert('Password reset requires administrator approval.')}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    onClick={handleCredentialsSubmit}
                    disabled={isLoading || !formData.email || !formData.password}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-2xl font-semibold transition-all duration-200 ${
                      isLoading || !formData.email || !formData.password
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500">New to Korbly?</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Request Access Button */}
                <div className="flex justify-center">
                  <Link to="/signup">
                    <button 
                      className="inline-flex items-center px-8 py-4 rounded-full text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Request Access
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </Link>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Secure Access</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Your login is protected by enterprise-grade security and encryption.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto w-full">
                {/* 2FA Verification Step */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Two-Factor Authentication
                  </h2>
                  <p className="text-gray-600">
                    Enter the verification code sent to your device
                  </p>
                </div>
                
                <div className="space-y-6">
                  {loginError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm">
                      {loginError}
                    </div>
                  )}
                
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.verificationCode}
                      onChange={(e) => handleChange('verificationCode', e.target.value)}
                      className="w-full py-3 px-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white text-center font-mono text-lg tracking-widest"
                      placeholder="000000"
                      required
                      maxLength={6}
                    />
                  </div>
                  
                  <button
                    onClick={handleVerificationSubmit}
                    disabled={isLoading || !formData.verificationCode || formData.verificationCode.length < 6}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-2xl font-semibold transition-all duration-200 ${
                      isLoading || !formData.verificationCode || formData.verificationCode.length < 6
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify and Sign In</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <div className="flex justify-between items-center pt-3 text-sm">
                    <button 
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      onClick={() => setStep('credentials')}
                    >
                      ← Back to login
                    </button>
                    <button 
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      onClick={() => alert("A new code has been sent to your device.")}
                    >
                      Resend code
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Enhanced Security</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Two-factor authentication is required for all institutional users as per regulatory standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;