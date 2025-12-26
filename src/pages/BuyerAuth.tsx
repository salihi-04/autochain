import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, ArrowRight, Car, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

type AuthStep = 'phone' | 'otp';

const BuyerAuth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<AuthStep>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid Nigerian phone number",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    // TODO: Integrate with Supabase OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent!",
        description: "Check your phone for the verification code",
      });
    }, 1500);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
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
    // TODO: Verify OTP with Supabase
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome!",
        description: "You're now signed in as a buyer",
      });
      // TODO: Navigate to cars page
    }, 1500);
  };

  const handleResendOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "OTP Resent",
        description: "Check your phone for the new code",
      });
    }, 1000);
  };

  return (
    <Layout>
      <div className="container py-8 sm:py-12 min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center">
                <Car className="h-7 w-7" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {step === 'phone' ? 'Find Your Next Car' : 'Verify Your Number'}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {step === 'phone' 
                ? 'Quick sign in with your phone number'
                : `Enter the code sent to ${phone}`
              }
            </p>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-card">
            {step === 'phone' ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
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
                      className="pl-10 h-12 text-base"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send you a one-time code to verify
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base" 
                  variant="accent"
                  disabled={isLoading || !phone}
                >
                  {isLoading ? (
                    'Sending...'
                  ) : (
                    <>
                      Get OTP
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
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
                  className="w-full h-12 text-base" 
                  variant="accent"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Change number
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-accent font-medium hover:underline disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Are you a dealer?{' '}
                <Link to="/dealer/login" className="text-accent font-medium hover:underline">
                  Dealer Login
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default BuyerAuth;
