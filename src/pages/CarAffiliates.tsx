import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Users, UserPlus, Shield, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { getCarById, getDealersForCar, formatPrice } from '@/lib/mockData';
import VerificationBadge from '@/components/dealers/VerificationBadge';

const CarAffiliates = () => {
  const { id } = useParams();
  const car = getCarById(id || '');
  const dealers = getDealersForCar(id || '');
  const [showAttachDialog, setShowAttachDialog] = useState(false);
  const [isAttaching, setIsAttaching] = useState(false);
  const { toast } = useToast();

  if (!car) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <Link to="/cars">
            <Button>Back to Cars</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const originDealer = dealers.find(d => d.role === 'origin');
  const affiliates = dealers.filter(d => d.role === 'affiliate');

  const handleAttach = () => {
    setIsAttaching(true);
    // TODO: Integrate with Supabase
    setTimeout(() => {
      setIsAttaching(false);
      setShowAttachDialog(false);
      toast({
        title: "Attached Successfully!",
        description: "You're now an affiliate for this car. The origin dealer has been notified.",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="container py-6 sm:py-8 px-4 max-w-3xl">
        {/* Back Button */}
        <Link to={`/cars/${car.id}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to listing</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Dealers for {car.year} {car.make} {car.model}
          </h1>
          <p className="text-muted-foreground text-sm">
            {dealers.length} dealer{dealers.length !== 1 ? 's' : ''} attached to this car
          </p>
        </motion.div>

        {/* Abuse Prevention Notice */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Ownership Protection</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Only the origin dealer can edit or remove this listing</li>
                  <li>• Affiliates have read-only access</li>
                  <li>• Attachment history is permanent and immutable</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Origin Dealer */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Origin Dealer (Owner)
          </h2>
          {originDealer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link to={`/dealers/${originDealer.id}`}>
                <Card className="hover:shadow-md transition-shadow border-primary/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{originDealer.businessName}</h3>
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                            Owner
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{originDealer.location}</p>
                      </div>
                      <VerificationBadge tier={originDealer.verificationTier} size="sm" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Affiliates */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Affiliate Dealers ({affiliates.length})
          </h2>
          {affiliates.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No affiliates yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {affiliates.map((dealer, index) => (
                <motion.div
                  key={dealer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/dealers/${dealer.id}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{dealer.businessName}</h3>
                              <Badge variant="secondary" className="text-xs">
                                Affiliate
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{dealer.location}</p>
                          </div>
                          <VerificationBadge tier={dealer.verificationTier} size="sm" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Attach Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t sm:relative sm:border-none sm:p-0 sm:bg-transparent"
        >
          <Button 
            onClick={() => setShowAttachDialog(true)}
            className="w-full h-12 text-base"
            variant="accent"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Attach as Affiliate
          </Button>
        </motion.div>

        {/* Add bottom padding for fixed button on mobile */}
        <div className="h-20 sm:hidden" />

        {/* Attach Confirmation Dialog */}
        <Dialog open={showAttachDialog} onOpenChange={setShowAttachDialog}>
          <DialogContent className="max-w-md mx-4 sm:mx-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-accent" />
                Become an Affiliate
              </DialogTitle>
              <DialogDescription>
                You're about to attach yourself to this car listing as an affiliate dealer.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">What you can do:</p>
                  <p className="text-muted-foreground">Share this listing with your contacts and appear as a dealer for this car.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Limitations:</p>
                  <p className="text-muted-foreground">You cannot edit, remove, or claim ownership of this listing. All changes are controlled by the origin dealer.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Permanent record:</p>
                  <p className="text-muted-foreground">Your attachment will be recorded permanently and visible to all users.</p>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-3 sm:gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowAttachDialog(false)}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button 
                variant="accent" 
                onClick={handleAttach}
                disabled={isAttaching}
                className="flex-1 sm:flex-none"
              >
                {isAttaching ? 'Attaching...' : 'Confirm Attachment'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CarAffiliates;
