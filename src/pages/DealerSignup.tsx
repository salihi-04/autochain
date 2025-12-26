import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Phone, ArrowRight, Shield, Lock, Eye, EyeOff, User, MapPin, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

type SignupStep = 'details' | 'otp';

const DealerSignup = () => {
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<SignupStep>('details');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessName || !phone || !password || !location) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    // TODO: Integrate with Supabase
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent!",
        description: "Please check your phone for the verification code.",
      });
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit code",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    // TODO: Verify OTP and create account with Supabase
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created!",
        description: "Welcome to AutoChain. Start listing your cars!",
      });
      // TODO: Navigate to dealer dashboard
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
      <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                <Car className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {step === 'details' ? 'Become a Dealer' : 'Verify Your Phone'}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                {step === 'details'
                  ? "Join Nigeria's trusted network of car dealers"
                  : `Enter the code sent to ${phone}`
                }
              </p>
            </div>

            {step === 'details' ? (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="businessName"
                      placeholder="Your dealership name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="08012345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Ikeja, Lagos"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="accent" 
                  className="w-full h-12 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending OTP...' : 'Continue'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-5">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    Enter OTP
                  </Label>
                  <div className="flex justify-center">
                    <InputOTP 
                      maxLength={6} 
                      value={otp} 
                      onChange={setOtp}
                      className="gap-2"
                    >
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot 
                            key={i} 
                            index={i} 
                            className="h-12 w-10 sm:h-14 sm:w-12 text-lg border-input rounded-lg"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="accent" 
                  className="w-full h-12 text-base"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? 'Creating Account...' : 'Verify & Create Account'}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('details');
                    setOtp('');
                  }}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to details
                </button>
              </form>
            )}

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{' '}
                <Link to="/dealer/login" className="text-accent font-medium hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Benefits (hidden on mobile) */}
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
