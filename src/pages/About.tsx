import Layout from '@/components/layout/Layout';
import { CheckCircle2, Users, Car, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    {
      icon: Car,
      title: 'Transparent Listings',
      description: 'Every car comes with a health score and detailed condition report.',
    },
    {
      icon: Users,
      title: 'Dealer Network',
      description: 'Connect with verified dealers across multiple locations.',
    },
    {
      icon: Shield,
      title: 'Verified Dealers',
      description: 'All dealers go through a verification process for your peace of mind.',
    },
    {
      icon: TrendingUp,
      title: 'Activity Tracking',
      description: 'Track leads, views, and performance with our dealer dashboard.',
    },
  ];

  return (
    <Layout>
      <div className="container py-12 space-y-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            About <span className="text-accent">AutoChain</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            AutoChain is a modern car marketplace connecting buyers with verified dealers. 
            We make car buying transparent, simple, and trustworthy.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-8 md:p-12 shadow-card"
        >
          <h2 className="text-2xl font-bold text-card-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe buying a car should be simple and stress-free. AutoChain brings 
            transparency to the car market by providing detailed health reports, verified 
            dealer profiles, and a seamless connection between buyers and sellers. Whether 
            you're looking for your next vehicle or you're a dealer wanting to expand your 
            reach, AutoChain is built for you.
          </p>
        </motion.section>

        {/* Features Grid */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground text-center">Why AutoChain?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold text-foreground text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Browse Cars', desc: 'Search through our extensive inventory with detailed filters.' },
              { step: '2', title: 'Check Health', desc: 'Review the health score and condition report for each vehicle.' },
              { step: '3', title: 'Contact Dealer', desc: 'Connect directly with verified dealers via WhatsApp.' },
            ].map((item, index) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center bg-primary/5 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            We're here to help. Reach out to our support team anytime.
          </p>
          <a 
            href="https://wa.me/2348000000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-success text-success-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <CheckCircle2 className="h-5 w-5" />
            Contact Us on WhatsApp
          </a>
        </motion.section>
      </div>
    </Layout>
  );
};

export default About;
