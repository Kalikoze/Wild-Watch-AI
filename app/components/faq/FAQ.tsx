'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { faqs } from '@/lib/data/faqs';
import FAQItem from './FAQItem';
import BackgroundEffects from '../common/BackgroundEffects';

export default function FAQ() {
  const [leftColumnOpen, setLeftColumnOpen] = useState<number | null>(null);
  const [rightColumnOpen, setRightColumnOpen] = useState<number | null>(null);

  return (
    <section
      data-cy="faq-section"
      className="relative py-24 bg-primary"
      aria-labelledby="faq-title"
    >
      <BackgroundEffects color="orange" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            data-cy="faq-title"
            id="faq-title"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-orange to-accent-gold bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </h2>
          <p data-cy="faq-description" className="text-xl text-neutral-light/80 max-w-2xl mx-auto">
            Learn more about how WildWatch AI can transform your animal care and research
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.dl
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
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
          </motion.dl>
          <motion.dl
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
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
          </motion.dl>
        </div>
      </div>
    </section>
  );
} 