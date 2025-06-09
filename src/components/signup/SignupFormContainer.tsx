
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignupStepIndicator from './SignupStepIndicator';
import CompanyInformationStep from './CompanyInformationStep';
import ContactInformationStep from './ContactInformationStep';
import VerificationStep from './VerificationStep';
import AccountSecurityStep from './AccountSecurityStep';

interface SignupFormContainerProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  stepIcons: any[];
  formData: any;
  handleChange: (field: string, value: string | boolean | string[]) => void;
  handleRegulatoryChange: (regulator: string, checked: boolean) => void;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  passwordStrength: (password: string) => number;
  handleNext: () => void;
  handleBack: () => void;
  isLoading: boolean;
  isStepValid: () => boolean;
}

const SignupFormContainer = ({
  currentStep,
  totalSteps,
  stepTitles,
  stepIcons,
  formData,
  handleChange,
  handleRegulatoryChange,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  passwordStrength,
  handleNext,
  handleBack,
  isLoading,
  isStepValid
}: SignupFormContainerProps) => {
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyInformationStep
            formData={formData}
            handleChange={handleChange}
            handleRegulatoryChange={handleRegulatoryChange}
          />
        );
      case 2:
        return (
          <ContactInformationStep
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <VerificationStep
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 4:
        return (
          <AccountSecurityStep
            formData={formData}
            handleChange={handleChange}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            setShowPassword={setShowPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            passwordStrength={passwordStrength}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      {/* Mobile Header */}
      <div className="lg:hidden border-b border-gray-200 bg-white p-4">
        <Link to="/" className="inline-flex items-center space-x-3">
          <div className="w-10 h-10 bg-korbly-blue rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-korbly-navy">Korbly</span>
        </Link>
      </div>

      {/* Form Container */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-korbly-navy mb-2">Request Institutional Access</h1>
            <p className="text-gray-600">Join leading investors in African private credit markets</p>
          </div>

          {/* Progress Indicator */}
          <SignupStepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Form Card */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-korbly-navy text-center flex items-center justify-center space-x-2">
                {React.createElement(stepIcons[currentStep - 1], { className: "w-5 h-5 text-korbly-blue" })}
                <span>{stepTitles[currentStep - 1]}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 order-2 sm:order-1"
                >
                  Back
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={isLoading || !isStepValid()}
                  className="bg-korbly-blue hover:bg-blue-700 text-white px-8 order-1 sm:order-2"
                >
                  {currentStep === totalSteps ? (isLoading ? 'Creating Account...' : 'Create Account') : 'Continue'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security & Login Link */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                <Shield className="w-3 h-3 mr-1" />
                Enterprise Security
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Compliance Ready
              </Badge>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-korbly-blue hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupFormContainer;
