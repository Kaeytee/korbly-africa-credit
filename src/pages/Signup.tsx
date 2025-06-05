
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Building, User, FileText, Settings, Upload, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = ['Company Details', 'Contact Information', 'Verification & Compliance', 'Account Security'];
  const stepIcons = [Building, User, FileText, Settings];

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

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return strength;
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.institutionName && formData.institutionType && formData.assetsUnderManagement && formData.primaryCountry;
      case 2:
        return formData.fullName && formData.jobTitle && formData.workEmail && formData.phoneNumber;
      case 3:
        return Object.values(formData.complianceChecks).every(check => check);
      case 4:
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && passwordStrength(formData.password) === 100;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="w-10 h-10 bg-korbly-blue rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-korbly-navy">Korbly</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-korbly-blue rounded-lg flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-korbly-navy mb-2">Institutional Access Registration</h1>
          <p className="text-gray-600">Join the leading private credit platform for institutional investors</p>
        </div>

        {/* Progress Indicator */}
        <Card className="bg-white border border-gray-200 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-korbly-navy font-medium">Step {currentStep} of {totalSteps}</span>
                <span className="text-gray-600 text-sm">Estimated time: 5 minutes</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-200" />
              
              {/* Step Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {stepTitles.map((title, index) => {
                  const StepIcon = stepIcons[index];
                  const stepNumber = index + 1;
                  const isActive = stepNumber === currentStep;
                  const isCompleted = stepNumber < currentStep;
                  
                  return (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-50 border border-blue-200' : isCompleted ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <StepIcon className={`w-5 h-5 mx-auto mb-2 ${
                        isActive ? 'text-korbly-blue' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div className={`text-xs font-medium ${
                        isActive ? 'text-korbly-blue' : isCompleted ? 'text-green-600' : 'text-gray-400'
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
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-korbly-navy text-center">
              {stepTitles[currentStep - 1]}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* Step 1: Company Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-korbly-navy">Institution Name *</label>
                  <Input
                    required
                    value={formData.institutionName}
                    onChange={(e) => handleChange('institutionName', e.target.value)}
                    placeholder="Enter your institution's full legal name"
                    className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Institution Type *</label>
                    <Select onValueChange={(value) => handleChange('institutionType', value)}>
                      <SelectTrigger className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0">
                        <SelectValue placeholder="Select institution type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        <SelectItem value="pension">Pension Fund</SelectItem>
                        <SelectItem value="insurance">Insurance Company</SelectItem>
                        <SelectItem value="asset-management">Asset Management Firm</SelectItem>
                        <SelectItem value="family-office">High Net Worth Family Office</SelectItem>
                        <SelectItem value="dfi">Development Finance Institution</SelectItem>
                        <SelectItem value="sovereign">Sovereign Wealth Fund</SelectItem>
                        <SelectItem value="private-equity">Private Equity Fund</SelectItem>
                        <SelectItem value="hedge-fund">Hedge Fund</SelectItem>
                        <SelectItem value="other">Other Financial Institution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Assets Under Management *</label>
                    <Select onValueChange={(value) => handleChange('assetsUnderManagement', value)}>
                      <SelectTrigger className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0">
                        <SelectValue placeholder="Select AUM range" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        <SelectItem value="under-10m">Under $10 Million</SelectItem>
                        <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                        <SelectItem value="50m-100m">$50M - $100M</SelectItem>
                        <SelectItem value="100m-500m">$100M - $500M</SelectItem>
                        <SelectItem value="500m-1b">$500M - $1B</SelectItem>
                        <SelectItem value="1b-5b">$1B - $5B</SelectItem>
                        <SelectItem value="over-5b">Over $5B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-korbly-navy">Primary Country *</label>
                  <Select onValueChange={(value) => handleChange('primaryCountry', value)}>
                    <SelectTrigger className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0">
                      <SelectValue placeholder="Select primary operating country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="kenya">Kenya</SelectItem>
                      <SelectItem value="south-africa">South Africa</SelectItem>
                      <SelectItem value="rwanda">Rwanda</SelectItem>
                      <SelectItem value="morocco">Morocco</SelectItem>
                      <SelectItem value="egypt">Egypt</SelectItem>
                      <SelectItem value="other-african">Other African Country</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-korbly-navy">Regulatory Oversight</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Bank of Ghana', 'SEC Ghana', 'Central Bank of Nigeria', 'SEC Nigeria', 'Capital Markets Authority Kenya', 'Financial Services Board South Africa', 'Other African Regulator', 'International Regulator'].map((regulator) => (
                      <div key={regulator} className="flex items-center space-x-2">
                        <Checkbox
                          id={regulator}
                          checked={formData.regulatoryOversight.includes(regulator)}
                          onCheckedChange={(checked) => handleRegulatoryChange(regulator, checked as boolean)}
                        />
                        <label htmlFor={regulator} className="text-sm text-gray-700">
                          {regulator}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Full Name *</label>
                    <Input
                      required
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Job Title *</label>
                    <Input
                      required
                      value={formData.jobTitle}
                      onChange={(e) => handleChange('jobTitle', e.target.value)}
                      placeholder="e.g., CIO, Portfolio Manager, Investment Director"
                      className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Work Email *</label>
                    <Input
                      required
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => handleChange('workEmail', e.target.value)}
                      placeholder="your.name@institution.com"
                      className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Phone Number *</label>
                    <Input
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      placeholder="+233 (0) 123 456 789"
                      className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Department</label>
                    <Select onValueChange={(value) => handleChange('department', value)}>
                      <SelectTrigger className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        <SelectItem value="investment">Investment Management</SelectItem>
                        <SelectItem value="risk">Risk Management</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="treasury">Treasury</SelectItem>
                        <SelectItem value="executive">Executive Management</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Years of Experience</label>
                    <Select onValueChange={(value) => handleChange('yearsExperience', value)}>
                      <SelectTrigger className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16-20">16-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Verification & Compliance */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-korbly-navy">Document Upload</h3>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50">
                    <Upload className="w-12 h-12 text-korbly-blue mx-auto mb-4" />
                    <p className="text-korbly-navy mb-2 font-medium">Drag and drop institutional documents or click to browse</p>
                    <p className="text-gray-600 text-sm mb-4">
                      Certificate of incorporation, regulatory licenses, AML/KYC documentation
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Accepted formats: PDF, JPG, PNG • Maximum 10MB per file
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-korbly-blue text-korbly-blue hover:bg-korbly-blue hover:text-white"
                      onClick={() => handleChange('documentsUploaded', true)}
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-korbly-navy">Compliance Acknowledgments</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="licensed"
                        checked={formData.complianceChecks.licensed}
                        onCheckedChange={(checked) => handleChange('complianceChecks.licensed', checked as boolean)}
                      />
                      <label htmlFor="licensed" className="text-sm text-korbly-navy">
                        I confirm our institution is properly licensed and authorized to engage in investment activities in our jurisdiction
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="authority"
                        checked={formData.complianceChecks.authority}
                        onCheckedChange={(checked) => handleChange('complianceChecks.authority', checked as boolean)}
                      />
                      <label htmlFor="authority" className="text-sm text-korbly-navy">
                        I have the authority to represent this institution and enter into investment agreements
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="amlkyc"
                        checked={formData.complianceChecks.amlKyc}
                        onCheckedChange={(checked) => handleChange('complianceChecks.amlKyc', checked as boolean)}
                      />
                      <label htmlFor="amlkyc" className="text-sm text-korbly-navy">
                        Our institution complies with AML/KYC regulations and will provide required documentation upon request
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.complianceChecks.terms}
                        onCheckedChange={(checked) => handleChange('complianceChecks.terms', checked as boolean)}
                      />
                      <label htmlFor="terms" className="text-sm text-korbly-navy">
                        I accept the <Link to="/terms" className="text-korbly-blue hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-korbly-blue hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Account Security */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">New Password *</label>
                    <div className="relative">
                      <Input
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder="Create secure password"
                        className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-korbly-navy"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              passwordStrength(formData.password) === 100 ? 'bg-green-500' : 
                              passwordStrength(formData.password) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${passwordStrength(formData.password)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs space-y-1">
                          <div className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Minimum 8 characters
                          </div>
                          <div className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            One uppercase letter
                          </div>
                          <div className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            One lowercase letter
                          </div>
                          <div className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            One number
                          </div>
                          <div className={`flex items-center ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            One special character
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Confirm Password *</label>
                    <div className="relative">
                      <Input
                        required
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        placeholder="Confirm password"
                        className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-korbly-navy"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.confirmPassword && (
                      <div className={`text-xs ${formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                        {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Security Question 1</label>
                    <Select onValueChange={(value) => handleChange('securityQuestion1', value)}>
                      <SelectTrigger className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0">
                        <SelectValue placeholder="Choose security question" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        <SelectItem value="first-job">What was your first job?</SelectItem>
                        <SelectItem value="mother-maiden">What is your mother's maiden name?</SelectItem>
                        <SelectItem value="pet-name">What was the name of your first pet?</SelectItem>
                        <SelectItem value="school">What was the name of your elementary school?</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-korbly-navy">Security Answer 1</label>
                    <Input
                      value={formData.securityAnswer1}
                      onChange={(e) => handleChange('securityAnswer1', e.target.value)}
                      placeholder="Enter your answer"
                      className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="2fa"
                      checked={formData.enableTwoFactor}
                      onCheckedChange={(checked) => handleChange('enableTwoFactor', checked as boolean)}
                    />
                    <label htmlFor="2fa" className="text-sm text-korbly-navy">
                      Enable two-factor authentication for enhanced security (recommended)
                    </label>
                  </div>
                </div>
              </div>
            )}

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
                {currentStep === totalSteps ? (isLoading ? 'Creating Account...' : 'Create Institutional Account') : 'Continue to Next Step'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
            <Shield className="w-3 h-3 mr-1" />
            Enterprise Security
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Compliance Ready
          </Badge>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-korbly-blue hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
