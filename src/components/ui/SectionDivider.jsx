import React from 'react';
import { motion } from 'framer-motion';

const SectionDivider = () => {
  return (
    <motion.div 
      className="relative h-16 md:h-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-engbras-orange/20 to-transparent"
        style={{
          maskImage: 'radial-gradient(ellipse 50% 100% at 50% 0%, black 40%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 100% at 50% 0%, black 40%, transparent 70%)'
        }}
      />
    </motion.div>
  );
};

export default SectionDivider;