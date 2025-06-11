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
  Zap,
  Briefcase,
  PieChart,
  CreditCard,
  Building,
  Target,
  DollarSign,
  Handshake,
  ChevronRight
} from 'lucide-react';

const Signup = () => {
  const [userType, setUserType] = useState(''); // 'hnwi', 'institution', or 'sme'
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Company Information
    institutionName: '',
    institutionType: '',
    primaryCountry: '',
    investmentCapacity: '', // For HNWI users
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
    uploadedFiles: [] as File[],
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

  const createDemoAccount = (type: string) => {
    const demoData = {
      hnwi: {
        institutionName: 'Acme Family Office',
        institutionType: 'Family Office',
        primaryCountry: 'Nigeria',
        investmentCapacity: '$5M - $10M',
        fullName: 'Sarah Chen',
        jobTitle: 'Chief Investment Officer',
        workEmail: 'sarah.chen@acmefamily.com',
        phoneNumber: '+234 802 123 4567',
        department: 'Investment Advisory',
        password: 'DemoPassword123!',
        confirmPassword: 'DemoPassword123!',
        enableTwoFactor: true
      },
      institution: {
        institutionName: 'African Pension Fund',
        institutionType: 'Pension Fund',
        primaryCountry: 'South Africa',
        regulatoryOversight: ['Central Bank /Federal Bank', 'Pension Regulatory Authority'],
        fullName: 'Michael Okafor',
        jobTitle: 'Head of Alternative Investments',
        workEmail: 'michael.okafor@africanpension.com',
        phoneNumber: '+27 11 123 4567',
        department: 'Investment Management',
        password: 'DemoPassword123!',
        confirmPassword: 'DemoPassword123!',
        enableTwoFactor: true
      },
      sme: {
        institutionName: 'TechGrow Solutions Ltd',
        institutionType: 'Technology/Software',
        primaryCountry: 'Kenya',
        fullName: 'Amara Johnson',
        jobTitle: 'Chief Executive Officer',
        workEmail: 'amara.johnson@techgrow.co.ke',
        phoneNumber: '+254 722 123 456',
        department: 'Executive Management',
        password: 'DemoPassword123!',
        confirmPassword: 'DemoPassword123!',
        enableTwoFactor: true
      }
    };

    const demo = demoData[type as keyof typeof demoData];
    
    setFormData(prev => ({
      ...prev,
      ...demo,
      complianceChecks: {
        licensed: true,
        authority: true,
        amlKyc: true,
        terms: true
      },
      documentsUploaded: true,
      uploadedFiles: [new File(['demo'], 'demo-document.pdf', { type: 'application/pdf' })],
      securityQuestion1: 'What was the name of your first school?',
      securityAnswer1: 'Demo School'
    }));

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Demo ${type.toUpperCase()} account created! Welcome to Korbly.`);
    }, 2000);
  };

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
      alert('Registration completed! Welcome to Korbly.');
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...fileArray],
        documentsUploaded: true
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
      documentsUploaded: prev.uploadedFiles.length > 1
    }));
  };

  const triggerFileUpload = () => {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    fileInput?.click();
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
        const basicFields = !!(formData.institutionName && formData.institutionType && formData.primaryCountry);
        const hnwiFields = userType === 'hnwi' ? !!formData.investmentCapacity : true;
        return basicFields && hnwiFields;
      case 2:
        return !!(formData.fullName && formData.jobTitle && formData.workEmail && formData.phoneNumber);
      case 3:
        return formData.uploadedFiles.length > 0 && Object.values(formData.complianceChecks).every(check => check === true);
      case 4:
        return !!(formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && passwordStrength(formData.password) === 100);
      default:
        return false;
    }
  };

  const institutionTypes = userType === 'institution' 
    ? [
        'Pension Fund',
        'Insurance Company',
        'Development Finance Institution',
        'Asset Manager',
        'Sovereign Wealth Fund',
        'Bank',
        'Family Office',
        'Private Wealth Manager',
        'Other'
      ]
    : userType === 'hnwi'
    ? [
        'Family Office',
        'Private Investment Company',
        'Trust/Foundation',
        'Individual Investor',
        'Real Estate Developer',
        'Business Owner',
        'Other'
      ]
    : [
        'Manufacturing',
        'Technology/Software',
        'Agriculture/Agribusiness',
        'Healthcare',
        'Retail/E-commerce',
        'Construction',
        'Professional Services',
        'Transportation/Logistics',
        'Other'
      ];

  const countries = [
    'Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Egypt', 
    'Morocco', 'Ethiopia', 'Tanzania', 'Uganda', 'Rwanda'
  ];

  const regulators = [
    'Central Bank /Federal Bank',
    'Securities Commission',
    'Insurance Regulatory Authority',
    'Pension Regulatory Authority',
    'Financial Services Commission'
  ];

  const departments = userType === 'institution'
    ? [
        'Investment Management',
        'Risk Management',
        'Compliance',
        'Treasury',
        'Asset Management',
        'Other'
      ]
    : userType === 'hnwi'
    ? [
        'Investment Advisory',
        'Wealth Management',
        'Family Office',
        'Private Equity',
        'Real Estate',
        'Other'
      ]
    : [
        'Finance',
        'Operations',
        'Business Development',
        'Executive Management',
        'Strategy',
        'Other'
      ];

  const securityQuestions = [
    'What was the name of your first school?',
    'What is your mother\'s maiden name?',
    'What was the name of your first pet?',
    'In which city were you born?',
    'What is your favorite book?'
  ];

  // User Type Selection Screen - Apple Style
  const renderUserTypeSelection = () => (
    <div className="min-h-screen bg-white">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-blue-300/30 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-purple-300/30 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-amber-200/15 to-orange-200/25 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Announcement Bar */}
          <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span>Join Africa's Premier Private Credit Platform</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 mb-6 tracking-tight leading-none">
            Ready to get 
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              started?
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Choose your path and join Africa's most sophisticated financial ecosystem.
          </p>

          {/* User Type Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {/* HNWI Card */}
            <div 
              onClick={() => setUserType('hnwi')}
              className={`group p-8 rounded-3xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                userType === 'hnwi' 
                  ? 'border-purple-500 bg-purple-50 shadow-2xl' 
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-xl'
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                userType === 'hnwi' 
                  ? 'bg-purple-500' 
                  : 'bg-gray-100 group-hover:bg-purple-100'
              }`}>
                <Star className={`w-8 h-8 transition-colors ${
                  userType === 'hnwi' ? 'text-white' : 'text-gray-600 group-hover:text-purple-600'
                }`} />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                High Net Worth
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Exclusive private credit opportunities for sophisticated individual investors.
              </p>
              <div className="text-sm text-purple-600 font-medium mb-4">
                Individual Investors • Family Offices • Trusts
              </div>
              
              {/* Demo Account Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  createDemoAccount('hnwi');
                }}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Demo...
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 mr-2" />
                    Try Demo Account
                  </>
                )}
              </button>
            </div>

            {/* Institution Card */}
            <div 
              onClick={() => setUserType('institution')}
              className={`group p-8 rounded-3xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                userType === 'institution' 
                  ? 'border-blue-500 bg-blue-50 shadow-2xl' 
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-xl'
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                userType === 'institution' 
                  ? 'bg-blue-500' 
                  : 'bg-gray-100 group-hover:bg-blue-100'
              }`}>
                <Building2 className={`w-8 h-8 transition-colors ${
                  userType === 'institution' ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                }`} />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Institutional
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Large-scale private credit with institutional-grade frameworks.
              </p>
              <div className="text-sm text-blue-600 font-medium mb-4">
                Pension Funds • Asset Managers • DFIs
              </div>
              
              {/* Demo Account Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  createDemoAccount('institution');
                }}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Demo...
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4 mr-2" />
                    Try Demo Account
                  </>
                )}
              </button>
            </div>

            {/* SME Card */}
            <div 
              onClick={() => setUserType('sme')}
              className={`group p-8 rounded-3xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                userType === 'sme' 
                  ? 'border-green-500 bg-green-50 shadow-2xl' 
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-xl'
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                userType === 'sme' 
                  ? 'bg-green-500' 
                  : 'bg-gray-100 group-hover:bg-green-100'
              }`}>
                <TrendingUp className={`w-8 h-8 transition-colors ${
                  userType === 'sme' ? 'text-white' : 'text-gray-600 group-hover:text-green-600'
                }`} />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                SME Business
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Flexible private credit solutions for ambitious African businesses.
              </p>
              <div className="text-sm text-green-600 font-medium mb-4">
                Manufacturing • Tech • Agriculture • Healthcare
              </div>
              
              {/* Demo Account Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  createDemoAccount('sme');
                }}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Demo...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Try Demo Account
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Continue Button */}
          {userType && (
            <button
              onClick={() => setCurrentStep(1)}
              className={`inline-flex items-center px-8 py-4 rounded-full text-lg font-medium text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                userType === 'hnwi' ? 'bg-purple-500 hover:bg-purple-600' : 
                userType === 'institution' ? 'bg-blue-500 hover:bg-blue-600' : 
                'bg-green-500 hover:bg-green-600'
              }`}
            >
              Continue Registration
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          )}

          {/* Sign In Link */}
          <div className="mt-12">
            <p className="text-gray-500 mb-4">Already have an account?</p>
            <button 
              onClick={() => alert('Redirecting to sign in...')}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Sign in to your account
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {userType === 'institution' ? 'Institution Name' : 
                 userType === 'hnwi' ? 'Name/Entity' : 'Company Name'} *
              </label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => handleChange('institutionName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                placeholder={`Enter your ${
                  userType === 'institution' ? 'institution' : 
                  userType === 'hnwi' ? 'name or entity' : 'company'
                } name`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {userType === 'institution' ? 'Institution Type' : 
                 userType === 'hnwi' ? 'Investor Type' : 'Business Type'} *
              </label>
              <select
                value={formData.institutionType}
                onChange={(e) => handleChange('institutionType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
              >
                <option value="">Select type</option>
                {institutionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Primary Country *
              </label>
              <select
                value={formData.primaryCountry}
                onChange={(e) => handleChange('primaryCountry', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
              >
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {userType === 'hnwi' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Investment Capacity *
                </label>
                <select
                  value={formData.investmentCapacity}
                  onChange={(e) => handleChange('investmentCapacity', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                >
                  <option value="">Select investment range</option>
                  {[
                    '$250K - $1M',
                    '$1M - $5M',
                    '$5M - $10M',
                    '$10M - $25M',
                    '$25M - $50M',
                    'Over $50M'
                  ].map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            )}

            {userType === 'institution' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Regulatory Oversight
                </label>
                <div className="space-y-3">
                  {regulators.map(regulator => (
                    <label key={regulator} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.regulatoryOversight.includes(regulator)}
                        onChange={(e) => handleRegulatoryChange(regulator, e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{regulator}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange('jobTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  placeholder="Enter your job title"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Work Email *
              </label>
              <input
                type="email"
                value={formData.workEmail}
                onChange={(e) => handleChange('workEmail', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                placeholder="Enter your work email"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-800 mb-2">Document Upload</h3>
              <p className="text-blue-700 text-sm mb-4">
                Upload required verification documents (PDF, JPG, PNG - Max 10MB per file)
              </p>
              
              <input
                type="file"
                id="file-upload"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={triggerFileUpload}
                className="w-full px-4 py-4 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 text-blue-700 hover:border-blue-400 hover:bg-blue-100 transition-all duration-200"
              >
                <Upload className="w-6 h-6 mx-auto mb-2" />
                <span className="block font-medium">
                  {formData.uploadedFiles.length > 0 ? 'Add More Documents' : 'Upload Documents'}
                </span>
              </button>

              {formData.uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800 truncate max-w-xs" title={file.name}>
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Compliance Verification</h3>
              
              {[
                { 
                  key: 'licensed', 
                  label: `${userType === 'institution' ? 'Institution' : userType === 'hnwi' ? 'Individual/Entity' : 'Business'} is properly licensed and authorized`
                },
                { 
                  key: 'authority', 
                  label: `Authorized to engage in ${userType === 'sme' ? 'commercial borrowing' : 'investment'} activities`
                },
                { key: 'amlKyc', label: 'AML/KYC procedures are in place and operational' },
                { key: 'terms', label: 'I agree to the Terms of Service and Privacy Policy' }
              ].map(item => (
                <label key={item.key} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.complianceChecks[item.key as keyof typeof formData.complianceChecks]}
                    onChange={(e) => handleChange(`complianceChecks.${item.key}`, e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 mt-0.5"
                  />
                  <span className="text-gray-700 text-sm leading-relaxed">
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  placeholder="Create a secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength(formData.password) < 40 ? 'bg-red-500' :
                          passwordStrength(formData.password) < 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength(formData.password)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {passwordStrength(formData.password) < 40 ? 'Weak' :
                       passwordStrength(formData.password) < 80 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Security Question
                </label>
                <select
                  value={formData.securityQuestion1}
                  onChange={(e) => handleChange('securityQuestion1', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                >
                  <option value="">Select a security question</option>
                  {securityQuestions.map(question => (
                    <option key={question} value={question}>{question}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Answer
                </label>
                <input
                  type="text"
                  value={formData.securityAnswer1}
                  onChange={(e) => handleChange('securityAnswer1', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
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
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="twoFactor" className="text-sm text-gray-700">
                Enable two-factor authentication (recommended)
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // If no user type is selected, show the selection screen
  if (!userType) {
    return renderUserTypeSelection();
  }

  // Registration form with Apple styling
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                <p className="text-gray-600 mt-1">Step {currentStep} of {totalSteps}</p>
              </div>
              <button
                onClick={() => setUserType('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  userType === 'institution' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                  userType === 'hnwi' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                  'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {userType === 'institution' ? 'Institutional' : 
                 userType === 'hnwi' ? 'High Net Worth' : 'SME Business'}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{stepTitles[currentStep - 1]}</span>
                <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    userType === 'institution' ? 'bg-blue-500' :
                    userType === 'hnwi' ? 'bg-purple-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 py-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="px-8 py-6 border-t border-gray-100 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid() || isLoading}
              className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                isStepValid() && !isLoading
                  ? `${
                      userType === 'institution' ? 'bg-blue-500 hover:bg-blue-600' : 
                      userType === 'hnwi' ? 'bg-purple-500 hover:bg-purple-600' : 
                      'bg-green-500 hover:bg-green-600'
                    } text-white shadow-lg hover:shadow-xl`
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {currentStep === totalSteps ? 'Complete' : 'Continue'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
            <Shield className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm text-blue-700">Your data is encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;