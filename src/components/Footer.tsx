
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-korbly-navy text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-korbly-blue to-korbly-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold">Korbly</span>
            </div>
            <p className="text-korbly-silver max-w-md mb-6">
              The institutional marketplace for private credit in Africa. Built for funds, insurers, and sovereigns—not for retail.
            </p>
            <div className="flex space-x-4">
              <div className="text-sm text-korbly-silver">
                <p>Regulatory Compliant • Institutional Grade • Africa-Focused</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-korbly-silver hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/about" className="text-korbly-silver hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-korbly-silver hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/signup" className="text-korbly-silver hover:text-white transition-colors">Request Access</Link></li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Compliance</h3>
            <ul className="space-y-2">
              <li><span className="text-korbly-silver">Privacy Policy</span></li>
              <li><span className="text-korbly-silver">Terms of Service</span></li>
              <li><span className="text-korbly-silver">Risk Disclosure</span></li>
              <li><span className="text-korbly-silver">Regulatory Framework</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-korbly-silver text-sm">
              © 2024 Korbly. All rights reserved. Licensed and regulated financial technology platform.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <span className="text-korbly-silver text-sm">BoG Compliant</span>
              <span className="text-korbly-silver text-sm">SEC Registered</span>
              <span className="text-korbly-silver text-sm">NPRA Licensed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
