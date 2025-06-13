import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  status?: 'new' | 'updated' | 'maintenance' | 'beta';
  className?: string;
  lastUpdated?: string;
}

/**
 * ModuleCard - A component for displaying module cards on dashboards
 * Uses consistent styling and provides visual cues about module status
 */
const ModuleCard = ({
  title,
  description,
  icon: Icon,
  href,
  status,
  className,
  lastUpdated,
}: ModuleCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'new':
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">New</Badge>;
      case 'updated':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Updated</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Maintenance</Badge>;
      case 'beta':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Beta</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:border-blue-200 hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Icon className="h-6 w-6 text-blue-600" />
          {status && getStatusBadge()}
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {lastUpdated && (
          <p className="text-xs text-slate-500">Last updated: {lastUpdated}</p>
        )}
      </CardContent>
      <CardFooter>
        <Link to={href} className="w-full">
          <Button className="w-full" variant="outline">
            Launch Module
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
