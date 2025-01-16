'use client';

import { motion } from 'framer-motion';
import ProcessStep from './ProcessStep';
import BackgroundEffects from '../common/BackgroundEffects';
import { processSteps } from '@/lib/data/process-steps';

export default function ProcessFlow() {
  return (
    <section
      data-cy="process-section"
      className="relative py-32 bg-primary overflow-hidden"
      aria-labelledby="process-title"
    >
      <BackgroundEffects color="orange" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          data-cy="process-header"
          // initial={{ y: 50, opacity: 0 }}
          // whileInView={{ y: 0, opacity: 1 }}
          // transition={{ duration: 0.7 }}
          // viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            data-cy="process-title"
            id="process-title"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-orange to-accent-gold bg-clip-text text-transparent"
          >
            How It Works
          </h2>
          <p data-cy="process-description" className="text-xl text-neutral-light/80 max-w-2xl mx-auto">
            Our advanced AI system transforms raw video data into actionable insights
            for animal care professionals
          </p>
        </motion.header>

        <ol
          data-cy="process-steps-list"
          className="relative grid grid-cols-1 md:grid-cols-5 gap-8"
          aria-label="Process steps"
        >
          {processSteps.map((step, index) => (
            <li key={index} data-cy={`process-step-${index}`}>
              <ProcessStep
                {...step}
                index={index}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
} 