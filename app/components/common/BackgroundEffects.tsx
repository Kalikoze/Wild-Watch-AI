'use client';

import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  color?: 'green' | 'orange';
}

export default function BackgroundEffects({ color = 'green' }: BackgroundEffectsProps) {
  const gradientColor = color === 'green' ? 'accent-green' : 'accent-orange';

  return (
    <>
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
          <div className={`h-1 bg-gradient-to-r from-transparent via-${gradientColor}/40 to-transparent`} />
          <div className={`h-[3px] bg-gradient-to-r from-transparent via-${gradientColor}/30 to-transparent transform -translate-y-px`} />
        </motion.div>
      </div>
    </>
  );
} 