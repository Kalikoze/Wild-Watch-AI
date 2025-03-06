import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { WelcomeStepProps } from '@/app/onboarding/types';

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="relative py-8 sm:py-12 bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20 overflow-hidden">
        {/* Decorative gradient bar at top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green via-accent-green-light to-accent-green/30" />

        <CardContent className="max-w-lg mx-auto text-center p-0 space-y-8 relative z-10">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="text-neutral-light">Welcome to </span>
              <span className="text-neutral-light">WildWatch </span>
              <span className="text-accent-green">AI</span>
            </h1>
            <p className="mt-4 text-neutral-light/60">
              Let&apos;s get your workspace set up in just a few steps.
            </p>
          </header>

          <Button
            onClick={onNext}
            variant="green"
            size="xl"
            className={cn(
              "w-full transition-all duration-300",
              "hover:scale-[1.02] active:scale-[0.98]",
              "hover:shadow-[0_0_15px_rgba(40,167,69,0.3)]"
            )}
          >
            Let&apos;s Get Started
            <HiArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </motion.article>
  );
} 