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
    <motion.div
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.2
      }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center"
    >
      <motion.div
        className="absolute -top-4 left-0 w-8 h-8 rounded-full bg-accent-orange 
          flex items-center justify-center text-neutral-light font-bold text-lg
          shadow-lg shadow-accent-orange/20"
        whileInView={{
          scale: [0.8, 1.2, 1],
          rotate: [0, -10, 0]
        }}
        transition={{
          duration: 0.6,
          delay: index * 0.2,
          ease: "easeOut"
        }}
        viewport={{ once: true }}
      >
        {index + 1}
      </motion.div>

      <motion.div
        className="relative mb-4"
        whileInView={{
          scale: [0.9, 1]
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.2
        }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent-green"
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative w-16 h-16 rounded-full border-2 border-accent-green 
          flex items-center justify-center text-accent-orange text-2xl
          bg-primary-light/10 backdrop-blur-sm">
          {icon}
        </div>
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        transition={{
          duration: 0.5,
          delay: (index * 0.2) + 0.3
        }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-neutral-light mb-2">
          {title}
        </h3>
        <p className="text-neutral-light/60 text-sm">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function ProcessFlow() {
  const steps = [
    {
      icon: <FaUpload />,
      title: "Data Collection",
      description: "Upload video feeds or connect live cameras. Support for multiple formats and streaming protocols.",
    },
    {
      icon: <FaCog />,
      title: "AI Processing",
      description: "Advanced neural networks analyze behavior patterns, movements, and interactions in real-time.",
    },
    {
      icon: <FaChartBar />,
      title: "Analysis & Insights",
      description: "Generate detailed behavioral analytics and health insights using our specialized algorithms.",
    },
    {
      icon: <FaBell />,
      title: "Smart Alerts",
      description: "Receive immediate notifications for unusual behavior patterns or health concerns.",
    },
    {
      icon: <FaLightbulb />,
      title: "Actionable Intelligence",
      description: "Get AI-powered recommendations for animal care and management decisions.",
    },
  ];

  return (
    <section className="relative py-32 bg-primary overflow-hidden" aria-labelledby="process-title">
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
            className="text-4xl md:text-5xl font-bold mb-6 text-accent-orange"
          >
            How It Works
          </h2>
          <p className="text-xl text-neutral-light/80 max-w-2xl mx-auto">
            Our advanced AI system transforms raw video data into actionable insights
            for animal care professionals
          </p>
        </motion.header>

        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 