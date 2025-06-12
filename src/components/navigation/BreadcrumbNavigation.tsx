import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbNavigationProps {
  items: Breadcrumb[];
}

/**
 * BreadcrumbNavigation - Displays a breadcrumb trail for improved navigation
 */
const BreadcrumbNavigation = ({ items }: BreadcrumbNavigationProps) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-1 h-4 w-4 text-slate-400 flex-shrink-0" />
              )}
              
              {isLast || !item.href ? (
                <span 
                  className={`${isLast ? 'text-slate-900 font-medium' : 'text-slate-500'}`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.href}
                  className="text-slate-500 hover:text-slate-700"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;
