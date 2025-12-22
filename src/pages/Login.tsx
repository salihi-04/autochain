import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, ArrowRight, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement OTP login with Supabase
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Layout>
      <div className="container py-12 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                <Car className="h-7 w-7" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your dealer account
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send you an OTP to verify your number
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="accent"
                disabled={isLoading || !phone}
              >
                {isLoading ? (
                  'Sending OTP...'
                ) : (
                  <>
                    Get OTP
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/dealer/signup" className="text-accent font-medium hover:underline">
                  Sign up as a Dealer
                </Link>
              </p>
            </div>
          </div>

          {/* Info Note */}
          <p className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
