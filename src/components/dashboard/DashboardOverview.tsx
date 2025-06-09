
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, BarChart3, Users } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total Portfolio Value',
      value: '$12.4M',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      title: 'Active Investments',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: BarChart3,
    },
    {
      title: 'Monthly Returns',
      value: '8.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      title: 'Investment Partners',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-korbly-navy">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back to your institutional investment platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-korbly-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-korbly-navy">{stat.value}</div>
                <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Ghana Microfinance Fund</p>
                  <p className="text-sm text-gray-600">Private Credit • 12.5% IRR</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$2.5M</p>
                  <p className="text-sm text-green-600">+15.2%</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Nigerian SME Lending</p>
                  <p className="text-sm text-gray-600">Trade Finance • 14.8% IRR</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1.8M</p>
                  <p className="text-sm text-green-600">+12.8%</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Kenya Agricultural Credit</p>
                  <p className="text-sm text-gray-600">Asset-Backed • 11.2% IRR</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$3.2M</p>
                  <p className="text-sm text-green-600">+8.9%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ghana Cedi (GHS)</span>
                <span className="text-sm font-medium">15.2 to USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Nigerian Naira (NGN)</span>
                <span className="text-sm font-medium">786.5 to USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Kenya Shilling (KES)</span>
                <span className="text-sm font-medium">129.3 to USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">African Credit Index</span>
                <span className="text-sm font-medium text-green-600">+2.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
