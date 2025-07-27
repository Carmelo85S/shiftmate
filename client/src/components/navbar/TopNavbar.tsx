import { useEffect, useState } from "react";
import { LogOut, Menu, X, Mail } from "lucide-react";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

interface NavbarProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const TopNavbar: React.FC<NavbarProps> = ({ setIsAuthenticated }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [messageCount, setMessageCount] = useState<number>(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      console.log("User:", user);
      if (!user.id) return;

      try {
        const res = await fetch(`http://localhost:3000/api/messages/unread-count/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        console.log("📬 Unread message data:", data);
        if (res.ok) {
          console.log("Unread count data:", data);
          setMessageCount(data.count);
        } else {
          console.error("Unread count failed:", data);
        }
      } catch (e) {
        console.error("Failed to fetch unread messages count", e);
      }
    };

    fetchUnreadCount();
  }, []);

  // Inside TopNavbar
  useEffect(() => {
    window.updateMessageCount = (valueOrUpdater) => {
      setMessageCount((prev) =>
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(prev)
          : valueOrUpdater
      );
    };

    return () => {
      window.updateMessageCount = undefined;
    };
  }, []);


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
              to="/messages"
              className="relative text-gray-800 hover:text-indigo-600 transition"
            >
              <Mail size={22} />
              {messageCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {messageCount}
                </span>
              )}
            </Link>

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
            to="/messages"
            className="block text-gray-800 font-medium hover:text-indigo-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Messages {messageCount > 0 && <span className="ml-1 text-sm text-red-500">({messageCount})</span>}
          </Link>

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
