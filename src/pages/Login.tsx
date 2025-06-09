import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import LoginHeroSection from '@/components/login/LoginHeroSection';
import LoginFormContainer from '@/components/login/LoginFormContainer';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - check for demo credentials
    const demoCredentials = [
      { email: 'demo.pension@korbly.com', password: 'PensionDemo123!' },
      { email: 'demo.insurance@korbly.com', password: 'InsureDemo123!' },
      { email: 'demo.hnwi@korbly.com', password: 'HnwiDemo123!' },
      { email: 'demo.dfi@korbly.com', password: 'DfiDemo123!' },
      { email: 'demo.asset@korbly.com', password: 'AssetDemo123!' },
      { email: 'admin@korbly.com', password: 'AdminKorbly2025!' }
    ];

    const validCredential = demoCredentials.find(
      cred => cred.email === formData.email && cred.password === formData.password
    );

    setTimeout(() => {
      if (validCredential) {
        toast({
          title: "Login Successful",
          description: "Welcome back to your institutional dashboard.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Invalid Credentials",
          description: "Please check your email and password or use one of the demo accounts.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex">
      <LoginHeroSection />
      <LoginFormContainer
        formData={formData}
        showPassword={showPassword}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};

export default Login;
