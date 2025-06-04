
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Building, User, FileText, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Organization Details
    companyName: '',
    institutionType: '',
    aumRange: '',
    primaryContact: '',
    jurisdiction: '',
    
    // Step 2: User Details
    fullName: '',
    title: '',
    workEmail: '',
    phone: '',
    department: '',
    investmentFocus: '',
    
    // Step 3: Verification
    documentsUploaded: false,
    complianceAcknowledged: false,
    termsAccepted: false,
    amlCompliance: false,
    
    // Step 4: Account Setup
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
    twoFactorEnabled: false,
    notifications: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

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
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Registration Submitted Successfully",
        description: "Our compliance team will review your application within 48 hours.",
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const stepTitles = [
    'Organization Details',
    'User Information',
    'Verification & Compliance',
    'Account Setup'
  ];

  const stepIcons = [Building, User, FileText, Settings];

  return (
    <div className="min-h-screen bg-gradient-to-br from-korbly-navy via-korbly-dark to-korbly-navy relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%230084FF" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-float"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-korbly-blue to-korbly-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-2xl font-bold text-white">Korbly</span>
            </Link>
            <p className="text-korbly-silver mt-2">Institutional Access Registration</p>
          </div>

          {/* Progress Indicator */}
          <Card className="glass border-white/20 mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Step {currentStep} of {totalSteps}</span>
                  <span className="text-korbly-silver text-sm">Estimated time: 5 minutes</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="grid grid-cols-4 gap-2">
                  {stepTitles.map((title, index) => {
                    const StepIcon = stepIcons[index];
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;
                    
                    return (
                      <div key={index} className={`text-center p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-korbly-blue/20' : isCompleted ? 'bg-green-500/20' : 'bg-white/5'
                      }`}>
                        <StepIcon className={`w-5 h-5 mx-auto mb-1 ${
                          isActive ? 'text-korbly-blue' : isCompleted ? 'text-green-500' : 'text-gray-400'
                        }`} />
                        <div className={`text-xs ${
                          isActive ? 'text-white' : isCompleted ? 'text-green-500' : 'text-gray-400'
                        }`}>
                          {title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Card */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">
                {stepTitles[currentStep - 1]}
              </CardTitle>
              {currentStep === 1 && (
                <p className="text-korbly-silver text-center">
                  Tell us about your organization and institutional requirements
                </p>
              )}
              {currentStep === 2 && (
                <p className="text-korbly-silver text-center">
                  Provide your professional contact information
                </p>
              )}
              {currentStep === 3 && (
                <p className="text-korbly-silver text-center">
                  Upload required documents and acknowledge compliance requirements
                </p>
              )}
              {currentStep === 4 && (
                <p className="text-korbly-silver text-center">
                  Set up your secure account credentials and preferences
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Organization Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Company/Institution Name *</label>
                    <Input
                      required
                      value={formData.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      placeholder="Enter institution name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Institution Type *</label>
                      <Select onValueChange={(value) => handleChange('institutionType', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pension">Pension Fund</SelectItem>
                          <SelectItem value="insurance">Insurance Company</SelectItem>
                          <SelectItem value="hnwi">HNWI/Family Office</SelectItem>
                          <SelectItem value="dfi">Development Finance Institution</SelectItem>
                          <SelectItem value="sovereign">Sovereign Wealth Fund</SelectItem>
                          <SelectItem value="other">Other Institutional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">AUM Range *</label>
                      <Select onValueChange={(value) => handleChange('aumRange', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50-100m">$50M - $100M</SelectItem>
                          <SelectItem value="100-500m">$100M - $500M</SelectItem>
                          <SelectItem value="500m-1b">$500M - $1B</SelectItem>
                          <SelectItem value="1b-5b">$1B - $5B</SelectItem>
                          <SelectItem value="5b+">$5B+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Primary Contact Email *</label>
                      <Input
                        required
                        type="email"
                        value={formData.primaryContact}
                        onChange={(e) => handleChange('primaryContact', e.target.value)}
                        placeholder="contact@institution.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Regulatory Jurisdiction *</label>
                      <Select onValueChange={(value) => handleChange('jurisdiction', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ghana">Ghana</SelectItem>
                          <SelectItem value="nigeria">Nigeria</SelectItem>
                          <SelectItem value="kenya">Kenya</SelectItem>
                          <SelectItem value="south-africa">South Africa</SelectItem>
                          <SelectItem value="other">Other African Market</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: User Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Full Name *</label>
                      <Input
                        required
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Title/Position *</label>
                      <Input
                        required
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g., CIO, Portfolio Manager"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Work Email *</label>
                      <Input
                        required
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => handleChange('workEmail', e.target.value)}
                        placeholder="you@institution.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Phone Number *</label>
                      <Input
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+233 (0) 123 456 789"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Department</label>
                      <Input
                        value={formData.department}
                        onChange={(e) => handleChange('department', e.target.value)}
                        placeholder="e.g., Investments, Risk"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Investment Focus</label>
                      <Select onValueChange={(value) => handleChange('investmentFocus', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select focus area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corporate-credit">Corporate Credit</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                          <SelectItem value="sme-finance">SME Finance</SelectItem>
                          <SelectItem value="government">Government Securities</SelectItem>
                          <SelectItem value="diversified">Diversified Portfolio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Verification */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Document Upload</h3>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                      <FileText className="w-12 h-12 text-korbly-blue mx-auto mb-4" />
                      <p className="text-white mb-2">Upload Required Documents</p>
                      <p className="text-korbly-silver text-sm mb-4">
                        Certificate of incorporation, regulatory licenses, AML/KYC documentation
                      </p>
                      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-korbly-navy">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Compliance Acknowledgments</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="compliance"
                          checked={formData.complianceAcknowledged}
                          onCheckedChange={(checked) => handleChange('complianceAcknowledged', checked as boolean)}
                        />
                        <label htmlFor="compliance" className="text-sm text-white">
                          I acknowledge that our institution meets the regulatory requirements for private credit investment in our jurisdiction
                        </label>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) => handleChange('termsAccepted', checked as boolean)}
                        />
                        <label htmlFor="terms" className="text-sm text-white">
                          I accept the Terms of Service and Privacy Policy
                        </label>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="aml"
                          checked={formData.amlCompliance}
                          onCheckedChange={(checked) => handleChange('amlCompliance', checked as boolean)}
                        />
                        <label htmlFor="aml" className="text-sm text-white">
                          Our institution complies with AML/KYC regulations and will provide required documentation
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Account Setup */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Password *</label>
                      <Input
                        required
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder="Create secure password"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Confirm Password *</label>
                      <Input
                        required
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        placeholder="Confirm password"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Security Question</label>
                    <Select onValueChange={(value) => handleChange('securityQuestion', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Choose security question" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first-job">What was your first job?</SelectItem>
                        <SelectItem value="mother-maiden">What is your mother's maiden name?</SelectItem>
                        <SelectItem value="pet-name">What was the name of your first pet?</SelectItem>
                        <SelectItem value="school">What was the name of your elementary school?</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Security Answer</label>
                    <Input
                      value={formData.securityAnswer}
                      onChange={(e) => handleChange('securityAnswer', e.target.value)}
                      placeholder="Enter your answer"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="2fa"
                        checked={formData.twoFactorEnabled}
                        onCheckedChange={(checked) => handleChange('twoFactorEnabled', checked as boolean)}
                      />
                      <label htmlFor="2fa" className="text-sm text-white">
                        Enable two-factor authentication (recommended)
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="notifications"
                        checked={formData.notifications}
                        onCheckedChange={(checked) => handleChange('notifications', checked as boolean)}
                      />
                      <label htmlFor="notifications" className="text-sm text-white">
                        Receive platform updates and notifications
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="border-white text-white hover:bg-white hover:text-korbly-navy"
                >
                  Back
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="bg-korbly-blue hover:bg-korbly-blue/90 text-white"
                >
                  {currentStep === totalSteps ? (isLoading ? 'Submitting...' : 'Submit Application') : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Badges */}
          <div className="mt-8 flex justify-center space-x-4">
            <Badge variant="secondary" className="bg-white/10 text-white">
              <Shield className="w-3 h-3 mr-1" />
              Enterprise Security
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Compliance Ready
            </Badge>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-korbly-silver">
              Already have an account?{' '}
              <Link to="/login" className="text-korbly-blue hover:text-korbly-gold transition-colors font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
