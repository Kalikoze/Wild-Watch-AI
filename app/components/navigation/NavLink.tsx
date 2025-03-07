import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NavLink = ({ href, children, className, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.2,
          ease: "easeInOut"
        }
      }}
      whileTap={{
        scale: 0.95,
        transition: {
          duration: 0.1,
          ease: "easeOut"
        }
      }}
    >
      <Link
        href={href}
        className={cn(
          "relative after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-accent-green hover:after:w-full after:transition-all after:duration-300",
          isActive && "text-neutral-light after:w-full",
          className
        )}
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.div>
  );
}; 