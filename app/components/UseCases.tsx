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
  metrics: {
    label: string;
    value: string;
  }[];
  index: number;
}

function UseCase({ title, icon, description, benefits, metrics, index }: UseCaseProps) {
  return (
    <motion.article
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative p-6 bg-gradient-to-br from-primary-light to-primary rounded-2xl border border-neutral-dark/20"
    >
      <div className="flex items-start gap-4">
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-orange/20 to-accent-orange/5 flex items-center justify-center text-accent-orange"
        >
          {icon}
        </motion.div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-neutral-light mb-2">{title}</h3>
          <p className="text-neutral-light/80 mb-4">{description}</p>

          <ul className="space-y-2 mb-6">
            {benefits.map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.5, delay: (index * 0.1) + (i * 0.1) }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-neutral-light/80"
              >
                <FaCheckCircle className="text-accent-green flex-shrink-0" />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, delay: (index * 0.1) + (i * 0.1) }}
                viewport={{ once: true }}
                className="p-3 rounded-lg bg-primary-dark/50"
              >
                <div className="text-accent-orange font-bold text-2xl">{metric.value}</div>
                <div className="text-neutral-light/60 text-sm">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function UseCases() {
  const cases = [
    {
      title: "Veterinary Monitoring",
      icon: <FaHospital className="w-6 h-6" />,
      description: "Continuous health monitoring and early detection of medical issues through behavioral analysis.",
      benefits: [
        "24/7 automated health monitoring",
        "Early detection of abnormal behaviors",
        "Comprehensive health history tracking",
        "AI-assisted diagnosis support"
      ],
      metrics: [
        { label: "Average Detection Time", value: "2.5hrs" },
        { label: "Accuracy Rate", value: "98.2%" }
      ]
    },
    {
      title: "Zoo Management",
      icon: <FaPaw className="w-6 h-6" />,
      description: "Comprehensive behavioral analysis and management tools for zoo environments.",
      benefits: [
        "Automated behavior logging",
        "Social interaction analysis",
        "Enrichment effectiveness tracking",
        "Visitor impact assessment"
      ],
      metrics: [
        { label: "Data Points/Day", value: "50K+" },
        { label: "Species Supported", value: "100+" }
      ]
    },
    {
      title: "Wildlife Sanctuaries",
      icon: <FaTree className="w-6 h-6" />,
      description: "Monitor and protect wildlife while maintaining natural behaviors and environments.",
      benefits: [
        "Non-invasive monitoring",
        "Habitat utilization tracking",
        "Rehabilitation progress tracking",
        "Release readiness assessment"
      ],
      metrics: [
        { label: "Coverage Area", value: "500ha" },
        { label: "Success Rate", value: "94%" }
      ]
    },
    {
      title: "Research Institutions",
      icon: <FaMicroscope className="w-6 h-6" />,
      description: "Advanced research tools for behavioral studies and conservation efforts.",
      benefits: [
        "Automated data collection",
        "Pattern recognition",
        "Statistical analysis tools",
        "Research collaboration features"
      ],
      metrics: [
        { label: "Data Processing", value: "60fps" },
        { label: "Analysis Types", value: "25+" }
      ]
    },
    {
      title: "Educational Programs",
      icon: <FaGraduationCap className="w-6 h-6" />,
      description: "Create engaging educational content and research opportunities for students.",
      benefits: [
        "Interactive learning materials",
        "Real-time observation tools",
        "Behavioral case studies",
        "Research project support"
      ],
      metrics: [
        { label: "Learning Modules", value: "200+" },
        { label: "Student Access", value: "24/7" }
      ]
    }
  ];

  return (
    <section className="relative py-32 bg-primary overflow-hidden" aria-labelledby="use-cases-title">
      {/* Animated background elements */}
      <motion.div
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((useCase, index) => (
            <UseCase key={index} {...useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 