
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, Briefcase, DollarSign, MapPin, Globe } from 'lucide-react';

interface CompanyInformationStepProps {
  formData: any;
  handleChange: (field: string, value: string | boolean | string[]) => void;
  handleRegulatoryChange: (regulator: string, checked: boolean) => void;
}

const CompanyInformationStep = ({ formData, handleChange, handleRegulatoryChange }: CompanyInformationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-korbly-blue" />
          <span>Institution Name *</span>
        </label>
        <Input
          required
          value={formData.institutionName}
          onChange={(e) => handleChange('institutionName', e.target.value)}
          placeholder="Enter your institution's full legal name"
          className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-korbly-blue" />
            <span>Institution Type *</span>
          </label>
          <Select onValueChange={(value) => handleChange('institutionType', value)}>
            <SelectTrigger className="h-12 bg-white border-2 border-gray-300 text-korbly-navy focus:border-korbly-blue focus:ring-0">
              <SelectValue placeholder="Select institution type" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="pension">Pension Fund</SelectItem>
              <SelectItem value="insurance">Insurance Company</SelectItem>
              <SelectItem value="asset-management">Asset Management Firm</SelectItem>
              <SelectItem value="family-office">Family Office</SelectItem>
              <SelectItem value="dfi">Development Finance Institution</SelectItem>
              <SelectItem value="sovereign">Sovereign Wealth Fund</SelectItem>
              <SelectItem value="private-equity">Private Equity Fund</SelectItem>
              <SelectItem value="hedge-fund">Hedge Fund</SelectItem>
              <SelectItem value="other">Other Financial Institution</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-korbly-blue" />
            <span>Assets Under Management *</span>
          </label>
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
        <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-korbly-blue" />
          <span>Primary Country *</span>
        </label>
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
        <label className="text-sm font-medium text-korbly-navy flex items-center space-x-2">
          <Globe className="w-4 h-4 text-korbly-blue" />
          <span>Regulatory Oversight</span>
        </label>
        <div className="grid grid-cols-1 gap-3">
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
  );
};

export default CompanyInformationStep;
