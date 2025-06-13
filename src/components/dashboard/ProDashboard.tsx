import { ReactNode, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  BarChart3, 
  PieChart,
  FileText, 
  ChevronRight,
  ChevronDown,
  Bell,
  User,
  Menu,
  X,
  Settings,
  LogOut,
  CreditCard,
  Briefcase,
  BarChart4,
  AlertCircle,
  FileBarChart,
  ShieldCheck
} from 'lucide-react';

import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';
import { USER_TYPES, SECURE_ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface ProDashboardProps {
  children: ReactNode;
}

interface NavItem {
  title: string;
  href?: string;
  icon: ReactNode;
  submenu?: NavItem[];
  badge?: string;
  badgeColor?: string;
}

const ProDashboard = ({ children }: ProDashboardProps) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [notifications, setNotifications] = useState<{id: number, title: string, read: boolean}[]>([
    { id: 1, title: "New valuation report available", read: false },
    { id: 2, title: "Portfolio review reminder", read: false },
    { id: 3, title: "Market update: Africa private credit", read: true }
  ]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Get user role and type from auth context
  const userRole = user?.role || '';
  const userType = userRole;

  // Toggle submenu expansion
  const toggleExpand = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  // Generate navigation items based on user role
  const getNavigationItems = (): NavItem[] => {
    // Base items all users have
    const baseItems: NavItem[] = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <BarChart3 className="h-5 w-5" />
      }
    ];

    // Role-specific items
    let roleItems: NavItem[] = [];

    // Build module navigation items based on user type
    const moduleItems: NavItem[] = [];

    // Build module navigation based on user type
    switch(userType) {
      case USER_TYPES.PENSION_FUND:
      case USER_TYPES.INSURANCE:
      case USER_TYPES.ASSET_MANAGER:
      case USER_TYPES.SOVEREIGN_FUND:
        moduleItems.push(
          {
            title: "Portfolio",
            icon: <PieChart className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.PORTFOLIO}/${userType}`
          },
          {
            title: "Valuation",
            icon: <FileBarChart className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.VALUATION}/${userType}`
          },
          {
            title: "Syndication",
            icon: <CreditCard className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.SYNDICATION}/${userType}`
          },
          {
            title: "Documentation",
            icon: <FileText className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.DOCUMENTATION}/${userType}`
          },
          {
            title: "Compliance",
            icon: <ShieldCheck className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.COMPLIANCE}/${userType}`
          }
        );
        break;

      case USER_TYPES.DFI:
        // DFIs can access all modules
        moduleItems.push(
          {
            title: "Portfolio",
            icon: <PieChart className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.PORTFOLIO}/${userType}`
          },
          {
            title: "Valuation",
            icon: <FileBarChart className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.VALUATION}/${userType}`
          },
          {
            title: "Syndication",
            icon: <CreditCard className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.SYNDICATION}/${userType}`
          },
          {
            title: "Credit Engine",
            icon: <BarChart4 className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.CREDIT_ENGINE}/${userType}`
          },
          {
            title: "Documentation",
            icon: <FileText className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.DOCUMENTATION}/${userType}`
          },
          {
            title: "Compliance",
            icon: <ShieldCheck className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.COMPLIANCE}/${userType}`
          }
        );
        break;

      case USER_TYPES.HNWI:
        moduleItems.push(
          {
            title: "Portfolio",
            icon: <PieChart className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.PORTFOLIO}/${userType}`
          },
          {
            title: "Documentation",
            icon: <FileText className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.DOCUMENTATION}/${userType}`
          }
        );
        break;

      case USER_TYPES.INSTITUTIONAL_BORROWER:
        moduleItems.push(
          {
            title: "Credit Engine",
            icon: <BarChart4 className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.CREDIT_ENGINE}/${userType}`
          },
          {
            title: "Documentation",
            icon: <FileText className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.DOCUMENTATION}/${userType}`
          }
        );
        break;

      case USER_TYPES.REGULATOR:
        moduleItems.push(
          {
            title: "Compliance",
            icon: <ShieldCheck className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.COMPLIANCE}/${userType}`
          },
          {
            title: "Documentation",
            icon: <FileText className="h-5 w-5" />,
            href: `${SECURE_ROUTES.MODULES.DOCUMENTATION}/${userType}`
          }
        );
        break;

      case USER_TYPES.ADMIN:
        // Admins can access everything
        moduleItems.push(
          {
            title: "User Management",
            icon: <User className="h-5 w-5" />,
            href: "/admin/users"
          },
          {
            title: "All Modules",
            icon: <Briefcase className="h-5 w-5" />,
            submenu: [
              {
                title: "Portfolio",
                icon: <PieChart className="h-5 w-5" />,
                href: `${SECURE_ROUTES.MODULES.PORTFOLIO}/admin`
              },
              {
                title: "Valuation",
                icon: <FileBarChart className="h-5 w-5" />,
                href: `${SECURE_ROUTES.MODULES.VALUATION}/admin`
              },
              {
                title: "Syndication",
                icon: <CreditCard className="h-5 w-5" />,
                href: `${SECURE_ROUTES.MODULES.SYNDICATION}/admin`
              },
              {
                title: "Credit Engine",
                icon: <BarChart4 className="h-5 w-5" />,
                href: `${SECURE_ROUTES.MODULES.CREDIT_ENGINE}/admin`
              },
              {
                title: "Documentation",
                icon: <FileText className="h-5 w-5" />,
                href: `${SECURE_ROUTES.MODULES.DOCUMENTATION}/admin`
              },
              {
                title: "Compliance",
                icon: <ShieldCheck className="h-5 w-5" />,
                href: `${SECURE_ROUTES.MODULES.COMPLIANCE}/admin`
              }
            ]
          },
          {
            title: "System Settings",
            icon: <Settings className="h-5 w-5" />,
            href: "/admin/settings"
          }
        );
        break;

      default:
        // Default case
        moduleItems.push({
          title: "Access Denied",
          icon: <AlertCircle className="h-5 w-5" />,
          href: "/dashboard"
        });
    }

    // Add modules to navigation
    if (moduleItems.length > 0) {
      roleItems = [
        ...roleItems,
        {
          title: "Modules",
          icon: <Briefcase className="h-5 w-5" />,
          submenu: moduleItems
        }
      ];
    }

    // Add settings for all users
    const settingsItem: NavItem = {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings"
    };

    return [...baseItems, ...roleItems, settingsItem];
  };

  const navItems = getNavigationItems();

  // Get user type display name for UI
  const getUserTypeDisplay = () => {
    switch(userType) {
      case USER_TYPES.PENSION_FUND:
        return 'Pension Fund';
      case USER_TYPES.INSURANCE:
        return 'Insurance';
      case USER_TYPES.DFI:
        return 'Development Finance Institution';
      case USER_TYPES.ASSET_MANAGER:
        return 'Asset Manager';
      case USER_TYPES.SOVEREIGN_FUND:
        return 'Sovereign Fund';
      case USER_TYPES.HNWI:
        return 'High-Net-Worth Individual';
      case USER_TYPES.INSTITUTIONAL_BORROWER:
        return 'Institutional Issuer';
      case USER_TYPES.ADMIN:
        return 'Administrator';
      case USER_TYPES.REGULATOR:
        return 'Regulatory Authority';
      default:
        return 'User';
    }
  };

  // Check if a nav item is active
  const isActive = (href?: string) => {
    if (!href) return false;
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  // Render nav items with submenu support
  const renderNavItems = (items: NavItem[]) => {
    return items.map((item, index) => (
      <div key={index} className="mb-1">
        {item.submenu ? (
          <>
            <button
              onClick={() => toggleExpand(item.title)}
              className={cn(
                "flex items-center w-full justify-between py-2 px-3 rounded-md text-sm font-medium",
                expandedItems[item.title] ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <div className="flex items-center">
                <span className="mr-3 text-slate-500">{item.icon}</span>
                <span>{item.title}</span>
              </div>
              {expandedItems[item.title] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {expandedItems[item.title] && (
              <div className="ml-6 mt-1 space-y-1">
                {renderNavItems(item.submenu)}
              </div>
            )}
          </>
        ) : (
          <Link
            to={item.href || "#"}
            className={cn(
              "flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium",
              isActive(item.href) 
                ? "bg-blue-50 text-blue-700" 
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            )}
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <div className="flex items-center">
              <span className={cn(
                "mr-3", 
                isActive(item.href) ? "text-blue-700" : "text-slate-500"
              )}>
                {item.icon}
              </span>
              <span>{item.title}</span>
            </div>
            {item.badge && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${item.badgeColor || "bg-blue-100 text-blue-700"}`}>
                {item.badge}
              </span>
            )}
          </Link>
        )}
      </div>
    ));
  };

  // Sidebar content
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-3 py-4">
        <Link to="/" className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-xl font-bold text-slate-900">Korbly</span>
        </Link>

        <div className="mb-6">
          <div className="flex items-center px-3 mb-2 mt-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-semibold">{user?.name || "User"}</p>
              <p className="text-xs text-slate-500">{getUserTypeDisplay()}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {renderNavItems(navItems)}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-slate-200">
        <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </div>
    </div>
  );

  // If not authenticated, don't render the dashboard
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-slate-200 z-50">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Top navigation */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileSidebarOpen(true)} 
              className="md:hidden p-2 rounded-md text-slate-500 hover:text-slate-900 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Breadcrumb/Page title - could be dynamic based on current route */}
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-slate-900">{user?.organization || "Korbly Africa Credit"}</h1>
            </div>

            {/* Right-side actions */}
            <div className="flex items-center space-x-4">
              {/* Notification dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length === 0 ? (
                    <div className="py-2 px-4 text-sm text-slate-500">No notifications</div>
                  ) : (
                    notifications.map(notification => (
                      <DropdownMenuItem key={notification.id} className={`py-2 ${!notification.read ? 'font-medium' : ''}`}>
                        {!notification.read && (
                          <span className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                        )}
                        {notification.title}
                      </DropdownMenuItem>
                    ))
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-blue-600 text-center">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm font-medium">
                      {user?.name || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProDashboard;
