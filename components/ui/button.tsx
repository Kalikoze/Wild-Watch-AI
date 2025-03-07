import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-1 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:hover:text-neutral-light",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:text-neutral-light",
        link: "text-primary underline-offset-4 hover:underline",
        green:
          "bg-accent-green text-primary shadow-sm hover:bg-accent-green-light",
        orange:
          "bg-accent-orange-dark hover:bg-accent-orange text-neutral-light shadow-sm",
        blue:
          "bg-accent-blue text-primary shadow-sm hover:bg-accent-blue-light",
        gold:
          "bg-accent-gold text-primary shadow-sm hover:bg-accent-gold-light",
        // WildWatch AI specific variants
        "ww-dashboard":
          "text-accent-green hover:text-accent-green-light hover:bg-transparent font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        "ww-outline-light":
          "bg-transparent border border-neutral-light/20 text-neutral-light hover:bg-neutral-light/10 hover:text-neutral-light transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-11 px-6",
        "ww-accent":
          "bg-transparent border border-accent-green text-accent-green hover:bg-accent-green/10 hover:text-accent-green-light transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_10px_rgba(40,167,69,0.1)] hover:shadow-[0_0_15px_rgba(40,167,69,0.15)]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-8 py-4 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Define a more specific type for the icon component
type IconProps = {
  className?: string;
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  withArrow?: boolean
  icon?: React.ComponentType<IconProps>
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, withArrow = false, icon: Icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const content = (
      <>
        {Icon && <Icon className={cn("h-5 w-5 mr-2", variant === "ww-outline-light" && "text-neutral-light")} />}
        {children}
        {withArrow && (
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        )}
      </>
    );

    // If asChild is true, we need to pass children directly
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          withArrow && "group"
        )}
        ref={ref}
        {...props}
      >
        {asChild ? children : content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
