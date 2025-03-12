'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowRight, HiSparkles } from 'react-icons/hi';
import { Button } from '@/components/ui/button';

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
              className="text-4xl md:text-5xl font-bold mb-6 text-neutral-light"
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
              <Button
                asChild
                variant="solid"
                color="green"
                size="xl"
                data-cy="final-cta-demo-button"
              >
                <Link href="/contact">
                  <HiArrowRight className="h-5 w-5" />
                  Schedule Demo
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                color="neutral"
                size="xl"
                data-cy="final-cta-learn-more-button"
              >
                <Link href="/our-story">
                  <HiSparkles className="h-5 w-5 mr-2" />
                  Learn More
                </Link>
              </Button>
            </motion.nav>
          </motion.header>
        </motion.article>
      </div>
    </section>
  );
}
