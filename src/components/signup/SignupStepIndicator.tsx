
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Building2, User, FileText, Lock } from 'lucide-react';

interface SignupStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const SignupStepIndicator = ({ currentStep, totalSteps }: SignupStepIndicatorProps) => {
  const progress = (currentStep / totalSteps) * 100;
  const stepTitles = ['Company Details', 'Contact Information', 'Verification & Compliance', 'Account Security'];
  const stepIcons = [Building2, User, FileText, Lock];

  return (
    <Card className="bg-white border border-gray-200 shadow-sm mb-8">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-korbly-navy font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-gray-600 text-sm">~5 minutes</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
          
          {/* Step Indicators */}
          <div className="grid grid-cols-4 gap-2">
            {stepTitles.map((title, index) => {
              const StepIcon = stepIcons[index];
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
              
              return (
                <div
                  key={index}
                  className={`text-center p-2 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-50 border border-blue-200' : isCompleted ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <StepIcon className={`w-4 h-4 mx-auto mb-1 ${
                    isActive ? 'text-korbly-blue' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <div className={`text-xs font-medium ${
                    isActive ? 'text-korbly-blue' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {title.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupStepIndicator;
