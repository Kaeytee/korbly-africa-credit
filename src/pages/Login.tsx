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
  HelpCircle
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

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
      console.log('Login attempt:', formData);
    }, 2000);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDemoLogin = (email: string, password: string, type: string) => {
    setFormData({ email, password, rememberMe: false });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Demo login as ${type}`);
    }, 1500);
  };

  // Interactive Hover Button Component
  const InteractiveHoverButton = ({ children, className = "", onClick, ...props }) => {
    const glowColors = ["#3B82F6", "#F59E0B", "#8B5CF6", "#06B6D4"];
    const scale = 1.6;
    const duration = 6;

    return (
      <button
        className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-semibold transition-all duration-300 border border-white/20 bg-white/10 backdrop-blur-md text-white hover:shadow-2xl hover:scale-105 ${className}`}
        onClick={onClick}
        {...props}
      >
        {/* Animated Glow Effect */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transform-gpu blur-lg animate-pulse"
          style={{
            background: `conic-gradient(from 0deg, ${glowColors.join(", ")})`,
            transform: `scale(${scale})`,
            animation: `glow ${duration}s ease-in-out infinite alternate`,
          }}
        />

        {/* Foreground Text */}
        <span className="relative z-10 flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1">
          {children}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </button>
    );
  };

  // Floating particles for hero section
  const ParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

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
    <div className="min-h-screen bg-slate-50 flex">
      <style jsx>{`
        @keyframes glow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>

      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-blue-300 mr-2" />
                <span className="text-blue-200 text-sm font-medium">Secure Institutional Access</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Welcome Back to
                <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Korbly Platform
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                Access your institutional private credit dashboard and manage your investment portfolio with confidence.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <TrendingUp className="w-6 h-6" />, label: "Real-time Analytics", color: "from-blue-500 to-cyan-500" },
                  { icon: <Users className="w-6 h-6" />, label: "Secure Access", color: "from-purple-500 to-pink-500" },
                  { icon: <Award className="w-6 h-6" />, label: "Compliance Ready", color: "from-green-500 to-emerald-500" },
                  { icon: <Globe className="w-6 h-6" />, label: "Global Markets", color: "from-amber-500 to-orange-500" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{feature.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Dashboard Preview */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Portfolio Overview</h3>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Live</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-white">$2.3B</div>
                    <div className="text-slate-300 text-sm">Total AUM</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-400">+12.4%</div>
                    <div className="text-slate-300 text-sm">YTD Return</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Portfolio Health</span>
                    <span className="text-green-400">Excellent</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-3">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span className="font-medium text-sm">Bank-Grade Security</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>256-bit SSL Encryption</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>Multi-Factor Authentication</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>SOC 2 Type II Compliant</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Sign In
              </h2>
              <p className="text-slate-600">
                Access your institutional dashboard
              </p>
            </div>

            {/* Demo Accounts Toggle */}
            <div className="mb-6">
              <button
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 hover:bg-amber-100 transition-all duration-200"
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
                      className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${account.color}`}>
                          <div className="text-white">{account.icon}</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 text-sm">{account.type}</div>
                          <div className="text-slate-600 text-xs">{account.description}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                    placeholder="Enter your institutional email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.email || !formData.password}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  isLoading || !formData.email || !formData.password
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
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
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="px-4 text-sm text-slate-500">New to Korbly?</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Request Access Button */}
            <div className="flex justify-center">
              <InteractiveHoverButton 
                className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 border-0"
                onClick={() => window.location.href = '/signup'}
              >
                Request Access
              </InteractiveHoverButton>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
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
    </div>
  );
};

export default Login;