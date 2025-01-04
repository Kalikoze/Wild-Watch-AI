'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.article
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border-b border-neutral-light/10"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="text-lg font-medium text-neutral-light">{question}</h3>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent-orange"
        >
          <FaChevronDown />
        </motion.span>
      </button>
      <motion.div
        id={`faq-answer-${index}`}
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          marginBottom: isOpen ? 16 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden text-neutral-light/80"
      >
        <p>{answer}</p>
      </motion.div>
    </motion.article>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: "How does WildWatch AI store and manage video data?",
      answer: "Videos are securely stored using Cloudinary's enterprise-grade cloud storage, while metadata and analysis results are managed in our secure database. Access is controlled through user authentication, ensuring your data remains private and accessible only to authorized team members."
    },
    {
      question: "What kind of animal behaviors can the AI currently detect?",
      answer: "In our initial release, we focus on basic movement detection and presence tracking. Our AI model can identify when animals enter or leave frame and track simple movement patterns. More complex behavior analysis features will be added in future updates."
    },
    {
      question: "What file formats and video sizes are supported?",
      answer: "We support common video formats including MP4, MOV, and AVI through our Cloudinary integration. For optimal performance, we recommend videos under 100MB per upload, though larger files are supported."
    },
    {
      question: "How can I access and share the analysis results?",
      answer: "Analysis results are available through our dashboard, where you can view basic metrics and download simple CSV reports. Team members can access shared videos and results through their authorized accounts."
    },
    {
      question: "What technical requirements are needed to use WildWatch AI?",
      answer: "You just need a modern web browser and internet connection. Our cloud-based platform handles all the processing - no special software installation required. Simply upload your videos and access results through our web interface."
    },
    {
      question: "Can multiple team members collaborate on the platform?",
      answer: "Yes! Our authentication system supports multiple users, allowing team members to access shared videos and analysis results. Each user gets their own secure login while working with the same dataset."
    }
  ];

  const [leftColumnOpen, setLeftColumnOpen] = useState<number | null>(null);
  const [rightColumnOpen, setRightColumnOpen] = useState<number | null>(null);

  return (
    <section
      className="relative py-24 bg-primary"
      aria-labelledby="faq-title"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            id="faq-title"
            className="text-4xl font-bold mb-6 text-accent-orange"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-neutral-light/80 max-w-2xl mx-auto">
            Learn more about how WildWatch AI can transform your animal care and research
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" role="presentation">
          {/* Left Column */}
          <div className="space-y-2">
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
                isOpen={leftColumnOpen === index}
                onToggle={() => {
                  setLeftColumnOpen(leftColumnOpen === index ? null : index);
                }}
              />
            ))}
          </div>
          {/* Right Column */}
          <div className="space-y-2">
            {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
              <FAQItem
                key={index + Math.ceil(faqs.length / 2)}
                question={faq.question}
                answer={faq.answer}
                index={index + Math.ceil(faqs.length / 2)}
                isOpen={rightColumnOpen === index}
                onToggle={() => {
                  setRightColumnOpen(rightColumnOpen === index ? null : index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 