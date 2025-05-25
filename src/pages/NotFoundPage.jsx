
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center min-h-[calc(100vh-200px)]"
    >
      <AlertTriangle size={64} className="text-engbras-orange mb-6" />
      <h1 
        className="text-5xl md:text-7xl font-bold text-engbras-gray-dark mb-4"
        style={{ fontFamily: "'Roboto Slab', serif" }}
      >
        404
      </h1>
      <p className="text-xl md:text-2xl text-engbras-gray-dark mb-8">
        Oops! A página que você está procurando não foi encontrada.
      </p>
      <Button asChild size="lg" className="bg-engbras-orange hover:bg-orange-600 text-engbras-white">
        <Link to="/">Voltar para a Página Inicial</Link>
      </Button>
    </motion.div>
  );
};

export default NotFoundPage;
