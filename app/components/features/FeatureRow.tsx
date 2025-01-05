'use client';

import { motion } from 'framer-motion';
import {
  FaVideo,
  FaChartLine,
  FaPencilRuler,
  FaExclamationTriangle
} from 'react-icons/fa';

const iconMap = {
  video: FaVideo,
  chart: FaChartLine,
  pencil: FaPencilRuler,
  warning: FaExclamationTriangle,
};

interface FeatureRowProps {
  title: string;
  description: string;
  details: string[];
  iconName: keyof typeof iconMap;
  imagePosition: 'left' | 'right';
  index: number;
}

export default function FeatureRow({
  title,
  description,
  details,
  iconName,
  imagePosition,
  index
}: FeatureRowProps) {
  const Icon = iconMap[iconName];
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : '';
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : '';

  return (
    <motion.article
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="grid lg:grid-cols-2 gap-12 items-center py-20"
      data-cy={`feature-row-${index}`}
    >
      <div className={`space-y-8 ${contentOrder}`}>
        <header className="flex items-center gap-4">
          <span className="p-3 bg-accent-orange/10 rounded-lg" data-cy={`feature-icon-${index}`}>
            <Icon className="w-6 h-6 text-accent-orange" aria-hidden="true" />
          </span>
          <h3
            className="text-3xl font-bold text-neutral-light"
            data-cy={`feature-title-${index}`}
          >
            {title}
          </h3>
        </header>

        <p
          className="text-xl text-neutral-light/80 leading-relaxed"
          data-cy={`feature-description-${index}`}
        >
          {description}
        </p>

        <ul className="space-y-4" role="list" data-cy={`feature-details-${index}`}>
          {details.map((detail, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              data-cy={`feature-detail-${index}-${i}`}
            >
              <span className="relative mt-1 w-5 h-5 flex items-center justify-center" aria-hidden="true">
                <motion.span
                  className="absolute inset-0 rounded-full bg-accent-green/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
                <span className="w-2.5 h-2.5 rounded-full bg-accent-green" />
              </span>
              <span className="text-neutral-light/80">{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <figure className={`${imageOrder}`} data-cy={`feature-image-${index}`}>
        <div className="aspect-video rounded-2xl bg-neutral-dark/10 backdrop-blur-sm border border-neutral-light/10 overflow-hidden">
          {/* Placeholder for feature image/demo */}
          <div className="w-full h-full bg-gradient-to-br from-accent-orange/5 to-accent-orange/20" />
        </div>
      </figure>
    </motion.article>
  );
} 