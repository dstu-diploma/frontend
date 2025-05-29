'use client'

import * as React from 'react'
import clsx from 'clsx'
import styles from './label.module.css'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label ref={ref} className={clsx(styles.label, className)} {...props} />
  )
})
Label.displayName = 'Label'

export { Label }
