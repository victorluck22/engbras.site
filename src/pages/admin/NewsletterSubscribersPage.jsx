import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Search, Trash2, Download, Send } from 'lucide-react';
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

const NewsletterSubscribersPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Simulação de carregamento de inscritos (usar localStorage)
  useEffect(() => {
    const storedSubscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    setSubscribers(storedSubscribers);
    setFilteredSubscribers(storedSubscribers);
  }, []);

  useEffect(() => {
    const results = subscribers.filter(subscriber =>
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubscribers(results);
  }, [searchTerm, subscribers]);

  const handleDeleteSubscriber = (emailToDelete) => {
    const updatedSubscribers = subscribers.filter(sub => sub.email !== emailToDelete);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(updatedSubscribers));
    setSubscribers(updatedSubscribers);
    toast({
      title: "Inscrito Removido",
      description: `O email ${emailToDelete} foi removido da lista.`,
      className: "bg-primary text-primary-foreground toast-success",
    });
  };

  const handleExportCSV = () => {
    if (filteredSubscribers.length === 0) {
      toast({ title: "Nada para Exportar", description: "Não há inscritos para exportar.", variant: "destructive" });
      return;
    }
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,DataInscricao\n" 
      + filteredSubscribers.map(s => `${s.email},${new Date(s.date).toLocaleDateString("pt-BR")}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inscritos_newsletter_engbras.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Exportação Iniciada", description: "O download do arquivo CSV deve começar em breve." });
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

  // Placeholder para simular adição de email (se necessário)
  // Em um cenário real, os emails viriam do formulário do rodapé.
  // Exemplo:
  // const addTestSubscriber = () => {
  //   const newSubscriber = { email: `teste${Date.now()}@example.com`, date: new Date().toISOString() };
  //   const updated = [...subscribers, newSubscriber];
  //   localStorage.setItem('newsletterSubscribers', JSON.stringify(updated));
  //   setSubscribers(updated);
  // };

  return (
    <div className="p-6 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Inscritos na <span className="text-gradient-orange">Newsletter</span>
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportCSV} disabled={filteredSubscribers.length === 0}>
            <Download size={18} className="mr-2" /> Exportar CSV
          </Button>
          {/* <Button onClick={() => alert("Funcionalidade de enviar email em massa (placeholder).")} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Send size={18} className="mr-2" /> Enviar Email em Massa
          </Button> */}
        </div>
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
            placeholder="Buscar por email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 text-base border-input focus:border-ring focus:ring-ring bg-background placeholder:text-muted-foreground"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </motion.div>
      
      {/* <Button onClick={addTestSubscriber} className="mb-4">Adicionar Email de Teste</Button> */}

      {filteredSubscribers.length === 0 ? (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: {delay: 0.2} }}
          className="text-center text-muted-foreground text-lg py-10"
        >
          {searchTerm ? "Nenhum inscrito encontrado para sua busca." : "Ainda não há inscritos na newsletter."}
        </motion.p>
      ) : (
        <div className="overflow-x-auto bg-card p-2 rounded-lg border border-border shadow-md">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-secondary">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Data de Inscrição</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredSubscribers.map((subscriber, index) => (
                <motion.tr 
                  key={subscriber.email}
                  variants={cardAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={index}
                  layout
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail size={18} className="mr-3 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground truncate">{subscriber.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground hidden sm:table-cell">
                    {subscriber.date ? new Date(subscriber.date).toLocaleDateString("pt-BR", { year: 'numeric', month: 'long', day: 'numeric' }) : 'Não disponível'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" title="Remover Inscrito">
                          <Trash2 size={18} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar Remoção</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja remover o email "{subscriber.email}" da lista de inscritos?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteSubscriber(subscriber.email)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                            Remover
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       <p className="text-xs text-muted-foreground mt-4">
        Total de inscritos: {filteredSubscribers.length} {searchTerm && `(de ${subscribers.length} no total)`}
      </p>
    </div>
  );
};

export default NewsletterSubscribersPage;