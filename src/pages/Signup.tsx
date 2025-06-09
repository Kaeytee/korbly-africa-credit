import { useState } from 'react';
import { 
  Building2, 
  User, 
  FileText, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Circle,
  ArrowRight,
  ArrowLeft,
  Shield,
  TrendingUp,
  Users,
  Award,
  Upload,
  Check,
  Loader2,
  Star,
  Globe,
  Zap
} from 'lucide-react';

const Signup = () => {
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
      setIsLoading(false);
      // Navigate to onboarding
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

  const institutionTypes = [
    'Pension Fund',
    'Insurance Company',
    'Development Finance Institution',
    'Asset Manager',
    'Sovereign Wealth Fund',
    'Bank',
    'Other'
  ];

  const countries = [
    'Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Egypt', 
    'Morocco', 'Ethiopia', 'Tanzania', 'Uganda', 'Rwanda'
  ];

  const regulators = [
    'Central Bank',
    'Securities Commission',
    'Insurance Regulatory Authority',
    'Pension Regulatory Authority',
    'Financial Services Commission'
  ];

  const departments = [
    'Investment Management',
    'Risk Management',
    'Compliance',
    'Treasury',
    'Asset Management',
    'Other'
  ];

  const securityQuestions = [
    'What was the name of your first school?',
    'What is your mother\'s maiden name?',
    'What was the name of your first pet?',
    'In which city were you born?',
    'What is your favorite book?'
  ];

  // Floating particles for hero section
  const ParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Institution Name *
                </label>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={(e) => handleChange('institutionName', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  placeholder="Enter your institution name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Institution Type *
                </label>
                <select
                  value={formData.institutionType}
                  onChange={(e) => handleChange('institutionType', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                >
                  <option value="">Select institution type</option>
                  {institutionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Assets Under Management *
                </label>
                <select
                  value={formData.assetsUnderManagement}
                  onChange={(e) => handleChange('assetsUnderManagement', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                >
                  <option value="">Select AUM range</option>
                  <option value="<$100M">Less than $100M</option>
                  <option value="$100M-$500M">$100M - $500M</option>
                  <option value="$500M-$1B">$500M - $1B</option>
                  <option value="$1B-$5B">$1B - $5B</option>
                  <option value=">$5B">Greater than $5B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Primary Country *
                </label>
                <select
                  value={formData.primaryCountry}
                  onChange={(e) => handleChange('primaryCountry', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                >
                  <option value="">Select country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Regulatory Oversight
                </label>
                <div className="space-y-3">
                  {regulators.map(regulator => (
                    <label key={regulator} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.regulatoryOversight.includes(regulator)}
                          onChange={(e) => handleRegulatoryChange(regulator, e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                          formData.regulatoryOversight.includes(regulator)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-slate-300 group-hover:border-blue-300'
                        }`}>
                          {formData.regulatoryOversight.includes(regulator) && (
                            <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                          )}
                        </div>
                      </div>
                      <span className="text-slate-700 group-hover:text-slate-900 transition-colors">
                        {regulator}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange('jobTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  placeholder="Enter your job title"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Work Email *
              </label>
              <input
                type="email"
                value={formData.workEmail}
                onChange={(e) => handleChange('workEmail', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                placeholder="Enter your work email"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Years of Experience
              </label>
              <select
                value={formData.yearsExperience}
                onChange={(e) => handleChange('yearsExperience', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
              >
                <option value="">Select experience range</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-15">11-15 years</option>
                <option value="15+">15+ years</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="font-semibold text-amber-800 mb-2">Document Upload</h3>
              <p className="text-amber-700 text-sm mb-4">
                Please upload the required institutional documents for verification.
              </p>
              <button
                onClick={() => handleChange('documentsUploaded', true)}
                className={`w-full px-4 py-3 rounded-xl border-2 border-dashed transition-all duration-200 ${
                  formData.documentsUploaded
                    ? 'border-green-300 bg-green-50 text-green-700'
                    : 'border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400'
                }`}
              >
                <Upload className="w-5 h-5 mx-auto mb-2" />
                {formData.documentsUploaded ? 'Documents Uploaded' : 'Upload Documents'}
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 mb-4">Compliance Verification</h3>
              
              {[
                { key: 'licensed', label: 'Institution is properly licensed in operating jurisdiction' },
                { key: 'authority', label: 'Authorized to engage in institutional investment activities' },
                { key: 'amlKyc', label: 'AML/KYC procedures are in place and operational' },
                { key: 'terms', label: 'I agree to the Terms of Service and Privacy Policy' }
              ].map(item => (
                <label key={item.key} className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={formData.complianceChecks[item.key as keyof typeof formData.complianceChecks]}
                      onChange={(e) => handleChange(`complianceChecks.${item.key}`, e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                      formData.complianceChecks[item.key as keyof typeof formData.complianceChecks]
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-slate-300 group-hover:border-blue-300'
                    }`}>
                      {formData.complianceChecks[item.key as keyof typeof formData.complianceChecks] && (
                        <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                      )}
                    </div>
                  </div>
                  <span className="text-slate-700 group-hover:text-slate-900 transition-colors text-sm leading-relaxed">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength(formData.password) < 40 ? 'bg-red-500' :
                            passwordStrength(formData.password) < 80 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${passwordStrength(formData.password)}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">
                        {passwordStrength(formData.password) < 40 ? 'Weak' :
                         passwordStrength(formData.password) < 80 ? 'Medium' : 'Strong'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Security Question 1
                  </label>
                  <select
                    value={formData.securityQuestion1}
                    onChange={(e) => handleChange('securityQuestion1', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  >
                    <option value="">Select a security question</option>
                    {securityQuestions.map(question => (
                      <option key={question} value={question}>{question}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Answer
                  </label>
                  <input
                    type="text"
                    value={formData.securityAnswer1}
                    onChange={(e) => handleChange('securityAnswer1', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                    placeholder="Enter your answer"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="twoFactor"
                  checked={formData.enableTwoFactor}
                  onChange={(e) => handleChange('enableTwoFactor', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="twoFactor" className="text-sm text-slate-700">
                  Enable two-factor authentication (recommended for institutional accounts)
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-blue-300 mr-2" />
                <span className="text-blue-200 text-sm font-medium">Institutional Platform</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Join Africa's Leading
                <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Private Credit Platform
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                Trusted by leading institutional investors across the continent for sophisticated private credit opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <TrendingUp className="w-6 h-6" />, label: "$2.3B+ AUM", color: "from-blue-500 to-cyan-500" },
                  { icon: <Users className="w-6 h-6" />, label: "150+ Partners", color: "from-purple-500 to-pink-500" },
                  { icon: <Award className="w-6 h-6" />, label: "99.9% Uptime", color: "from-green-500 to-emerald-500" },
                  { icon: <Globe className="w-6 h-6" />, label: "54 Markets", color: "from-amber-500 to-orange-500" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <div>
                      <div className="font-semibold">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">Institutional Grade Security</span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">SEC Registered & Compliant</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Bank-Grade Encryption</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Multi-Factor Authentication</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                {Array.from({ length: totalSteps }, (_, index) => {
                  const stepNumber = index + 1;
                  const StepIcon = stepIcons[index];
                  const isActive = stepNumber === currentStep;
                  const isCompleted = stepNumber < currentStep;
                  
                  return (
                    <div key={stepNumber} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isActive 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-slate-200 text-slate-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>
                      {stepNumber < totalSteps && (
                        <div className={`w-8 h-0.5 mx-2 transition-colors ${
                          stepNumber < currentStep ? 'bg-green-500' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {stepTitles[currentStep - 1]}
                </h2>
                <p className="text-slate-600">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="mb-8">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  currentStep === 1
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!isStepValid() || isLoading}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isStepValid() && !isLoading
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === totalSteps ? 'Complete Registration' : 'Continue'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Your data is secure</p>
                  <p className="text-xs text-blue-600 mt-1">
                    All information is encrypted and stored according to institutional security standards.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Already have an account section */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-px bg-slate-200 w-16"></div>
                <span className="text-sm text-slate-500">Already have an account?</span>
                <div className="h-px bg-slate-200 w-16"></div>
              </div>
              <button
                onClick={() => window.location.href = '/login'}
                className="mt-4 inline-flex items-center justify-center space-x-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-all duration-200"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In to Your Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;