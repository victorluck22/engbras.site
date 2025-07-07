import React from "react";
import { motion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";

const clientLogos = [
  {
    id: 1,
    alt: "Logo da Volkswagen",
    name: "Volkswagen Caminhões e Ônibus",
    imageName: "vw_logo.png",
  },
  {
    id: 2,
    alt: "Logo da Man",
    name: "Man Truck & Bus",
    imageName: "man_logo.png",
  },
  {
    id: 3,
    alt: "Logo da MWM",
    name: "MWM",
    imageName: "mwm_logo.png",
  },
  {
    id: 4,
    alt: "Logo da Cummins",
    name: "Cummins",
    imageName: "cummins_logo.png",
  },
  {
    id: 5,
    alt: "Logo da Comil",
    name: "Comil Ônibus",
    imageName: "comil_logo.png",
  },
  {
    id: 6,
    alt: "Logo da thyssenkrupp",
    name: "ThyssenKrupp",
    imageName: "thyssenkrupp_logo.png",
  },
  {
    id: 7,
    alt: "Logo da Comil",
    name: "Comil Ônibus",
    imageName: "comil_logo.png",
  },
];

const ClientsSection = () => {
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section
      id="clients"
      className="py-20 md:py-24 bg-secondary text-secondary-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4 font-handel"
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
          Temos orgulho de colaborar com empresas líderes em diversos setores,
          construindo parcerias de sucesso.
        </motion.p>

        <div className="logo-scroller relative">
          <motion.div
            className="logo-scroller-inner"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: 45,
              repeat: Infinity,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 px-8 md:px-12 py-4"
              >
                <img
                  className="h-12 md:h-16 object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer dark:filter-none dark:opacity-80 dark:hover:opacity-100"
                  alt={logo.alt}
                  title={logo.name}
                  src={`./images/client_logos/${logo.imageName}`}
                />
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
