import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import { getPublishedPosts } from "../api/services/postService";
import { useToast } from "@/components/ui/use-toast";

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
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const BlogPage = () => {
  const { toast } = useToast();
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const siteUrl = "https://seu-dominio-engbras.com/blog";
  const pageTitle = "Blog Engbras | Notícias e Inovações em Engenharia";
  const pageDescription =
    "Acompanhe as últimas notícias, artigos e inovações no setor de engenharia. O blog da Engbras traz conteúdo relevante para profissionais e entusiastas.";
  const keywords =
    "blog de engenharia, notícias de engenharia, inovação na construção, artigos técnicos, Engbras blog";

  const loadPublishedPosts = async () => {
    try {
      const { posts } = await getPublishedPosts();
      //const posts = data;
      if (posts.length > 0) {
        var sortedPosts = posts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        //localStorage.setItem("blogPosts", JSON.stringify(sortedPosts));
        setAllPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
      } else {
        setAllPosts([]);
        setFilteredPosts([]);
      }
    } catch (error) {}

    /*  const storedPosts = sortedPosts || "[]";
      sortedPosts = storedPosts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setAllPosts(sortedPosts);
      setFilteredPosts(sortedPosts); */
  };

  useEffect(() => {
    loadPublishedPosts();
    //const storedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    const storedPosts = allPosts;
    const sortedPosts = storedPosts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setAllPosts(sortedPosts);
    setFilteredPosts(sortedPosts);
  }, []);

  useEffect(() => {
    const results = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.summary &&
          post.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, allPosts]);

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
        <meta
          property="og:image"
          content="https://seu-dominio-engbras.com/og-image-blog.jpg"
        />
        <meta
          property="og:image:alt"
          content="Página do Blog da Engbras com listagem de artigos."
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
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.6 },
            }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-engbras-gray-dark mb-4"
            style={{ fontFamily: "'Roboto Slab', serif" }}
          >
            Nosso <span className="text-gradient-orange">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.4, duration: 0.6 },
            }}
            className="text-lg text-engbras-gray-dark max-w-xl mx-auto"
          >
            Fique por dentro das últimas notícias, insights e inovações no mundo
            da engenharia.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.6 },
          }}
          className="mb-10 max-w-lg mx-auto"
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-base border-engbras-gray focus:border-engbras-orange focus:ring-engbras-orange"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-engbras-gray" />
          </div>
        </motion.div>

        {filteredPosts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.5 } }}
            className="text-center text-engbras-gray-dark text-xl py-10"
          >
            {searchTerm
              ? "Nenhum post encontrado para sua busca."
              : "Nenhum post encontrado ainda. Volte em breve!"}
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                custom={index}
                className="bg-engbras-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-engbras-gray hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {post.imageUrl && (
                  <Link
                    to={`/blog/${post.id}`}
                    className="block overflow-hidden"
                  >
                    <motion.img
                      className="w-full h-56 object-cover"
                      alt={post.title || "Imagem do post do blog"}
                      src={
                        post.imageUrl ||
                        "https://images.unsplash.com/photo-1675023112817-52b789fd2ef0"
                      }
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                )}
                <div className="p-6 flex-grow flex flex-col">
                  <h2
                    className="text-2xl font-semibold text-engbras-gray-dark mb-3 hover:text-engbras-orange transition-colors"
                    style={{ fontFamily: "'Roboto Slab', serif" }}
                  >
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <div className="flex items-center text-sm text-engbras-gray mb-4">
                    <Calendar size={16} className="mr-2 text-engbras-orange" />
                    <span>
                      {new Date(post.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-engbras-gray-dark mb-6 line-clamp-4 flex-grow leading-relaxed">
                    {post.summary || post.content.substring(0, 120) + "..."}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-auto border-engbras-orange text-engbras-orange hover:bg-engbras-orange hover:text-engbras-white self-start group transition-all duration-300"
                  >
                    <Link to={`/blog/${post.id}`}>
                      Ler Mais{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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

export default BlogPage;
