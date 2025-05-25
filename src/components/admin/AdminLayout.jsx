import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Newspaper, Users, Mail, BarChart2, ChevronLeft, ChevronRight, Sun, Moon, LogOut, Settings } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const adminNavLinks = [
    { to: "/admin/dashboard", text: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/posts", text: "Gerenciar Posts", icon: Newspaper },
    { to: "/admin/subscribers", text: "Newsletter", icon: Mail },
    // { to: "/admin/users", text: "Usuários", icon: Users }, // Placeholder for future user management
    // { to: "/admin/analytics", text: "Analytics", icon: BarChart2 }, // Placeholder
    // { to: "/admin/settings", text: "Configurações", icon: Settings }, // Placeholder
  ];

  const isActiveLink = (path) => {
    return location.pathname === path || (path !== "/admin/dashboard" && location.pathname.startsWith(path));
  };

  const sidebarVariants = {
    expanded: { width: "280px" },
    collapsed: { width: "80px" },
  };

  const logoTextVariants = {
    expanded: { opacity: 1, x: 0, transition: { delay: 0.2 } },
    collapsed: { opacity: 0, x: -10, transition: { duration: 0.1 } },
  };
  
  const navTextVariants = {
    expanded: { opacity: 1, display: 'inline-block', transition: { delay: 0.1 } },
    collapsed: { opacity: 0, display: 'none', transition: { duration: 0.1 } },
  }

  return (
    <div className="flex h-screen bg-secondary">
      <motion.aside
        initial={false}
        animate={isSidebarCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-card text-foreground flex flex-col border-r border-border shadow-lg"
      >
        <div className={`flex items-center justify-between p-4 h-20 border-b border-border ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-6'}`}>
          <Link to="/admin/dashboard" className="flex items-center space-x-2 overflow-hidden">
            <img-replace src="/engbras-logo-icon.png" alt="Engbras Icon" className="h-8 w-auto flex-shrink-0"/>
            <motion.span 
              variants={logoTextVariants}
              className="text-2xl font-slab font-bold text-primary whitespace-nowrap"
            >
              Engbras
            </motion.span>
          </Link>
          {!isSidebarCollapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarCollapsed(true)}
              className="lg:hidden text-foreground/70 hover:text-primary hover:bg-primary/10"
              aria-label="Recolher menu"
            >
              <ChevronLeft size={20} />
            </Button>
          )}
        </div>

        <nav className="flex-grow py-6 space-y-2 overflow-y-auto">
          {adminNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={() =>
                `flex items-center py-3 transition-colors duration-200 group relative ${
                  isSidebarCollapsed ? 'px-6 justify-center' : 'px-6'
                } ${
                  isActiveLink(link.to)
                    ? "text-primary bg-primary/10 border-r-4 border-primary"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`
              }
            >
              <link.icon size={isSidebarCollapsed ? 24 : 20} className="flex-shrink-0" />
              <motion.span 
                variants={navTextVariants}
                className={`ml-4 whitespace-nowrap font-medium text-sm`}
              >
                {link.text}
              </motion.span>
              {isSidebarCollapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {link.text}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className={`p-4 border-t border-border mt-auto ${isSidebarCollapsed ? 'space-y-2 flex flex-col items-center' : 'space-y-2'}`}>
          <Button
            variant="ghost"
            size={isSidebarCollapsed ? "icon" : "default"}
            onClick={toggleTheme}
            className={`w-full flex items-center justify-start text-foreground/70 hover:text-primary hover:bg-primary/10 ${isSidebarCollapsed ? 'justify-center' : ''}`}
            aria-label={theme === 'light' ? "Mudar para tema escuro" : "Mudar para tema claro"}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <motion.span variants={navTextVariants} className={`ml-4 font-medium text-sm`}>
              {theme === 'light' ? 'Tema Escuro' : 'Tema Claro'}
            </motion.span>
          </Button>
          <Button 
            variant="ghost" 
            size={isSidebarCollapsed ? "icon" : "default"}
            asChild 
            className={`w-full flex items-center justify-start text-foreground/70 hover:text-primary hover:bg-primary/5 ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <Link to="/">
              <LogOut size={20}/>
              <motion.span variants={navTextVariants} className={`ml-4 font-medium text-sm`}>Sair do Admin</motion.span>
            </Link>
          </Button>
        </div>
      </motion.aside>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card h-20 flex items-center justify-between px-6 border-b border-border shadow-sm">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-foreground/70 hover:text-primary hover:bg-primary/10"
            aria-label={isSidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {isSidebarCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </Button>
          <h1 className="text-xl font-semibold text-foreground">
            Painel Administrativo Engbras
          </h1>
          <div className="w-10"></div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;