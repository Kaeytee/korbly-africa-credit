
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VerificationStepProps {
  formData: any;
  handleChange: (field: string, value: string | boolean | string[]) => void;
}

const VerificationStep = ({ formData, handleChange }: VerificationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-korbly-navy flex items-center space-x-2">
          <Upload className="w-5 h-5 text-korbly-blue" />
          <span>Document Upload</span>
        </h3>
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50">
          <Upload className="w-12 h-12 text-korbly-blue mx-auto mb-4" />
          <p className="text-korbly-navy mb-2 font-medium">Drag and drop institutional documents</p>
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
        <h3 className="text-lg font-semibold text-korbly-navy flex items-center space-x-2">
          <Shield className="w-5 h-5 text-korbly-blue" />
          <span>Compliance Acknowledgments</span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="licensed"
              checked={formData.complianceChecks.licensed}
              onCheckedChange={(checked) => handleChange('complianceChecks.licensed', checked as boolean)}
            />
            <label htmlFor="licensed" className="text-sm text-korbly-navy">
              I confirm our institution is properly licensed and authorized to engage in investment activities
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
              Our institution complies with AML/KYC regulations and will provide documentation upon request
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
  );
};

export default VerificationStep;
