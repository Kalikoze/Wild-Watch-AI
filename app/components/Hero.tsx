'use client'

import Link from 'next/link'
import { motion } from 'framer-motion';
import { HiArrowRight, HiSparkles } from 'react-icons/hi';

export default function Hero() {
  return (
    <section
      data-cy="hero-section"
      aria-labelledby="hero-heading"
      className="relative h-[80vh] bg-primary flex items-center overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        className="absolute top-0 -left-64 w-96 h-96 bg-accent-green/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 -right-64 w-96 h-96 bg-accent-orange/30 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.article
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl lg:max-w-7xl"
          >
            <motion.p
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              data-cy="hero-brand"
              className="mb-4 text-accent-green font-medium tracking-wide uppercase text-sm"
            >
              WildWatch AI
            </motion.p>

            <motion.h1
              id="hero-heading"
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              data-cy="hero-title"
              className="mb-6 text-5xl font-bold tracking-tight text-neutral-light sm:text-6xl lg:text-7xl"
            >
              Intelligent{' '}
              <span className="text-accent-green">Wildlife</span>{' '}
              Monitoring with{' '}
              <span className="text-accent-orange">AI</span>
            </motion.h1>

            <motion.p
              initial={{ y: -40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              data-cy="hero-description"
              className="mb-12 text-xl text-neutral-light/80 lg:text-2xl font-light leading-relaxed"
            >
              Empowering zoos, sanctuaries, and educators with AI-powered video analysis to better understand and protect animal behavior.
            </motion.p>

            <motion.div
              role="group"
              aria-label="Call to action buttons"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              data-cy="hero-cta"
              className="flex flex-wrap gap-6"
            >
              <Link
                data-cy="hero-cta-primary"
                href="/dashboard"
                className="group inline-flex items-center px-8 py-4 text-base font-medium text-neutral-light bg-accent-orange-dark hover:bg-accent-orange rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Get Started
                <HiArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                data-cy="hero-cta-secondary"
                href="/about"
                className="group inline-flex items-center px-8 py-4 text-base font-medium text-accent-green border-2 border-accent-green hover:bg-accent-green hover:text-primary rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Learn More
                <HiSparkles className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.article>

          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <figure className="aspect-square rounded-2xl bg-neutral-dark/10 backdrop-blur-sm border border-neutral-light/10">
              {/* Placeholder for future image/graphic */}
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 