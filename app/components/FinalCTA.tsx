'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight, HiSparkles } from 'react-icons/hi';

export default function FinalCTA() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light to-primary"
      />

      <motion.div
        aria-hidden="true"
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

      {/* Gradient line animation */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0">
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
          <div className="h-1 bg-gradient-to-r from-transparent via-accent-green/40 to-transparent" />
          <div className="h-[3px] bg-gradient-to-r from-transparent via-accent-green/30 to-transparent transform -translate-y-px" />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="relative p-12 rounded-2xl border border-neutral-light/10 backdrop-blur-sm">
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
                className="group inline-flex items-center px-8 py-4 text-lg font-medium text-neutral-light bg-accent-orange-dark hover:bg-accent-orange rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Schedule Demo
                <HiArrowRight
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center px-8 py-4 text-lg font-medium text-accent-green border-2 border-accent-green hover:bg-accent-green hover:text-primary rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Learn More
                <HiSparkles
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.nav>
          </motion.header>
        </article>
      </div>
    </section>
  );
}
