import styles from './skeleton.module.scss';
import { HTMLAttributes } from 'react';

function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`${styles.skeleton} ${className || ''}`}
      {...props}
    />
  )
}

export { Skeleton };