import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import NotFoundPage from "./NotFoundPage";
import { Helmet } from "react-helmet-async";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.95 },
};

const pageTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  duration: 0.5,
};

const ImageCarousel = ({ images, projectTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl mb-8 group">
      <Dialog>
        <DialogTrigger asChild>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${projectTitle} - Imagem ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-zoom-in"
            initial={{ opacity: 0.5, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 sm:p-4 bg-transparent border-none shadow-none flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`${projectTitle} - Imagem ${currentIndex + 1} em tela cheia`}
            className="max-w-full max-h-full object-contain rounded-lg"
            src="https://images.unsplash.com/photo-1531796404855-370e2405e388"
          />
        </DialogContent>
      </Dialog>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-white text-sm">
          Imagem {currentIndex + 1} de {images.length}
        </p>
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Imagem Anterior"
          >
            <ChevronLeft size={28} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Próxima Imagem"
          >
            <ChevronRight size={28} />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-black/30 text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Visualizar em tela cheia"
              >
                <Maximize2 size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 sm:p-4 bg-transparent border-none shadow-none flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`${projectTitle} - Imagem ${
                  currentIndex + 1
                } em tela cheia`}
                className="max-w-full max-h-full object-contain rounded-lg"
                src="https://images.unsplash.com/photo-1688760871131-29afc15029ec"
              />
            </DialogContent>
          </Dialog>
        </>
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-primary scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const siteUrlBase = "https://seu-dominio-engbras.com";

  useEffect(() => {
    const storedProjects = JSON.parse(
      localStorage.getItem("engbrasProjects") || "[]"
    );
    const currentProject = storedProjects.find((p) => p.id === projectId);

    setTimeout(() => {
      if (currentProject) {
        // Dados de exemplo para o carrossel e texto detalhado
        const detailedData = {
          ...currentProject,
          images: currentProject.images || [
            // Add default images if none exist
            currentProject.imageUrl ||
              "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1488330890490-829515114199?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1504307494759-5b79ca399ba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          ],
          detailedDescription:
            currentProject.detailedDescription ||
            `
                  <p class="mb-4">Este é um texto detalhado sobre o ${currentProject.title}. Aqui descrevemos os desafios, soluções aplicadas e os resultados alcançados, demonstrando a expertise da Engbras em ${currentProject.category}.</p>
                  <h3 class="text-xl font-semibold text-engbras-gray-dark mt-6 mb-3">Desafios do Projeto</h3>
                  <p class="mb-4">Um dos principais desafios enfrentados foi a integração de novas tecnologias com as estruturas existentes, garantindo a segurança e a funcionalidade do projeto dentro de um cronograma apertado e um orçamento definido.</p>
                  <h3 class="text-xl font-semibold text-engbras-gray-dark mt-6 mb-3">Soluções Implementadas</h3>
                  <p class="mb-4">A Engbras utilizou modelagem BIM avançada para planejamento preciso e detecção de conflitos. Além disso, foram empregadas técnicas de construção modular para acelerar o processo e materiais sustentáveis para reduzir o impacto ambiental.</p>
                  <h3 class="text-xl font-semibold text-engbras-gray-dark mt-6 mb-3">Resultados e Impacto</h3>
                  <p>O projeto foi concluído com sucesso, resultando em uma estrutura moderna, eficiente e que superou as expectativas do cliente. Houve uma redução de 15% nos custos operacionais e um aumento de 20% na eficiência energética comparado a projetos similares.</p>
                `,
        };
        setProject(detailedData);
      }
      setLoading(false);
    }, 500); // Simula delay de carregamento
  }, [projectId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center flex justify-center items-center min-h-[calc(100vh-200px)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-engbras-orange border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!project) {
    return <NotFoundPage message="Detalhes do projeto não encontrados." />;
  }

  const pageTitle = `${project.title} | Projetos Engbras`;
  const pageDescription = project.description.substring(0, 160) + "...";
  const projectUrl = `${siteUrlBase}/projects/${project.id}`;
  const projectImage =
    project.images && project.images.length > 0
      ? project.images[0]
      : `${siteUrlBase}/og-image-default-project.jpg`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`Engbras, projeto ${project.title}, ${project.category}, engenharia, ${project.title}`}
        />
        <link rel="canonical" href={projectUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={projectUrl} />
        <meta property="og:image" content={projectImage} />
        <meta
          property="og:image:alt"
          content={`Imagem do projeto ${project.title}`}
        />
      </Helmet>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <article className="max-w-4xl mx-auto bg-engbras-white p-6 sm:p-10 rounded-xl shadow-2xl border border-engbras-gray/40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.1, duration: 0.6 },
            }}
            className="mb-8"
          >
            <Button
              asChild
              variant="outline"
              className="border-engbras-orange text-engbras-orange hover:bg-engbras-orange hover:text-engbras-white group transition-all duration-300"
            >
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform font-handel tracking-wide" />{" "}
                Voltar para Projetos
              </Link>
            </Button>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.6 },
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-engbras-gray-dark mb-3 font-handel tracking-wide"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -15 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.3, duration: 0.6 },
            }}
            className="text-lg text-primary font-semibold mb-8"
          >
            {project.category}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.35,
                duration: 0.7,
                ease: [0.6, 0.01, -0.05, 0.95],
              },
            }}
          >
            <ImageCarousel
              images={project.images}
              projectTitle={project.title}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.7 } }}
            className="prose prose-lg max-w-none text-engbras-gray-dark leading-relaxed mt-8"
            dangerouslySetInnerHTML={{ __html: project.detailedDescription }}
          />
        </article>
      </motion.div>
    </>
  );
};

export default ProjectDetailPage;
