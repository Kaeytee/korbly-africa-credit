import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Shield, 
  Star, 
  TrendingUp, 
  Users,
  ArrowRight,
  Building2,
  Globe
} from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { 
      name: 'Platform', 
      href: '/platform',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Dashboard', href: '/dashboard', icon: <TrendingUp className="w-4 h-4" />, description: 'Real-time portfolio analytics' },
        { name: 'Investments', href: '/investments', icon: <Building2 className="w-4 h-4" />, description: 'Private credit opportunities' },
        { name: 'Risk Management', href: '/risk', icon: <Shield className="w-4 h-4" />, description: 'Advanced risk assessment' },
        { name: 'Compliance', href: '/compliance', icon: <Star className="w-4 h-4" />, description: 'Regulatory frameworks' }
      ]
    },
    { 
      name: 'Markets', 
      href: '/markets',
      hasDropdown: true,
      dropdownItems: [
        { name: 'African Markets', href: '/markets/africa', icon: <Globe className="w-4 h-4" />, description: '54 country coverage' },
        { name: 'Opportunities', href: '/opportunities', icon: <TrendingUp className="w-4 h-4" />, description: 'Live investment deals' },
        { name: 'Market Data', href: '/data', icon: <Users className="w-4 h-4" />, description: 'Real-time insights' }
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => window.location.pathname === path;

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Interactive Hover Button Component
  const InteractiveButton = ({ children, variant = "primary", className = "", onClick, ...props }) => {
    if (variant === "primary") {
      return (
        <button
          className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-semibold transition-all duration-300 border border-blue-500/30 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105 ${className}`}
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
        className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white hover:border-slate-300 transition-all duration-200 ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg border-b border-slate-200/50 shadow-lg' 
          : 'bg-white/80 backdrop-blur-md border-b border-white/20'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href = '/'}>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Korbly
                </span>
                <div className="text-xs text-slate-500 font-medium -mt-1">Institutional Platform</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => item.hasDropdown ? handleDropdownClick(index) : window.location.href = item.href}
                    className={`flex items-center space-x-1 text-sm font-semibold transition-all duration-200 hover:text-blue-600 ${
                      isActive(item.href) ? 'text-blue-600' : 'text-slate-700'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === index ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-top-2 duration-200">
                      <div className="space-y-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <button
                            key={dropdownItem.name}
                            onClick={() => {
                              window.location.href = dropdownItem.href;
                              setActiveDropdown(null);
                            }}
                            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 text-left group"
                          >
                            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                              {dropdownItem.icon}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900 text-sm">{dropdownItem.name}</div>
                              <div className="text-slate-500 text-xs">{dropdownItem.description}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 pr-4 border-r border-slate-200">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-slate-900">{user.name}</span>
                      <span className="text-xs text-slate-500">{user.role}</span>
                    </div>
                  </div>
                  <InteractiveButton 
                    variant="ghost" 
                    onClick={() => window.location.href = '/dashboard'}
                    className="hover:bg-slate-50"
                  >
                    Dashboard
                  </InteractiveButton>
                  <InteractiveButton 
                    variant="ghost" 
                    onClick={() => logout()}
                    className="hover:bg-slate-50 text-slate-600"
                  >
                    Logout
                  </InteractiveButton>
                </div>
              ) : (
                <>
                  <InteractiveButton 
                    variant="ghost" 
                    onClick={() => window.location.href = '/login'}
                    className="hover:bg-slate-50"
                  >
                    Login
                  </InteractiveButton>
                  <InteractiveButton 
                    variant="primary"
                    onClick={() => window.location.href = '/signup'}
                  >
                    Request Access
                  </InteractiveButton>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-lg shadow-2xl">
            <div className="p-6 pt-24">
              <nav className="space-y-6">
                {navigation.map((item, index) => (
                  <div key={item.name}>
                    <button
                      onClick={() => item.hasDropdown ? handleDropdownClick(index) : (window.location.href = item.href, setIsOpen(false))}
                      className={`flex items-center justify-between w-full text-left text-lg font-semibold transition-colors ${
                        isActive(item.href) ? 'text-blue-600' : 'text-slate-900'
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && (
                        <ChevronDown className={`w-5 h-5 transition-transform ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} />
                      )}
                    </button>

                    {/* Mobile Dropdown */}
                    {item.hasDropdown && activeDropdown === index && (
                      <div className="mt-3 ml-4 space-y-3">
                        {item.dropdownItems.map((dropdownItem) => (
                          <button
                            key={dropdownItem.name}
                            onClick={() => {
                              window.location.href = dropdownItem.href;
                              setIsOpen(false);
                            }}
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-all w-full text-left"
                          >
                            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                              {dropdownItem.icon}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-slate-900 text-sm">{dropdownItem.name}</div>
                              <div className="text-slate-500 text-xs">{dropdownItem.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Buttons */}
                <div className="pt-6 space-y-4">
                  {isAuthenticated && user ? (
                    <>
                      {/* User Profile Summary for Mobile */}
                      <div className="mb-4 p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{user.name}</div>
                            <div className="text-sm text-slate-500">{user.organization}</div>
                          </div>
                        </div>
                        <div className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full inline-block">
                          {user.role}
                        </div>
                      </div>
                      
                      <InteractiveButton 
                        variant="primary" 
                        onClick={() => (window.location.href = '/dashboard', setIsOpen(false))}
                        className="w-full"
                      >
                        Go to Dashboard
                      </InteractiveButton>
                      <InteractiveButton 
                        variant="ghost" 
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="w-full text-slate-600"
                      >
                        Logout
                      </InteractiveButton>
                    </>
                  ) : (
                    <>
                      <InteractiveButton 
                        variant="ghost" 
                        onClick={() => (window.location.href = '/login', setIsOpen(false))}
                        className="w-full"
                      >
                        Login
                      </InteractiveButton>
                      <InteractiveButton 
                        variant="primary"
                        onClick={() => (window.location.href = '/signup', setIsOpen(false))}
                        className="w-full"
                      >
                        Request Access
                      </InteractiveButton>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop blur when dropdown is open */}
      {activeDropdown !== null && (
        <div 
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-sm"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </>
  );
};

export default Header;