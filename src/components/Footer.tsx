import { useMemo, useState } from 'react';
import { 
  Star, 
  Shield, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle, 
  Globe, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Building2,
  BarChart3,
  Lock,
  FileText,
  Linkedin,
  Twitter,
  Youtube,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Get current year dynamically to avoid manual updates
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const handleNewsletterSubmit = () => {
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const platformLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Investments', href: '/investments', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Risk Management', href: '/risk', icon: <Shield className="w-4 h-4" /> },
    { name: 'Compliance', href: '/compliance', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const complianceLinks = [
    { name: 'Privacy Policy', href: '/privacy', icon: <Lock className="w-4 h-4" /> },
    { name: 'Terms of Service', href: '/terms', icon: <FileText className="w-4 h-4" /> },
    { name: 'Risk Disclosure', href: '/risk-disclosure', icon: <Shield className="w-4 h-4" /> },
    { name: 'Regulatory Framework', href: '/regulatory', icon: <Building2 className="w-4 h-4" /> },
  ];

  const trustMetrics = [
    { value: '$2.3B+', label: 'Assets Under Management', icon: <BarChart3 className="w-5 h-5" /> },
    { value: '150+', label: 'Institutional Partners', icon: <Users className="w-5 h-5" /> },
    { value: '99.9%', label: 'Compliance Rating', icon: <Shield className="w-5 h-5" /> },
    { value: '54', label: 'African Markets', icon: <Globe className="w-5 h-5" /> },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'Twitter', href: '#', icon: <Twitter className="w-5 h-5" /> },
    { name: 'YouTube', href: '#', icon: <Youtube className="w-5 h-5" /> },
  ];

  const regulatoryBadges = [
    { name: 'Bank of Ghana', code: 'BoG Compliant', color: 'from-green-500 to-green-600' },
    { name: 'SEC Registered', code: 'SEC REG', color: 'from-blue-500 to-blue-600' },
    { name: 'NPRA Licensed', code: 'NPRA LIC', color: 'from-purple-500 to-purple-600' },
    { name: 'ISO 27001', code: 'ISO CERT', color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Trust Metrics Bar */}
        <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 group-hover:border-white/20 transition-all">
                      <div className="text-blue-400">{metric.icon}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-slate-300 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Company Info - Larger Section */}
            <div className="lg:col-span-5">
              <div className="space-y-6">
                {/* Logo and Brand */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">K</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="text-3xl font-bold">Korbly</span>
                      <div className="text-sm text-slate-400 font-medium">Institutional Platform</div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                    The institutional marketplace for private credit in Africa. Built for funds, insurers, and sovereigns—not for retail.
                  </p>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-400" />
                    Institutional Updates
                  </h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Get exclusive insights on African private credit markets and regulatory updates.
                  </p>
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your institutional email"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handleNewsletterSubmit}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        isSubscribed 
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                      }`}
                    >
                      {isSubscribed ? <CheckCircle className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </button>
                  </div>
                  {isSubscribed && (
                    <p className="text-green-400 text-sm mt-2">✓ Successfully subscribed to institutional updates</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>Accra, Ghana • Lagos, Nigeria • Nairobi, Kenya</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>institutional@korbly.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span>+233 (0) 30 123 4567</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Platform Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-400" />
                  Platform
                </h3>
                <ul className="space-y-3">
                  {platformLinks.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => window.location.href = link.href}
                        className="flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-200 group"
                      >
                        <div className="text-blue-400 group-hover:text-blue-300">
                          {link.icon}
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4">
                  <button
                    onClick={() => window.location.href = '/signup'}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 text-sm font-semibold group"
                  >
                    <span>Request Access</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Compliance Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  Compliance
                </h3>
                <ul className="space-y-3">
                  {complianceLinks.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => window.location.href = link.href}
                        className="flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-200 group"
                      >
                        <div className="text-green-400 group-hover:text-green-300">
                          {link.icon}
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources & Social */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-purple-400" />
                    Connect
                  </h3>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <button
                        key={index}
                        onClick={() => window.open(social.href, '_blank')}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-200 group"
                      >
                        <div className="text-slate-300 group-hover:text-white group-hover:scale-110 transition-all">
                          {social.icon}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Resources */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-200">Resources</h4>
                  <div className="space-y-2">
                    <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors text-sm group">
                      <ExternalLink className="w-4 h-4" />
                      <span className="group-hover:translate-x-1 transition-transform">Market Reports</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors text-sm group">
                      <ExternalLink className="w-4 h-4" />
                      <span className="group-hover:translate-x-1 transition-transform">API Documentation</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors text-sm group">
                      <ExternalLink className="w-4 h-4" />
                      <span className="group-hover:translate-x-1 transition-transform">Support Center</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              {/* Copyright */}
              <div className="text-center lg:text-left">
                <p className="text-slate-300 text-sm">
                  © {currentYear} Korbly. All rights reserved. Licensed and regulated financial technology platform.
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Institutional private credit marketplace • Africa-focused • Regulatory compliant
                </p>
              </div>

              {/* Regulatory Badges */}
              <div className="flex flex-wrap justify-center lg:justify-end gap-3">
                {regulatoryBadges.map((badge, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 rounded-lg bg-gradient-to-r ${badge.color} text-white text-xs font-semibold flex items-center space-x-2 shadow-lg`}
                  >
                    <Shield className="w-3 h-3" />
                    <span>{badge.code}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;