
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Clock, 
  FileText, 
  Calculator,
  ArrowUp,
  CheckCircle,
  Star
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: 'Institutional Origination Engine',
      description: 'Streamline deal sourcing and due diligence with AI-powered risk assessment',
      metrics: '40% faster origination, 60% risk reduction',
      benefits: ['Automated deal flow management', 'Real-time due diligence tracking', 'Institutional network integration'],
      category: 'Origination'
    },
    {
      icon: Shield,
      title: 'Risk Assessment Models (Altman, Ohlson)',
      description: 'Industry-standard credit scoring with real-time African market data integration',
      metrics: '99.2% accuracy rate, 50+ risk factors',
      benefits: ['Real-time credit scoring', 'African market specialization', 'Regulatory compliance built-in'],
      category: 'Risk Management'
    },
    {
      icon: TrendingUp,
      title: 'Tranche Syndication Console',
      description: 'Distribute investment opportunities across institutional networks with precision',
      metrics: '15 min average syndication time',
      benefits: ['Automated investor matching', 'Real-time allocation tracking', 'Institutional-grade documentation'],
      category: 'Syndication'
    },
    {
      icon: Clock,
      title: 'Real-Time Valuation Workbench',
      description: 'Live portfolio valuation with mark-to-market pricing and stress testing',
      metrics: 'Real-time updates, 24/7 monitoring',
      benefits: ['Live market pricing', 'Stress testing scenarios', 'Performance attribution analysis'],
      category: 'Valuation'
    },
    {
      icon: FileText,
      title: 'Term Sheet Generator',
      description: 'Generate compliant term sheets with regulatory templates and custom clauses',
      metrics: '500+ templates, 100% compliant',
      benefits: ['Regulatory template library', 'Custom clause builder', 'Automated compliance checking'],
      category: 'Documentation'
    },
    {
      icon: Calculator,
      title: 'Insurer Risk Quoting Module',
      description: 'Instant risk quotes for insurance partners with actuarial model integration',
      metrics: 'Sub-second quotes, 95% acceptance rate',
      benefits: ['Instant pricing models', 'Actuarial integration', 'Insurance partner network'],
      category: 'Insurance'
    }
  ];

  const categories = Array.from(new Set(features.map(f => f.category)));

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className="py-20 bg-gradient-to-br from-korbly-navy to-korbly-dark text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Institutional-Grade Tools for{' '}
                <span className="gradient-text">Private Credit Management</span>
              </h1>
              <p className="text-xl text-korbly-silver mb-8">
                Every feature designed for compliance, scale, and professional oversight in the African financial markets
              </p>
              <div className="flex justify-center space-x-4">
                <Badge variant="secondary" className="bg-korbly-blue/20 text-white">
                  SOC 2 Compliant
                </Badge>
                <Badge variant="secondary" className="bg-korbly-gold/20 text-white">
                  Institutional Grade
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-white">
                  99.9% Uptime
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-16 bg-korbly-silver/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-text">6</div>
                <div className="text-lg font-semibold text-korbly-navy">Core Modules</div>
                <div className="text-gray-600">Comprehensive platform coverage</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-text">150+</div>
                <div className="text-lg font-semibold text-korbly-navy">Institutional Users</div>
                <div className="text-gray-600">Across Africa</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-text">$2.3B+</div>
                <div className="text-lg font-semibold text-korbly-navy">Assets Managed</div>
                <div className="text-gray-600">On our platform</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy mb-4">
                Platform Capabilities
              </h2>
              <p className="text-xl text-gray-600">
                Built specifically for institutional private credit management in Africa
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 institutional-shadow group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-korbly-blue/10 rounded-lg group-hover:bg-korbly-blue/20 transition-colors">
                          <feature.icon className="w-6 h-6 text-korbly-blue" />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2 text-xs">
                            {feature.category}
                          </Badge>
                          <CardTitle className="text-xl font-bold text-korbly-navy">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="bg-korbly-blue/5 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-4 h-4 text-korbly-gold" />
                        <span className="font-semibold text-korbly-navy">Key Metrics</span>
                      </div>
                      <p className="text-sm text-gray-700">{feature.metrics}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-korbly-navy">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="outline" className="w-full group-hover:bg-korbly-blue group-hover:text-white transition-colors">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-20 bg-gradient-to-br from-korbly-navy/5 to-korbly-blue/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy mb-4">
                See It In Action
              </h2>
              <p className="text-xl text-gray-600">
                Experience the platform with our interactive demonstration
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="p-8 glass">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-korbly-navy">Live Platform Demo</h3>
                    <Badge className="bg-green-500 text-white">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>

                  <div className="bg-white rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-korbly-blue/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-korbly-navy">127</div>
                        <div className="text-sm text-gray-600">Active Deals</div>
                      </div>
                      <div className="bg-korbly-gold/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-korbly-navy">$847M</div>
                        <div className="text-sm text-gray-600">Total Value</div>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-korbly-navy">AAA</div>
                        <div className="text-sm text-gray-600">Avg. Rating</div>
                      </div>
                    </div>

                    <div className="h-32 bg-gray-50 rounded-lg flex items-end justify-center p-4 space-x-2">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-korbly-blue/60 rounded-t animate-float"
                          style={{
                            height: `${Math.random() * 80 + 20}%`,
                            width: '20px',
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Link to="/signup">
                      <Button className="bg-korbly-blue hover:bg-korbly-blue/90">
                        Request Full Demo
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline">
                        Schedule Call
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-korbly-navy text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Elevate Your Private Credit Operations?
            </h2>
            <p className="text-xl text-korbly-silver mb-8 max-w-2xl mx-auto">
              Join the leading African institutions already using Korbly to transform their private credit management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-korbly-blue hover:bg-korbly-blue/90 text-white px-8 py-4 text-lg">
                  Request Access
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-korbly-navy px-8 py-4 text-lg"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Features;
