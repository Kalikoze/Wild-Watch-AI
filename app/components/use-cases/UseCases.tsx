'use client';

import { motion } from 'framer-motion';
import { useCases } from '@/lib/data/useCases';
import UseCaseCard from '@/app/components/use-cases/UseCaseCard';
import BackgroundEffects from '@/app/components/common/BackgroundEffects';

export default function UseCases() {
  return (
    <section
      data-cy="use-cases-section"
      className="relative py-32 bg-primary overflow-hidden"
      aria-labelledby="use-cases-title"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light to-primary" />

      <BackgroundEffects color="green" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          data-cy="use-cases-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            data-cy="use-cases-title"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-orange to-accent-gold bg-clip-text text-transparent"
          >
            Transforming Animal Care
          </h2>
          <p data-cy="use-cases-description" className="text-xl text-neutral-light/80 max-w-2xl mx-auto">
            Discover how WildWatch AI empowers different sectors of animal care and research
          </p>
        </motion.header>

        <ul
          data-cy="use-cases-list"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          role="list"
        >
          {useCases.map((useCase, index) => (
            <li key={index}>
              <UseCaseCard {...useCase} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
} 