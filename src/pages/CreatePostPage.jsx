import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!title || !content) {
      toast({
        title: "Erro de Validação",
        description: "Os campos Título e Conteúdo são obrigatórios.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const newPostData = {
      id: Date.now().toString(), 
      title,
      content,
      summary,
      imageUrl,
      date: new Date().toISOString(),
    };

    try {
      // Simulação de envio para backend PHP
      // Substitua '/api/create-post.php' pelo seu endpoint real
      const response = await fetch('/api/create-post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPostData),
      });

      // Simulação de resposta do backend
      if (Math.random() > 0.1) { // Simula sucesso
        // Salvar localmente após sucesso (ou usar resposta do backend se ele retornar o post criado)
        const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        localStorage.setItem("blogPosts", JSON.stringify([newPostData, ...existingPosts]));

        toast({
          title: "Post Criado com Sucesso!",
          description: "Seu novo post foi publicado e salvo localmente.",
          className: "bg-primary text-primary-foreground toast-success",
        });

        setTitle("");
        setContent("");
        setSummary("");
        setImageUrl("");
        navigate(`/blog/${newPostData.id}`);
      } else { // Simula falha
        throw new Error("Falha simulada ao criar post no backend.");
      }
    } catch (error) {
      console.error("Erro ao criar post:", error);
      toast({
        title: "Erro ao Criar Post",
        description: "Houve um problema ao tentar criar o post. Por favor, tente novamente. O post não foi salvo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 
        className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-10"
      >
        Criar Novo <span className="text-gradient-orange">Post</span>
      </h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-border space-y-6">
        <div>
          <Label htmlFor="title" className="text-foreground/90">Título</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Título do post"
            className="mt-1 border-input focus:border-ring focus:ring-ring bg-background placeholder:text-muted-foreground"
            required
          />
        </div>
        <div>
          <Label htmlFor="summary" className="text-foreground/90">Resumo (Opcional)</Label>
          <Textarea 
            id="summary" 
            value={summary} 
            onChange={(e) => setSummary(e.target.value)} 
            placeholder="Um breve resumo do post..."
            className="mt-1 border-input focus:border-ring focus:ring-ring bg-background placeholder:text-muted-foreground"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="content" className="text-foreground/90">Conteúdo</Label>
          <Textarea 
            id="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Escreva o conteúdo do seu post aqui..."
            className="mt-1 border-input focus:border-ring focus:ring-ring bg-background placeholder:text-muted-foreground"
            rows={10}
            required
          />
        </div>
        <div>
          <Label htmlFor="imageUrl" className="text-foreground/90">URL da Imagem de Capa (Opcional)</Label>
          <Input 
            id="imageUrl" 
            type="url"
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            placeholder="https://exemplo.com/imagem.jpg"
            className="mt-1 border-input focus:border-ring focus:ring-ring bg-background placeholder:text-muted-foreground"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
              />
              Publicando...
            </>
          ) : (
            "Publicar Post"
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default CreatePostPage;