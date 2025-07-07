import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, User, Tag } from "lucide-react";
//import NotFoundPage from "./NotFoundPage";
import { Helmet } from "react-helmet-async";
import { getPostById } from "../api/services/postService";

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

const BlogPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const siteUrlBase = "https://seu-dominio-engbras.com";

  const getPostData = async (postId) => {
    const { post } = await getPostById(postId);
    //console.log("Post:", postToShow);
    setPost(post);
    //console.log("Post:", post.title);
    setLoading(false);
  };

  useEffect(() => {
    //const storedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    getPostData(postId);
  }, [postId]);

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

  if (!post) {
    //return <NotFoundPage />;
  }

  const pageTitle = `${post.title} | Blog Engbras`;
  const pageDescription =
    post.summary ||
    post.content.substring(0, 160).replace(/<[^>]*>?/gm, "") + "..."; // Remove HTML for description
  const postUrl = `${siteUrlBase}/blog/${post.id}`;
  const postImage = post.imageUrl || `${siteUrlBase}/og-image-default-post.jpg`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`Engbras, engenharia, ${post.title}, ${
            post.tags ? post.tags.join(", ") : "blog"
          }`}
        />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={postImage} />
        <meta property="og:image:alt" content={post.title} />
        <meta property="article:published_time" content={post.created_at} />
        <meta property="article:author" content={post.author || "Engbras"} />
        {/* Schema Markup - Exemplo */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${postUrl}"
              },
              "headline": "${post.title}",
              "description": "${pageDescription}",
              "image": "${postImage}",  
              "author": {
                "@type": "Organization",
                "name": "Engbras Engenharia e Inovação",
                "url": "${siteUrlBase}"
              },  
              "publisher": {
                "@type": "Organization",
                "name": "Engbras Engenharia e Inovação",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${siteUrlBase}/engbras-logo.png" 
                }
              },
              "datePublished": "${post.created_at}",
              "dateModified": "${post.updated_at || post.created_at}" 
            }
          `}
        </script>
      </Helmet>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <article className="max-w-3xl mx-auto bg-engbras-white p-6 sm:p-10 rounded-xl shadow-2xl border border-engbras-gray">
          {post.image && (
            <motion.img
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: { duration: 0.7, ease: "easeOut" },
              }}
              className="w-full max-h-[400px] object-cover rounded-lg mb-8 shadow-md"
              alt={post.title || "Imagem de capa do post"}
              src={
                post.image ||
                "https://images.unsplash.com/photo-1697256200022-f61abccad430"
              }
            />
          )}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.2, duration: 0.6 },
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-engbras-gray-dark mb-6 font-handel"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.4, duration: 0.6 },
            }}
            className="flex flex-wrap items-center text-sm text-engbras-gray mb-8 space-x-4"
          >
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-engbras-orange" />
              <span>
                Publicado em:{" "}
                {new Date(post.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
            {post.user && (
              <div className="flex items-center">
                <User size={16} className="mr-2 text-engbras-orange" />
                <span>Por: {post.user.name}</span>
              </div>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center">
                <Tag size={16} className="mr-2 text-engbras-orange" />
                <span>{post.tags.join(", ")}</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.7 } }}
            className="prose prose-lg max-w-none text-engbras-gray-dark leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br />"),
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.8, duration: 0.6 },
            }}
            className="mt-12 pt-8 border-t border-engbras-gray"
          >
            <Button
              asChild
              variant="outline"
              className="border-engbras-orange text-engbras-orange hover:bg-engbras-orange hover:text-engbras-white group transition-all duration-300"
            >
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />{" "}
                Voltar para o Blog
              </Link>
            </Button>
          </motion.div>
        </article>
      </motion.div>
    </>
  );
};

export default BlogPostPage;
