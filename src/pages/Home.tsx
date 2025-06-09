import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Shield, TrendingUp, Users, Award, CheckCircle, ArrowUp } from 'lucide-react';
const Home = () => {
  const trustMetrics = [{
    value: '$2.3B+',
    label: 'Assets Under Management'
  }, {
    value: '150+',
    label: 'Institutional Partners'
  }, {
    value: '99.9%',
    label: 'Compliance Rating'
  }];
  const trustIndicators = ['Regulatory Compliant', 'Institutional Grade', 'Africa-Focused'];
  return <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-korbly-navy via-korbly-dark to-korbly-navy opacity-95">
          <div className="absolute inset-0 animate-float" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230084FF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-white space-y-8 animate-slide-up">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  The Institutional Marketplace for{' '}
                  <span className="gradient-text">Private Credit</span>{' '}
                  in Africa
                </h1>
                <p className="text-xl text-korbly-silver max-w-lg">
                  Built for funds, insurers, and sovereigns—not for retail.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4">
                {trustIndicators.map((indicator, index) => <div key={index} className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4 text-korbly-gold" />
                    <span className="text-sm font-medium">{indicator}</span>
                  </div>)}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-korbly-blue hover:bg-korbly-blue/90 text-white px-8 py-4 text-lg">
                    Request Access
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white hover:bg-white px-8 py-4 text-lg text-gray-900">
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Side - Dashboard Preview */}
            <div className="relative animate-fade-in">
              <div className="glass p-8 rounded-2xl institutional-shadow">
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-semibold">Portfolio Overview</h3>
                    <div className="flex items-center space-x-2 text-korbly-gold">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+12.4%</span>
                    </div>
                  </div>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {trustMetrics.map((metric, index) => <div key={index} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="text-korbly-silver text-sm">{metric.label}</div>
                      </div>)}
                  </div>

                  {/* Chart Visualization */}
                  <div className="h-32 bg-white/5 rounded-lg flex items-end justify-center p-4 space-x-2">
                    {[...Array(12)].map((_, i) => <div key={i} className="bg-korbly-blue/60 rounded-t animate-float" style={{
                    height: `${Math.random() * 80 + 20}%`,
                    width: '20px',
                    animationDelay: `${i * 0.1}s`
                  }} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 bg-korbly-silver/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600 font-medium">Trusted by leading African institutions</p>
              <div className="flex items-center justify-center space-x-8 text-gray-400">
                <Shield className="w-8 h-8" />
                <Users className="w-8 h-8" />
                <Award className="w-8 h-8" />
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy mb-4">
              Institutional-Grade Infrastructure
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Purpose-built for the unique requirements of African institutional investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustMetrics.map((metric, index) => <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold gradient-text">{metric.value}</div>
                  <div className="text-lg font-semibold text-korbly-navy">{metric.label}</div>
                  <div className="text-gray-600">
                    {index === 0 && 'Actively managed across diversified portfolios with institutional oversight'}
                    {index === 1 && 'Leading pension funds, insurers, and development finance institutions'}
                    {index === 2 && 'Meeting the highest standards for regulatory compliance and risk management'}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-20 bg-gradient-to-br from-korbly-navy/5 to-korbly-blue/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy mb-4">
              Experience Institutional-Grade Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time portfolio management, risk assessment, and compliance monitoring
            </p>
          </div>

          <div className="relative">
            <div className="glass p-8 rounded-2xl institutional-shadow">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-korbly-navy">Live Dashboard</h3>
                  <div className="flex items-center space-x-2 text-korbly-blue">
                    <ArrowUp className="w-5 h-5" />
                    <span className="font-semibold">Real-time data</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-korbly-navy">$847M</div>
                    <div className="text-gray-600">Total Portfolio Value</div>
                    <div className="text-green-600 text-sm mt-2">+5.2% this quarter</div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-korbly-navy">23</div>
                    <div className="text-gray-600">Active Investments</div>
                    <div className="text-korbly-blue text-sm mt-2">3 pending review</div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-korbly-navy">AAA</div>
                    <div className="text-gray-600">Risk Rating</div>
                    <div className="text-green-600 text-sm mt-2">Compliant</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold text-korbly-navy mb-4">Portfolio Allocation</h4>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                    <div className="bg-korbly-blue h-full" style={{
                    width: '45%'
                  }}></div>
                    <div className="bg-korbly-gold h-full" style={{
                    width: '30%'
                  }}></div>
                    <div className="bg-korbly-silver h-full" style={{
                    width: '25%'
                  }}></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Corporate Bonds (45%)</span>
                    <span>Government Securities (30%)</span>
                    <span>Alternative Credit (25%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy mb-4">
              Trusted by Leading Institutions
            </h2>
            <p className="text-xl text-gray-600">
              Join Africa's most sophisticated institutional investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            quote: "Korbly has transformed our private credit origination process. The institutional-grade tools and compliance framework give us confidence in every investment decision.",
            author: "Chief Investment Officer",
            company: "Major African Pension Fund"
          }, {
            quote: "The real-time risk assessment and portfolio valuation capabilities are exactly what we needed for our private credit mandate.",
            author: "Portfolio Manager",
            company: "Leading Insurance Company"
          }, {
            quote: "Finally, a platform built specifically for institutional investors in Africa. The compliance framework is comprehensive and the user experience is exceptional.",
            author: "Head of Investments",
            company: "Development Finance Institution"
          }].map((testimonial, index) => <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-korbly-navy">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-korbly-navy text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Private Credit Strategy?
          </h2>
          <p className="text-xl text-korbly-silver mb-8 max-w-2xl mx-auto">
            Join leading African institutions already using Korbly to manage their private credit portfolios with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-korbly-blue hover:bg-korbly-blue/90 text-white px-8 py-4 text-lg">
                Request Access
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-korbly-navy px-8 py-4 text-lg">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;