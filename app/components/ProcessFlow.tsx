'use client';

import { motion } from 'framer-motion';
import { FaUpload, FaCog, FaChartBar, FaBell, FaLightbulb } from 'react-icons/fa';

interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function ProcessStep({ icon, title, description, index }: ProcessStepProps) {
  return (
    <motion.article
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.2
      }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center"
    >
      <motion.span
        aria-hidden="true"
        className="absolute -top-4 left-0 w-8 h-8 rounded-full bg-accent-orange 
          flex items-center justify-center text-neutral-light font-bold text-lg
          shadow-lg shadow-accent-orange/20"
        whileInView={{
          scale: [0.8, 1.2, 1],
          rotate: [0, -10, 0]
        }}
        transition={{
          duration: 2,
          delay: index * 1,
          ease: "easeOut"
        }}
        viewport={{ once: true }}
      >
        {index + 1}
      </motion.span>

      <motion.figure
        className="relative mb-4"
        whileInView={{
          scale: [0.9, 1]
        }}
        transition={{
          duration: 2,
          delay: index * 1
        }}
        viewport={{ once: true }}
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
          aria-hidden="true"
          className="relative w-16 h-16 rounded-full border-2 border-accent-green 
            flex items-center justify-center text-accent-orange text-2xl
            bg-primary-light/10 backdrop-blur-sm"
        >
          {icon}
        </span>
      </motion.figure>

      <header>
        <h3 className="text-xl font-bold text-neutral-light mb-2">
          {title}
        </h3>
        <p className="text-neutral-light/60 text-sm">
          {description}
        </p>
      </header>
    </motion.article>
  );
}

export default function ProcessFlow() {
  const steps = [
    {
      icon: <FaUpload />,
      title: "Upload Videos",
      description: "Securely upload and store your wildlife footage with cloud-based video management.",
    },
    {
      icon: <FaCog />,
      title: "Basic Analysis",
      description: "Initial AI processing detects animal presence and tracks simple movement patterns.",
    },
    {
      icon: <FaChartBar />,
      title: "Simple Insights",
      description: "View basic metrics about animal presence and movement patterns in an easy-to-read dashboard.",
    },
    {
      icon: <FaBell />,
      title: "Team Access",
      description: "Share findings with your team through secure, role-based access controls.",
    },
    {
      icon: <FaLightbulb />,
      title: "Export Data",
      description: "Download simple CSV reports and share insights with stakeholders.",
    },
  ];

  return (
    <section
      className="relative py-32 bg-primary overflow-hidden"
      aria-labelledby="process-title"
    >
      <motion.div
        className="absolute bottom-0 inset-x-0"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="h-1 bg-gradient-to-r from-transparent via-accent-orange/40 to-transparent"></div>
        <div className="h-[3px] bg-gradient-to-r from-transparent via-accent-orange/30 to-transparent transform -translate-y-px"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            id="process-title"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-orange to-accent-gold bg-clip-text text-transparent"
          >
            How It Works
          </h2>
          <p className="text-xl text-neutral-light/80 max-w-2xl mx-auto">
            Our advanced AI system transforms raw video data into actionable insights
            for animal care professionals
          </p>
        </motion.header>

        <ol
          className="relative grid grid-cols-1 md:grid-cols-5 gap-8"
          aria-label="Process steps"
        >
          {steps.map((step, index) => (
            <li key={index}>
              <ProcessStep
                icon={step.icon}
                title={step.title}
                description={step.description}
                index={index}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
} 