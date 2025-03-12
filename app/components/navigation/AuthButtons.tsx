import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { HiCursorClick } from 'react-icons/hi';
import { RiDashboardLine, RiLogoutBoxLine, RiArrowRightLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthButtonsProps {
  user: User | null;
  loading: boolean;
  variant: 'desktop' | 'mobile';
  handleSignOut: () => Promise<void>;
  onNavigate?: () => void;
}

export const AuthButtons = ({
  user,
  loading,
  variant,
  handleSignOut,
  onNavigate
}: AuthButtonsProps) => {
  const isMobile = variant === 'mobile';

  if (loading) {
    return (
      <div className={cn(
        "bg-neutral-dark/20 animate-pulse rounded-lg",
        isMobile ? "h-10 w-full" : "h-10 w-32"
      )}></div>
    );
  }

  // Authenticated user UI
  if (user) {
    return (
      <div className={cn(
        isMobile ? "flex flex-col space-y-3 pt-4" : "flex items-center gap-4"
      )}>
        <Button
          asChild
          variant="text"
          color="green"
          size="lg"
          className={cn(
            "text-accent-green hover:text-accent-green-light hover:bg-transparent",
            "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
            "font-medium",
            isMobile && "justify-start"
          )}
        >
          <Link
            href="/dashboard"
            onClick={onNavigate}
            className="flex items-center gap-1 group"
          >
            <RiDashboardLine className="h-5 w-5 mr-1" />
            Dashboard
            <RiArrowRightLine className="transition-transform group-hover:translate-x-1 ml-1" />
          </Link>
        </Button>
        <Button
          onClick={() => {
            handleSignOut();
            onNavigate?.();
          }}
          variant="outline"
          color="neutral"
          size="lg"
          className={cn(
            "bg-transparent border-neutral-light/20 text-neutral-light hover:bg-neutral-light/10",
            "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
            "h-11 px-6",
            isMobile && "justify-start"
          )}
        >
          <RiLogoutBoxLine className="h-5 w-5 mr-2 text-neutral-light" />
          <span className="text-neutral-light">Sign Out</span>
        </Button>
      </div>
    );
  }

  // Unauthenticated user UI
  return (
    <>
      {isMobile ? (
        <div className="pt-4 space-y-4">
          <Button
            asChild
            variant="outline"
            size="lg"
            className={cn(
              "w-full bg-transparent border-accent-green text-accent-green hover:bg-accent-green/10 hover:text-accent-green-light",
              "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
              "shadow-[0_0_10px_rgba(40,167,69,0.1)] hover:shadow-[0_0_15px_rgba(40,167,69,0.15)]"
            )}
            onClick={onNavigate}
          >
            <Link href="/auth" className="flex items-center justify-center w-full">
              <HiCursorClick className="mr-2 h-5 w-5" />
              Try for Free
            </Link>
          </Button>
        </div>
      ) : (
        <Button
          asChild
          variant="outline"
          size="lg"
          className={cn(
            "bg-transparent border-accent-green text-accent-green hover:bg-accent-green/10 hover:text-accent-green-light h-11 px-6",
            "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
            "shadow-[0_0_10px_rgba(40,167,69,0.1)] hover:shadow-[0_0_15px_rgba(40,167,69,0.15)]"
          )}
        >
          <Link href="/auth">
            <HiCursorClick className="mr-2 h-5 w-5" />
            Get Started
          </Link>
        </Button>
      )}
    </>
  );
}; 