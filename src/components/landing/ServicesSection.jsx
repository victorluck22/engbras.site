import React from "react";
import { motion } from "framer-motion";
import { Building, CheckSquare, Lightbulb } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, duration: 0.7 },
  },
};

const ServiceCard = ({ icon, title, description }) => (
  <motion.div
    variants={cardVariants}
    className="bg-engbras-white p-8 rounded-xl shadow-xl border border-engbras-gray/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <motion.div 
      className="flex justify-center mb-5 text-engbras-orange"
      whileHover={{ scale: 1.15, rotate: 8 }}
      transition={{ type: "spring", stiffness: 250 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-2xl font-semibold text-engbras-gray-dark mb-3 text-center">{title}</h3>
    <p className="text-md text-engbras-gray-dark text-center leading-relaxed">{description}</p>
  </motion.div>
);

const ServicesSection = () => {
  const services = [
    { icon: <Building size={52} />, title: "Projetos Estruturais", description: "Desenvolvimento de projetos estruturais seguros e eficientes para diversas finalidades, utilizando as mais recentes tecnologias." },
    { icon: <CheckSquare size={52} />, title: "Gerenciamento de Obras", description: "Acompanhamento e gestão completa de obras, garantindo prazos, qualidade e otimização de recursos." },
    { icon: <Lightbulb size={52} />, title: "Consultoria Técnica", description: "Consultoria especializada para otimizar seus projetos, solucionar desafios técnicos e implementar inovações." },
  ];

  return (
    <section id="services" className="py-20 md:py-24 bg-engbras-gray-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
          <motion.h2
            variants={cardVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-engbras-gray-dark text-center mb-6"
          >
            Nossos <span className="text-gradient-orange">Serviços</span>
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-lg md:text-xl text-engbras-gray-dark text-center max-w-2xl mx-auto mb-12 md:mb-16"
          >
            Oferecemos uma gama completa de serviços de engenharia para atender às suas necessidades específicas com excelência e modernidade.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;