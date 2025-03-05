
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Menu, X, PlusCircle, Layers, FileText, Users, Settings, LogOut } from "lucide-react";
import AdminLogin from "@/components/AdminLogin";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = "Admin Panel" }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isAdminLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsLoggedIn(false);
    navigate("/admin");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const menuItems = [
    { icon: Layers, label: "Volumes", path: "/admin/volumes" },
    { icon: FileText, label: "Papers", path: "/admin/papers" },
    { icon: Users, label: "Authors", path: "/admin/authors" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-card border-r">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <span>Research Admin</span>
          </Link>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile Menu Button and Drawer */}
      <div className="flex flex-col flex-1">
        <header className="bg-card shadow z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden mr-2" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden" 
                onClick={handleLogout}
              >
                <LogOut />
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute inset-x-0 top-16 z-50 bg-background border-b shadow-lg">
            <nav className="px-2 pt-2 pb-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
