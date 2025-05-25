import React from "react";
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-engbras-orange origin-[0%] z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;