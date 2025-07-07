import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Erro ao decodificar o usuário:", error);
      }
    }
  }, [token]);

  const fetchUserFromToken = async (token) => {
    try {
      //const userData = JSON.parse(atob(token.split(".")[1]));
      setUser(userData);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      logout();
    }
  };

  const fetchUser = async (userData) => {
    //console.log("Dados do usuário recebidos:", userData);
    setUser(userData);
  };

  const login = (token, userData) => {
    setToken(token);
    fetchUser(userData);
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUser", JSON.stringify(userData));
    localStorage.setItem("adminAuthenticated", true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
