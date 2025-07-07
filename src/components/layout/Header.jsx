import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Briefcase,
  Home,
  Newspaper,
  Info,
  MessageSquare,
  Users,
  PlusSquare,
  Sun,
  Moon,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(
          () => element.scrollIntoView({ behavior: "smooth", block: "start" }),
          100
        );
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  const navLinks = [
    { to: "/", text: "Início", icon: Home },
    { to: "/#services", text: "Serviços", icon: Briefcase },
    { to: "/projects", text: "Projetos", icon: Briefcase },
    { to: "/#clients", text: "Clientes", icon: Users },
    { to: "/blog", text: "Blog", icon: Newspaper },
    { to: "/#contact", text: "Contato", icon: MessageSquare },
  ];

  const isActiveLink = (linkPath) => {
    if (linkPath.includes("#")) {
      return (
        location.pathname === "/" &&
        location.hash === linkPath.substring(linkPath.indexOf("#"))
      );
    }
    return (
      location.pathname === linkPath ||
      (linkPath !== "/" && location.pathname.startsWith(linkPath))
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-background/90 backdrop-blur-lg shadow-lg"
          : "bg-background/75 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link
              to="/"
              className="text-3xl font-slab font-bold text-primary hover:opacity-80 transition-opacity"
            >
              <img
                src="./images/logo_engbras.jpg"
                alt="Engbras Logo"
                className="inline-block h-12 w-30 mr-2"
              />
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-1 font-handel">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={() =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                    isActiveLink(link.to)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`
                }
              >
                <link.icon size={16} />
                <span>{link.text}</span>
              </NavLink>
            ))}
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground ml-4 transform hover:scale-105 transition-transform duration-200"
            >
              <Link to="/admin/dashboard" className="flex items-center">
                <LayoutDashboard size={16} className="mr-2" />
                Painel Admin
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2 text-foreground/70 hover:text-primary hover:bg-primary/10"
              aria-label={
                theme === "light"
                  ? "Mudar para tema escuro"
                  : "Mudar para tema claro"
              }
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </nav>

          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2 text-foreground/70 hover:text-primary hover:bg-primary/10"
              aria-label={
                theme === "light"
                  ? "Mudar para tema escuro"
                  : "Mudar para tema claro"
              }
            >
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-foreground/70 hover:bg-primary/10 hover:text-primary"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={mobileMenuOpen ? "x" : "menu"}
                  initial={{
                    opacity: 0,
                    rotate: mobileMenuOpen ? -90 : 90,
                    scale: 0.5,
                  }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    rotate: mobileMenuOpen ? 90 : -90,
                    scale: 0.5,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-border/70 bg-background/95 absolute w-full shadow-xl"
            style={{ maxHeight: "calc(100vh - 5rem)", overflowY: "auto" }}
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={() =>
                    `block py-3 text-base font-medium transition-colors duration-200 rounded-md px-3 flex items-center space-x-3 ${
                      isActiveLink(link.to)
                        ? "text-primary bg-primary/10"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    }`
                  }
                >
                  <link.icon size={20} />
                  <span>{link.text}</span>
                </NavLink>
              ))}
              <Button
                asChild
                className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base flex items-center"
              >
                <Link to="/admin/dashboard">
                  <LayoutDashboard size={18} className="mr-2" />
                  Painel Admin
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
