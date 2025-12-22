import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CarFeed from "./pages/CarFeed";
import CarDetail from "./pages/CarDetail";
import DealerProfile from "./pages/DealerProfile";
import DealerSignup from "./pages/DealerSignup";
import Dealers from "./pages/Dealers";
import About from "./pages/About";
import Login from "./pages/Login";
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
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/dealers/:id" element={<DealerProfile />} />
          <Route path="/dealer/signup" element={<DealerSignup />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
