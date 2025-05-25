import React from "react";
import { motion } from "framer-motion";
import { CheckSquare, Users, Building, Lightbulb } from "lucide-react";

const StatCard = ({ icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className="bg-engbras-gray-light p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
  >
    <motion.div 
      className="flex justify-center mb-4"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {icon}
    </motion.div>
    <p className="text-4xl font-bold text-engbras-orange mb-1">{value}</p>
    <p className="text-md text-engbras-gray-dark">{label}</p>
  </motion.div>
);

const StatsSection = () => {
  const stats = [
    { icon: <CheckSquare size={40} className="text-engbras-orange" />, value: "500+", label: "Projetos Concluídos", delay: 0.1 },
    { icon: <Users size={40} className="text-engbras-orange" />, value: "100+", label: "Clientes Satisfeitos", delay: 0.2 },
    { icon: <Building size={40} className="text-engbras-orange" />, value: "20+", label: "Anos de Experiência", delay: 0.3 },
    { icon: <Lightbulb size={40} className="text-engbras-orange" />, value: "Inovação", label: "Foco Contínuo", delay: 0.4 },
  ];

  return (
    <section className="py-20 bg-engbras-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;