import { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setLoginError('');
    
    // Simulate login process
    setTimeout(() => {
      if (formData.email && formData.password) {
        alert('Login successful! Welcome to Korbly.');
        setIsLoading(false);
      } else {
        setLoginError('Please enter your email and password.');
        setIsLoading(false);
      }
    }, 2000);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDemoLogin = async (email: string, password: string, type: string) => {
    setFormData({ email, password, rememberMe: false });
    setIsLoading(true);
    setLoginError('');
    
    setTimeout(() => {
      alert(`Demo login successful! Welcome to ${type} dashboard.`);
      setIsLoading(false);
    }, 2000);
  };

  const demoAccounts = [
    {
      type: 'Pension Fund Manager',
      email: 'demo.pension@korbly.com',
      password: 'demo123',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Access pension fund management dashboard',
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'Insurance CIO',
      email: 'demo.insurance@korbly.com', 
      password: 'demo123',
      icon: <Shield className="w-5 h-5" />,
      description: 'View insurance investment portfolio',
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'Asset Manager',
      email: 'demo.asset@korbly.com',
      password: 'demo123', 
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Explore asset management tools',
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
                    onClick={() => alert('Password reset functionality would be implemented here.')}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
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
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
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
                <button 
                  className="inline-flex items-center px-8 py-4 rounded-full text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={() => alert('Redirecting to signup...')}
                >
                  Request Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;