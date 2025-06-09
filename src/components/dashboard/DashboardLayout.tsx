
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Building2, 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Menu
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NotificationsDropdown from './NotificationsDropdown';
import ProfileDropdown from './ProfileDropdown';
import SidebarUserDetails from './SidebarUserDetails';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardLayout = ({ children, activeTab, onTabChange }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'portfolio', label: 'Portfolio', icon: TrendingUp },
    { id: 'opportunities', label: 'Opportunities', icon: FileText },
    { id: 'insights', label: 'Market Insights', icon: Building2 },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <nav className="flex-1 p-4 lg:p-6">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-korbly-blue text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-korbly-blue'
                }`}
              >
                <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span className="font-medium text-sm lg:text-base">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      
      <SidebarUserDetails />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 relative z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="p-4 border-b">
                  <Link to="/" className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-korbly-blue rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-korbly-navy">Korbly</span>
                  </Link>
                </div>
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-korbly-blue rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-lg lg:text-xl font-bold text-korbly-navy">Korbly</span>
            </Link>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {user && (
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-korbly-navy">{user.name}</p>
                <p className="text-xs text-gray-600">{user.organization}</p>
              </div>
            )}
            <NotificationsDropdown />
            <ProfileDropdown />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 xl:w-72 bg-white border-r border-gray-200 min-h-screen sticky top-0">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8 min-h-screen overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
