import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Car, Shield, Users, ArrowRight, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Dealers',
      description: 'Every dealer on our platform goes through a verification process to ensure trust and reliability.',
    },
    {
      icon: Users,
      title: 'Chain Selling',
      description: 'Dealers can attach to other listings, creating a network of trusted sellers for every car.',
    },
    {
      icon: TrendingUp,
      title: 'Health Tracking',
      description: 'Every car has a transparent health score so you know exactly what you\'re buying.',
    },
    {
      icon: Zap,
      title: 'Instant Leads',
      description: 'Connect directly with dealers via WhatsApp for quick and easy communication.',
    },
  ];

  const stats = [
    { value: '2,500+', label: 'Cars Listed' },
    { value: '450+', label: 'Verified Dealers' },
    { value: '15,000+', label: 'Happy Buyers' },
    { value: '36', label: 'States Covered' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero min-h-[90vh] flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                Nigeria's Trusted
                <span className="block text-accent">Dealer Network</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto"
            >
              Buy verified cars from trusted dealers. Sell through a network of affiliates. 
              AutoChain makes car trading transparent and efficient.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/cars">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Browse Cars
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dealer/signup">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  I'm a Dealer
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose AutoChain?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're reimagining how cars are bought and sold in Nigeria with transparency, 
              trust, and technology at the core.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How AutoChain Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're buying or selling, we've made the process simple.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* For Buyers */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
              <h3 className="text-2xl font-bold text-accent mb-6">For Buyers</h3>
              <ul className="space-y-4">
                {[
                  'Browse our extensive catalog of verified cars',
                  'Check health scores and full condition reports',
                  'See all dealers selling each car',
                  'Contact your preferred dealer directly via WhatsApp',
                  'Visit for inspection at your convenience',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-card-foreground">{step}</span>
                  </li>
                ))}
              </ul>
              <Link to="/cars" className="block mt-6">
                <Button variant="accent" className="w-full">
                  Start Browsing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* For Dealers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">For Dealers</h3>
              <ul className="space-y-4">
                {[
                  'Sign up and get verified as a trusted dealer',
                  'Post your inventory with health scores',
                  'Attach to other dealers\' cars as an affiliate',
                  'Receive leads directly to your WhatsApp',
                  'Track your sales and grow your network',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    <span className="text-card-foreground">{step}</span>
                  </li>
                ))}
              </ul>
              <Link to="/dealer/signup" className="block mt-6">
                <Button variant="default" className="w-full">
                  Become a Dealer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Join thousands of Nigerians who trust AutoChain for transparent, 
              reliable car transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cars">
                <Button variant="accent" size="lg">
                  Browse Cars Now
                </Button>
              </Link>
              <Link to="/dealer/signup">
                <Button variant="hero-outline" size="lg">
                  Register as Dealer
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
