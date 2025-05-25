
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowRight, Layers } from "lucide-react";
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

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  const siteUrl = "https://seu-dominio-engbras.com/projects";
  const pageTitle = "Projetos Realizados | Engbras Engenharia e Inovação";
  const pageDescription = "Explore os principais projetos de engenharia desenvolvidos pela Engbras. Soluções inovadoras e de alta qualidade em diversos setores.";
  const keywords = "projetos de engenharia, portfólio Engbras, obras realizadas, engenharia civil, projetos estruturais, cases de sucesso";

  useEffect(() => {
    const sampleProjects = [
      {
        id: "projeto-complexo-industrial",
        title: "Complexo Industrial Sustentável",
        category: "Engenharia Industrial",
        description: "Desenvolvimento e execução de um complexo industrial focado em sustentabilidade e eficiência energética, com área total de 50.000 m².",
        logoUrl: "/logo-placeholder-1.png",
        imageUrl: "https://images.unsplash.com/photo-1581092916347-80eb3000b79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      },
      {
        id: "edificio-residencial-inovador",
        title: "Edifício Residencial Inovador",
        category: "Engenharia Civil",
        description: "Projeto estrutural e gerenciamento da construção de um edifício residencial de alto padrão, incorporando tecnologias construtivas modernas.",
        logoUrl: "/logo-placeholder-2.png",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      },
      {
        id: "ponte-estaiada-rio-grande",
        title: "Ponte Estaiada Rio Grande",
        category: "Infraestrutura Viária",
        description: "Consultoria técnica e projeto de engenharia para a construção de uma ponte estaiada de 800m, otimizando custos e prazos.",
        logoUrl: "/logo-placeholder-3.png",
        imageUrl: "https://images.unsplash.com/photo-1506790409743-de0554384508?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      },
      {
        id: "retrofit-centro-comercial",
        title: "Retrofit Centro Comercial Urbano",
        category: "Engenharia Civil",
        description: "Modernização e revitalização estrutural de um centro comercial, com foco na melhoria da acessibilidade e eficiência energética.",
        logoUrl: "/logo-placeholder-1.png",
        imageUrl: "https://images.unsplash.com/photo-1542856300-02b0466ef76d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      }
    ];
    localStorage.setItem("engbrasProjects", JSON.stringify(sampleProjects));
    setProjects(sampleProjects);
  }, []);

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
        <meta property="og:image" content="https://seu-dominio-engbras.com/og-image-projects.jpg" /> 
        <meta property="og:image:alt" content="Página de Projetos Realizados pela Engbras." />
      </Helmet>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity:0, y: -20 }}
            animate={{ opacity:1, y: 0, transition: { delay: 0.2, duration: 0.6 } }}
            className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 text-primary"
          >
            <Briefcase size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity:0, y: -20 }}
            animate={{ opacity:1, y: 0, transition: { delay: 0.3, duration: 0.6 } }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-engbras-gray-dark mb-4"
            style={{ fontFamily: "'Roboto Slab', serif" }}
          >
            Nossos <span className="text-gradient-orange">Projetos</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity:0, y: -20 }}
            animate={{ opacity:1, y: 0, transition: { delay: 0.4, duration: 0.6 } }}
            className="text-lg text-engbras-gray-dark max-w-2xl mx-auto"
          >
            Conheça alguns dos projetos que demonstram nossa expertise, compromisso com a qualidade e capacidade de inovação em engenharia.
          </motion.p>
        </div>

        {projects.length === 0 ? (
          <motion.p 
            initial={{ opacity:0 }}
            animate={{ opacity:1, transition: { delay: 0.6, duration: 0.5 } }}
            className="text-center text-engbras-gray-dark text-xl py-10"
          >
            Nenhum projeto para exibir no momento.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                className="bg-engbras-white rounded-xl shadow-xl overflow-hidden flex flex-col border border-engbras-gray/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 group"
              >
                <div className="relative overflow-hidden">
                  <img  
                    className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-400 ease-out"
                    alt={`Imagem do projeto ${project.title}`}
                    src={project.imageUrl}
                   src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                  <div className="absolute top-4 right-4 bg-engbras-orange/80 backdrop-blur-sm text-engbras-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    {project.category}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center mb-4">
                    {project.logoUrl && (
                       <img  
                          src={project.logoUrl} 
                          alt={`Logo do cliente do projeto ${project.title}`} 
                          className="h-10 w-auto mr-3 object-contain"
                        src="https://images.unsplash.com/photo-1495224814653-94f36c0a31ea" />
                    )}
                     <h2 className="text-xl font-semibold text-engbras-gray-dark hover:text-engbras-orange transition-colors" style={{ fontFamily: "'Roboto Slab', serif" }}>
                      <Link to={`/projects/${project.id}`}>{project.title}</Link>
                    </h2>
                  </div>
                 
                  <p className="text-sm text-engbras-gray-dark mb-5 line-clamp-3 flex-grow leading-relaxed">{project.description}</p>
                  <Button asChild variant="default" className="mt-auto bg-primary hover:bg-primary/90 text-primary-foreground self-start group-hover:bg-orange-600 transition-colors duration-300">
                    <Link to={`/projects/${project.id}`}>
                      Ver Detalhes <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default ProjectsPage;
