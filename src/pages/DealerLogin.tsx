import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, ArrowRight, Car, Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

type AuthStep = 'credentials' | 'otp';

const DealerLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<AuthStep>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const saveAuthAndRedirect = (opts?: { token?: string; redirectTo?: string }) => {
    const token = opts?.token ?? `demo-token-${Date.now()}`; // replace with real token from API
    const auth = {
      token,
      userType: 'dealer',
      phone,
      loggedAt: new Date().toISOString(),
    };
    // store auth for other parts of the app to read
    try {
      localStorage.setItem('auth', JSON.stringify(auth));
      console.log('auth stored in localStorage', auth);
    } catch (err) {
      console.error('failed to store auth in localStorage', err);
    }
    // default redirect to dealer vault (dashboard). Change to /cars for feeds or /dealers/:id for profile
    const redirect = opts?.redirectTo ?? '/dealer/vault';
    navigate(redirect, { replace: true });
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || phone.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid Nigerian phone number",
        variant: "destructive",
      });
      return;
    }

    if (!password || password.length < 6) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // ------------------------
    // Replace this block with your real API/Supabase call.
    // Example:
    // const res = await fetch('/api/auth/dealer/login', { method: 'POST', body: JSON.stringify({ phone, password }) });
    // const data = await res.json();
    // if (res.ok && data.token) { saveAuthAndRedirect({ token: data.token, redirectTo: '/dealer/vault' }) }
    // else show error toast
    // ------------------------
    setTimeout(() => {
      setIsLoading(false);
      if (useOtp) {
        setStep('otp');
        toast({
          title: "OTP Sent!",
          description: "Check your phone for the verification code",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You're now signed in as a dealer",
        });
        // save a demo auth token and navigate to dealer dashboard
        saveAuthAndRedirect({ token: `demo-token-${Date.now()}`, redirectTo: '/dealer/vault' });
      }
    }, 1500);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
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

    // ------------------------
    // Replace this block with your real OTP verification API call.
    // Example:
    // const res = await fetch('/api/auth/dealer/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) });
    // const data = await res.json();
    // if (res.ok && data.token) { saveAuthAndRedirect({ token: data.token }) }
    // else show error toast
    // ------------------------
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You're now signed in as a dealer",
      });
      // save a demo auth token and navigate to dealer dashboard
      saveAuthAndRedirect({ token: `demo-otp-token-${Date.now()}`, redirectTo: '/dealer/vault' });
    }, 1500);
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
              <div className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                <Car className="h-7 w-7" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {step === 'credentials' ? 'Dealer Login' : 'Verify Your Identity'}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {step === 'credentials' 
                ? 'Sign in to your dealer account'
                : `Enter the code sent to ${phone}`
              }
            </p>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-card">
            {step === 'credentials' ? (
              <form onSubmit={handleCredentialsSubmit} className="space-y-5">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 text-base"
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

                {/* Optional OTP Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Extra security (OTP)</span>
                  </div>
                  <Switch
                    checked={useOtp}
                    onCheckedChange={setUseOtp}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base" 
                  variant="accent"
                  disabled={isLoading || !phone || !password}
                >
                  {isLoading ? (
                    useOtp ? 'Sending OTP...' : 'Signing in...'
                  ) : (
                    <>
                      {useOtp ? 'Continue with OTP' : 'Sign In'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link 
                    to="/dealer/forgot-password" 
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
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
                  className="w-full h-12 text-base" 
                  variant="accent"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('credentials');
                    setOtp('');
                  }}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to login
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-border text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Don't have a dealer account?{' '}
                <Link to="/dealer/signup" className="text-accent font-medium hover:underline">
                  Sign up here
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Looking for cars?{' '}
                <Link to="/buyer/auth" className="text-accent font-medium hover:underline">
                  Buyer Login
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

export default DealerLogin;
