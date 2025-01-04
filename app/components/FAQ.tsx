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
    <motion.div
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
      >
        <span className="text-lg font-medium text-neutral-light">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent-orange"
        >
          <FaChevronDown />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          marginBottom: isOpen ? 16 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden text-neutral-light/80"
      >
        {answer}
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: "How does WildWatch AI protect animal privacy and data security?",
      answer: "We implement enterprise-grade security measures and follow strict ethical guidelines for animal monitoring. All data is encrypted, and access is strictly controlled through role-based permissions."
    },
    {
      question: "Can WildWatch AI be customized for specific species?",
      answer: "Yes! Our AI models are designed to be adaptable and can be trained for any species. We work closely with your team to understand specific behavioral patterns and requirements."
    },
    {
      question: "What kind of technical setup is required?",
      answer: "Our platform is cloud-based and works with most standard camera systems. We provide full technical support for integration and can recommend compatible hardware if needed."
    },
    {
      question: "How long does it take to implement the system?",
      answer: "Basic implementation can be completed within weeks. We offer a phased approach, starting with core features and gradually expanding based on your needs."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer comprehensive 24/7 technical support, regular training sessions, and dedicated account management to ensure you get the most value from our platform."
    },
    {
      question: "How accurate is the AI in detecting animal behaviors?",
      answer: "Our AI system uses advanced deep learning models that continuously improve over time. While accuracy can vary by species and behavior type, we focus on high-precision detection and provide confidence scores with all observations. We also offer model fine-tuning for your specific needs."
    }
  ];

  const [leftColumnOpen, setLeftColumnOpen] = useState<number | null>(null);
  const [rightColumnOpen, setRightColumnOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 bg-primary" aria-labelledby="faq-title">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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