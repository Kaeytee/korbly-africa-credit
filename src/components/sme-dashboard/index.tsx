import React from 'react';
import Overview from './Overview';
import SubmitPitch from './SubmitPitch';
import FundingProgress from './FundingProgress';
import InvestorEngagement from './InvestorEngagement';
import DueDiligence from './DueDiligence';
import Support from './Support';

/**
 * SmeDashboardController component serves as a central control point for
 * all SME dashboard sections, making it easier to manage state, data fetching,
 * and routing for the SME dashboard experience.
 */
export interface SmeDashboardControllerProps {
  activeTab: string;
  userMetrics?: {
    pitchesSubmitted: number;
    investorsEngaged: number;
    fundingProgress: number;
    documentsUploaded: number;
  };
}

const SmeDashboardController: React.FC<SmeDashboardControllerProps> = ({ 
  activeTab,
  userMetrics = {
    pitchesSubmitted: 0,
    investorsEngaged: 0,
    fundingProgress: 0,
    documentsUploaded: 0
  }
}) => {
  // This component could handle shared state, data fetching, etc.
  // For now, it just renders the appropriate component based on activeTab

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview metrics={userMetrics} />;
      case 'submit-pitch':
        return <SubmitPitch />;
      case 'funding-progress':
        return <FundingProgress />;
      case 'investor-engagement':
        return <InvestorEngagement />;
      case 'due-diligence':
        return <DueDiligence />;
      case 'support':
        return <Support />;
      default:
        return <Overview metrics={userMetrics} />;
    }
  };

  return renderContent();
};

export default SmeDashboardController;

// Export individual components for direct access
export { 
  Overview, 
  SubmitPitch, 
  FundingProgress, 
  InvestorEngagement, 
  DueDiligence, 
  Support 
};
