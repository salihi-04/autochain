import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CarFeed from "./pages/CarFeed";
import CarDetail from "./pages/CarDetail";
import CarAffiliates from "./pages/CarAffiliates";
import DealerProfile from "./pages/DealerProfile";
import DealerSignup from "./pages/DealerSignup";
import DealerLogin from "./pages/DealerLogin";
import DealerVault from "./pages/DealerVault";
import Dealers from "./pages/Dealers";
import About from "./pages/About";
import BuyerAuth from "./pages/BuyerAuth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cars" element={<CarFeed />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/cars/:id/affiliates" element={<CarAffiliates />} />
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/dealers/:id" element={<DealerProfile />} />
          <Route path="/dealer/signup" element={<DealerSignup />} />
          <Route path="/dealer/login" element={<DealerLogin />} />
          <Route path="/dealer/vault" element={<DealerVault />} />
          <Route path="/about" element={<About />} />
          <Route path="/buyer/auth" element={<BuyerAuth />} />
          <Route path="/login" element={<BuyerAuth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
