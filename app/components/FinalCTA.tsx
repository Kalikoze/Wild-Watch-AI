'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="relative py-24 bg-primary-light overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light border border-neutral-light/10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6 text-neutral-light"
            >
              Ready to Transform Animal Care?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-neutral-light/80 mb-12"
            >
              Join the future of wildlife monitoring and research. Schedule a demo to see how WildWatch AI can benefit your organization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-neutral-light bg-accent-orange hover:bg-accent-orange-dark rounded-lg transition-all duration-300"
              >
                Schedule Demo
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-accent-green border-2 border-accent-green hover:bg-accent-green hover:text-primary rounded-lg transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 