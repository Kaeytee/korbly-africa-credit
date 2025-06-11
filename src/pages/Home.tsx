import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Play,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Star,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '$2.3B', label: 'Assets Under Management' },
    { value: '150+', label: 'Institutional Partners' },
    { value: '99.9%', label: 'Platform Uptime' }
  ];

  const testimonials = [
    {
      quote: 'Korbly transformed how we approach private credit in Africa.',
      author: 'Sarah Chen',
      role: 'CIO, Leading Pension Fund'
    },
    {
      quote: 'Finally, institutional-grade infrastructure for African markets.',
      author: 'Michael Okafor',
      role: 'Head of Investments, Insurance Giant'
    }
  ];

  return (
    <div className="bg-white">
      {/* Apple-Style Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">Korbly</div>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Platform</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Solutions</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Security</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Contact</a>
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Sign In
              </button>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200/20 bg-white/90 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">Platform</a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">Solutions</a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">Security</a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">About</a>
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">Contact</a>
                <div className="px-3 py-2 space-y-2">
                  <button className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium transition-colors">
                    Sign In
                  </button>
                  <button 
                    onClick={() => window.location.href = '/signup'}
                    className="block w-full bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes mesh-move {
          0%, 100% { transform: translateX(0%) translateY(0%); }
          25% { transform: translateX(2%) translateY(-2%); }
          50% { transform: translateX(-1%) translateY(2%); }
          75% { transform: translateX(-2%) translateY(-1%); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-mesh { animation: mesh-move 20s ease-in-out infinite; }
      `}</style>

      {/* Hero Section - Apple Style with Innovation */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Innovative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
          {/* Animated Mesh Gradient */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/40 via-transparent to-purple-100/40 animate-mesh"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-amber-100/30 via-transparent to-cyan-100/30 animate-mesh" style={{animationDelay: '10s'}}></div>
          </div>

          {/* Floating Geometric Elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-blue-300/30 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-purple-300/30 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-amber-200/15 to-orange-200/25 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="text-center px-4 max-w-4xl mx-auto relative z-10">
          {/* Announcement Bar */}
          <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-8 hover:bg-gray-800 transition-colors cursor-pointer">
            <span>Introducing Korbly 2.0</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </div>

          {/* Main Headline - Apple Typography */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-gray-900 mb-6 tracking-tight leading-none">
            Private credit.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Reimagined.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            The institutional marketplace connecting Africa's most sophisticated investors with high-growth opportunities.
          </p>

          {/* CTA Buttons - Apple Style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => window.location.href = '/signup'}
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get started
            </button>
            <button className="flex items-center text-blue-600 text-lg font-medium hover:text-blue-700 transition-colors">
              <Play className="w-5 h-5 mr-2" />
              Watch the film
            </button>
          </div>

          {/* Hero Visual - Minimal */}
          <div className="relative max-w-5xl mx-auto">
            <div 
              className="bg-white rounded-3xl shadow-2xl p-8 transform transition-transform duration-700"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apple-Style Product Showcase */}
      <section className="py-24 relative overflow-hidden">
        {/* Innovative Background */}
        <div className="absolute inset-0 bg-gray-50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50/30 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Intelligent Matching */}
            <div className="lg:col-span-1 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="p-8 pb-0">
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                  Intelligent Matching
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  AI connects the right investors with the right opportunities. Automatically.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors mb-8">
                  Learn more
                </button>
              </div>
              <div className="px-8 pb-8">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-80">Match Score</span>
                      <span className="text-2xl font-bold">94%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full">
                      <div className="h-full bg-white rounded-full w-[94%]"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="opacity-80">Risk Alignment</div>
                        <div className="font-semibold">Excellent</div>
                      </div>
                      <div>
                        <div className="opacity-80">Sector Fit</div>
                        <div className="font-semibold">Perfect</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Institutional Grade */}
            <div className="lg:col-span-1 bg-black text-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="p-8 pb-0">
                <h3 className="text-3xl md:text-4xl font-semibold mb-4">
                  Institutional Grade
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Bank-level security and compliance. Built for Africa's leading institutions.
                </p>
                <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors mb-8">
                  Learn more
                </button>
              </div>
              <div className="px-8 pb-8">
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                        <span>Security Status</span>
                      </div>
                      <span className="text-green-400 font-semibold">Active</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>ISO 27001 Certified</span>
                        <span className="text-green-400">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SOC 2 Type II</span>
                        <span className="text-green-400">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bank-Grade Encryption</span>
                        <span className="text-green-400">✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Insights */}
            <div className="lg:col-span-1 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="p-8 pb-0">
                <h3 className="text-3xl md:text-4xl font-semibold mb-4">
                  Real-time Insights
                </h3>
                <p className="text-lg text-purple-100 mb-6">
                  Live portfolio tracking and risk assessment. Make decisions with confidence.
                </p>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors mb-8">
                  Learn more
                </button>
              </div>
              <div className="px-8 pb-8">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-100">Portfolio Value</span>
                      <div className="flex items-center text-green-300">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">+12.4%</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">$847.2M</div>
                    <div className="flex space-x-1">
                      {[40, 60, 30, 80, 45, 70, 55].map((height, i) => (
                        <div 
                          key={i}
                          className="bg-white/40 rounded-sm flex-1"
                          style={{ height: `${height/2}px` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Innovative Background */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-purple-100/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              See it in action.
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of institutional investing.
            </p>
          </div>

          <div className="relative">
            <div className="bg-gray-900 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <h3 className="text-3xl font-semibold mb-6">
                    Real-time portfolio management
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Monitor your investments, assess risks, and make decisions with live data and AI-powered insights.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>Live risk assessment</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>Automated compliance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>Smart matching</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Portfolio Value</span>
                      <span className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +12.4%
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">$847.2M</div>
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Clean Apple Style */}
      <section className="py-24 relative overflow-hidden">
        {/* Innovative Background */}
        <div className="absolute inset-0 bg-gray-50">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-transparent to-cyan-50/40"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-xl animate-pulse-glow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-green-200/20 to-blue-200/30 rounded-full blur-xl animate-pulse-glow" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Loved by institutions.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xl text-gray-900 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Built for trust.
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            Bank-grade security, regulatory compliance, and institutional oversight.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-blue-600 mb-4"><Shield className="w-8 h-8" /></div>
              <span className="text-sm font-medium text-gray-700">SEC Registered</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-blue-600 mb-4"><CheckCircle className="w-8 h-8" /></div>
              <span className="text-sm font-medium text-gray-700">ISO Certified</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-blue-600 mb-4"><Users className="w-8 h-8" /></div>
              <span className="text-sm font-medium text-gray-700">150+ Partners</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-blue-600 mb-4"><Zap className="w-8 h-8" /></div>
              <span className="text-sm font-medium text-gray-700">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Apple Style */}
      <section className="py-24 relative overflow-hidden">
        {/* Innovative Dark Background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900/30"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-blue-900/20 via-transparent to-purple-900/20"></div>
          
          {/* Subtle animated orbs */}
          <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/6 w-56 h-56 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse-glow" style={{animationDelay: '3s'}}></div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-4xl md:text-6xl font-semibold mb-6">
            Ready to transform
            <br />
            your portfolio?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join Africa's leading institutions on the platform built for the future of private credit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/signup'}
              className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get started today
            </button>
            <button className="border border-gray-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:border-gray-400 transition-colors">
              Schedule a demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;