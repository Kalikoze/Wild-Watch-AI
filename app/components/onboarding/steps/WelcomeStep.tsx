import { motion } from 'framer-motion';
import Button from '@/app/components/common/Button';
import { HiArrowRight } from 'react-icons/hi';

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20">
        <div className="max-w-lg mx-auto text-center space-y-8">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent-green to-accent-orange bg-clip-text text-transparent">
              Welcome to WildWatch AI
            </h1>
            <p className="mt-4 text-neutral-light/80">
              Let&apos;s get your workspace set up in just a few steps.
            </p>
          </header>

          <Button
            onClick={onNext}
            variant="primary"
            icon={HiArrowRight}
            fullWidth
            className="!bg-accent-green hover:!bg-accent-green-light text-primary"
          >
            Let&apos;s Get Started
          </Button>
        </div>
      </div>
    </motion.article>
  );
} 