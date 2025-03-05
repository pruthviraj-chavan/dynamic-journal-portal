
import React, { ReactNode, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import {
  ChevronLeft,
  BookOpen,
  Home,
  BookOpenText,
  ListFilter,
  LogOut,
  PlusCircle,
  Users,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    // In a real app, handle actual logout
    navigate("/");
  }, [navigate]);

  const sidebarLinks = [
    { to: "/admin", label: "Dashboard", icon: Home },
    { to: "/admin/volumes", label: "Volumes", icon: BookOpenText },
    { to: "/admin/papers", label: "Papers", icon: ListFilter },
    { to: "/admin/authors", label: "Authors", icon: Users },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "h-screen sticky top-0 bg-card border-r border-border/50 flex flex-col transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[250px]"
        )}
      >
        {/* Sidebar Header */}
        <div className="py-6 px-4 border-b border-border/50 flex items-center justify-between">
          <div className={cn("flex items-center", isCollapsed && "justify-center w-full")}>
            <BookOpen className="h-6 w-6 text-primary" />
            {!isCollapsed && (
              <span className="ml-2 font-semibold">Admin Panel</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-full", isCollapsed && "hidden")}
            onClick={toggleSidebar}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/admin"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-2 px-3 rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary text-foreground/70 hover:text-foreground",
                      isCollapsed && "justify-center"
                    )
                  }
                >
                  <link.icon className="h-5 w-5" />
                  {!isCollapsed && <span className="ml-3">{link.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-border/50">
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center"
              )}
              onClick={() => navigate("/admin/new-volume")}
            >
              <PlusCircle className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">New Volume</span>}
            </Button>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start mt-2",
                isCollapsed && "justify-center"
              )}
              onClick={() => navigate("/admin/new-paper")}
            >
              <PlusCircle className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">New Paper</span>}
            </Button>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border/50 flex items-center justify-between">
          {isCollapsed ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full mx-auto"
              onClick={toggleSidebar}
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          ) : (
            <>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-card border-b border-border/50 py-4 px-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold">{title}</h1>
            <div className="flex items-center space-x-4">
              {isCollapsed && <ThemeToggle />}
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex"
                onClick={() => navigate("/")}
              >
                View Site
              </Button>
            </div>
          </div>
        </header>

        <motion.main 
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
