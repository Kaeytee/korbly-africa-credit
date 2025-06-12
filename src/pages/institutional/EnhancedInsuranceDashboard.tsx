import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { USER_TYPES } from '@/lib/constants';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ModuleDashboard from '@/components/dashboard/ModuleDashboard';

/**
 * Insurance Company Dashboard - Customized for insurance companies
 */
const InsuranceDashboard = () => {
  return (
    <DashboardLayout userType={USER_TYPES.INSURANCE}>
      <ModuleDashboard />
    </DashboardLayout>
  );
};

export default InsuranceDashboard;
