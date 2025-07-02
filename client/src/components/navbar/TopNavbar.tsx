import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

interface NavbarProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const TopNavbar: React.FC<NavbarProps> = ({ setIsAuthenticated }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={Logo} alt="Shift mate logo" className="h-10" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/main"
              className="text-gray-800 font-medium hover:text-indigo-600 transition"
            >
              Jobs
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-800 font-medium hover:text-indigo-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/my-profile"
              className="text-gray-800 font-medium hover:text-indigo-600 transition"
            >
              My Profile
            </Link>

            <Button
              icon={<LogOut />}
              label="LogOut"
              bgColorClass="bg-yellow-400"
              textColorClass="text-indigo-900"
              hoverBgColorClass="bg-yellow-300"
              onClick={handleLogout}
            />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 bg-white p-2 rounded-md shadow-md"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-4">
          <Link
            to="/main"
            className="block text-gray-800 font-medium hover:text-indigo-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Jobs
          </Link>
          <Link
            to="/dashboard"
            className="block text-gray-800 font-medium hover:text-indigo-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/my-profile"
            className="block text-gray-800 font-medium hover:text-indigo-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Profile
          </Link>

          <Button
            icon={<LogOut />}
            label="LogOut"
            bgColorClass="bg-yellow-400"
            textColorClass="text-indigo-900"
            hoverBgColorClass="bg-yellow-300"
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleLogout();
            }}
          />
        </div>
      )}
    </header>
  );
};

export default TopNavbar;
