'use client';

import { motion } from 'framer-motion';

export default function FeatureHeader() {
  return (
    <motion.header
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-20"
      data-cy="features-header"
    >
      <h2
        className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-orange to-accent-gold bg-clip-text text-transparent"
        data-cy="features-title"
      >
        Streamlined Animal Monitoring
      </h2>
      <p
        className="text-xl text-neutral-light/80 max-w-3xl mx-auto"
        data-cy="features-description"
      >
        Focus on what matters most - your animals. Our tools simplify video analysis and reporting,
        helping you spend less time on paperwork and more time on care.
      </p>
    </motion.header>
  );
} 