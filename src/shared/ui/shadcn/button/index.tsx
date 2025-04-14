import * as React from "react"
import clsx from 'clsx'
import { Slot } from "@radix-ui/react-slot"
import styles from './button.module.css'

const buttonVariants = {
  default: styles.default,
  destructive: styles.destructive,
  outline: styles.outline,
  secondary: styles.secondary,
  ghost: styles.ghost,
  link: styles.link,
}

const buttonSizes = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const getVariantClass = (variant?: string) => {
  switch (variant) {
    case 'default':
      return styles.default;
    case 'destructive':
      return styles.destructive;
    case 'outline':
      return styles.outline;
    case 'secondary':
      return styles.secondary;
    case 'ghost':
      return styles.ghost;
    case 'link':
      return styles.link;
    default:
      return styles.default;
  }
};

const getSizeClass = (size?: string) => {
  switch (size) {
    case 'default':
      return styles.sizeDefault;
    case 'sm':
      return styles.sizeSm;
    case 'lg':
      return styles.sizeLg;
    case 'icon':
      return styles.sizeIcon;
    default:
      return styles.sizeDefault;
  }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, buttonSizes }
