import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit3, Trash2, Search, Eye, Calendar, User } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ManagePostsPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    const sortedPosts = storedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    setAllPosts(sortedPosts);
    setFilteredPosts(sortedPosts);
  };

  useEffect(() => {
    const results = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, allPosts]);

  const handleDeletePost = (postId) => {
    const updatedPosts = allPosts.filter(post => post.id !== postId);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    setAllPosts(updatedPosts); // Isso também acionará o useEffect para filtrar
    toast({
      title: "Post Excluído",
      description: "O post foi removido com sucesso.",
      className: "bg-primary text-primary-foreground toast-success",
    });
  };
  
  const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div className="p-6 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Gerenciar <span className="text-gradient-orange">Posts</span>
        </h1>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to="/admin/posts/create">
            <PlusCircle size={20} className="mr-2" /> Novo Post
          </Link>
        </Button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay:0.1, duration: 0.5, ease: "easeOut" }}
        className="mb-6"
      >
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar posts por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 text-base border-input focus:border-ring focus:ring-ring bg-background placeholder:text-muted-foreground"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </motion.div>

      {filteredPosts.length === 0 ? (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: {delay: 0.2} }}
          className="text-center text-muted-foreground text-lg py-10"
        >
          {searchTerm ? "Nenhum post encontrado para sua busca." : "Nenhum post para gerenciar ainda. Crie um novo!"}
        </motion.p>
      ) : (
        <div className="overflow-x-auto bg-card p-2 rounded-lg border border-border shadow-md">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-secondary">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Título</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Autor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Data</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredPosts.map((post, index) => (
                <motion.tr 
                  key={post.id}
                  variants={cardAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={index}
                  layout
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground truncate max-w-xs">{post.title}</div>
                    <div className="text-xs text-muted-foreground md:hidden">{post.author || 'Admin'} - {new Date(post.date).toLocaleDateString("pt-BR")}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground hidden md:table-cell">{post.author || 'Admin'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground hidden lg:table-cell">{new Date(post.date).toLocaleDateString("pt-BR")}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-blue-500">
                        <Link to={`/blog/${post.id}`} target="_blank" title="Visualizar Post">
                          <Eye size={18} />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                        <Link to={`/admin/posts/edit/${post.id}`} title="Editar Post">
                          <Edit3 size={18} />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" title="Excluir Post">
                            <Trash2 size={18} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o post "{post.title}"? Esta ação não poderá ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeletePost(post.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagePostsPage;