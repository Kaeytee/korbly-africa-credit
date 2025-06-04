
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Shield,
  Phone,
  Calendar,
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully",
        description: "Our institutional team will respond within 2 business hours.",
      });
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        company: '',
        role: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: ''
      });
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const faqs = [
    {
      question: 'What are the minimum AUM requirements?',
      answer: 'We work with institutional clients managing $50M+ in assets, including pension funds, insurance companies, and development finance institutions.'
    },
    {
      question: 'How long does onboarding take?',
      answer: 'Institutional onboarding typically takes 2-4 weeks, including compliance verification, due diligence, and platform training.'
    },
    {
      question: 'What regulatory frameworks do you comply with?',
      answer: 'We are licensed and compliant with BoG, SEC, NPRA, and NIC regulations across all African markets where we operate.'
    },
    {
      question: 'Do you support multi-currency portfolios?',
      answer: 'Yes, our platform supports USD, EUR, GBP, and major African currencies with real-time FX hedging capabilities.'
    }
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className="py-20 bg-gradient-to-br from-korbly-navy to-korbly-dark text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Connect With Our{' '}
                <span className="gradient-text">Institutional Team</span>
              </h1>
              <p className="text-xl text-korbly-silver mb-8">
                Ready to transform your private credit operations? Our experts are here to help.
              </p>
              <div className="flex justify-center space-x-4">
                <Badge variant="secondary" className="bg-korbly-blue/20 text-white">
                  <Clock className="w-4 h-4 mr-2" />
                  2hr Response Time
                </Badge>
                <Badge variant="secondary" className="bg-korbly-gold/20 text-white">
                  <Shield className="w-4 h-4 mr-2" />
                  Enterprise Grade
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8 institutional-shadow">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-bold text-korbly-navy">
                      Institutional Inquiry Form
                    </CardTitle>
                    <p className="text-gray-600">
                      Please provide your details and we'll connect you with the right specialist.
                    </p>
                  </CardHeader>
                  <CardContent className="px-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-korbly-navy">
                            Full Name *
                          </label>
                          <Input
                            required
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            placeholder="Enter your full name"
                            className="border-gray-300 focus:border-korbly-blue"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-korbly-navy">
                            Company/Institution *
                          </label>
                          <Input
                            required
                            value={formData.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            placeholder="Institution name"
                            className="border-gray-300 focus:border-korbly-blue"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-korbly-navy">
                            Role/Title *
                          </label>
                          <Input
                            required
                            value={formData.role}
                            onChange={(e) => handleChange('role', e.target.value)}
                            placeholder="Your role or title"
                            className="border-gray-300 focus:border-korbly-blue"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-korbly-navy">
                            Email Address *
                          </label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="professional@institution.com"
                            className="border-gray-300 focus:border-korbly-blue"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-korbly-navy">
                            Phone Number
                          </label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="border-gray-300 focus:border-korbly-blue"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-korbly-navy">
                            Inquiry Type *
                          </label>
                          <Select onValueChange={(value) => handleChange('inquiryType', value)}>
                            <SelectTrigger className="border-gray-300 focus:border-korbly-blue">
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="demo">Platform Demo Request</SelectItem>
                              <SelectItem value="partnership">Strategic Partnership</SelectItem>
                              <SelectItem value="onboarding">Institutional Onboarding</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="compliance">Compliance Inquiry</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-korbly-navy">
                          Message *
                        </label>
                        <Textarea
                          required
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Please describe your specific needs, AUM range, and timeline..."
                          rows={5}
                          className="border-gray-300 focus:border-korbly-blue"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-korbly-blue hover:bg-korbly-blue/90 text-white px-8 py-3"
                        >
                          {isSubmitting ? 'Submitting...' : 'Send Message'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-korbly-blue text-korbly-blue hover:bg-korbly-blue hover:text-white px-8 py-3"
                        >
                          Schedule Call
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Details */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl font-bold text-korbly-navy">
                      Direct Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-korbly-blue mt-1" />
                      <div>
                        <p className="font-medium text-korbly-navy">Email</p>
                        <p className="text-gray-600">institutional@korbly.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-korbly-blue mt-1" />
                      <div>
                        <p className="font-medium text-korbly-navy">Phone</p>
                        <p className="text-gray-600">+233 (0) 302 123 456</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-korbly-blue mt-1" />
                      <div>
                        <p className="font-medium text-korbly-navy">Address</p>
                        <p className="text-gray-600">
                          Kempinski Hotel Gold Coast<br />
                          Accra, Ghana
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-korbly-blue mt-1" />
                      <div>
                        <p className="font-medium text-korbly-navy">Business Hours</p>
                        <p className="text-gray-600">
                          Monday - Friday: 8:00 AM - 6:00 PM GMT<br />
                          Weekend: Emergency support only
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Response Time Guarantee */}
                <Card className="p-6 bg-gradient-to-br from-korbly-blue/5 to-korbly-gold/5">
                  <CardContent className="px-0 space-y-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h3 className="font-bold text-korbly-navy">Response Guarantee</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Institutional inquiries: 2 hours</li>
                      <li>• Demo requests: Same day</li>
                      <li>• Partnership discussions: 24 hours</li>
                      <li>• Technical support: 1 hour</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Calendar Integration */}
                <Card className="p-6">
                  <CardContent className="px-0 text-center space-y-4">
                    <Calendar className="w-12 h-12 text-korbly-blue mx-auto" />
                    <h3 className="font-bold text-korbly-navy">Book a Call</h3>
                    <p className="text-gray-600 text-sm">
                      Schedule a direct call with our institutional team
                    </p>
                    <Button variant="outline" className="w-full">
                      Schedule Meeting
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-korbly-silver/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Common questions from institutional clients
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="px-0 space-y-3">
                    <h3 className="font-bold text-korbly-navy">{faq.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
