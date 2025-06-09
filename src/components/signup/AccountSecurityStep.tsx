
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Eye, EyeOff, CheckCircle, HelpCircle, Shield } from 'lucide-react';

interface AccountSecurityStepProps {
  formData: any;
  handleChange: (field: string, value: string | boolean | string[]) => void;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  passwordStrength: (password: string) => number;
}

const AccountSecurityStep = ({ 
  formData, 
  handleChange, 
  showPassword, 
  showConfirmPassword, 
  setShowPassword, 
  setShowConfirmPassword, 
  passwordStrength 
}: AccountSecurityStepProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <Lock className="w-4 h-4 text-korbly-blue" />
            <span>New Password *</span>
          </label>
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
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <Lock className="w-4 h-4 text-korbly-blue" />
            <span>Confirm Password *</span>
          </label>
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
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-korbly-blue" />
            <span>Security Question</span>
          </label>
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
          <label className="text-sm font-medium text-korbly-navy">Security Answer</label>
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
          <label htmlFor="2fa" className="text-sm text-korbly-navy flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Enable two-factor authentication (recommended)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurityStep;
