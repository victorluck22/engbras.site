import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Newspaper,
  Mail,
  BarChart3,
  Eye,
  MessageSquare,
} from "lucide-react";
import { getDashboardData } from "../../api/services/dashboardService";

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
      {description && (
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
      )}
      {trend && (
        <p
          className={`text-sm font-medium ${
            trend.startsWith("+") ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend}
        </p>
      )}
    </motion.div>
  );
};

const DashboardPage = () => {
  const [mainData, setMainData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsLastMonth, setPostsLastMonth] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const [subscribersLastWeek, setSubscribersLastWeek] = useState(0);
  const [lastVisitors, setLastVisitors] = useState(0);
  const [visitorsLastMonth, setVisitorsLastMonth] = useState(0);
  const [siteContacts, setSiteContacts] = useState(0);
  const [percentLastMontSiteContacts, setpercentLastMontSiteContacts] =
    useState(0);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data } = await getDashboardData();
      console.log(data);
      if (data) {
        setMainData(data);

        setTotalPosts(data.postData.posts || 0);
        setPostsLastMonth(data.postData.lastMonth || 0);
        setSubscribers(data.subscriberData.subscribers || 0);
        setSubscribersLastWeek(data.subscriberData.lastWeek || 0);
        setLastVisitors(data.visitorsData.visitors || 0);
        setVisitorsLastMonth(data.visitorsData.percentLastMonth || 0);
        setSiteContacts(data.siteContact.contactsMonth || 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Dados de exemplo - serão substituídos por dados reais do backend/localStorage

  const newsletterSubscribers = JSON.parse(
    localStorage.getItem("newsletterSubscribers") || "[]"
  ).length; // Supondo que você salve os emails aqui

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
        <motion.div
          variants={cardAnimation}
          initial="initial"
          animate="animate"
          custom={0}
        >
          <StatCard
            title="Total de Posts"
            value={totalPosts}
            icon={Newspaper}
            color="text-blue-500"
            description="Conteúdo publicado no blog"
            trend={`+${postsLastMonth} este mês`}
          />
        </motion.div>
        <motion.div
          variants={cardAnimation}
          initial="initial"
          animate="animate"
          custom={1}
        >
          <StatCard
            title="Inscritos na Newsletter"
            value={subscribers}
            icon={Mail}
            color="text-green-500"
            description="Leads qualificados"
            trend={`+${subscribersLastWeek} esta semana`}
          />
        </motion.div>
        <motion.div
          variants={cardAnimation}
          initial="initial"
          animate="animate"
          custom={2}
        >
          <StatCard
            title="Visitantes (Últimos 30d)"
            value={lastVisitors}
            icon={Eye}
            color="text-purple-500"
            description="Acessos ao site"
            trend={`+${visitorsLastMonth}% vs mês anterior`}
          />
        </motion.div>
        <motion.div
          variants={cardAnimation}
          initial="initial"
          animate="animate"
          custom={3}
        >
          <StatCard
            title="Novos Contatos (Mês)"
            value={siteContacts}
            icon={MessageSquare}
            color="text-yellow-500"
            description="Formulários recebidos (placeholder)"
            trend={`-${percentLastMontSiteContacts}% vs mês anterior`}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.5, duration: 0.6 },
          }}
          className="bg-card p-6 rounded-xl shadow-lg border border-border"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Atividade Recente
          </h2>
          <ul className="space-y-3">
            <li className="text-sm text-muted-foreground">
              Novo post: "Inovações em Estruturas Metálicas" publicado.
            </li>
            <li className="text-sm text-muted-foreground">
              Novo inscrito na newsletter: usuario@exemplo.com.
            </li>
            <li className="text-sm text-muted-foreground">
              Comentário em "Desafios da Engenharia Civil": (placeholder).
            </li>
            <li className="text-sm text-muted-foreground">
              Atualização do sistema: (placeholder).
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.6 },
          }}
          className="bg-card p-6 rounded-xl shadow-lg border border-border"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Gráfico de Acessos (Placeholder)
          </h2>
          <div className="h-64 bg-secondary rounded-lg flex items-center justify-center">
            <BarChart3 size={48} className="text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">
              Dados de acesso indisponíveis no momento.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
