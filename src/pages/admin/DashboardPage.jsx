import React from 'react';
import { motion } from 'framer-motion';
import { Users, Newspaper, Mail, BarChart3, Eye, MessageSquare } from 'lucide-react';

const StatCard = ({ title, value, icon, color, description, trend }) => {
  const IconComponent = icon;
  return (
    <motion.div 
      className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <IconComponent className={`w-8 h-8 ${color}`} />
      </div>
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      {description && <p className="text-xs text-muted-foreground mb-2">{description}</p>}
      {trend && (
        <p className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </p>
      )}
    </motion.div>
  );
};

const DashboardPage = () => {
  // Dados de exemplo - serão substituídos por dados reais do backend/localStorage
  const totalPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]").length;
  const newsletterSubscribers = JSON.parse(localStorage.getItem("newsletterSubscribers") || "[]").length; // Supondo que você salve os emails aqui
  
  // Placeholders para outros dados
  const siteVisitors = "1.234"; 
  const newContacts = "15";

  const cardAnimation = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="p-6 sm:p-8">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl font-bold text-foreground mb-8"
      >
        Dashboard <span className="text-gradient-orange">Administrativo</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={cardAnimation} initial="initial" animate="animate" custom={0}>
          <StatCard title="Total de Posts" value={totalPosts} icon={Newspaper} color="text-blue-500" description="Conteúdo publicado no blog" trend="+2 este mês" />
        </motion.div>
        <motion.div variants={cardAnimation} initial="initial" animate="animate" custom={1}>
          <StatCard title="Inscritos na Newsletter" value={newsletterSubscribers} icon={Mail} color="text-green-500" description="Leads qualificados" trend="+5 esta semana" />
        </motion.div>
        <motion.div variants={cardAnimation} initial="initial" animate="animate" custom={2}>
          <StatCard title="Visitantes (Últimos 30d)" value={siteVisitors} icon={Eye} color="text-purple-500" description="Acesso total ao site (placeholder)" trend="+12%" />
        </motion.div>
        <motion.div variants={cardAnimation} initial="initial" animate="animate" custom={3}>
          <StatCard title="Novos Contatos (Mês)" value={newContacts} icon={MessageSquare} color="text-yellow-500" description="Formulários recebidos (placeholder)" trend="-3% vs mês anterior" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }}
          className="bg-card p-6 rounded-xl shadow-lg border border-border"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">Atividade Recente</h2>
          <ul className="space-y-3">
            <li className="text-sm text-muted-foreground">Novo post: "Inovações em Estruturas Metálicas" publicado.</li>
            <li className="text-sm text-muted-foreground">Novo inscrito na newsletter: usuario@exemplo.com.</li>
            <li className="text-sm text-muted-foreground">Comentário em "Desafios da Engenharia Civil": (placeholder).</li>
            <li className="text-sm text-muted-foreground">Atualização do sistema: (placeholder).</li>
          </ul>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } }}
          className="bg-card p-6 rounded-xl shadow-lg border border-border"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">Gráfico de Acessos (Placeholder)</h2>
          <div className="h-64 bg-secondary rounded-lg flex items-center justify-center">
            <BarChart3 size={48} className="text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">Dados de acesso indisponíveis no momento.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;