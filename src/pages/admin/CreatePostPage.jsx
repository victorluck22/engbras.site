import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SwitchButton from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/services/postService";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPublished, setIsPublished] = useState(false);
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
      title,
      content,
      summary,
      image: imageUrl,
      published: isPublished,
      /* date: new Date().toISOString(),
      author: "Admin", // Placeholder */
      tags: ["engenharia", "inovação"], // Placeholder
    };

    try {
      const newPost = await createPost(newPostData);

      toast({
        title: "Post Criado com Sucesso!",
        description: "Seu novo post foi publicado e salvo.",
        className: "bg-primary text-primary-foreground toast-success",
      });

      setTitle("");
      setContent("");
      setSummary("");
      setImageUrl("");
      setIsPublished(false);
      navigate(`/admin/posts`);
    } catch (error) {
      console.error("Erro ao criar post:", error);
      toast({
        title: "Erro ao Criar Post",
        description:
          "Houve um problema ao tentar criar o post. Por favor, tente novamente. O post não foi salvo.",
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
      className="p-6"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
        Criar Novo <span className="text-gradient-orange">Post</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-card p-6 sm:p-8 rounded-lg shadow-md border border-border space-y-6"
      >
        <div>
          <Label htmlFor="title" className="text-foreground/90">
            Título
          </Label>
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
          <Label htmlFor="summary" className="text-foreground/90">
            Resumo (Opcional)
          </Label>
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
          <Label htmlFor="content" className="text-foreground/90">
            Conteúdo
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva o conteúdo do seu post aqui... (Use Markdown para formatação)"
            className="mt-1 border-input focus:border-ring focus:ring-ring bg-background placeholder:text-muted-foreground"
            rows={10}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Você pode usar Markdown para formatação básica (e.g., **negrito**,
            *itálico*, # Título).
          </p>
        </div>
        <div>
          <Label htmlFor="imageUrl" className="text-foreground/90">
            URL da Imagem de Capa (Opcional)
          </Label>
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            className="mt-1 border-input focus:border-ring focus:ring-ring bg-background placeholder:text-muted-foreground"
          />
        </div>
        <div
          title="Liberar este post para leitores"
          className="flex items-center space-x-2"
        >
          <Label htmlFor="published" className="text-foreground/90">
            Visível no site?
          </Label>
          <SwitchButton
            isOn={isPublished}
            setIsOn={setIsPublished}
            inputName="published"
            checked='{isPublished && "checked"}'
            toggleSwitch={(e) => setIsPublished(!isPublished)}
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
