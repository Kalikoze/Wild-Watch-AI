'use client';

import { motion } from 'framer-motion';
import { FaUpload, FaCog, FaChartBar, FaBell, FaLightbulb } from 'react-icons/fa';
import { ProcessStep as ProcessStepType } from '@/lib/data/process-steps';

const iconMap = {
  upload: FaUpload,
  cog: FaCog,
  chart: FaChartBar,
  bell: FaBell,
  lightbulb: FaLightbulb
} as const;

interface ProcessStepProps extends ProcessStepType {
  index: number;
}

export default function ProcessStep({ iconName, title, description, index }: ProcessStepProps) {
  const Icon = iconMap[iconName];

  return (
    <motion.article
      data-cy={`process-step-content-${index}`}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        delay: index * 0.2
      }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center text-center w-full"
    >
      <motion.span
        data-cy={`process-step-number-${index}`}
        initial={{ opacity: 0 }}
        whileInView={{
          scale: [0.8, 1.2, 1],
          rotate: [0, -10, 0],
          opacity: 1
        }}
        transition={{
          duration: 2,
          delay: index * 1,
          ease: "easeOut"
        }}
        viewport={{ once: true }}
        className="absolute -top-4 left-0 w-8 h-8 rounded-full bg-accent-orange 
          flex items-center justify-center text-neutral-light font-bold text-lg
          shadow-lg shadow-accent-orange/20"
      >
        {index + 1}
      </motion.span>

      <motion.figure
        data-cy={`process-step-icon-container-${index}`}
        initial={{ opacity: 0 }}
        whileInView={{
          scale: [0.9, 1],
          opacity: 1
        }}
        transition={{
          duration: 2,
          delay: index * 1
        }}
        viewport={{ once: true }}
        className="relative mb-4"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-accent-green"
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            delay: index * 1,
            ease: "easeInOut"
          }}
        />
        <span
          data-cy={`process-step-icon-${index}`}
          aria-hidden="true"
          className="relative w-16 h-16 rounded-full border-2 border-accent-green 
            flex items-center justify-center text-accent-orange text-2xl
            bg-primary-light/10 backdrop-blur-sm"
        >
          <Icon />
        </span>
      </motion.figure>

      <header className="w-full">
        <h3
          data-cy={`process-step-title-${index}`}
          className="text-xl font-bold text-neutral-light mb-2 text-center"
        >
          {title}
        </h3>
        <p
          data-cy={`process-step-description-${index}`}
          className="text-neutral-light/60 text-sm text-center"
        >
          {description}
        </p>
      </header>
    </motion.article>
  );
} 