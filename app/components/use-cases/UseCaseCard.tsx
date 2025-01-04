'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle, FaPaw, FaTree, FaMicroscope } from 'react-icons/fa';

const iconMap = {
  paw: FaPaw,
  tree: FaTree,
  microscope: FaMicroscope,
};

interface UseCaseCardProps {
  title: string;
  iconName: keyof typeof iconMap;
  description: string;
  benefits: string[];
  index: number;
}

export default function UseCaseCard({ title, iconName, description, benefits, index }: UseCaseCardProps) {
  const Icon = iconMap[iconName];

  return (
    <motion.article
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative p-6 bg-gradient-to-br from-primary-light to-primary rounded-2xl border border-neutral-dark/20"
    >
      <header className="flex items-start gap-4">
        <motion.span
          aria-hidden="true"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-orange/20 to-accent-orange/5 flex items-center justify-center text-accent-orange"
        >
          <Icon className="w-6 h-6" />
        </motion.span>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-neutral-light mb-2">{title}</h3>
          <p className="text-neutral-light/80 mb-4">{description}</p>

          <ul
            className="space-y-2"
            aria-label={`Benefits of ${title}`}
            role="list"
          >
            {benefits.map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.5, delay: (index * 0.1) + (i * 0.1) }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-neutral-light/80"
              >
                <FaCheckCircle
                  aria-hidden="true"
                  className="text-accent-green flex-shrink-0"
                />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </header>
    </motion.article>
  );
} 