import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define arrow direction type
export type ArrowDirection = "left" | "right";

// Define color styles
const colorStyles = {
  green: {
    solid: "bg-accent-green text-primary hover:bg-accent-green-light shadow-[0_0_10px_rgba(40,167,69,0.1)] hover:shadow-[0_0_15px_rgba(40,167,69,0.15)]",
    outline: "border-accent-green text-accent-green hover:bg-accent-green/10 hover:text-accent-green-light shadow-[0_0_10px_rgba(40,167,69,0.1)] hover:shadow-[0_0_15px_rgba(40,167,69,0.15)]",
    text: "text-accent-green hover:text-accent-green-light",
  },
  orange: {
    solid: "bg-accent-orange-dark hover:bg-accent-orange text-neutral-light shadow-[0_0_15px_rgba(255,87,34,0.15)]",
    outline: "border-accent-orange text-accent-orange hover:bg-accent-orange/10 hover:text-accent-orange-light shadow-[0_0_10px_rgba(255,87,34,0.1)]",
    text: "text-accent-orange hover:text-accent-orange-light",
  },
  neutral: {
    solid: "bg-neutral-light/10 text-neutral-light hover:bg-neutral-light/20",
    outline: "border-neutral-light/20 text-neutral-light hover:bg-neutral-light/10",
    text: "text-neutral-light hover:text-neutral-light/80",
  },
  blue: {
    solid: "bg-accent-blue text-primary hover:bg-accent-blue-light shadow-[0_0_10px_rgba(66,133,244,0.1)] hover:shadow-[0_0_15px_rgba(66,133,244,0.15)]",
    outline: "border-accent-blue text-accent-blue hover:bg-accent-blue/10 hover:text-accent-blue-light shadow-[0_0_10px_rgba(66,133,244,0.1)]",
    text: "text-accent-blue hover:text-accent-blue-light",
  },
  gold: {
    solid: "bg-accent-gold text-primary hover:bg-accent-gold-light shadow-[0_0_10px_rgba(255,193,7,0.1)] hover:shadow-[0_0_15px_rgba(255,193,7,0.15)]",
    outline: "border-accent-gold text-accent-gold hover:bg-accent-gold/10 hover:text-accent-gold-light shadow-[0_0_10px_rgba(255,193,7,0.1)]",
    text: "text-accent-gold hover:text-accent-gold-light",
  },
};

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-1 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "shadow-sm",
        outline: "bg-transparent border",
        text: "bg-transparent",
      },
      size: {
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-8 py-4 text-base",
        icon: "h-9 w-9",
      },
      iconSize: {
        default: "[&_svg]:size-4",
        lg: "[&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "xl",
      iconSize: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  withArrow?: boolean | ArrowDirection
  icon?: React.ComponentType<{ className?: string }>
  color?: keyof typeof colorStyles
  iconSize?: "default" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size, iconSize = "default", asChild = false, withArrow = false, icon: Icon, color = "green", children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Get the appropriate color style based on variant and color
    let colorStyle = "";
    if (color in colorStyles && variant && variant in colorStyles[color as keyof typeof colorStyles]) {
      colorStyle = colorStyles[color as keyof typeof colorStyles][variant as keyof typeof colorStyles[keyof typeof colorStyles]];
    }

    // Determine arrow direction
    let arrowDirection: ArrowDirection = "right";
    if (withArrow && typeof withArrow === "string") {
      arrowDirection = withArrow;
    }

    const LeftArrow = () => (
      <svg
        className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
    );

    const RightArrow = () => (
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
    );

    const content = (
      <>
        {withArrow && arrowDirection === "left" && <LeftArrow />}
        {Icon && <Icon className={cn("h-5 w-5 mr-2")} />}
        {children}
        {withArrow && arrowDirection === "right" && <RightArrow />}
      </>
    );

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, iconSize, className }),
          colorStyle,
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
