import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { subscribe } from "../../api/services/subscriberService";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast({
        title: "Email Inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmittingNewsletter(true);

    try {
      // Simulação de envio para backend PHP
      // Substitua '/api/subscribe-newsletter.php' pelo seu endpoint real
      const subscribeRequest = await subscribe(newsletterEmail);
      if (subscribeRequest.success) {
        toast({
          title: "Inscrição Realizada!",
          description: "Você foi inscrito em nossa newsletter com sucesso.",
          className: "bg-primary text-primary-foreground toast-success",
        });
      } else {
        toast({
          title: "Erro na Inscrição",
          description: subscribeRequest.message,
          variant: "destructive",
        });
      }
      setNewsletterEmail("");
    } catch (error) {
      //console.error("Erro ao inscrever na newsletter:", error);
      toast({
        title: "Erro na Inscrição",
        description: error,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/engbras", label: "Facebook" },
    {
      icon: Instagram,
      href: "https://www.instagram.com/engbras_oficial/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/engbras",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://twitter.com/engbras", label: "Twitter" },
  ];

  const footerLinks = [
    { to: "/#about", text: "Sobre Nós" },
    { to: "/#services", text: "Serviços" },
    { to: "/projects", text: "Projetos" },
    { to: "/blog", text: "Blog" },
    { to: "/#contact", text: "Contato" },
    { to: "/privacy-policy", text: "Política de Privacidade" },
    { to: "/terms-of-service", text: "Termos de Uso" },
  ];

  return (
    <footer className="bg-card border-t border-border/70 text-foreground/80 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <Link
              to="/"
              className="text-3xl font-bold text-primary mb-4 inline-block font-handel"
            >
              ENGBRAS
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Inovação e excelência em engenharia para construir o futuro.
              Comprometidos com a qualidade e a satisfação de nossos clientes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-semibold text-foreground mb-4 text-lg">
              Navegação
            </p>
            <ul className="space-y-2">
              {footerLinks.slice(0, 5).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="font-semibold text-foreground mb-4 text-lg">Legal</p>
            <ul className="space-y-2">
              {footerLinks.slice(5).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="font-semibold text-foreground mb-4 text-lg">
              Newsletter
            </p>
            <p className="text-sm mb-3">
              Receba nossas últimas notícias e insights diretamente no seu
              email.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
              <Input
                type="email"
                placeholder="Seu email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow bg-background border-input placeholder:text-muted-foreground text-sm"
                required
                aria-label="Email para newsletter"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmittingNewsletter}
                aria-label="Inscrever na newsletter"
              >
                {isSubmittingNewsletter ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <Send size={18} />
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-border/70 pt-8 text-center text-sm"
        >
          <p>
            &copy; {currentYear} Engbras Engenharia e Inovação. Todos os
            direitos reservados.
          </p>
          <p className="mt-1">Desenvolvido por Victor Luck</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
