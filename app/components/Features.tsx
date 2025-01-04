'use client';

import { IconType } from 'react-icons';
import {
  FaVideo, FaChartLine, FaPencilRuler, FaExclamationTriangle
} from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FeatureRowProps {
  title: string;
  description: string;
  details: string[];
  Icon: IconType;
  imagePosition: 'left' | 'right';
  index: number;
}

function FeatureRow({ title, description, details, Icon, imagePosition, index }: FeatureRowProps) {
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : '';
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : '';

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="grid lg:grid-cols-2 gap-12 items-center py-20"
    >
      <div className={`space-y-8 ${contentOrder}`}>
        <div className="flex items-center gap-4">
          <span className="p-3 bg-accent-orange/10 rounded-lg">
            <Icon className="w-6 h-6 text-accent-orange" />
          </span>
          <h3 className="text-3xl font-bold text-neutral-light">
            {title}
          </h3>
        </div>

        <p className="text-xl text-neutral-light/80 leading-relaxed">
          {description}
        </p>

        <ul className="space-y-4">
          {details.map((detail, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="relative mt-1 w-5 h-5 flex items-center justify-center">
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
              </div>
              <span className="text-neutral-light/80">{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${imageOrder}`}>
        <div className="aspect-video rounded-2xl bg-neutral-dark/10 backdrop-blur-sm border border-neutral-light/10 overflow-hidden">
          {/* Placeholder for feature image/demo */}
          <div className="w-full h-full bg-gradient-to-br from-accent-orange/5 to-accent-orange/20" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const features = [
    {
      title: "Video Analysis",
      description: "Upload and analyze videos to detect animal presence and basic movements. Perfect for daily monitoring needs.",
      details: [
        "Quick upload and processing of common video formats",
        "Basic animal presence detection",
        "Simple movement tracking",
        "Easy-to-use interface for staff"
      ],
      Icon: FaVideo
    },
    {
      title: "Activity Tracking",
      description: "Record and organize animal activities with a straightforward logging system.",
      details: [
        "Time-stamped activity logging",
        "Basic movement pattern tracking",
        "Simple categorization of behaviors",
        "Daily activity summaries"
      ],
      Icon: FaExclamationTriangle
    },
    {
      title: "Smart Reports",
      description: "Generate clear, actionable reports for your team.",
      details: [
        "One-click daily summaries",
        "Basic PDF and CSV exports",
        "Simple charts for activity patterns",
        "Easy sharing with team members"
      ],
      Icon: FaChartLine
    },
    {
      title: "Video Management",
      description: "Keep your video records organized and accessible.",
      details: [
        "Centralized video storage",
        "Basic search and filtering",
        "Simple note-taking capability",
        "Secure access controls"
      ],
      Icon: FaPencilRuler
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light to-primary"></div>

      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(40, 167, 69, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="absolute bottom-0 inset-x-0">
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="h-1 bg-gradient-to-r from-transparent via-accent-green/40 to-transparent"></div>
          <div className="h-[3px] bg-gradient-to-r from-transparent via-accent-green/30 to-transparent transform -translate-y-px"></div>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-orange to-accent-gold bg-clip-text text-transparent">
            Streamlined Animal Monitoring
          </h2>
          <p className="text-xl text-neutral-light/80 max-w-3xl mx-auto">
            Focus on what matters most - your animals. Our tools simplify video analysis and reporting,
            helping you spend less time on paperwork and more time on care.
          </p>
        </motion.header>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <FeatureRow
              key={index}
              {...feature}
              imagePosition={index % 2 === 0 ? 'right' : 'left'}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 