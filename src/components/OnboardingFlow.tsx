
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, FileText, Shield, Users, Building } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
  userType: 'pension' | 'insurance' | 'dfi' | 'sovereign' | 'hnwi' | 'other';
}

const OnboardingFlow = ({ onComplete, userType }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const getStepsForUserType = (type: string) => {
    const baseSteps = [
      {
        id: 'welcome',
        title: 'Welcome to Korbly',
        description: 'Your institutional private credit platform',
        icon: Building,
        estimatedTime: '2 min'
      },
      {
        id: 'compliance',
        title: 'Compliance Verification',
        description: 'Verify regulatory requirements and documentation',
        icon: Shield,
        estimatedTime: '10 min'
      },
      {
        id: 'portfolio',
        title: 'Portfolio Setup',
        description: 'Configure your investment parameters and preferences',
        icon: FileText,
        estimatedTime: '15 min'
      },
      {
        id: 'team',
        title: 'Team Access',
        description: 'Set up team members and permission levels',
        icon: Users,
        estimatedTime: '8 min'
      }
    ];

    // Add specific steps based on user type
    if (type === 'pension') {
      baseSteps.splice(2, 0, {
        id: 'actuarial',
        title: 'Actuarial Models',
        description: 'Configure pension-specific risk models and liability matching',
        icon: FileText,
        estimatedTime: '12 min'
      });
    } else if (type === 'insurance') {
      baseSteps.splice(2, 0, {
        id: 'solvency',
        title: 'Solvency Requirements',
        description: 'Set up Solvency II compliance and capital requirements',
        icon: Shield,
        estimatedTime: '10 min'
      });
    }

    return baseSteps;
  };

  const steps = getStepsForUserType(userType);
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleStepComplete = () => {
    setCompletedSteps([...completedSteps, currentStep]);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-korbly-navy to-korbly-dark flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Header */}
        <Card className="glass border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Institutional Onboarding</h2>
                <p className="text-korbly-silver">Step {currentStep + 1} of {steps.length}</p>
              </div>
              <Badge variant="secondary" className="bg-korbly-blue/20 text-white">
                <Clock className="w-4 h-4 mr-2" />
                {currentStepData.estimatedTime} remaining
              </Badge>
            </div>
            <Progress value={progress} className="h-2 bg-white/10" />
            
            {/* Step Indicators */}
            <div className="flex justify-between mt-6">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                const isActive = index === currentStep;
                const StepIcon = step.icon;
                
                return (
                  <div key={step.id} className="flex flex-col items-center space-y-2">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-colors
                      ${isCompleted ? 'bg-green-500' : isActive ? 'bg-korbly-blue' : 'bg-white/20'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <StepIcon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className={`text-xs text-center ${isActive ? 'text-white' : 'text-korbly-silver'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Step Content */}
        <Card className="glass border-white/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-korbly-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <currentStepData.icon className="w-8 h-8 text-korbly-blue" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {currentStepData.title}
            </CardTitle>
            <p className="text-korbly-silver">
              {currentStepData.description}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step-specific content */}
            {currentStep === 0 && (
              <div className="text-center space-y-4">
                <p className="text-white text-lg">
                  Welcome to Korbly's institutional platform. We'll help you set up your account 
                  for optimal private credit management.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <Shield className="w-8 h-8 text-korbly-blue mb-2" />
                    <h3 className="font-semibold text-white">Bank-Grade Security</h3>
                    <p className="text-sm text-korbly-silver">SOC 2 compliant infrastructure</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <FileText className="w-8 h-8 text-korbly-gold mb-2" />
                    <h3 className="font-semibold text-white">Regulatory Ready</h3>
                    <p className="text-sm text-korbly-silver">Built for compliance</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <Users className="w-8 h-8 text-green-500 mb-2" />
                    <h3 className="font-semibold text-white">Team Collaboration</h3>
                    <p className="text-sm text-korbly-silver">Multi-user institutional access</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep > 0 && (
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="font-semibold text-white mb-4">Configuration Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-korbly-silver">Step configuration</span>
                    <Badge variant="secondary" className="bg-korbly-blue/20 text-white">
                      Institutional Grade
                    </Badge>
                  </div>
                  <div className="h-20 bg-white/5 rounded border-2 border-dashed border-white/20 flex items-center justify-center">
                    <span className="text-korbly-silver">Configuration interface would appear here</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className="border-white text-white hover:bg-white hover:text-korbly-navy"
              >
                Previous
              </Button>
              
              <Button
                onClick={handleStepComplete}
                className="bg-korbly-blue hover:bg-korbly-blue/90 text-white px-8"
              >
                {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
