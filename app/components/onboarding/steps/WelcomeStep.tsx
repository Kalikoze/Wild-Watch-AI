import { motion } from 'framer-motion';

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

          <button
            onClick={onNext}
            className="w-full sm:w-auto min-w-[200px] px-8 py-3 text-base font-medium rounded-lg text-primary bg-accent-green hover:bg-accent-green-light transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Let&apos;s Get Started
          </button>
        </div>
      </div>
    </motion.article>
  );
} 