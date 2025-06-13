import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { USER_TYPES } from '@/lib/constants';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ModuleDashboard from '@/components/dashboard/ModuleDashboard';

/**
 * Pension Fund Dashboard - Customized for pension fund users
 */
const PensionFundDashboard = () => {
  return (
    <DashboardLayout userType={USER_TYPES.PENSION_FUND}>
      <ModuleDashboard />
    </DashboardLayout>
  );
};

export default PensionFundDashboard;
