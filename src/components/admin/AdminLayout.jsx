import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Newspaper, Mail, Sun, Moon, LogOut, Menu, X, ChevronLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const adminNavLinks = [
    { to: "/admin/dashboard", text: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/posts", text: "Gerenciar Posts", icon: Newspaper },
    { to: "/admin/subscribers", text: "Newsletter", icon: Mail },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path || (path !== "/admin/dashboard" && location.pathname.startsWith(path));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Open sidebar on desktop
      } else {
        setIsSidebarOpen(false); // Close sidebar on mobile
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const sidebarVariants = {
    open: { x: 0, width: isMobile ? "80%" : "260px", opacity: 1 },
    closed: { x: "-100%", width: isMobile ? "80%" : "260px", opacity: isMobile ? 1: 0, transition: {duration: 0.2} },
  };

  const desktopSidebarAlwaysVisible = {
    open: { width: "260px", x:0, opacity: 1},
    closed: { width: "80px", x:0, opacity: 1}
  }

  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  const navTextVariants = {
    open: { opacity: 1, display: 'inline-block', x: 0, transition: { delay: 0.1 } },
    closed: { opacity: 0, display: 'none', x: -10, transition: { duration: 0.1 } },
  };
   const logoTextVariants = {
    open: { opacity: 1, x: 0, transition: { delay: 0.2 } },
    closed: { opacity: 0, x: -10, transition: { duration: 0.1 } },
  };


  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Dim Overlay */}
      {isMobile && isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? "closed" : (isDesktopSidebarCollapsed ? "closed" : "open")}
        animate={isMobile ? (isSidebarOpen ? "open" : "closed") : (isDesktopSidebarCollapsed ? "closed" : "open")}
        variants={isMobile ? sidebarVariants : desktopSidebarAlwaysVisible}
        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }}
        className={`bg-card text-foreground flex flex-col border-r border-border shadow-lg fixed md:relative z-40 h-full 
                   ${isMobile ? '' : (isDesktopSidebarCollapsed ? 'w-[80px]' : 'w-[260px]')}`}
      >
        <div className={`flex items-center justify-between p-4 h-20 border-b border-border ${isDesktopSidebarCollapsed && !isMobile ? 'px-0 justify-center' : 'px-6'}`}>
          <Link to="/admin/dashboard" className="flex items-center space-x-2 overflow-hidden">
            <img-replace src="/engbras-logo-icon.png" alt="Engbras Icon" className="h-8 w-auto flex-shrink-0"/>
            <motion.span 
              variants={logoTextVariants}
              initial={isDesktopSidebarCollapsed && !isMobile ? "closed" : "open"}
              animate={isDesktopSidebarCollapsed && !isMobile ? "closed" : "open"}
              className="text-2xl font-slab font-bold text-primary whitespace-nowrap"
            >
              Engbras
            </motion.span>
          </Link>
          {isMobile ? (
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="text-foreground/70 hover:text-primary">
              <X size={24} />
            </Button>
          ) : (
            !isDesktopSidebarCollapsed && (
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsDesktopSidebarCollapsed(true)}
                    className="hidden lg:flex text-foreground/70 hover:text-primary hover:bg-primary/10"
                    aria-label="Recolher menu"
                  >
                    <ChevronLeft size={20} />
                  </Button>
            )
          )}
        </div>

        <nav className="flex-grow py-6 space-y-2 overflow-y-auto">
          {adminNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => isMobile && setIsSidebarOpen(false)}
              className={() =>
                `flex items-center py-3 transition-colors duration-200 group relative ${
                  (isDesktopSidebarCollapsed && !isMobile) ? 'px-6 justify-center' : 'px-6'
                } ${
                  isActiveLink(link.to)
                    ? "text-primary bg-primary/10 font-semibold border-r-4 border-primary"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`
              }
            >
              <link.icon size={(isDesktopSidebarCollapsed && !isMobile) ? 24 : 20} className="flex-shrink-0" />
              <motion.span 
                variants={navTextVariants}
                initial={isDesktopSidebarCollapsed && !isMobile ? "closed" : "open"}
                animate={isDesktopSidebarCollapsed && !isMobile ? "closed" : "open"}
                className={`ml-4 whitespace-nowrap font-medium text-sm`}
              >
                {link.text}
              </motion.span>
              {(isDesktopSidebarCollapsed && !isMobile) && (
                <span className="absolute left-full ml-3 px-2 py-1 text-xs font-medium text-primary-foreground bg-card border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {link.text}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className={`p-4 border-t border-border mt-auto ${(isDesktopSidebarCollapsed && !isMobile) ? 'space-y-3 flex flex-col items-center' : 'space-y-2'}`}>
          <Button
            variant="ghost"
            size={(isDesktopSidebarCollapsed && !isMobile) ? "icon" : "default"}
            onClick={toggleTheme}
            className={`w-full flex items-center justify-start text-foreground/70 hover:text-primary hover:bg-primary/10 ${(isDesktopSidebarCollapsed && !isMobile) ? 'justify-center' : ''}`}
            aria-label={theme === 'light' ? "Mudar para tema escuro" : "Mudar para tema claro"}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <motion.span variants={navTextVariants} initial={isDesktopSidebarCollapsed && !isMobile ? "closed" : "open"} animate={isDesktopSidebarCollapsed && !isMobile ? "closed" : "open"} className={`ml-4 font-medium text-sm`}>
              {theme === 'light' ? 'Tema Escuro' : 'Tema Claro'}
            </motion.span>
          </Button>
          <Button 
            variant="ghost" 
            size={(isDesktopSidebarCollapsed && !isMobile) ? "icon" : "default"}
            onClick={handleLogout}
            className={`w-full flex items-center justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10 ${(isDesktopSidebarCollapsed && !isMobile) ? 'justify-center' : ''}`}
          >
            <LogOut size={20}/>
            <motion.span variants={navTextVariants} initial={isDesktopSidebarCollapsed && !isMobile ? "closed" : "open"} animate={isDesktopSidebarCollapsed && !isMobile ? "closed" : "open"} className={`ml-4 font-medium text-sm`}>Sair</motion.span>
          </Button>
        </div>
      </motion.aside>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card h-20 flex items-center justify-between px-6 border-b border-border shadow-sm">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              if (isMobile) setIsSidebarOpen(!isSidebarOpen);
              else setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
            }}
            className="text-foreground/70 hover:text-primary hover:bg-primary/10"
            aria-label={isSidebarOpen || !isDesktopSidebarCollapsed ? "Recolher menu" : "Expandir menu"}
          >
            {isMobile ? <Menu size={24} /> : (isDesktopSidebarCollapsed ?  <Menu size={24} /> : <ChevronLeft size={24}/>) }
          </Button>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground whitespace-nowrap truncate">
            Painel Engbras
          </h1>
          <div className="w-10"></div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="p-4 sm:p-6 md:p-8"
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