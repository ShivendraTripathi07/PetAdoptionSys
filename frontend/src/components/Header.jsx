import { useState } from "react";
import { Menu, X, PawPrint, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  // const handleLogout = () => {
  //   logout();
  //   navigate("/");
  // };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <PawPrint className="w-6 h-6" />
          <span className="font-bold text-lg">Pet Adoption System</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              {/* <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                <LogOut size={14} /> Logout
              </button> */}
            </>
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
              {/* <button
                onClick={handleLogout}
                className="block w-full text-left py-2 hover:text-blue-200"
              >
                Logout
              </button> */}
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 hover:text-blue-200">
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
