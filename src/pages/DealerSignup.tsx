import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Phone, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const DealerSignup = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "OTP Sent!",
        description: "Please check your phone for the verification code.",
      });
    }, 1500);
  };

  const benefits = [
    'Post unlimited car listings',
    'Attach to other dealers\' cars as affiliate',
    'Receive leads directly on WhatsApp',
    'Track your sales and activity',
    'Build trust with verified badge',
  ];

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Become a Dealer
              </h1>
              <p className="text-muted-foreground">
                Join Nigeria's trusted network of car dealers
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send you a verification code
                </p>
              </div>

              <Button 
                type="submit" 
                variant="accent" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Sending OTP...' : 'Get OTP'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{' '}
                <a href="/dealer/login" className="text-accent font-medium hover:underline">
                  Login here
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md text-primary-foreground"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-accent" />
              <h2 className="text-2xl font-bold">Why Join AutoChain?</h2>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-accent text-sm">✓</span>
                  </div>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 p-6 rounded-2xl bg-primary-foreground/10">
              <p className="text-lg mb-2">
                "AutoChain helped me expand my reach. I now sell cars through 15 affiliate dealers!"
              </p>
              <p className="text-sm text-primary-foreground/70">
                — Chukwu E., Lagos Dealer
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default DealerSignup;
