import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowUp, 
  BarChart3, 
  FileText, 
  ChevronRight,
  PieChart,
  Clock,
  Lock,
  Play,
  ArrowRight,
  Eye,
  Zap,
  Globe,
  Star,
  Target,
  Briefcase
} from 'lucide-react';

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

// Glass Effect Component
const GlassCard = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, duration = 3 }) => {
  return (
    <div
      className="animate-float"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const target = parseInt(value.replace(/[^\d]/g, ''));
          let start = 0;
          const increment = target / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={countRef} className="tabular-nums">
      {value.includes('$') ? `$${count}${value.includes('B') ? 'B+' : 'M+'}` : 
       value.includes('%') ? `${count}%` : 
       `${count}+`}
    </span>
  );
};

// Particle Background Component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
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
};

const Home = () => {
  const [activeDemo, setActiveDemo] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trust indicators for hero section
  const trustIndicators = [
    { text: "SEC Registered", icon: <Shield className="w-4 h-4" /> },
    { text: "ISO 27001 Certified", icon: <Award className="w-4 h-4" /> }, 
    { text: "Bank-Grade Security", icon: <Lock className="w-4 h-4" /> }
  ];

  // Trust metrics data
  const trustMetrics = [
    {
      value: '$2.3B+',
      label: 'Assets Under Management',
      icon: <BarChart3 className="h-8 w-8" />,
      gradient: 'from-blue-500 to-cyan-500'
    }, 
    {
      value: '150+',
      label: 'Institutional Partners',
      icon: <Users className="h-8 w-8" />,
      gradient: 'from-purple-500 to-pink-500'
    }, 
    {
      value: '99.9%',
      label: 'Compliance Rating',
      icon: <Shield className="h-8 w-8" />,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  // Platform features data
  const platformFeatures = [
    {
      title: 'Advanced Analytics',
      description: 'Real-time market insights with AI-powered analytics for smarter investment decisions',
      icon: <PieChart className="h-8 w-8" />,
      gradient: 'from-blue-500 to-indigo-600',
      features: ['Real-time data', 'AI insights', 'Custom reports']
    },
    {
      title: 'Regulatory Compliance',
      description: 'Built-in compliance frameworks aligned with international and local regulations',
      icon: <CheckCircle className="h-8 w-8" />,
      gradient: 'from-green-500 to-teal-600',
      features: ['Auto compliance', 'Audit trails', 'Risk monitoring']
    },
    {
      title: 'Institutional Infrastructure',
      description: 'Enterprise-grade security and scalability for institutional requirements',
      icon: <Lock className="h-8 w-8" />,
      gradient: 'from-purple-500 to-violet-600',
      features: ['99.9% uptime', 'Enterprise security', 'Global reach']
    },
    {
      title: 'Efficient Processing',
      description: 'Streamlined workflows reducing transaction times from weeks to days',
      icon: <Clock className="h-8 w-8" />,
      gradient: 'from-orange-500 to-red-600',
      features: ['Fast processing', 'Automated workflows', 'Digital first']
    }
  ];

  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Process transactions in minutes, not weeks"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Access opportunities across 54 African markets"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Precision Matching",
      description: "AI-powered investment opportunity matching"
    }
  ];

  const handleDemoClick = () => {
    setActiveDemo(true);
    setTimeout(() => setActiveDemo(false), 3000);
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes glow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .animate-float { 
          animation: float 3s ease-in-out infinite; 
        }
        .animate-twinkle { 
          animation: twinkle 2s ease-in-out infinite; 
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-slate-900/20" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="text-white space-y-6 lg:space-y-8">
              <FloatingElement delay={0}>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full border border-blue-400/30 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-blue-200 text-sm font-medium">Institutional-Grade Platform</span>
                </div>
              </FloatingElement>
              
              <FloatingElement delay={0.2}>
                <div className="space-y-4 lg:space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    The Institutional Marketplace for{' '}
                    <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent animate-pulse">
                      Private Credit
                    </span>{' '}
                    in Africa
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-2xl">
                    Built for funds, insurers, and sovereigns—not for retail.
                  </p>
                </div>
              </FloatingElement>

              {/* Enhanced Trust Indicators */}
              <FloatingElement delay={0.4}>
                <div className="flex flex-wrap gap-3 lg:gap-4">
                  {trustIndicators.map((indicator, index) => (
                    <GlassCard key={index} className="flex items-center space-x-2 px-4 py-2 hover:scale-105 transition-transform">
                      <div className="text-amber-400">{indicator.icon}</div>
                      <span className="text-sm font-medium">{indicator.text}</span>
                    </GlassCard>
                  ))}
                </div>
              </FloatingElement>

              {/* Benefits Grid */}
              <FloatingElement delay={0.6}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3 text-slate-300">
                      <div className="text-blue-400">{benefit.icon}</div>
                      <div>
                        <div className="font-semibold text-sm">{benefit.title}</div>
                        <div className="text-xs text-slate-400">{benefit.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingElement>

              {/* Enhanced CTA Buttons */}
              <FloatingElement delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                  <InteractiveHoverButton 
                    className="text-lg font-semibold"
                    onClick={() => window.location.href = '/signup'}
                  >
                    Request Access
                  </InteractiveHoverButton>
                  <button 
                    onClick={handleDemoClick}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                    {activeDemo ? 'Demo Loading...' : 'Watch Demo'}
                  </button>
                </div>
              </FloatingElement>
            </div>

            {/* Right Side - Enhanced Dashboard Preview */}
            <FloatingElement delay={1}>
              <div className="relative">
                <GlassCard className="p-6 lg:p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Dashboard Header */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-bold text-xl">Portfolio Overview</h3>
                      <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">+12.4%</span>
                      </div>
                    </div>

                    {/* Enhanced Metrics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {trustMetrics.slice(0, 2).map((metric, index) => (
                        <div key={index} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                          <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${metric.gradient} mb-2`}>
                            <div className="text-white">{metric.icon}</div>
                          </div>
                          <div className="text-2xl font-bold text-white">
                            <AnimatedCounter value={metric.value} />
                          </div>
                          <div className="text-slate-300 text-sm">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Chart Visualization */}
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-4">Performance Trend</h4>
                      <div className="h-32 flex items-end justify-center space-x-2">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm transition-all duration-1000 ease-out hover:from-purple-500 hover:to-pink-400 cursor-pointer"
                            style={{
                              height: `${Math.random() * 60 + 20}%`,
                              width: '12px',
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </FloatingElement>
          </div>
        </div>
      </section>

      {/* Enhanced Trust Bar */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-2">
              <p className="text-sm text-slate-600 font-medium">Trusted by leading African institutions</p>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[
                { icon: <Shield className="w-8 h-8" />, text: "Security First", color: "text-blue-600" },
                { icon: <Users className="w-8 h-8" />, text: "Institutional Focus", color: "text-purple-600" },
                { icon: <Award className="w-8 h-8" />, text: "Award Winning", color: "text-amber-600" },
                { icon: <TrendingUp className="w-8 h-8" />, text: "Performance Driven", color: "text-green-600" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 hover:scale-105">
                  <div className={item.color}>{item.icon}</div>
                  <span className="text-sm font-medium text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Value Proposition Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-600 text-sm font-medium">Institutional Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Built for African Excellence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Purpose-built for the unique requirements of African institutional investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {trustMetrics.map((metric, index) => (
              <div key={index} className="group text-center p-8 lg:p-10 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200 hover:-translate-y-2">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${metric.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{metric.icon}</div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-4">
                  <span className={`bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                    <AnimatedCounter value={metric.value} />
                  </span>
                </div>
                <div className="text-xl font-semibold text-slate-900 mb-4">{metric.label}</div>
                <div className="text-slate-600 leading-relaxed">
                  {index === 0 && 'Actively managed across diversified portfolios with institutional oversight and risk management'}
                  {index === 1 && 'Leading pension funds, insurers, and development finance institutions across Africa'}
                  {index === 2 && 'Meeting the highest standards for regulatory compliance and risk management protocols'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Platform Features Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Powerful Platform Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to manage institutional private credit investments with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => (
              <div key={index} className="group bg-white p-8 lg:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200 hover:-translate-y-1">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-500">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Platform Preview Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Experience the Future of Finance
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real-time portfolio management, AI-powered risk assessment, and automated compliance monitoring
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <GlassCard className="p-8 lg:p-12 shadow-2xl">
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-2xl lg:text-3xl font-bold">Live Dashboard</h3>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <ArrowUp className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-green-400">Real-time data</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      <AnimatedCounter value="$847M" />
                    </div>
                    <div className="text-slate-600 mb-2">Total Portfolio Value</div>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +5.2% this quarter
                    </div>
                  </div>
                  <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      <AnimatedCounter value="23" />
                    </div>
                    <div className="text-slate-600 mb-2">Active Investments</div>
                    <div className="flex items-center text-blue-600 text-sm">
                      <Eye className="w-4 h-4 mr-1" />
                      3 pending review
                    </div>
                  </div>
                  <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-bold text-slate-900 mb-2">AAA</div>
                    <div className="text-slate-600 mb-2">Risk Rating</div>
                    <div className="flex items-center text-green-600 text-sm">
                      <Shield className="w-4 h-4 mr-1" />
                      Fully Compliant
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 lg:p-8 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-6 text-lg">Portfolio Allocation</h4>
                  <div className="space-y-4">
                    <div className="h-6 bg-slate-200 rounded-full overflow-hidden flex">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-2000" style={{ width: '45%' }}></div>
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-2000" style={{ width: '30%' }}></div>
                      <div className="bg-gradient-to-r from-slate-400 to-slate-500 h-full transition-all duration-2000" style={{ width: '25%' }}></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        Corporate Bonds (45%)
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                        Government Securities (30%)
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-slate-400 rounded-full mr-2"></div>
                        Alternative Credit (25%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Enhanced Social Proof Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Trusted by Leading Institutions
            </h2>
            <p className="text-xl text-slate-600">
              Join Africa's most sophisticated institutional investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                quote: "Korbly has transformed our private credit origination process. The institutional-grade tools and compliance framework give us confidence in every investment decision.",
                author: "Chief Investment Officer",
                company: "Major African Pension Fund",
                rating: 5
              },
              {
                quote: "The real-time risk assessment and portfolio valuation capabilities are exactly what we needed for our private credit mandate.",
                author: "Portfolio Manager", 
                company: "Leading Insurance Company",
                rating: 5
              },
              {
                quote: "Korbly's institutional-grade platform has streamlined our credit operations and significantly improved our risk management capabilities.",
                author: "Head of Credit",
                company: "Pan-African Development Bank",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-slate-500 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default Home;