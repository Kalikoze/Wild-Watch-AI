'use client'

import Link from 'next/link'
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <header data-cy="hero-section" className="relative h-[80vh] bg-primary flex items-center overflow-hidden">
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
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.article
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl lg:max-w-7xl"
          >
            <div>
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
            </div>

            <motion.p
              initial={{ y: -40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              data-cy="hero-description"
              className="mb-12 text-xl text-neutral-light/80 lg:text-2xl font-light leading-relaxed"
            >
              Empowering zoos, sanctuaries, and educators with AI-powered video analysis to better understand and protect animal behavior.
            </motion.p>

            <motion.nav
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              data-cy="hero-cta"
              className="flex flex-wrap gap-6"
            >
              <Link
                data-cy="hero-cta-primary"
                href="/dashboard"
                className="group inline-flex items-center px-8 py-4 text-base font-medium text-neutral-light bg-accent-orange hover:bg-accent-orange-dark rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                data-cy="hero-cta-secondary"
                href="/about"
                className="group inline-flex items-center px-8 py-4 text-base font-medium text-accent-green border-2 border-accent-green hover:bg-accent-green hover:text-primary rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.nav>
          </motion.article>

          <motion.aside
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="aspect-square rounded-2xl bg-neutral-dark/10 backdrop-blur-sm border border-neutral-light/10">
              {/* Placeholder for future image/graphic */}
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </header>
  )
} 