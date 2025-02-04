import { motion } from 'framer-motion';

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative sm:max-w-xl sm:mx-auto w-full px-4"
    >
      <div className="relative px-4 py-10 bg-primary-light shadow-xl sm:rounded-3xl sm:p-20 border border-neutral-dark/20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-green to-accent-orange bg-clip-text text-transparent">
            Welcome to WildWatch AI
          </h2>
          <p className="text-neutral-light/80">
            Let&apos;s get your workspace set up in just a few steps.
          </p>
          <button
            onClick={onNext}
            className="w-full px-8 py-3 text-base font-medium rounded-lg text-primary bg-accent-green hover:bg-accent-green-light transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Let&apos;s Get Started
          </button>
        </div>
      </div>
    </motion.div>
  );
} 