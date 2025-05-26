import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionDivider from "@/components/ui/SectionDivider";

const imageVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] } 
  },
};

const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9], delay: 0.2 } 
  },
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <motion.div variants={imageVariants}>
            <img   
              className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-[4/3] lg:aspect-square"
              alt="Equipe Engbras colaborando em um projeto de engenharia moderno em um escritório com plantas e luz natural"
             src="https://images.unsplash.com/photo-1696494561079-ddabcbb308e8" />
          </motion.div>
          <motion.div variants={textVariants}>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 lg:mb-8"
            >
              Sobre a <span className="text-gradient-orange">Engbras</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Somos uma empresa de engenharia apaixonada por inovação e excelência. Com mais de duas décadas de experiência, nos dedicamos a fornecer soluções de engenharia que superam as expectativas dos nossos clientes, utilizando tecnologia de ponta e as melhores práticas do mercado.
            </p>
            <p className="text-lg text-muted-foreground mb-8 lg:mb-10 leading-relaxed">
              Nossa equipe é formada por profissionais altamente qualificados e comprometidos com a entrega de projetos de alta qualidade, dentro do prazo e do orçamento, sempre buscando o que há de mais moderno e eficiente.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 py-3 px-8 text-base"
            >
              <Link to="/#contact">Conheça Nossas Soluções</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <SectionDivider />
    </section>
  );
};

export default AboutSection;