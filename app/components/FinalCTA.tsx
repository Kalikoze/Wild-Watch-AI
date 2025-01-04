'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
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

      {/* Bottom border glow */}
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
        <div className="relative p-12 rounded-2xl border border-neutral-light/10 backdrop-blur-sm">
          <motion.header
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2
              id="cta-heading"
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-orange to-accent-gold bg-clip-text text-transparent"
            >
              Ready to Transform Animal Care?
            </h2>

            <p className="text-xl text-neutral-light/80 mb-12 leading-relaxed">
              Join the future of wildlife monitoring and research. Schedule a demo to see how WildWatch AI can benefit your organization.
            </p>

            <motion.nav
              initial={{ y: 50 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-neutral-light bg-accent-orange hover:bg-accent-orange-dark rounded-lg transition-all duration-300 shadow-lg shadow-accent-orange/20 hover:shadow-accent-orange/30 hover:-translate-y-0.5"
              >
                Schedule Demo
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-accent-green border-2 border-accent-green hover:bg-accent-green/10 rounded-lg transition-all duration-300 shadow-lg shadow-accent-green/10 hover:shadow-accent-green/20 hover:-translate-y-0.5"
              >
                Learn More
              </Link>
            </motion.nav>
          </motion.header>
        </div>
      </div>
    </section>
  );
}
