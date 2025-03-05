'use client';

import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ question, answer, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border-b border-neutral-light/10"
    >
      <dt>
        <button
          data-cy={`faq-question-${index}`}
          id={`faq-question-${index}`}
          onClick={onToggle}
          className="w-full py-6 flex items-center justify-between text-left"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <span className="text-lg font-medium text-neutral-light">{question}</span>
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              rotate: isOpen ? 180 : 0
            }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.1 },
              rotate: { duration: 0.3 }
            }}
            className="text-accent-orange"
          >
            <FaChevronDown />
          </motion.span>
        </button>
      </dt>

      <dd>
        <motion.div
          data-cy={`faq-answer-${index}`}
          id={`faq-answer-${index}`}
          role="region"
          aria-labelledby={`faq-question-${index}`}
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            marginBottom: isOpen ? 16 : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden text-neutral-light/80"
        >
          <p>{answer}</p>
        </motion.div>
      </dd>
    </motion.div>
  );
} 