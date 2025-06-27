import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from '../../assets/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Replace these handlers with your modal open logic or navigation
  const handleSignUpClick = () => {
    // open signup modal
    console.log("Sign Up clicked");
  };

  const handleGetStartedClick = () => {
    // open get started modal
    console.log("Get Started clicked");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-95 backdrop-blur-md shadow-md z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-20 h-20">
        <div className="logo">
          <img src={Logo} alt="Shift mate logo" className="h-10" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-gray-800 font-semibold text-base items-center">
            <li>
            <a href="#whyus" className="hover:text-indigo-600 transition">
              Why Us
            </a>
          </li>
          <li>
            <a href="#howitworks" className="hover:text-indigo-600 transition">
              How It Works
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-indigo-600 transition">
              Pricing
            </a>
          </li>
          <li>
            <button
              onClick={handleSignUpClick}
              className="bg-yellow-400 text-indigo-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition"
            >
              Sign Up
            </button>
          </li>
          <li>
            <button
              onClick={handleGetStartedClick}
              className="bg-pink-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-pink-400 transition"
            >
              Get Started
            </button>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-800 p-2 rounded hover:bg-gray-200 transition"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md px-6 py-6 border-t border-gray-200">
          <ul className="space-y-6 text-center">
            <li>
              <a href="#whyus" className="text-gray-800 text-lg hover:text-indigo-600 transition">
                Why Us
              </a>
            </li>
            <li>
              <a href="#howitworks" className="text-gray-800 text-lg hover:text-indigo-600 transition">
                How It Works
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-800 text-lg hover:text-indigo-600 transition">
                Pricing
              </a>
            </li>
            <li>
              <button
                onClick={handleSignUpClick}
                className="w-full bg-yellow-400 text-indigo-900 font-semibold px-8 py-3 rounded-full hover:bg-yellow-300 transition"
              >
                Sign Up
              </button>
            </li>
            <li>
              <button
                onClick={handleGetStartedClick}
                className="w-full bg-pink-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-pink-400 transition"
              >
                Get Started
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
