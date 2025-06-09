
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building2, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SidebarUserDetails = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    if (role.toLowerCase().includes('admin') || role.toLowerCase().includes('director')) {
      return 'bg-purple-100 text-purple-800';
    }
    if (role.toLowerCase().includes('manager') || role.toLowerCase().includes('officer')) {
      return 'bg-blue-100 text-blue-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-korbly-blue text-white text-sm">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          {user.role.toLowerCase().includes('admin') && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <Crown className="w-2.5 h-2.5 text-yellow-800" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-korbly-navy truncate">
            {user.name}
          </p>
          <div className="flex items-center space-x-1 mt-1">
            <Building2 className="w-3 h-3 text-gray-500 flex-shrink-0" />
            <p className="text-xs text-gray-600 truncate">
              {user.organization}
            </p>
          </div>
          <Badge 
            variant="secondary" 
            className={`mt-1.5 text-xs ${getRoleBadgeColor(user.role)}`}
          >
            {user.role}
          </Badge>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        Secure Session • Last login: Today
      </div>
    </div>
  );
};

export default SidebarUserDetails;
