'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BackgroundEffectsProps {
  color?: 'green' | 'orange' | 'blue' | 'gold';
}

export default function BackgroundEffects({ color = 'green' }: BackgroundEffectsProps) {
  const colorMap = {
    green: 'accent-green',
    orange: 'accent-orange',
    blue: 'accent-blue',
    gold: 'accent-gold',
  };

  const gradientColor = colorMap[color];

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, var(--${color === 'green' ? 'accent-green' : color === 'orange' ? 'accent-orange' : color === 'blue' ? 'accent-blue' : 'accent-gold'}-rgb-glow) 0%, transparent 50%)`,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
          <div className={cn(`h-1 bg-gradient-to-r from-transparent via-${gradientColor}/40 to-transparent`)} />
          <div className={cn(`h-[3px] bg-gradient-to-r from-transparent via-${gradientColor}/30 to-transparent transform -translate-y-px`)} />
        </motion.div>
      </motion.div>
    </>
  );
} 