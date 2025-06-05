
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingFlow from '@/components/OnboardingFlow';
import { useToast } from '@/hooks/use-toast';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType] = useState<'pension' | 'insurance' | 'dfi' | 'sovereign' | 'hnwi' | 'other'>('pension'); // This would come from signup data

  const handleOnboardingComplete = () => {
    toast({
      title: "Onboarding Complete",
      description: "Welcome to your Korbly institutional dashboard. Your account is now ready for private credit management.",
    });
    
    // Navigate to dashboard (or home for now)
    navigate('/');
  };

  return (
    <OnboardingFlow
      onComplete={handleOnboardingComplete}
      userType={userType}
    />
  );
};

export default Onboarding;
