import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  PlusCircle,
  Edit3,
  Trash2,
  Search,
  Eye,
  Calendar,
  User,
} from "lucide-react";
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
import { getAllContacts } from "../../api/services/siteContactService";

const ManagePostsPage = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const { siteContacts } = await getAllContacts();
      if (siteContacts.length > 0) {
        var sortedContacts = siteContacts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        //localStorage.setItem("blogPosts", JSON.stringify(sortedPosts));
        setAllContacts(sortedContacts);
        setFilteredContacts(sortedContacts);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao carregar os contatos do site",
        description:
          "Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }

    /*  const storedPosts = sortedPosts || "[]";
    sortedPosts = storedPosts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setAllPosts(sortedPosts);
    setFilteredPosts(sortedPosts); */
  };

  useEffect(() => {
    const results = allContacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(results);
  }, [searchTerm, allContacts]);

  const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
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
          Gerenciar{" "}
          <span className="text-gradient-orange">Contatos do Site</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className="mb-6"
      >
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar contatos por nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 text-base border-input focus:border-ring focus:ring-ring bg-background placeholder:text-muted-foreground"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </motion.div>

      {filteredContacts.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          className="text-center text-muted-foreground text-lg py-10"
        >
          {searchTerm
            ? "Nenhum contato encontrado para sua busca."
            : "Nenhum contato recebido ainda"}
        </motion.p>
      ) : (
        <div className="overflow-x-auto bg-card p-2 rounded-lg border border-border shadow-md">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-secondary">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                >
                  Telefone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell"
                >
                  Data
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Mensagem
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredContacts.map((contact, index) => (
                <motion.tr
                  key={contact.id}
                  variants={cardAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={index}
                  layout
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground truncate max-w-xs">
                      {contact.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground hidden md:table-cell">
                    {contact.email || "Admin"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground hidden md:table-cell">
                    {contact.phone || "Admin"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground hidden lg:table-cell">
                    {new Date(contact.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {contact.message}
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
