
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Calendar, Globe } from 'lucide-react';

const MarketInsights = () => {
  const insights = [
    {
      id: 1,
      title: 'African Private Credit Market Outlook 2024',
      summary: 'Private credit markets across Africa show strong growth potential with increasing demand for alternative financing.',
      date: '2024-01-15',
      category: 'Market Analysis',
      impact: 'High',
      trend: 'positive',
    },
    {
      id: 2,
      title: 'Ghana Monetary Policy Update',
      summary: 'Bank of Ghana maintains policy rate at 29% to combat inflation and stabilize the Cedi.',
      date: '2024-01-12',
      category: 'Policy Update',
      impact: 'Medium',
      trend: 'neutral',
    },
    {
      id: 3,
      title: 'Nigeria Trade Finance Opportunities',
      summary: 'Growing demand for trade finance in Nigeria creates new opportunities for institutional investors.',
      date: '2024-01-10',
      category: 'Opportunity',
      impact: 'High',
      trend: 'positive',
    },
  ];

  const marketData = [
    {
      market: 'Ghana',
      currency: 'GHS',
      rate: '15.2',
      change: '-0.8%',
      trend: 'negative',
      creditIndex: '82.4',
      creditChange: '+2.1%',
    },
    {
      market: 'Nigeria',
      currency: 'NGN',
      rate: '786.5',
      change: '-1.2%',
      trend: 'negative',
      creditIndex: '76.8',
      creditChange: '+1.8%',
    },
    {
      market: 'Kenya',
      currency: 'KES',
      rate: '129.3',
      change: '+0.5%',
      trend: 'positive',
      creditIndex: '88.2',
      creditChange: '+3.2%',
    },
    {
      market: 'South Africa',
      currency: 'ZAR',
      rate: '18.9',
      change: '+0.3%',
      trend: 'positive',
      creditIndex: '91.5',
      creditChange: '+1.5%',
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'positive' ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : trend === 'negative' ? (
      <TrendingDown className="w-4 h-4 text-red-600" />
    ) : (
      <div className="w-4 h-4 bg-gray-400 rounded-full" />
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-korbly-navy">Market Insights</h1>
        <p className="text-gray-600 mt-2">Stay updated with African credit markets and investment trends</p>
      </div>

      {/* Market Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Currency Rates (to USD)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.map((market) => (
                <div key={market.market} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{market.market} ({market.currency})</p>
                    <p className="text-sm text-gray-600">Credit Index: {market.creditIndex}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <p className="font-semibold">{market.rate}</p>
                      {getTrendIcon(market.trend)}
                    </div>
                    <p className={`text-sm ${market.trend === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {market.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">African Credit Index</span>
                <span className="font-semibold text-green-600">84.7 (+2.3%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Private Credit Growth</span>
                <span className="font-semibold text-green-600">+18.5% YoY</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Default Rate</span>
                <span className="font-semibold text-orange-600">3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Deal Size</span>
                <span className="font-semibold">$2.8M</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {insights.map((insight) => (
              <div key={insight.id} className="border-l-4 border-l-korbly-blue pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-korbly-navy">{insight.title}</h3>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(insight.trend)}
                    <Badge className={getImpactColor(insight.impact)}>
                      {insight.impact} Impact
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{insight.summary}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{insight.date}</span>
                  </div>
                  <Badge variant="secondary">{insight.category}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketInsights;
