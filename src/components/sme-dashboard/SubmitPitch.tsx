import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Upload,
  Check,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/components/ui/alert';

// Note: This assumes you have these UI components in your project
// If not, you'll need to implement or import them from a library like shadcn/ui

interface PitchFormData {
  businessName: string;
  industry: string;
  pitchTitle: string;
  pitchSummary: string;
  fundingAmount: string;
  businessStage: string;
  pitchDeck: File | null;
  financialProjections: File | null;
}

const initialFormData: PitchFormData = {
  businessName: '',
  industry: '',
  pitchTitle: '',
  pitchSummary: '',
  fundingAmount: '',
  businessStage: '',
  pitchDeck: null,
  financialProjections: null
};

const SubmitPitchSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PitchFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (field: keyof PitchFormData, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field: 'pitchDeck' | 'financialProjections', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleInputChange(field, e.target.files[0]);
    }
  };

  const validateCurrentStep = (): boolean => {
    // Basic validation logic for each step
    if (currentStep === 1) {
      return !!formData.businessName && !!formData.industry;
    } else if (currentStep === 2) {
      return !!formData.pitchTitle && !!formData.pitchSummary && !!formData.fundingAmount;
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      setErrorMessage('Please fill in all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrorMessage('');
  };

  const submitPitch = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccessMessage('Your pitch has been submitted successfully! Our team will review it shortly.');
      setFormData(initialFormData);
      setCurrentStep(1);
    } catch (error) {
      setErrorMessage('There was a problem submitting your pitch. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Business Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <Input
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Enter your business name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry *
                </label>
                <Select 
                  value={formData.industry} 
                  onValueChange={(value) => handleInputChange('industry', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Financial Services</SelectItem>
                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Stage
                </label>
                <Select 
                  value={formData.businessStage} 
                  onValueChange={(value) => handleInputChange('businessStage', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Idea Stage</SelectItem>
                    <SelectItem value="mvp">MVP / Prototype</SelectItem>
                    <SelectItem value="early-revenue">Early Revenue</SelectItem>
                    <SelectItem value="growth">Growth Stage</SelectItem>
                    <SelectItem value="scaling">Scaling</SelectItem>
                    <SelectItem value="established">Established Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pitch Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pitch Title *
                </label>
                <Input
                  value={formData.pitchTitle}
                  onChange={(e) => handleInputChange('pitchTitle', e.target.value)}
                  placeholder="Enter a compelling title for your pitch"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funding Amount Needed *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <Input
                    type="text"
                    className="pl-7"
                    value={formData.fundingAmount}
                    onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
                    placeholder="e.g., 100,000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pitch Summary *
                </label>
                <Textarea
                  value={formData.pitchSummary}
                  onChange={(e) => handleInputChange('pitchSummary', e.target.value)}
                  placeholder="Provide a compelling summary of your business and what you're seeking funding for..."
                  rows={5}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Supporting Documents</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pitch Deck (PDF, PPTX)
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    id="pitchDeck"
                    type="file"
                    accept=".pdf,.pptx"
                    onChange={(e) => handleFileUpload('pitchDeck', e)}
                    className="hidden"
                  />
                  <label
                    htmlFor="pitchDeck"
                    className="cursor-pointer flex items-center justify-center w-full p-4 border border-dashed border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    {formData.pitchDeck ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <Check className="h-5 w-5" />
                        <span>{formData.pitchDeck.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Upload className="h-5 w-5" />
                        <span>Upload Pitch Deck</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Financial Projections (PDF, XLSX)
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    id="financialProjections"
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv"
                    onChange={(e) => handleFileUpload('financialProjections', e)}
                    className="hidden"
                  />
                  <label
                    htmlFor="financialProjections"
                    className="cursor-pointer flex items-center justify-center w-full p-4 border border-dashed border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    {formData.financialProjections ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <Check className="h-5 w-5" />
                        <span>{formData.financialProjections.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Upload className="h-5 w-5" />
                        <span>Upload Financial Projections</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Supporting documents greatly increase your chances of securing funding. 
                      While optional, we strongly recommend uploading them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Submit Your Funding Pitch</h2>
        
        {successMessage && (
          <Alert className="mb-6 bg-green-50 border border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}
        
        {errorMessage && (
          <Alert className="mb-6 bg-red-50 border border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div 
                key={step}
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">Company Info</span>
            <span className="text-xs text-gray-500">Pitch Details</span>
            <span className="text-xs text-gray-500">Documents</span>
          </div>
        </div>

        {/* Form steps */}
        <div className="mb-8">
          {renderStepContent()}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="px-6"
            >
              Back
            </Button>
          )}
          
          <div className="ml-auto">
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="px-6"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={submitPitch}
                disabled={isSubmitting}
                className="px-6 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Pitch'
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>
      
      <Card className="p-8">
        <h3 className="text-xl font-semibold mb-4">What Happens Next?</h3>
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 mr-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-semibold text-blue-600">1</span>
            </div>
            <div>
              <h4 className="font-medium">Review</h4>
              <p className="text-gray-600 text-sm">
                Our team reviews your pitch (typically within 48 hours)
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mr-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-semibold text-blue-600">2</span>
            </div>
            <div>
              <h4 className="font-medium">Verification</h4>
              <p className="text-gray-600 text-sm">
                We may request additional documentation or clarification
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mr-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-semibold text-blue-600">3</span>
            </div>
            <div>
              <h4 className="font-medium">Investor Matching</h4>
              <p className="text-gray-600 text-sm">
                Your pitch becomes visible to relevant investors on our platform
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mr-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-semibold text-blue-600">4</span>
            </div>
            <div>
              <h4 className="font-medium">Engagement</h4>
              <p className="text-gray-600 text-sm">
                Track investor interest and engage directly through our platform
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SubmitPitchSection;
