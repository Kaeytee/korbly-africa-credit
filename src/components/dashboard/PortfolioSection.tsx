
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PortfolioSection = () => {
  const investments = [
    {
      id: 1,
      name: 'Ghana Microfinance Fund',
      type: 'Private Credit',
      amount: '$2,500,000',
      allocation: 20.2,
      performance: '+15.2%',
      status: 'Active',
      maturity: '18 months',
      risk: 'Medium',
    },
    {
      id: 2,
      name: 'Nigerian SME Lending',
      type: 'Trade Finance',
      amount: '$1,800,000',
      allocation: 14.5,
      performance: '+12.8%',
      status: 'Active',
      maturity: '12 months',
      risk: 'Medium-High',
    },
    {
      id: 3,
      name: 'Kenya Agricultural Credit',
      type: 'Asset-Backed',
      amount: '$3,200,000',
      allocation: 25.8,
      performance: '+8.9%',
      status: 'Active',
      maturity: '24 months',
      risk: 'Low-Medium',
    },
    {
      id: 4,
      name: 'South Africa Infrastructure',
      type: 'Infrastructure Debt',
      amount: '$4,900,000',
      allocation: 39.5,
      performance: '+11.4%',
      status: 'Active',
      maturity: '36 months',
      risk: 'Low',
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-korbly-navy">Portfolio Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage your institutional investment portfolio</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-korbly-navy">$12.4M</div>
            <p className="text-green-600 text-sm">+12.5% this quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average IRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-korbly-navy">12.8%</div>
            <p className="text-green-600 text-sm">Above target of 10%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-korbly-navy">7.2/10</div>
            <p className="text-orange-600 text-sm">Moderate risk profile</p>
          </CardContent>
        </Card>
      </div>

      {/* Investments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div key={investment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-korbly-navy">{investment.name}</h3>
                    <p className="text-sm text-gray-600">{investment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{investment.amount}</p>
                    <p className="text-sm text-green-600">{investment.performance}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Portfolio Allocation</p>
                    <div className="mt-1">
                      <Progress value={investment.allocation} className="h-2" />
                      <p className="text-xs mt-1">{investment.allocation}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Maturity</p>
                    <p className="text-sm font-medium">{investment.maturity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Risk Level</p>
                    <Badge className={`text-xs ${getRiskColor(investment.risk)}`}>
                      {investment.risk}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <Badge variant="secondary" className="text-xs">
                      {investment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSection;
