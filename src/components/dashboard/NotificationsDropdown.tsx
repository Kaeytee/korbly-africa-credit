
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
import { Badge } from '@/components/ui/badge';
import { Bell, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const NotificationsDropdown = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Portfolio Performance',
      message: 'Your Q4 returns exceeded target by 2.3%',
      time: '2 hours ago',
      icon: TrendingUp,
      unread: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Risk Alert',
      message: 'Currency exposure in EUR positions increased',
      time: '4 hours ago',
      icon: AlertTriangle,
      unread: true
    },
    {
      id: 3,
      type: 'info',
      title: 'Investment Opportunity',
      message: 'New sustainable infrastructure deal available',
      time: '6 hours ago',
      icon: CheckCircle,
      unread: false
    },
    {
      id: 4,
      type: 'info',
      title: 'Market Update',
      message: 'Weekly market analysis report is ready',
      time: '1 day ago',
      icon: Clock,
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <DropdownMenuItem 
              key={notification.id} 
              className={`flex flex-col items-start p-4 cursor-pointer ${
                notification.unread ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-3 w-full">
                <Icon className={`w-5 h-5 mt-0.5 ${getIconColor(notification.type)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {notification.title}
                    </p>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-sm text-korbly-blue hover:text-korbly-blue cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
