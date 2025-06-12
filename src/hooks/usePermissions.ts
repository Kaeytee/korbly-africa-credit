/**
 * Custom hook for permission-based feature rendering
 * Makes it easy to conditionally render UI elements based on user permissions
 */

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Feature, hasPermission, hasAnyPermission, hasAllPermissions } from '@/lib/permissions';
import { useCallback } from 'react';
import { logAuditEvent } from '@/lib/audit';

interface UsePermissionsReturn {
  /**
   * Check if the current user has permission for a specific feature
   */
  can: (feature: Feature) => boolean;
  
  /**
   * Check if the current user has all of the specified permissions
   */
  canAll: (features: Feature[]) => boolean;
  
  /**
   * Check if the current user has any of the specified permissions
   */
  canAny: (features: Feature[]) => boolean;
  
  /**
   * Run an action only if the user has the required permission
   * If they don't have permission, logs an audit trail event
   */
  withPermission: <T>(feature: Feature, action: () => T) => T | undefined;
}

/**
 * Hook for easy permission checks throughout the application
 * @returns Permission check functions
 */
export const usePermissions = (): UsePermissionsReturn => {
  const { user } = useAuth();

  /**
   * Check if the current user has permission for a specific feature
   */
  const can = useCallback((feature: Feature): boolean => {
    if (!user || !user.role) return false;
    return hasPermission(user.role, feature);
  }, [user]);

  /**
   * Check if the current user has all of the specified permissions
   */
  const canAll = useCallback((features: Feature[]): boolean => {
    if (!user || !user.role) return false;
    return hasAllPermissions(user.role, features);
  }, [user]);

  /**
   * Check if the current user has any of the specified permissions
   */
  const canAny = useCallback((features: Feature[]): boolean => {
    if (!user || !user.role) return false;
    return hasAnyPermission(user.role, features);
  }, [user]);

  /**
   * Run an action only if the user has the required permission
   * If they don't have permission, logs an audit trail event
   */
  function withPermission<T>(feature: Feature, action: () => T): T | undefined {
    if (can(feature)) {
      return action();
    } else {
      // Log unauthorized attempt
      if (user) {
        logAuditEvent(
          user.id || 'unknown',
          user.email,
          user.role,
          'access_denied',
          {
            feature,
            reason: 'insufficient_permissions'
          }
        );
      }
      console.warn(`[SECURITY] User lacks permission for feature: ${feature}`);
      return undefined;
    }
  }

  // Always return the permission functions object
  return { can, canAll, canAny, withPermission };
};

/**
 * HOC for wrapping components that require specific permissions
 * @param WrappedComponent The component to wrap
 * @param requiredFeature The feature permission required
 * @returns A wrapped component that only renders if the user has permission
 */
export function withPermissionHOC<P>(
  WrappedComponent: React.ComponentType<P>,
  requiredFeature: Feature
) {
  const WithPermission = (props: P) => {
    const { can } = usePermissions();

    if (!can(requiredFeature)) {
      return null; // Or a fallback component like <Unauthorized />
    }

    return React.createElement(WrappedComponent, props);
  };

  // Set display name for easier debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithPermission.displayName = `withPermission(${displayName})`;

  return WithPermission;
}
