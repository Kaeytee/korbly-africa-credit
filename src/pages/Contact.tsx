import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Shield,
  Phone,
  Calendar,
  CheckCircle,
  ArrowRight,
  Building2,
  Users,
  Star,
  Zap,
  Globe,
  MessageSquare,
  Send,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Award,
  TrendingUp,
  Loader2
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        company: '',
        role: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: ''
      });
      // Show success message
      alert('Message sent successfully! Our institutional team will respond within 2 business hours.');
    }, 2000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Floating particles background
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
  const InteractiveButton = ({ children, variant = "primary", className = "", onClick, disabled = false, ...props }) => {
    if (variant === "primary") {
      return (
        <button
          className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-semibold transition-all duration-300 border border-blue-500/30 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          onClick={onClick}
          disabled={disabled}
          {...props}
        >
          <span className="relative z-10 flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1">
            {children}
            {!disabled && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
          </span>
        </button>
      );
    }
    
    return (
      <button
        className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-full border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 transition-all duration-200 ${className}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };

  const inquiryTypes = [
    'Platform Demo Request',
    'Strategic Partnership',
    'Institutional Onboarding',
    'Technical Support',
    'Compliance Inquiry',
    'Other'
  ];

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'institutional@korbly.com',
      description: 'For general institutional inquiries',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+233 (0) 302 123 456',
      description: 'Direct line to institutional team',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      value: 'Kempinski Hotel Gold Coast',
      description: 'Accra, Ghana',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      value: 'Mon-Fri: 8AM-6PM GMT',
      description: 'Weekend emergency support',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const responseGuarantees = [
    { type: 'Institutional inquiries', time: '2 hours', icon: <Building2 className="w-4 h-4" /> },
    { type: 'Demo requests', time: 'Same day', icon: <TrendingUp className="w-4 h-4" /> },
    { type: 'Partnership discussions', time: '24 hours', icon: <Users className="w-4 h-4" /> },
    { type: 'Technical support', time: '1 hour', icon: <Shield className="w-4 h-4" /> }
  ];

  const faqs = [
    {
      question: 'What are the minimum AUM requirements?',
      answer: 'We work with institutional clients managing $50M+ in assets, including pension funds, insurance companies, and development finance institutions. Our platform is designed for sophisticated institutional investors.'
    },
    {
      question: 'How long does onboarding take?',
      answer: 'Institutional onboarding typically takes 2-4 weeks, including compliance verification, due diligence, platform training, and integration with your existing systems.'
    },
    {
      question: 'What regulatory frameworks do you comply with?',
      answer: 'We are licensed and compliant with BoG, SEC, NPRA, and NIC regulations across all African markets where we operate. We also maintain SOC 2 Type II and ISO 27001 certifications.'
    },
    {
      question: 'Do you support multi-currency portfolios?',
      answer: 'Yes, our platform supports USD, EUR, GBP, and major African currencies with real-time FX hedging capabilities and comprehensive currency risk management tools.'
    },
    {
      question: 'What are your fee structures?',
      answer: 'Our fee structure is tailored to institutional clients based on AUM, transaction volume, and service level requirements. We offer competitive institutional pricing with no hidden fees.'
    },
    {
      question: 'How secure is the platform?',
      answer: 'We employ bank-grade security with 256-bit SSL encryption, multi-factor authentication, and continuous monitoring. Our platform is SOC 2 Type II compliant and undergoes regular security audits.'
    }
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
      <style>{`
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
                <MessageSquare className="w-5 h-5 text-blue-300 mr-2" />
                <span className="text-blue-200 font-medium">Institutional Support</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Connect With Our
                <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  Institutional Team
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Ready to transform your private credit operations? Our experts are here to help you navigate Africa's institutional investment landscape.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: '2hr Response Time', icon: <Clock className="w-4 h-4" /> },
                { label: 'Enterprise Grade', icon: <Shield className="w-4 h-4" /> },
                { label: '24/7 Support', icon: <Star className="w-4 h-4" /> }
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

      {/* Main Contact Section */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-slate-100">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
                      <Building2 className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-blue-600 text-sm font-medium">Institutional Inquiry</span>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                      Get In Touch
                    </h2>
                    
                    <p className="text-lg text-slate-600">
                      Please provide your details and we'll connect you with the right specialist for your institutional needs.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Company/Institution *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                          placeholder="Institution name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Role/Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.role}
                          onChange={(e) => handleChange('role', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                          placeholder="Your role or title"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                          placeholder="professional@institution.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Inquiry Type *
                        </label>
                        <select
                          required
                          value={formData.inquiryType}
                          onChange={(e) => handleChange('inquiryType', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                        >
                          <option value="">Select inquiry type</option>
                          {inquiryTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Message *
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white resize-none"
                        placeholder="Please describe your specific needs, AUM range, timeline, and any other relevant details..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <InteractiveButton
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 sm:flex-none"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </InteractiveButton>
                      
                      <InteractiveButton
                        variant="ghost"
                        onClick={() => window.open('/schedule', '_blank')}
                        className="flex-1 sm:flex-none"
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Schedule Call
                      </InteractiveButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1 group">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} group-hover:scale-110 transition-transform`}>
                        <div className="text-white">{method.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-1">{method.title}</h3>
                        <p className="text-slate-900 font-medium">{method.value}</p>
                        <p className="text-slate-600 text-sm">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Response Guarantee */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h3 className="font-bold text-slate-900">Response Guarantee</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {responseGuarantees.map((guarantee, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                        <div className="flex items-center space-x-3">
                          <div className="text-blue-500">{guarantee.icon}</div>
                          <span className="text-sm font-medium text-slate-700">{guarantee.type}</span>
                        </div>
                        <span className="text-sm font-bold text-green-600">{guarantee.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-amber-500" />
                    Quick Actions
                  </h3>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-slate-900">Schedule Demo</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group">
                      <div className="flex items-center space-x-3">
                        <ExternalLink className="w-5 h-5 text-purple-500" />
                        <span className="font-medium text-slate-900">Download Brochure</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group">
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-slate-900">View Credentials</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-amber-600 mr-2" />
              <span className="text-amber-600 text-sm font-medium">Frequently Asked Questions</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Common Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Answers to the most common questions from institutional clients about our platform and services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors"
                >
                  <h3 className="font-bold text-slate-900 text-lg pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-slate-900/20" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto text-white space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-green-500/20 rounded-full border border-green-400/30 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                <span className="text-green-200 font-medium">Ready to Get Started?</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Join Leading
                <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Institutional Investors
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                Transform your private credit operations with Africa's most trusted institutional platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <InteractiveButton 
                variant="primary"
                onClick={() => window.location.href = '/signup'}
                className="text-lg px-10 py-5"
              >
                Request Platform Access
              </InteractiveButton>
              <InteractiveButton 
                variant="ghost"
                onClick={() => window.location.href = '/about'}
                className="text-lg px-10 py-5 border-white/30 text-green-500 hover:bg-white hover:text-slate-900"
              >
                Learn More About Us
              </InteractiveButton>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Users className="w-6 h-6" />, label: '150+ Institutional Partners' },
                { icon: <Shield className="w-6 h-6" />, label: 'Bank-Grade Security' },
                { icon: <Globe className="w-6 h-6" />, label: '5 African Markets' }
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

export default Contact;