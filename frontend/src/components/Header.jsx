import { useState } from "react";
import { Menu, X, PawPrint, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useAuth();
  console.log(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowLogout(false);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/pets" className="flex items-center gap-2">
          <PawPrint className="w-6 h-6" />
          <span className="font-bold text-lg">Pet Adoption System</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {user ? (
            <div className="relative">
              <span
                className="cursor-pointer hover:text-blue-200 transition-colors"
                onMouseEnter={() => setShowLogout(true)}
                onMouseLeave={() => setShowLogout(false)}
              >
                Welcome, {user.name}
              </span>

              {showLogout && (
                <div
                  className="absolute top-full right-0 mt-0 bg-red-500 hover:bg-red-600 px-3 py-2 rounded shadow-lg whitespace-nowrap transition-colors"
                  onMouseEnter={() => setShowLogout(true)}
                  onMouseLeave={() => setShowLogout(false)}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-white"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/" className="hover:text-blue-200">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-200">
                Signup
              </Link>
            </>
          )}
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-blue-500 px-4 pb-4">
          {user ? (
            <>
              <span className="block py-2">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 py-2 hover:text-blue-200 transition-colors"
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="block py-2 hover:text-blue-200">
                Login
              </Link>
              <Link to="/signup" className="block py-2 hover:text-blue-200">
                Signup
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
