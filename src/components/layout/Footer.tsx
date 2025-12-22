import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">
                Auto<span className="text-accent">Chain</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm">
              Nigeria's trusted network for verified car dealers. Buy with confidence, sell with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/cars" className="hover:text-accent transition-colors">Browse Cars</Link></li>
              <li><Link to="/dealers" className="hover:text-accent transition-colors">Find Dealers</Link></li>
              <li><Link to="/dealer/signup" className="hover:text-accent transition-colors">Become a Dealer</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* For Dealers */}
          <div>
            <h4 className="font-semibold mb-4">For Dealers</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/dealer/signup" className="hover:text-accent transition-colors">Sign Up</Link></li>
              <li><Link to="/dealer/login" className="hover:text-accent transition-colors">Login</Link></li>
              <li><Link to="/help" className="hover:text-accent transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+234 800 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@autochain.ng</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} AutoChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
