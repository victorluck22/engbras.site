import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../hooks/useAuth";
import { loginRequest } from "@/api/services/authService";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  /**
   * Handles the login form submission and authentication process.
   *
   * @param {Event} e - The form submission event
   * @description Validates user credentials and either authenticates the user or shows an error toast
   * - Checks if email and password match 'adm'
   * - Sets authentication state in localStorage on successful login
   * - Redirects to admin dashboard on successful authentication
   * - Displays toast notifications for success or failure
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { access_token, user } = await loginRequest({ email, password });
      //console.log(user);
      login(access_token, user);

      toast({
        title: "Login bem-sucedido!",
        description: "Redirecionando para o painel...",
        variant: "default",
        className: "bg-green-500 text-white",
      });
      navigate("/admin");
    } catch (error) {
      toast({
        title: "Erro de login",
        description: "Erro ao fazer login",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Painel Administrativo Engbras</title>
        <meta
          name="description"
          content="Acesse o painel administrativo da Engbras."
        />
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-background p-4">
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-card p-8 sm:p-10 rounded-xl shadow-2xl border border-border"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <img-replace
                src="/engbras-logo-color.png"
                alt="Engbras Logo"
                className="h-12 w-auto mx-auto"
              />
            </Link>
            <h1
              className="text-3xl font-bold text-foreground"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground mt-1">Bem-vindo(a) de volta!</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Usuário (adm)
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite 'adm'"
                required
                className="mt-1 bg-background/50 focus:bg-background"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Senha (adm)
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite 'adm'"
                  required
                  className="pr-10 bg-background/50 focus:bg-background"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Button
              variant="link"
              asChild
              className="text-sm text-primary hover:underline"
            >
              <Link to="/">
                <ArrowLeft size={16} className="mr-1" /> Voltar para o site
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
