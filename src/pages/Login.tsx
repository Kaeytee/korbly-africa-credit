
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Shield, User, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
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

    // Simulate login
    setTimeout(() => {
      toast({
        title: "Login Successful",
        description: "Welcome back to your institutional dashboard.",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-korbly-navy via-korbly-dark to-korbly-navy relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230084FF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} className="animate-float"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-korbly-blue to-korbly-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-2xl font-bold text-white">Korbly</span>
            </Link>
            <p className="text-korbly-silver mt-2">Institutional Private Credit Platform</p>
          </div>

          {/* Login Form */}
          <Card className="glass border-white/20">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                Institutional Login
              </CardTitle>
              <p className="text-korbly-silver">
                Access your private credit management dashboard
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Email Address
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="institutional@company.com"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-korbly-blue"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-korbly-blue"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleChange('rememberMe', checked as boolean)}
                    />
                    <label htmlFor="remember" className="text-sm text-white">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-korbly-blue hover:text-korbly-gold transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-korbly-blue hover:bg-korbly-blue/90 text-white py-3"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              {/* Two-Factor Authentication */}
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-korbly-silver">
                  <Shield className="w-4 h-4" />
                  <span>Two-factor authentication enabled</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-korbly-silver">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-korbly-blue hover:text-korbly-gold transition-colors font-medium">
                    Request institutional access
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Badges */}
          <div className="mt-8 flex justify-center space-x-4">
            <Badge variant="secondary" className="bg-white/10 text-white">
              <Shield className="w-3 h-3 mr-1" />
              SOC 2 Compliant
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white">
              ISO 27001
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white">
              Bank Grade Security
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
