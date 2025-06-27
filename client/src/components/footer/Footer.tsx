import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">ShiftMate</h3>
          <p className="mb-4 max-w-xs">
            Streamlined staffing for the modern hospitality industry. Connect businesses with flexible, trusted workers.
          </p>
          <div className="flex items-center space-x-4 text-gray-400">
            <MapPin size={18} />
            <span>123 Main Street, City, Country</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-400 mt-2">
            <Phone size={18} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-400 mt-2">
            <Mail size={18} />
            <span>support@shiftmate.com</span>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#howitworks" className="hover:text-yellow-400 transition">How It Works</a>
            </li>
            <li>
              <a href="#features" className="hover:text-yellow-400 transition">Features</a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-yellow-400 transition">Pricing</a>
            </li>
            <li>
              <a href="#signup" className="hover:text-yellow-400 transition">Sign Up</a>
            </li>
            <li>
              <a href="#getstarted" className="hover:text-yellow-400 transition">Get Started</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <a href="/faq" className="hover:text-yellow-400 transition">FAQ</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-400 transition">Contact Us</a>
            </li>
            <li>
              <a href="/terms" className="hover:text-yellow-400 transition">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-yellow-400 transition">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-yellow-400 transition">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-yellow-400 transition">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-yellow-400 transition">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-indigo-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShiftMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
