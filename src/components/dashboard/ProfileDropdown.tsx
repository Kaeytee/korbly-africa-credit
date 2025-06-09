
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  Building2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const menuItems = [
    { icon: User, label: 'View Profile', action: () => console.log('Profile clicked') },
    { icon: Settings, label: 'Account Settings', action: () => console.log('Settings clicked') },
    { icon: Shield, label: 'Security', action: () => console.log('Security clicked') },
    { icon: Bell, label: 'Notification Preferences', action: () => console.log('Notifications clicked') },
    { icon: CreditCard, label: 'Billing', action: () => console.log('Billing clicked') },
    { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help clicked') },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2 p-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-korbly-blue text-white text-sm">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-korbly-blue text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Building2 className="w-3 h-3 text-gray-500" />
                <p className="text-xs text-gray-500 truncate">{user.organization}</p>
              </div>
              <Badge variant="secondary" className="mt-2 text-xs">
                {user.role}
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem 
              key={index}
              onClick={item.action}
              className="flex items-center space-x-3 px-4 py-2 cursor-pointer"
            >
              <Icon className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{item.label}</span>
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-2 cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
