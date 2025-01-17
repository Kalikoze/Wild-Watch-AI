'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight, HiSparkles } from 'react-icons/hi';
import BackgroundEffects from '@/app/components/common/BackgroundEffects';

export default function FinalCTA() {
  return (
    <section
      data-cy="final-cta-section"
      className="relative py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light to-primary"
      />

      <BackgroundEffects color="green" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          data-cy="final-cta-content"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative p-12 rounded-2xl border border-neutral-light/10 backdrop-blur-sm"
        >
          <motion.header
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              data-cy="final-cta-title"
              id="cta-heading"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-orange to-accent-gold bg-clip-text text-transparent"
            >
              Ready to Transform Animal Care?
            </motion.h2>

            <motion.p
              data-cy="final-cta-description"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-neutral-light/80 mb-12 leading-relaxed"
            >
              Join the future of wildlife monitoring and research. Schedule a demo to see how WildWatch AI can benefit your organization.
            </motion.p>

            <motion.nav
              data-cy="final-cta-buttons"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link
                data-cy="final-cta-demo-button"
                href="/contact"
                className="group inline-flex items-center px-8 py-4 text-lg font-medium text-neutral-light bg-accent-orange-dark hover:bg-accent-orange rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Schedule Demo
                <HiArrowRight
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                data-cy="final-cta-learn-more-button"
                href="/our-story"
                className="group inline-flex items-center px-8 py-4 text-lg font-medium text-accent-green border-2 border-accent-green hover:bg-accent-green hover:text-primary rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Learn More
                <HiSparkles
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.nav>
          </motion.header>
        </motion.article>
      </div>
    </section>
  );
}
