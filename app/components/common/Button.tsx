'use client'

import Link from 'next/link'
import { IconType } from 'react-icons'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'neutral'
  children: React.ReactNode
  icon?: IconType
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  icon: Icon,
  iconPosition = 'right',
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false
}: ButtonProps) {
  const baseStyles = `group inline-flex items-center justify-center ${fullWidth ? 'w-full' : 'w-full sm:w-auto'
    } px-6 sm:px-8 py-4 text-base font-medium rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95`

  const variantStyles = {
    primary: "text-neutral-light bg-accent-orange-dark hover:bg-accent-orange",
    secondary: "text-accent-green border-2 border-accent-green hover:bg-accent-green hover:text-primary",
    neutral: "bg-neutral-light/5 border border-neutral-dark/30 text-neutral-light hover:bg-neutral-light/10"
  }

  const iconClasses = iconPosition === 'right'
    ? "ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
    : "mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"

  const buttonContent = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className={iconClasses} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className={iconClasses} />
      )}
    </>
  )

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${combinedClassName} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {buttonContent}
    </button>
  )
} 