
import React from 'react';
import { Building2, TrendingUp, Shield, BarChart3, Users } from 'lucide-react';

const SignupHeroSection = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-korbly-navy via-korbly-dark to-korbly-blue relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
        }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 p-12 flex flex-col justify-between text-white">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <Building2 className="w-7 h-7 text-korbly-blue" />
          </div>
          <span className="text-2xl font-bold">Korbly</span>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Join Africa's Leading
              <br />
              <span className="text-korbly-gold">Private Credit Platform</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Connect with institutional-grade private credit opportunities across emerging African markets with our comprehensive investment platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-korbly-gold" />
              </div>
              <div>
                <h3 className="font-semibold">High-Yield Returns</h3>
                <p className="text-sm text-gray-300">8-15% IRR targets</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-korbly-gold" />
              </div>
              <div>
                <h3 className="font-semibold">Risk Management</h3>
                <p className="text-sm text-gray-300">Comprehensive due diligence</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-korbly-gold" />
              </div>
              <div>
                <h3 className="font-semibold">Portfolio Diversification</h3>
                <p className="text-sm text-gray-300">Multi-sector exposure</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-korbly-gold" />
              </div>
              <div>
                <h3 className="font-semibold">Institutional Access</h3>
                <p className="text-sm text-gray-300">Exclusive opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-korbly-gold">$2.5B+</div>
            <div className="text-sm text-gray-300">Assets Facilitated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-korbly-gold">150+</div>
            <div className="text-sm text-gray-300">Institutional Partners</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-korbly-gold">12</div>
            <div className="text-sm text-gray-300">African Markets</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupHeroSection;
