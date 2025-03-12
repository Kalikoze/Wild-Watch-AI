'use client'

import { motion } from 'framer-motion';
import { HiArrowRight, HiSparkles } from 'react-icons/hi';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section
      data-cy="hero-section"
      aria-labelledby="hero-heading"
      className="relative h-[80vh] bg-primary flex items-center overflow-hidden"
    >

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.article
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl lg:max-w-7xl"
          >
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              data-cy="hero-brand"
              className="mb-4 text-accent-green font-medium tracking-wide uppercase text-sm"
            >
              WildWatch AI
            </motion.p>

            <motion.h1
              id="hero-heading"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              data-cy="hero-title"
              className="mb-6 text-5xl font-bold tracking-tight text-neutral-light sm:text-6xl lg:text-7xl"
            >
              Intelligent{' '}
              <span className="text-accent-orange">Wildlife</span>{' '}
              Monitoring with{' '}
              <span className="text-accent-green">AI</span>
            </motion.h1>

            <motion.p
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              data-cy="hero-description"
              className="mb-12 text-xl text-neutral-light/80 lg:text-2xl font-light leading-relaxed"
            >
              Empowering zoos, sanctuaries, and educators with AI-powered video analysis to better understand and protect animal behavior.
            </motion.p>

            <motion.div
              role="group"
              aria-label="Call to action buttons"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              data-cy="hero-cta"
              className="flex flex-wrap gap-6"
            >
              <Button
                asChild
                variant="solid"
                color="green"
                size="xl"
                withArrow="right"
                data-cy="hero-cta-primary"
              >
                <Link href="/auth">
                  <HiArrowRight className="h-5 w-5" />
                  Get Started Free
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                color="neutral"
                size="xl"
                data-cy="hero-cta-secondary"
              >
                <Link href="/our-story">
                  <HiSparkles className="h-5 w-5 mr-2" />
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </motion.article>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
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