import React from "react";
import { motion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";

const clientLogos = [
  { id: 1, alt: "Logo da Empresa Alfa", name: "Empresa Alfa" },
  { id: 2, alt: "Logo da Soluções Beta", name: "Soluções Beta" },
  { id: 3, alt: "Logo da Construções Gama", name: "Construções Gama" },
  { id: 4, alt: "Logo da Inovações Delta", name: "Inovações Delta" },
  { id: 5, alt: "Logo da Projetos Epsilon", name: "Projetos Epsilon" },
  { id: 6, alt: "Logo da Engenharia Zeta", name: "Engenharia Zeta" },
  { id: 7, alt: "Logo da Tecnologia Eta", name: "Tecnologia Eta" },
  { id: 8, alt: "Logo da Consultoria Theta", name: "Consultoria Theta" },
];

const ClientsSection = () => {
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos]; 

  return (
    <section id="clients" className="py-20 md:py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4"
        >
          Nossos <span className="text-gradient-orange">Clientes</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-lg text-muted-foreground text-center max-w-xl mx-auto mb-12 md:mb-16"
        >
          Temos orgulho de colaborar com empresas líderes em diversos setores, construindo parcerias de sucesso.
        </motion.p>
        
        <div className="logo-scroller relative">
          <motion.div 
            className="logo-scroller-inner"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              ease: 'linear',
              duration: 45,
              repeat: Infinity,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex-shrink-0 px-8 md:px-12 py-4">
                <img  
                  className="h-12 md:h-16 object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer dark:filter-none dark:opacity-80 dark:hover:opacity-100"
                  alt={logo.alt}
                  title={logo.name}
                  src="https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <SectionDivider />
    </section>
  );
};

export default ClientsSection;