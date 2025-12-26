import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Lock, Phone, User, Car, Calendar, Banknote, Search, MoreVertical, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { vaultItems, formatPrice } from '@/lib/mockData';
import type { VaultItem } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DealerVault = () => {
  const [items, setItems] = useState<VaultItem[]>(vaultItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    senderName: '',
    senderPhone: '',
    notes: '',
  });
  const { toast } = useToast();

  const filteredItems = items.filter(item => 
    item.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = () => {
    if (!newItem.make || !newItem.model || !newItem.senderName || !newItem.senderPhone) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const item: VaultItem = {
      id: `v${Date.now()}`,
      dealerId: 'd1', // TODO: Get from auth context
      make: newItem.make,
      model: newItem.model,
      year: newItem.year,
      price: newItem.price ? parseInt(newItem.price) : null,
      senderName: newItem.senderName,
      senderPhone: newItem.senderPhone,
      notes: newItem.notes,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setItems([item, ...items]);
    setNewItem({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: '',
      senderName: '',
      senderPhone: '',
      notes: '',
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Saved to Vault",
      description: "Car details have been saved privately",
    });
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Removed",
      description: "Item removed from vault",
    });
  };

  const handleCallSender = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <Layout>
      <div className="container py-6 sm:py-8 px-4 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">My Vault</h1>
              <p className="text-sm text-muted-foreground">Private car records from contacts</p>
            </div>
          </div>
        </motion.div>

        {/* Search & Add */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11"
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent" className="h-11 px-4">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-4 sm:mx-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Save to Vault
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="make">Make *</Label>
                    <Input
                      id="make"
                      placeholder="Toyota"
                      value={newItem.make}
                      onChange={(e) => setNewItem({...newItem, make: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      placeholder="Camry"
                      value={newItem.model}
                      onChange={(e) => setNewItem({...newItem, model: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={newItem.year}
                      onChange={(e) => setNewItem({...newItem, year: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="price">Price (₦)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="12000000"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="senderName">Sender Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="senderName"
                      placeholder="Who sent this?"
                      value={newItem.senderName}
                      onChange={(e) => setNewItem({...newItem, senderName: e.target.value})}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="senderPhone">Sender Phone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="senderPhone"
                      type="tel"
                      placeholder="+234..."
                      value={newItem.senderPhone}
                      onChange={(e) => setNewItem({...newItem, senderPhone: e.target.value})}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional details..."
                    value={newItem.notes}
                    onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddItem} className="w-full" variant="accent">
                  Save to Vault
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Vault Items */}
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchQuery ? 'No results found' : 'Your vault is empty'}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {searchQuery 
                ? 'Try a different search term'
                : 'Save car details from contacts to keep track privately'
              }
            </p>
            {!searchQuery && (
              <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Entry
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Car className="h-4 w-4 text-muted-foreground shrink-0" />
                          <h3 className="font-semibold text-foreground truncate">
                            {item.year} {item.make} {item.model}
                          </h3>
                        </div>
                        {item.price && (
                          <p className="text-accent font-semibold text-sm mb-2">
                            {formatPrice(item.price, 'fixed')}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <User className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">From: {item.senderName}</span>
                        </div>
                        {item.notes && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                            {item.notes}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          Added {item.createdAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCallSender(item.senderPhone)}
                          className="h-9"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DealerVault;
