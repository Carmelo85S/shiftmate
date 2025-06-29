import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthenticatedNavbar: React.FC<NavbarProps> = ({ setIsAuthenticated }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate(); 
    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate("/");
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
            <a href="#whyus" className="hover:text-indigo-600 transition">Dashboard</a>
          </li>
          <li>
            <a href="#howitworks" className="hover:text-indigo-600 transition">My Profile</a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-indigo-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-800 p-2 rounded hover:bg-gray-200 transition"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md px-6 py-6 border-t border-gray-200">
          <ul className="space-y-6 text-center">
            <li>
              <a href="#whyus" className="text-gray-800 text-lg hover:text-indigo-600 transition">Why Us</a>
            </li>
            <li>
              <a href="#howitworks" className="text-gray-800 text-lg hover:text-indigo-600 transition">How It Works</a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-800 text-lg hover:text-indigo-600 transition">Pricing</a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full bg-yellow-400 text-indigo-900 font-semibold px-8 py-3 rounded-full hover:bg-yellow-300 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default AuthenticatedNavbar;
