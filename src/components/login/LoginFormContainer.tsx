
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Shield, User, Lock, Eye, EyeOff, Building2 } from 'lucide-react';

interface LoginFormContainerProps {
  formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  showPassword: boolean;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (field: string, value: string | boolean) => void;
  setShowPassword: (show: boolean) => void;
}

const LoginFormContainer = ({
  formData,
  showPassword,
  isLoading,
  handleSubmit,
  handleChange,
  setShowPassword
}: LoginFormContainerProps) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      {/* Mobile Header */}
      <div className="lg:hidden border-b border-gray-200 bg-white p-4">
        <Link to="/" className="inline-flex items-center space-x-3">
          <div className="w-10 h-10 bg-korbly-blue rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-korbly-navy">Korbly</span>
        </Link>
      </div>

      {/* Form Container */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-korbly-blue rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-korbly-navy mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your institutional account</p>
          </div>

          {/* Login Form */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-korbly-navy">
                    Email Address
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="Enter your institutional email"
                      className="pl-10 h-12 bg-white border-2 border-gray-300 text-korbly-navy placeholder:text-gray-500 focus:border-korbly-blue focus:ring-0"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-korbly-navy">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-12 h-12 bg-white border-2 border-gray-300 text-korbly-navy placeholder:text-gray-500 focus:border-korbly-blue focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-korbly-navy"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleChange('rememberMe', checked as boolean)}
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                      Keep me signed in for 30 days
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-korbly-blue hover:underline">
                    Forgot your password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-korbly-blue hover:bg-blue-700 text-white font-medium"
                >
                  {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
                </Button>
              </form>

              {/* Two-Factor Authentication Notice */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Two-factor authentication enabled</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-korbly-blue hover:underline font-medium">
                    Request institutional access
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
              <Shield className="w-3 h-3 mr-1" />
              SOC 2 Compliant
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
              ISO 27001
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
              Bank Grade Security
            </Badge>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Pension Fund:</strong> demo.pension@korbly.com / PensionDemo123!</p>
              <p><strong>Insurance:</strong> demo.insurance@korbly.com / InsureDemo123!</p>
              <p><strong>Asset Manager:</strong> demo.asset@korbly.com / AssetDemo123!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormContainer;
