import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  // ✅ Sync user to localStorage immediately when login is called
  const login = (userData) => {
    if (!userData) return;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // direct save
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ensure it's cleared
  };

  // (Optional) Safety sync in case user state changes somewhere else
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
