import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ClientsSection from "@/components/landing/ClientsSection";
import AboutSection from "@/components/landing/AboutSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";
import { Helmet } from "react-helmet-async";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6,
};

const LandingPage = () => {
  const siteUrl = "https://seu-dominio-engbras.com";
  const pageTitle = "Engbras - Engenharia e Inovação | Soluções Completas";
  const pageDescription = "A Engbras oferece soluções completas em engenharia, desde projetos estruturais a gerenciamento de obras. Inovação, qualidade e compromisso para construir o futuro.";
  const keywords = "engenharia, projetos de engenharia, construção civil, gerenciamento de obras, consultoria técnica, inovação em engenharia, Engbras, soluções de engenharia";
  const heroImage = "https://images.unsplash.com/photo-1581093450021-4a7360dde414?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";


  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={heroImage} />
        <meta property="og:image:alt" content="Escritório moderno da Engbras com equipe trabalhando em projetos." />
        <meta property="og:site_name" content="Engbras Engenharia e Inovação" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={heroImage} />
      </Helmet>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <AboutSection /> 
        <ClientsSection />
        <TestimonialsSection />
        <ContactSection />
      </motion.div>
    </>
  );
};

export default LandingPage;