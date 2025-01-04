'use client';

import { IconType } from 'react-icons';
import {
  FaVideo, FaChartLine, FaBrain, FaPencilRuler,
  FaExclamationTriangle, FaHeartbeat, FaUsers, FaClock
} from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: IconType;
  index: number;
}

function FeatureCard({ title, description, Icon, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative p-8 bg-gradient-to-br from-primary-light to-primary rounded-2xl border border-neutral-dark/20 backdrop-blur-xl shadow-lg"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-accent-orange/5 rounded-2xl" />
      <div className="relative">
        <div className="w-14 h-14 mb-6 text-accent-orange bg-gradient-to-br from-accent-orange/20 to-accent-orange/5 rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-light mb-3 bg-gradient-to-r from-accent-orange to-accent-gold bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-neutral-light/80 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const features = [
    {
      title: "Behavioral Analysis",
      description: "Real-time AI-powered video analysis that detects and classifies complex animal behaviors and interaction patterns.",
      Icon: FaVideo
    },
    {
      title: "Anomaly Detection",
      description: "Instantly identify unusual behavior patterns and receive immediate alerts for potential health or safety concerns.",
      Icon: FaExclamationTriangle
    },
    {
      title: "Health Monitoring",
      description: "Track vital signs and behavioral indicators to predict and prevent health issues before they become serious.",
      Icon: FaHeartbeat
    },
    {
      title: "Social Interaction Mapping",
      description: "Map and analyze social hierarchies and relationships between animals in groups or communities.",
      Icon: FaUsers
    },
    {
      title: "Predictive Analytics",
      description: "Leverage AI to forecast care needs, behavioral changes, and optimize resource allocation.",
      Icon: FaClock
    },
    {
      title: "Custom AI Models",
      description: "Species-specific machine learning models that adapt and improve with your unique data.",
      Icon: FaBrain
    },
    {
      title: "Automated Reporting",
      description: "Generate comprehensive daily reports with insights, trends, and actionable recommendations.",
      Icon: FaChartLine
    },
    {
      title: "Educational Resources",
      description: "Create engaging visual content for research, education, and training purposes.",
      Icon: FaPencilRuler
    }
  ];

  return (
    <section className="relative py-32 bg-primary overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 -left-64 w-96 h-96 bg-accent-green/30 rounded-full blur-3xl"
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
      <motion.div
        className="absolute bottom-0 -right-64 w-96 h-96 bg-accent-orange/30 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-light mb-6">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-neutral-light/80 max-w-2xl mx-auto">
            Comprehensive suite of tools for monitoring, analyzing, and understanding animal behavior
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 