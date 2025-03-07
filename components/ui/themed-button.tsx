import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  RiDashboardLine,
  RiLogoutBoxLine,
  RiUploadLine,
  RiDownloadLine,
  RiAddLine,
  RiEditLine,
  RiDeleteBin5Line,
  RiArrowRightSLine,
  RiAlertLine,
  RiCheckLine
} from 'react-icons/ri';
import { cn } from '@/lib/utils';

// A mapping of common icon names to their components
const iconMap = {
  dashboard: RiDashboardLine,
  logout: RiLogoutBoxLine,
  upload: RiUploadLine,
  download: RiDownloadLine,
  add: RiAddLine,
  edit: RiEditLine,
  delete: RiDeleteBin5Line,
  arrow: RiArrowRightSLine,
  alert: RiAlertLine,
  check: RiCheckLine
};

type IconName = keyof typeof iconMap;

// Define a type for icon props
type IconProps = {
  className?: string;
};

interface ThemedButtonProps extends Omit<ButtonProps, 'icon'> {
  iconName?: IconName;
}

/**
 * A themed button component that uses consistent styling for the WildWatch AI application.
 * 
 * @example
 * // Dashboard style button with arrow
 * <ThemedButton variant="ww-dashboard" withArrow iconName="dashboard">Dashboard</ThemedButton>
 * 
 * // Accent button for primary actions
 * <ThemedButton variant="ww-accent" iconName="add">Add New</ThemedButton>
 * 
 * // Outline light button for secondary actions
 * <ThemedButton variant="ww-outline-light" iconName="logout">Sign Out</ThemedButton>
 */
export const ThemedButton = React.forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ variant, iconName, ...props }, ref) => {
    // Get the icon component if an icon name was provided
    const IconComponent = iconName ? iconMap[iconName] : undefined;

    // Add special styling for the logout icon to ensure it stays white
    const iconClassName = iconName === 'logout' ? "h-5 w-5 mr-2 text-neutral-light" : undefined;

    return (
      <Button
        ref={ref}
        variant={variant}
        icon={IconComponent ?
          (iconProps: IconProps) => <IconComponent {...iconProps} className={iconClassName || iconProps.className} />
          : undefined}
        {...props}
      />
    );
  }
);

ThemedButton.displayName = 'ThemedButton';

export function DashboardButton({ children, className, ...props }: Omit<ThemedButtonProps, 'variant'>) {
  return (
    <ThemedButton
      variant="ghost"
      withArrow
      iconName="dashboard"
      className={cn(
        "text-accent-green hover:text-accent-green-light hover:bg-transparent",
        "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        "font-medium",
        className
      )}
      {...props}
    >
      {children}
    </ThemedButton>
  );
}

export function ActionButton({ children, className, ...props }: Omit<ThemedButtonProps, 'variant'>) {
  return (
    <ThemedButton
      variant="ww-accent"
      className={className}
      {...props}
    >
      {children}
    </ThemedButton>
  );
}

export function SignOutButton({
  onClick,
  className,
  ...props
}: Omit<ThemedButtonProps, 'variant' | 'iconName' | 'onClick'> & {
  onClick: () => Promise<void> | void
}) {
  return (
    <ThemedButton
      variant="outline"
      iconName="logout"
      onClick={onClick}
      className={cn(
        "bg-transparent border-neutral-light/20 text-neutral-light hover:bg-neutral-light/10",
        "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        "h-11 px-6",
        className
      )}
      {...props}
    >
      <span className="text-neutral-light">Sign Out</span>
    </ThemedButton>
  );
} 