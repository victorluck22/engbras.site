
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, duration: 0.8 },
  },
};

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center bg-gradient-to-br from-engbras-gray-light via-engbras-white to-engbras-gray-light overflow-hidden pt-20 pb-10 md:pt-0 md:pb-0">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: parallaxY }}
      >
        <img 
            src="https://images.unsplash.com/photo-1581093450021-4a7360dde414?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Fundo abstrato de engenharia moderna com linhas de grade e elementos futuristas representando a inovação da Engbras"
            className="w-full h-full object-cover opacity-10 md:opacity-20"
          src="https://images.unsplash.com/photo-1581182394437-2a9876866966" />
        <div className="absolute inset-0 bg-gradient-to-t from-engbras-white via-engbras-white/80 to-transparent"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium text-engbras-orange bg-engbras-orange/10 rounded-full border border-engbras-orange/30 shadow-sm"
          >
            <Zap size={16} className="mr-2" /> Inovação em Cada Projeto
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-engbras-gray-dark mb-6"
          >
            Engenharia que <span className="text-gradient-orange">Constrói o Futuro</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-engbras-gray-dark max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Soluções inovadoras em engenharia para transformar seus projetos em realidade. Qualidade, precisão e compromisso em cada etapa, moldando um amanhã mais eficiente e sustentável.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 flex flex-col sm:flex-row justify-center items-center"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-engbras-orange hover:bg-orange-600 text-engbras-white w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 py-3 px-8 text-base group"
            >
              <Link to="/#services">
                Nossos Serviços <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-engbras-orange text-engbras-orange hover:bg-engbras-orange hover:text-engbras-white w-full sm:w-auto shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 py-3 px-8 text-base"
            >
              <Link to="/projects">Ver Projetos</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
       <motion.div 
        className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-engbras-white" 
        style={{ clipPath: "polygon(0 100%, 100% 30%, 100% 100%)" }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.8, duration: 0.8, ease: "easeOut" } }}
      />
    </section>
  );
};

export default HeroSection;
