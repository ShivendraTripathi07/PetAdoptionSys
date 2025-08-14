import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
