import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formContainerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1], 
      staggerChildren: 0.1,
    },
  },
};

const formItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const contactInfoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2, delayChildren: 0.1 } },
}

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Simulação de envio para backend PHP
      // Substitua '/api/contact.php' pelo seu endpoint real
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          // Se for enviar como x-www-form-urlencoded:
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), 
        // Se for x-www-form-urlencoded:
        // body: new URLSearchParams(data).toString(),
      });

      // Simulação de resposta do backend
      // Em um cenário real, você verificaria response.ok e o conteúdo da resposta
      if (Math.random() > 0.1) { // Simula sucesso na maioria das vezes
        toast({
          title: "Mensagem Enviada com Sucesso!",
          description: "Agradecemos seu contato. Nossa equipe retornará o mais breve possível.",
          className: "bg-primary text-primary-foreground border-none shadow-xl rounded-lg p-4 toast-success",
          duration: 6000,
        });
        e.target.reset();
      } else { // Simula falha
        throw new Error("Falha simulada no envio do formulário.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao Enviar Mensagem",
        description: "Houve um problema ao tentar enviar sua mensagem. Por favor, tente novamente mais tarde ou entre em contato por outro canal.",
        variant: "destructive",
        duration: 8000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-gradient-to-br from-secondary via-background to-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 md:mb-16"
        >
          Entre em <span className="text-gradient-orange">Contato</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div 
            variants={contactInfoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            {[
              { icon: MapPin, title: "Endereço", lines: ["Rua Exemplo, 123, Sala 4B", "Cidade Engenharia, Estado Inovação", "CEP: 00000-000"] },
              { icon: Mail, title: "Email", lines: ["contato@engbras.com.br"], href: "mailto:contato@engbras.com.br" },
              { icon: Phone, title: "Telefone", lines: ["(XX) XXXX-XXXX"], href: "tel:+55XXYYYYXXXX" },
            ].map((item, index) => (
              <motion.div key={index} variants={formItemVariants} className="p-4 rounded-lg bg-card/50 border border-border/50 shadow-sm">
                <h3 className="text-2xl font-semibold text-foreground mb-3 flex items-center">
                  <item.icon size={28} className="mr-3 text-primary" /> {item.title}
                </h3>
                {item.lines.map((line, lineIndex) => (
                  item.href ? (
                    <a key={lineIndex} href={item.href} className="block text-lg text-primary hover:underline leading-relaxed transition-colors duration-200">{line}</a>
                  ) : (
                    <p key={lineIndex} className="text-lg text-foreground/90 leading-relaxed">{line}</p>
                  )
                ))}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={formContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="bg-card p-8 md:p-10 rounded-xl shadow-2xl border border-border/70"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <motion.div variants={formItemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/90 mb-1">Nome Completo</label>
                <input type="text" name="name" id="name" required className="mt-1 block w-full px-4 py-3 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm transition-all duration-200 bg-background placeholder:text-muted-foreground" />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-1">Email</label>
                <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm transition-all duration-200 bg-background placeholder:text-muted-foreground" />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground/90 mb-1">Telefone (Opcional)</label>
                <input type="tel" name="phone" id="phone" className="mt-1 block w-full px-4 py-3 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm transition-all duration-200 bg-background placeholder:text-muted-foreground" />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/90 mb-1">Sua Mensagem</label>
                <textarea name="message" id="message" rows="5" required className="mt-1 block w-full px-4 py-3 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm transition-all duration-200 bg-background placeholder:text-muted-foreground"></textarea>
              </motion.div>
              <motion.div variants={formItemVariants}>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem <Send size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;