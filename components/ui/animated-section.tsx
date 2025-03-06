import { motion, AnimatePresence } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  isVisible: boolean;
}

export function AnimatedSection({ children, isVisible }: AnimatedSectionProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{
            opacity: 1,
            height: "auto",
            y: 0,
            transition: {
              height: { duration: 0.3 },
              opacity: { duration: 0.2, delay: 0.1 }
            }
          }}
          exit={{
            opacity: 0,
            height: 0,
            y: -10,
            transition: {
              height: { duration: 0.3 },
              opacity: { duration: 0.2 }
            }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 