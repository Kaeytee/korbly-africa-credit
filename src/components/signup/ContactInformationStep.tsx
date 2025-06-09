
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, UserCheck, Mail, Phone, Building2, Calendar } from 'lucide-react';

interface ContactInformationStepProps {
  formData: any;
  handleChange: (field: string, value: string | boolean | string[]) => void;
}

const ContactInformationStep = ({ formData, handleChange }: ContactInformationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <User className="w-4 h-4 text-korbly-blue" />
            <span>Full Name *</span>
          </label>
          <Input
            required
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-korbly-blue" />
            <span>Job Title *</span>
          </label>
          <Input
            required
            value={formData.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            placeholder="e.g., CIO, Portfolio Manager, Investment Director"
            className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <Mail className="w-4 h-4 text-korbly-blue" />
            <span>Work Email *</span>
          </label>
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
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <Phone className="w-4 h-4 text-korbly-blue" />
            <span>Phone Number *</span>
          </label>
          <Input
            required
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="+233 (0) 123 456 789"
            className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-korbly-blue" />
            <span>Department</span>
          </label>
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
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-korbly-blue" />
            <span>Years of Experience</span>
          </label>
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
  );
};

export default ContactInformationStep;
