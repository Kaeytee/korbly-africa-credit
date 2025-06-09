
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useMemo } from 'react';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Award,
  CheckCircle,
  Calendar,
  Map
} from 'lucide-react';

const About = () => {
  // Get current year dynamically to avoid manual updates
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const milestones = [
    { year: '2020', event: 'Company Founded', description: 'Established with a vision to transform African private credit markets' },
    { year: '2021', event: 'Regulatory Approval', description: 'Obtained licensing from key African financial regulators' },
    { year: '2022', event: 'Platform Launch', description: 'First institutional clients onboarded with $500M AUM' },
    { year: '2023', event: 'Major Expansion', description: 'Crossed $1B AUM and expanded to 5 African markets' },
    { year: String(currentYear), event: 'Market Leadership', description: 'Became the leading institutional private credit platform in Africa' },
  ];

  const leadership = [
    {
      name: 'Dr. Amara Johnson',
      role: 'Chief Executive Officer',
      background: 'Former Managing Director at Goldman Sachs Africa, 15+ years in institutional finance',
      credentials: 'MBA Harvard Business School, CFA',
    },
    {
      name: 'Prof. Kwame Asante',
      role: 'Chief Technology Officer',
      background: 'Ex-Senior Director at Morgan Stanley Technology, fintech veteran',
      credentials: 'PhD Computer Science MIT, Former McKinsey Partner',
    },
    {
      name: 'Sarah Mwangi',
      role: 'Chief Risk Officer',
      background: 'Former Head of Risk at Standard Bank Africa, regulatory expert',
      credentials: 'MSc Risk Management LSE, FRM Certified',
    },
  ];

  const certifications = [
    { name: 'SOC 2 Type II', description: 'Security and availability certification' },
    { name: 'ISO 27001', description: 'Information security management' },
    { name: 'BoG Licensed', description: 'Bank of Ghana regulatory approval' },
    { name: 'SEC Registered', description: 'Securities and Exchange Commission' },
    { name: 'NPRA Approved', description: 'National Pensions Regulatory Authority' },
    { name: 'NIC Compliant', description: 'National Insurance Commission' },
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-korbly-navy to-korbly-dark text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">To make private credit</span><br />
                safe, investable, auditable, and scalable
              </h1>
              <p className="text-xl text-korbly-silver mb-8">
                We're building the institutional infrastructure that will power Africa's private credit markets for decades to come.
              </p>
              <div className="flex justify-center space-x-4">
                <Badge variant="secondary" className="bg-korbly-blue/20 text-white">
                  Founded 2020
                </Badge>
                <Badge variant="secondary" className="bg-korbly-gold/20 text-white">
                  $2.3B+ AUM
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-white">
                  150+ Institutions
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy">
                    Our Mission
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Africa's private credit markets represent one of the world's largest underserved opportunities. 
                    We believe that with the right institutional infrastructure, African private credit can become 
                    a cornerstone asset class for global institutional investors.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our platform combines deep African market expertise with world-class technology to create 
                    the transparency, compliance, and scale that institutional investors demand.
                  </p>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-korbly-blue/10 to-korbly-gold/10 p-8 rounded-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Map className="w-8 h-8 text-korbly-blue" />
                        <span className="font-semibold text-korbly-navy">5 African Markets</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-8 h-8 text-korbly-gold" />
                        <span className="font-semibold text-korbly-navy">150+ Institutional Partners</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-8 h-8 text-green-500" />
                        <span className="font-semibold text-korbly-navy">300% YoY Growth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 bg-korbly-silver/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600">
                Building institutional-grade infrastructure for African private credit
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-korbly-blue rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-2xl font-bold text-korbly-blue">{milestone.year}</span>
                          <h3 className="text-xl font-semibold text-korbly-navy">{milestone.event}</h3>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy mb-4">
                Leadership Team
              </h2>
              <p className="text-xl text-gray-600">
                Institutional expertise combined with deep African market knowledge
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-korbly-blue to-korbly-gold rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-korbly-navy">{leader.name}</h3>
                      <p className="text-korbly-blue font-semibold">{leader.role}</p>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {leader.background}
                    </p>
                    <div className="space-y-1">
                      {leader.credentials.split(', ').map((cred, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {cred}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Regulatory Compliance */}
        <section className="py-20 bg-gradient-to-br from-korbly-navy/5 to-korbly-blue/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy mb-4">
                Regulatory Compliance
              </h2>
              <p className="text-xl text-gray-600">
                Exceeding the highest standards for institutional financial services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-8 h-8 text-korbly-blue" />
                      <h3 className="text-lg font-bold text-korbly-navy">{cert.name}</h3>
                    </div>
                    <p className="text-gray-600">{cert.description}</p>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Market Impact */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-korbly-navy mb-4">
                Market Impact
              </h2>
              <p className="text-xl text-gray-600">
                Driving institutional adoption across African private credit markets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '$2.3B+', label: 'Assets Under Management', growth: '+45% YoY' },
                { value: '150+', label: 'Institutional Clients', growth: '+65% YoY' },
                { value: '5', label: 'African Markets', growth: 'Expanding to 3 more' },
                { value: '99.9%', label: 'Platform Uptime', growth: 'Industry Leading' },
              ].map((metric, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="space-y-2">
                    <div className="text-3xl font-bold gradient-text">{metric.value}</div>
                    <div className="text-lg font-semibold text-korbly-navy">{metric.label}</div>
                    <div className="text-sm text-green-600 font-medium">{metric.growth}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-korbly-navy text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Partner With Us
            </h2>
            <p className="text-xl text-korbly-silver mb-8 max-w-2xl mx-auto">
              Join the leading institutional investors already transforming their private credit operations with Korbly.
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
                  Contact Leadership
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
