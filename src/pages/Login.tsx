
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import LoginHeroSection from '@/components/login/LoginHeroSection';
import LoginFormContainer from '@/components/login/LoginFormContainer';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
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
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
