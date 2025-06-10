import { useMemo, useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Award,
  CheckCircle,
  Calendar,
  Map,
  Building2,
  Globe,
  Star,
  ArrowRight,
  Briefcase,
  Target,
  BarChart3,
  Zap,
  Lock,
  Eye,
  ChevronRight,
  Linkedin,
  Mail,
  ExternalLink
} from 'lucide-react';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);
  
  // Get current year dynamically to avoid manual updates
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating particles background
  const ParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
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

  // Glass Card Component
  const GlassCard = ({ children, className = "", ...props }) => (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );

  // Interactive Button Component
  const InteractiveButton = ({ children, variant = "primary", className = "", onClick, ...props }) => {
    if (variant === "primary") {
      return (
        <button
          className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-semibold transition-all duration-300 border border-blue-500/30 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105 ${className}`}
          onClick={onClick}
          {...props}
        >
          <span className="relative z-10 flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1">
            {children}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      );
    }
    
    return (
      <button
        className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 transition-all duration-300 ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  const milestones = [
    { 
      year: '2020', 
      event: 'Company Founded', 
      description: 'Established with a vision to transform African private credit markets',
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      year: '2021', 
      event: 'Regulatory Approval', 
      description: 'Obtained licensing from key African financial regulators',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    },
    { 
      year: '2022', 
      event: 'Platform Launch', 
      description: 'First institutional clients onboarded with $500M AUM',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      year: '2023', 
      event: 'Major Expansion', 
      description: 'Crossed $1B AUM and expanded to 5 African markets',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-500'
    },
    { 
      year: String(currentYear), 
      event: 'Market Leadership', 
      description: 'Became the leading institutional private credit platform in Africa',
      icon: <Award className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500'
    },
  ];

  const leadership = [
    {
      name: 'Dr. Amara Johnson',
      role: 'Chief Executive Officer',
      background: 'Former Managing Director at Goldman Sachs Africa, 15+ years in institutional finance',
      credentials: ['MBA Harvard Business School', 'CFA'],
      image: 'AJ',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Prof. Kwame Asante',
      role: 'Chief Technology Officer',
      background: 'Ex-Senior Director at Morgan Stanley Technology, fintech veteran',
      credentials: ['PhD Computer Science MIT', 'Former McKinsey Partner'],
      image: 'KA',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Sarah Mwangi',
      role: 'Chief Risk Officer',
      background: 'Former Head of Risk at Standard Bank Africa, regulatory expert',
      credentials: ['MSc Risk Management LSE', 'FRM Certified'],
      image: 'SM',
      color: 'from-green-500 to-green-600'
    },
  ];

  const certifications = [
    { 
      name: 'SOC 2 Type II', 
      description: 'Security and availability certification',
      icon: <Lock className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'ISO 27001', 
      description: 'Information security management',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'BoG Licensed', 
      description: 'Bank of Ghana regulatory approval',
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      name: 'SEC Registered', 
      description: 'Securities and Exchange Commission',
      icon: <Award className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-500'
    },
    { 
      name: 'NPRA Approved', 
      description: 'National Pensions Regulatory Authority',
      icon: <Users className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500'
    },
    { 
      name: 'NIC Compliant', 
      description: 'National Insurance Commission',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-teal-500 to-cyan-500'
    },
  ];

  const impactMetrics = [
    { 
      value: '$2.3B+', 
      label: 'Assets Under Management', 
      growth: '+45% YoY',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      value: '150+', 
      label: 'Institutional Clients', 
      growth: '+65% YoY',
      icon: <Users className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      value: '5', 
      label: 'African Markets', 
      growth: 'Expanding to 3 more',
      icon: <Globe className="w-8 h-8" />,
      color: 'from-green-500 to-green-600'
    },
    { 
      value: '99.9%', 
      label: 'Platform Uptime', 
      growth: 'Industry Leading',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-500'
    },
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { 
          animation: float 3s ease-in-out infinite; 
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-slate-900/20" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto text-white space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm mb-6">
                <Target className="w-5 h-5 text-blue-300 mr-2" />
                <span className="text-blue-200 font-medium">Our Mission</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                To make private credit
                <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  safe, investable, auditable, and scalable
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                We're building the institutional infrastructure that will power Africa's private credit markets for decades to come.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Founded 2020', icon: <Calendar className="w-4 h-4" /> },
                { label: '$2.3B+ AUM', icon: <TrendingUp className="w-4 h-4" /> },
                { label: '150+ Institutions', icon: <Building2 className="w-4 h-4" /> }
              ].map((badge, index) => (
                <GlassCard key={index} className="px-6 py-3 hover:scale-105 transition-transform">
                  <div className="flex items-center space-x-2 text-white">
                    <div className="text-amber-400">{badge.icon}</div>
                    <span className="font-medium">{badge.label}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement with Enhanced Design */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-float">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
                    <Briefcase className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-blue-600 text-sm font-medium">Our Vision</span>
                  </div>
                  
                  <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
                    Transforming African Private Credit
                  </h2>
                  
                  <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                    <p>
                      Africa's private credit markets represent one of the world's largest underserved opportunities. 
                      We believe that with the right institutional infrastructure, African private credit can become 
                      a cornerstone asset class for global institutional investors.
                    </p>
                    <p>
                      Our platform combines deep African market expertise with world-class technology to create 
                      the transparency, compliance, and scale that institutional investors demand.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <InteractiveButton 
                    variant="primary"
                    onClick={() => window.location.href = '/signup'}
                  >
                    Join Our Platform
                  </InteractiveButton>
                  <InteractiveButton 
                    variant="ghost"
                    onClick={() => window.location.href = '/contact'}
                    className="border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Learn More
                  </InteractiveButton>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 lg:p-12 rounded-3xl shadow-2xl">
                  <div className="space-y-8">
                    {[
                      { icon: <Map className="w-8 h-8" />, label: '5 African Markets', value: 'Live Coverage', color: 'from-blue-500 to-blue-600' },
                      { icon: <Users className="w-8 h-8" />, label: '150+ Institutions', value: 'Global Partners', color: 'from-purple-500 to-purple-600' },
                      { icon: <TrendingUp className="w-8 h-8" />, label: '300% Growth', value: 'Year over Year', color: 'from-green-500 to-green-600' }
                    ].map((stat, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform`}>
                          <div className="text-white">{stat.icon}</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-900 text-lg">{stat.label}</div>
                          <div className="text-slate-600">{stat.value}</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Company Timeline */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Calendar className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-600 text-sm font-medium">Our Journey</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Building the Future
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From startup to market leader - the journey of creating institutional-grade infrastructure for African private credit
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-start space-x-8 group cursor-pointer ${
                      activeTimeline === index ? 'scale-105' : ''
                    } transition-all duration-300`}
                    onClick={() => setActiveTimeline(index)}
                  >
                    {/* Timeline Node */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${milestone.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10 relative`}>
                        <div className="text-white">{milestone.icon}</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group-hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4">
                            <span className={`text-3xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                              {milestone.year}
                            </span>
                            <h3 className="text-2xl font-bold text-slate-900">{milestone.event}</h3>
                          </div>
                          <p className="text-slate-600 text-lg leading-relaxed">{milestone.description}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
                          <ArrowRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Leadership Team */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
              <Users className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-purple-600 text-sm font-medium">Leadership</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Institutional Expertise
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              World-class financial services leadership combined with deep African market knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {leadership.map((leader, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200 hover:-translate-y-2">
                  {/* Profile Image */}
                  <div className="text-center mb-8">
                    <div className="relative inline-block">
                      <div className={`w-24 h-24 bg-gradient-to-r ${leader.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <span className="text-3xl font-bold text-white">{leader.image}</span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Leader Info */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{leader.name}</h3>
                      <p className={`font-semibold bg-gradient-to-r ${leader.color} bg-clip-text text-transparent`}>
                        {leader.role}
                      </p>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-center">
                      {leader.background}
                    </p>

                    {/* Credentials */}
                    <div className="space-y-2">
                      {leader.credentials.map((cred, idx) => (
                        <div key={idx} className="flex items-center justify-center">
                          <div className="px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
                            <span className="text-sm font-medium text-slate-700">{cred}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3 pt-4">
                      <button className="p-3 bg-slate-100 hover:bg-blue-100 rounded-xl transition-colors group">
                        <Linkedin className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                      </button>
                      <button className="p-3 bg-slate-100 hover:bg-blue-100 rounded-xl transition-colors group">
                        <Mail className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Regulatory Compliance */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
              <Shield className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-green-600 text-sm font-medium">Compliance</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Regulatory Excellence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Exceeding the highest standards for institutional financial services across all African markets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200 hover:-translate-y-1 h-full">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${cert.color} group-hover:scale-110 transition-transform`}>
                        <div className="text-white">{cert.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900">{cert.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed">{cert.description}</p>
                    
                    <div className="flex items-center space-x-3 pt-4">
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Verified & Active</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Market Impact */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-amber-600 mr-2" />
              <span className="text-amber-600 text-sm font-medium">Impact</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Driving Market Growth
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transforming institutional adoption across African private credit markets with measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200 hover:-translate-y-2 text-center">
                  <div className="space-y-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${metric.color} group-hover:scale-110 transition-transform`}>
                      <div className="text-white">{metric.icon}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                        {metric.value}
                      </div>
                      <div className="text-xl font-semibold text-slate-900">{metric.label}</div>
                      <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                        {metric.growth}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-slate-900/20" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto text-white space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
                <Star className="w-5 h-5 text-amber-400 mr-2" />
                <span className="text-blue-200 font-medium">Join Our Platform</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Partner With
                <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Market Leaders
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                Join the leading institutional investors already transforming their private credit operations with Korbly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <InteractiveButton 
                variant="primary"
                onClick={() => window.location.href = '/signup'}
                className="text-lg px-10 py-5"
              >
                Request Access
              </InteractiveButton>
              <InteractiveButton 
                variant="ghost"
                onClick={() => window.location.href = '/contact'}
                className="text-lg px-10 py-5"
              >
                Contact Leadership
              </InteractiveButton>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Shield className="w-6 h-6" />, label: 'Bank-Grade Security' },
                { icon: <Award className="w-6 h-6" />, label: 'Industry Leading' },
                { icon: <Users className="w-6 h-6" />, label: 'Trusted by 150+ Institutions' }
              ].map((trust, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 text-slate-300">
                  <div className="text-blue-400">{trust.icon}</div>
                  <span className="font-medium">{trust.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default About;