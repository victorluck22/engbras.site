
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import LandingPage from "@/pages/LandingPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Helmet } from "react-helmet-async";

// Admin Pages
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import ManagePostsPage from "@/pages/admin/ManagePostsPage";
import CreatePostPage from "@/pages/admin/CreatePostPage";
import NewsletterSubscribersPage from "@/pages/admin/NewsletterSubscribersPage";
import EditPostPage from "@/pages/admin/EditPostPage";

const App = () => {
  const location = useLocation();
  const defaultTitle = "Engbras - Engenharia e Inovação";
  const defaultDescription = "Engbras - Soluções inovadoras em engenharia para transformar seus projetos em realidade.";

  return (
    <ThemeProvider>
      <Helmet 
        defaultTitle={defaultTitle}
        titleTemplate="%s | Engbras"
      >
        <meta name="description" content={defaultDescription} />
        <meta name="keywords" content="engenharia, projetos, construção, inovação, consultoria, Engbras" />
        <meta property="og:site_name" content="Engbras Engenharia e Inovação" />
        <meta name="theme-color" content="#FF7A00" /> 
        <link rel="icon" type="image/svg+xml" href="/engbras-icon.svg" /> {/* Substitua pelo caminho do seu ícone */}
        {/* Adicione aqui outras meta tags globais, como para redes sociais ou PWA */}
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 ease-in-out">
        <ScrollProgress />
        {!location.pathname.startsWith('/admin') && <Header />}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:postId" element={<BlogPostPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="posts" element={<ManagePostsPage />} />
                <Route path="posts/create" element={<CreatePostPage />} />
                <Route path="posts/edit/:postId" element={<EditPostPage />} />
                <Route path="subscribers" element={<NewsletterSubscribersPage />} />
              </Route>
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        {!location.pathname.startsWith('/admin') && <Footer />}
      </div>
    </ThemeProvider>
  );
};

export default App;
