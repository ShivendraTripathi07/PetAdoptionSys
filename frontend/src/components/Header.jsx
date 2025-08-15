import { useState } from "react";
import { Menu, X, PawPrint, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
    setIsOpen(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link
          to="/pets"
          className="flex items-center gap-3 transition-transform hover:scale-105 duration-200"
        >
          <PawPrint className="w-8 h-8 text-blue-200" />
          <span className="font-extrabold text-2xl tracking-tight">
            Pet Adoption System
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="cursor-pointer text-blue-100 hover:text-white font-semibold transition-colors duration-200 flex items-center gap-2 focus:outline-none"
              >
                <User className="w-5 h-5" /> Welcome, {user.name}
              </button>
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white text-gray-800 rounded-xl shadow-2xl py-3 transition-all duration-300 ease-in-out z-10 border border-gray-100">
                  <Link
                    to="/profile"
                    className="block px-5 py-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 flex items-center gap-2"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-5 py-3 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors duration-200 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/"
                className="text-blue-100 hover:text-white font-semibold transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-blue-100 hover:text-white font-semibold transition-colors duration-200"
              >
                Signup
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-blue-100 hover:text-white focus:outline-none transition-colors duration-200"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-blue-600 px-4 pb-4 pt-2 shadow-inner">
          {user ? (
            <>
              <button
                onClick={toggleUserMenu}
                className="flex items-center gap-2 py-2 text-blue-100 font-semibold w-full text-left focus:outline-none"
              >
                <User className="w-5 h-5" /> Welcome, {user.name}
              </button>
              {showUserMenu && (
                <div className="pl-4">
                  <Link
                    to="/profile"
                    className="block py-2 text-blue-100 hover:text-white font-medium transition-colors duration-200 flex items-center gap-2"
                    onClick={() => {
                      setIsOpen(false);
                      setShowUserMenu(false);
                    }}
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-blue-100 hover:text-white font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/"
                className="block py-2 text-blue-100 hover:text-white font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block py-2 text-blue-100 hover:text-white font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
