import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, duration: 0.8 },
  },
};

const TestimonialCard = ({ quote, author, company }) => (
  <motion.div
    variants={cardVariants}
    className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col text-card-foreground"
  >
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
    <p className="italic mb-6 leading-relaxed flex-grow">"{quote}"</p>
    <div className="mt-auto">
      <p className="font-semibold text-lg text-primary">{author}</p>
      <p className="text-sm text-muted-foreground">{company}</p>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "A Engbras superou nossas expectativas com um projeto impecável e entregue no prazo. Profissionalismo exemplar e soluções modernas!",
      author: "João Silva",
      company: "Construtora XYZ",
    },
    {
      quote:
        "Contratamos a Engbras para consultoria e ficamos impressionados com a expertise, as soluções inovadoras e a agilidade apresentadas.",
      author: "Maria Oliveira",
      company: "Incorporadora ABC",
    },
    {
      quote:
        "Excelente gerenciamento de obra. A equipe da Engbras é altamente competente, organizada e utiliza as melhores tecnologias do mercado.",
      author: "Carlos Pereira",
      company: "Investimentos Imobiliários",
    },
  ];

  return (
    <section className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <motion.h2
            variants={cardVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 font-handel"
          >
            O que nossos{" "}
            <span className="text-gradient-orange">Clientes Dizem</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
