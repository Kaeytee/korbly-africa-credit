
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, MapPin, Calendar, TrendingUp } from 'lucide-react';

const InvestmentOpportunities = () => {
  const opportunities = [
    {
      id: 1,
      title: 'Tanzania Energy Infrastructure',
      description: 'Private debt financing for renewable energy projects across East Africa',
      targetIRR: '13.5%',
      minInvestment: '$1,000,000',
      maturity: '5 years',
      location: 'Tanzania',
      sector: 'Infrastructure',
      riskRating: 'Medium',
      available: '$15M',
      closingDate: '30 days',
      status: 'Open',
    },
    {
      id: 2,
      title: 'Morocco Trade Finance Fund',
      description: 'Short-term trade finance for import/export businesses',
      targetIRR: '11.8%',
      minInvestment: '$500,000',
      maturity: '18 months',
      location: 'Morocco',
      sector: 'Trade Finance',
      riskRating: 'Low-Medium',
      available: '$8M',
      closingDate: '45 days',
      status: 'Open',
    },
    {
      id: 3,
      title: 'Nigeria Fintech Lending',
      description: 'Digital lending platform serving Nigerian SMEs and individuals',
      targetIRR: '16.2%',
      minInvestment: '$2,000,000',
      maturity: '3 years',
      location: 'Nigeria',
      sector: 'Fintech',
      riskRating: 'Medium-High',
      available: '$25M',
      closingDate: '15 days',
      status: 'Closing Soon',
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Low-Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Medium-High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'Closing Soon':
        return 'bg-orange-100 text-orange-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-korbly-navy">Investment Opportunities</h1>
        <p className="text-gray-600 mt-2">Explore new private credit opportunities across Africa</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" size="sm">All Sectors</Button>
            <Button variant="outline" size="sm">Infrastructure</Button>
            <Button variant="outline" size="sm">Trade Finance</Button>
            <Button variant="outline" size="sm">Fintech</Button>
            <Button variant="outline" size="sm">Agriculture</Button>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 gap-6">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="border-l-4 border-l-korbly-blue">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-korbly-navy">{opportunity.title}</CardTitle>
                  <p className="text-gray-600 mt-2">{opportunity.description}</p>
                </div>
                <Badge className={getStatusColor(opportunity.status)}>
                  {opportunity.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-korbly-blue" />
                  <div>
                    <p className="text-xs text-gray-500">Target IRR</p>
                    <p className="font-semibold text-green-600">{opportunity.targetIRR}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-korbly-blue" />
                  <div>
                    <p className="text-xs text-gray-500">Min Investment</p>
                    <p className="font-semibold">{opportunity.minInvestment}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-korbly-blue" />
                  <div>
                    <p className="text-xs text-gray-500">Maturity</p>
                    <p className="font-semibold">{opportunity.maturity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-korbly-blue" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold">{opportunity.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <Badge variant="secondary">{opportunity.sector}</Badge>
                  <Badge className={getRiskColor(opportunity.riskRating)}>
                    {opportunity.riskRating} Risk
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Available</p>
                  <p className="font-semibold">{opportunity.available}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Closing in {opportunity.closingDate}
                </p>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button size="sm" className="bg-korbly-blue hover:bg-blue-700">
                    Express Interest
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvestmentOpportunities;
