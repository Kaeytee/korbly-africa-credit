/**
 * Permission-based UI components
 * Makes it easy to conditionally render elements based on user permissions
 */

import { ReactNode } from 'react';
import { Feature } from '@/lib/permissions';
import { usePermissions } from '@/hooks/usePermissions';

interface ProtectedFeatureProps {
  /** The feature permission required to view this content */
  feature: Feature;
  /** The content to render if the user has permission */
  children: ReactNode;
  /** Optional fallback content to render if the user doesn't have permission */
  fallback?: ReactNode;
  /** Whether to hide the component completely if the user doesn't have permission */
  hideCompletely?: boolean;
}

/**
 * Component that only renders its children if the user has the required permission
 */
export const ProtectedFeature = ({
  feature,
  children,
  fallback,
  hideCompletely = false
}: ProtectedFeatureProps) => {
  const { can } = usePermissions();
  
  if (!can(feature)) {
    if (hideCompletely) return null;
    return fallback ? <>{fallback}</> : null;
  }
  
  return <>{children}</>;
};

interface ProtectedFeatureGroupProps {
  /** The feature permissions, any of which will allow viewing this content */
  features: Feature[];
  /** Whether ALL permissions are required (true) or ANY permission is sufficient (false) */
  requireAll?: boolean;
  /** The content to render if the user has permission */
  children: ReactNode;
  /** Optional fallback content to render if the user doesn't have permission */
  fallback?: ReactNode;
  /** Whether to hide the component completely if the user doesn't have permission */
  hideCompletely?: boolean;
}

/**
 * Component that only renders its children if the user has the required permissions
 * Can check for ANY or ALL of the specified permissions
 */
export const ProtectedFeatureGroup = ({
  features,
  requireAll = false,
  children,
  fallback,
  hideCompletely = false
}: ProtectedFeatureGroupProps) => {
  const { canAny, canAll } = usePermissions();
  
  // Check if the user has the required permissions
  const hasPermission = requireAll ? canAll(features) : canAny(features);
  
  if (!hasPermission) {
    if (hideCompletely) return null;
    return fallback ? <>{fallback}</> : null;
  }
  
  return <>{children}</>;
};

interface RestrictedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The feature permission required to enable this button */
  feature: Feature;
  /** Whether the button should be hidden rather than disabled */
  hideIfUnauthorized?: boolean;
  /** Optional tooltip to display when hovering over a disabled button */
  unauthorizedTooltip?: string;
}

/**
 * Button that's automatically disabled or hidden if the user doesn't have permission
 */
export const RestrictedButton = ({
  feature,
  hideIfUnauthorized = false,
  unauthorizedTooltip = "You don't have permission to perform this action",
  children,
  ...props
}: RestrictedButtonProps) => {
  const { can } = usePermissions();
  const hasPermission = can(feature);
  
  if (!hasPermission && hideIfUnauthorized) {
    return null;
  }
  
  return (
    <button
      {...props}
      disabled={!hasPermission || props.disabled}
      title={!hasPermission ? unauthorizedTooltip : props.title}
    >
      {children}
    </button>
  );
};
