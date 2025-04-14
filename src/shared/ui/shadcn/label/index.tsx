"use client"

import * as React from "react"
import clsx from 'clsx'
import styles from './label.module.css'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={clsx(styles.label, className)}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
