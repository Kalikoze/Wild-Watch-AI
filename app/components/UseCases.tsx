'use client';

import { motion } from 'framer-motion';
import {
  FaHospital, FaPaw, FaTree, FaMicroscope, FaGraduationCap,
  FaChartLine, FaCheckCircle, FaClock, FaGlobe
} from 'react-icons/fa';

interface UseCaseProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  index: number;
}

function UseCase({ title, icon, description, benefits, index }: UseCaseProps) {
  return (
    <motion.article
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative p-6 bg-gradient-to-br from-primary-light to-primary rounded-2xl border border-neutral-dark/20"
    >
      <div className="flex items-start gap-4">
        <motion.span
          aria-hidden="true"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-orange/20 to-accent-orange/5 flex items-center justify-center text-accent-orange"
        >
          {icon}
        </motion.span>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-neutral-light mb-2">{title}</h3>
          <p className="text-neutral-light/80 mb-4">{description}</p>

          <ul
            className="space-y-2"
            aria-label={`Benefits of ${title}`}
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
      </div>
    </motion.article>
  );
}

export default function UseCases() {
  const cases = [
    {
      title: "Zoo Management",
      icon: <FaPaw className="w-6 h-6" />,
      description: "Streamline daily monitoring and record-keeping with automated video analysis tools.",
      benefits: [
        "Quick video analysis for basic behaviors",
        "Automated daily activity logging",
        "Simple report generation for staff handovers",
        "Centralized video storage and notes"
      ]
    },
    {
      title: "Wildlife Sanctuaries",
      icon: <FaTree className="w-6 h-6" />,
      description: "Monitor rehabilitation progress while minimizing human interaction.",
      benefits: [
        "Non-invasive behavior monitoring",
        "Basic activity pattern tracking",
        "Easy report generation for care plans",
        "Secure video management system"
      ]
    },
    {
      title: "Research Institutions",
      icon: <FaMicroscope className="w-6 h-6" />,
      description: "Support education and research with reliable behavioral data collection.",
      benefits: [
        "Educational resource for students",
        "Research data collection tools",
        "Exportable data for analysis",
        "Collaborative video library"
      ]
    }
  ];

  return (
    <section
      className="relative py-32 bg-primary overflow-hidden"
      aria-labelledby="use-cases-title"
    >
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            id="use-cases-title"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-orange to-accent-gold bg-clip-text text-transparent"
          >
            Transforming Animal Care
          </h2>
          <p className="text-xl text-neutral-light/80 max-w-2xl mx-auto">
            Discover how WildWatch AI empowers different sectors of animal care and research
          </p>
        </motion.header>

        <ul
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          role="list"
        >
          {cases.map((useCase, index) => (
            <li key={index}>
              <UseCase {...useCase} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
} 