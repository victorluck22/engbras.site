import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NotFoundPage from "@/pages/NotFoundPage";


const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [originalPost, setOriginalPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    const postToEdit = storedPosts.find(p => p.id === postId);

    if (postToEdit) {
      setOriginalPost(postToEdit);
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setSummary(postToEdit.summary || "");
      setImageUrl(postToEdit.imageUrl || "");
    }
    setIsLoading(false);
  }, [postId]);

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

    const updatedPostData = {
      ...originalPost, // Preserva ID, data original, etc.
      title,
      content,
      summary,
      imageUrl,
      lastModified: new Date().toISOString(), // Adiciona data de modificação
    };

    try {
      // Atualizar localmente
      const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
      const updatedPosts = existingPosts.map(p => p.id === postId ? updatedPostData : p);
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));

      toast({
        title: "Post Atualizado com Sucesso!",
        description: "As alterações no post foram salvas localmente.",
        className: "bg-primary text-primary-foreground toast-success",
      });
      navigate(`/admin/posts`);
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      toast({
        title: "Erro ao Atualizar Post",
        description: "Houve um problema ao tentar salvar as alterações.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!originalPost) {
    return <NotFoundPage message="Post não encontrado para edição." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Editar <span className="text-gradient-orange">Post</span>
        </h1>
        <Button variant="outline" asChild>
          <Link to="/admin/posts">
            <ArrowLeft size={18} className="mr-2" /> Voltar para Posts
          </Link>
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-card p-6 sm:p-8 rounded-lg shadow-md border border-border space-y-6">
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
            placeholder="Escreva o conteúdo do seu post aqui... (Use Markdown para formatação)"
            className="mt-1 border-input focus:border-ring focus:ring-ring bg-background placeholder:text-muted-foreground"
            rows={10}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">Você pode usar Markdown para formatação básica (e.g., **negrito**, *itálico*, # Título).</p>
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
              Salvando Alterações...
            </>
          ) : (
            "Salvar Alterações"
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default EditPostPage;