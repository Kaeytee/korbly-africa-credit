import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  HelpCircle, 
  ChevronRight, 
  FileText,
  BookOpen,
  Video,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I create a compelling pitch for investors?',
      answer: 'Creating a compelling pitch involves highlighting your business value proposition, market opportunity, traction, team credentials, and clear funding goals. Focus on what makes your business unique and how investors will benefit. Use the pitch template in the Submit Pitch section for guidance.',
      category: 'Pitching',
    },
    {
      id: 2,
      question: 'What documents do investors typically ask for during due diligence?',
      answer: 'Investors typically request financial statements (past 3 years if available), business registration documents, tax compliance certificates, founder background information, key contracts, IP documentation, and detailed market analysis. Upload these to the Due Diligence Vault to streamline the process.',
      category: 'Due Diligence'
    },
    {
      id: 3,
      question: 'How long does the funding process usually take?',
      answer: 'The funding process typically takes 3-6 months from initial pitch to funding disbursement. This includes the initial review (2-4 weeks), due diligence (1-2 months), term sheet negotiation (2-3 weeks), and final closing (2-4 weeks). Thorough preparation can help accelerate this timeline.',
      category: 'Funding'
    },
    {
      id: 4,
      question: 'How can I improve investor engagement with my pitch?',
      answer: "To improve investor engagement, ensure your pitch clearly articulates the problem you're solving, your unique solution, market size, business model, traction metrics, and funding requirements. Regularly update your pitch with new achievements and milestones to show progress.",
      category: 'Investor Engagement'
    },
    {
      id: 5,
      question: 'What are the fees associated with raising capital on Korbly?',
      answer: 'Korbly operates on a success-fee model, typically 3-5% of capital raised. There are no upfront costs for SMEs to create a profile, submit pitches, or engage with investors. Additional services like pitch deck refinement or financial modeling may have associated fees disclosed before engagement.',
      category: 'Fees'
    }
  ];
  
  const filteredFAQs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs;

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowThankYou(true);
      setTicketSubject('');
      setTicketMessage('');
      
      // Reset thank you message after 5 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    }, 1500);
  };

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h2 className="text-2xl font-semibold mb-2">Support & Help</h2>
        <p className="text-gray-600 mb-6">Get answers and assistance for your SME journey on Korbly.</p>
        
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search for answers..." 
            className="pl-10 py-6" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Quick Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center border-2 hover:border-blue-500 hover:bg-blue-50"
            onClick={() => window.open('https://korbly.com/resources/funding-guide', '_blank')}
          >
            <FileText className="h-8 w-8 mb-4 text-blue-600" />
            <span className="font-semibold">Funding Guides</span>
            <p className="text-xs text-gray-500 mt-2">Access detailed guides on raising capital</p>
          </Button>
          
          <Button 
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center border-2 hover:border-blue-500 hover:bg-blue-50"
            onClick={() => window.open('https://korbly.com/resources/tutorials', '_blank')}
          >
            <Video className="h-8 w-8 mb-4 text-blue-600" />
            <span className="font-semibold">Video Tutorials</span>
            <p className="text-xs text-gray-500 mt-2">Watch step-by-step platform tutorials</p>
          </Button>
          
          <Button 
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center border-2 hover:border-blue-500 hover:bg-blue-50"
            onClick={() => window.open('https://korbly.com/resources/knowledge-base', '_blank')}
          >
            <BookOpen className="h-8 w-8 mb-4 text-blue-600" />
            <span className="font-semibold">Knowledge Base</span>
            <p className="text-xs text-gray-500 mt-2">Explore our comprehensive knowledge base</p>
          </Button>
        </div>
        
        {/* FAQs */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <div 
                  key={faq.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button 
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronRight 
                      className={`h-5 w-5 transition-transform ${expandedFAQ === faq.id ? 'rotate-90' : ''}`} 
                    />
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500">Category: {faq.category}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Learn more <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <HelpCircle className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-400 mt-1">Try a different search term or browse the FAQs</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Contact Support Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Still Need Help?</h3>
          
          {showThankYou ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h4 className="text-lg font-medium text-green-800 mb-2">Ticket Submitted!</h4>
              <p className="text-green-700">
                Thank you for reaching out. Our support team will respond to your inquiry within 24 hours.
              </p>
            </div>
          ) : (
            <Card className="border p-6">
              <form onSubmit={handleSubmitTicket}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <Input 
                      id="subject"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea 
                      id="message"
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      placeholder="Please describe your issue or question in detail..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
                        Submitting...
                      </>
                    ) : (
                      'Submit Ticket'
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          )}
          
          {/* Contact Alternatives */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium">Call Us</p>
                <p className="text-xs text-gray-500">+254 700 123 456</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium">Email Support</p>
                <p className="text-xs text-gray-500">support@korbly.com</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <MessageCircle className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium">Live Chat</p>
                <p className="text-xs text-gray-500">Available 9am - 5pm EAT</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Support;
