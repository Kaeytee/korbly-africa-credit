
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, FileText, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SignupHeroSection from '@/components/signup/SignupHeroSection';
import SignupFormContainer from '@/components/signup/SignupFormContainer';

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Company Information
    institutionName: '',
    institutionType: '',
    assetsUnderManagement: '',
    primaryCountry: '',
    regulatoryOversight: [] as string[],
    // Step 2: Contact Information
    fullName: '',
    jobTitle: '',
    workEmail: '',
    phoneNumber: '',
    department: '',
    yearsExperience: '',
    // Step 3: Verification
    documentsUploaded: false,
    complianceChecks: {
      licensed: false,
      authority: false,
      amlKyc: false,
      terms: false
    },
    // Step 4: Account Security
    password: '',
    confirmPassword: '',
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
    enableTwoFactor: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const totalSteps = 4;
  const stepTitles = ['Company Details', 'Contact Information', 'Verification & Compliance', 'Account Security'];
  const stepIcons = [Building2, User, FileText, Lock];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Registration Submitted Successfully",
        description: "Redirecting to institutional onboarding..."
      });
      setIsLoading(false);
      navigate('/onboarding');
    }, 2000);
  };

  const handleChange = (field: string, value: string | boolean | string[]) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleRegulatoryChange = (regulator: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      regulatoryOversight: checked 
        ? [...prev.regulatoryOversight, regulator]
        : prev.regulatoryOversight.filter(r => r !== regulator)
    }));
  };

  const passwordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return strength;
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.institutionName && formData.institutionType && formData.assetsUnderManagement && formData.primaryCountry);
      case 2:
        return !!(formData.fullName && formData.jobTitle && formData.workEmail && formData.phoneNumber);
      case 3:
        return Object.values(formData.complianceChecks).every(check => check === true);
      case 4:
        return !!(formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && passwordStrength(formData.password) === 100);
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <SignupHeroSection />
      <SignupFormContainer
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitles={stepTitles}
        stepIcons={stepIcons}
        formData={formData}
        handleChange={handleChange}
        handleRegulatoryChange={handleRegulatoryChange}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        setShowPassword={setShowPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        passwordStrength={passwordStrength}
        handleNext={handleNext}
        handleBack={handleBack}
        isLoading={isLoading}
        isStepValid={isStepValid}
      />
    </div>
  );
};

export default Signup;
