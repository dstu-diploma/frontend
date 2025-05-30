import React from 'react'
import clsx from 'clsx'
import { AccordionItem, AccordionContent } from '@/shared/ui/shadcn/accordion'
import { type User } from '@/features/user'
import { TeamInfo } from '@/features/team/model/types'
import styles from './AdminAccordionBlock.module.scss'
import { AccordionBlockContent } from './AccordionBlockContent'
import AccordionBlockTrigger from './AccordionBlockTrigger'

interface AccordionBlockProps {
  className?: string
  entity: User | TeamInfo | undefined
  valueKey: string
}

const AccordionBlock = ({
  entity,
  valueKey,
  className,
}: AccordionBlockProps) => {
  return (
    <AccordionItem
      value={valueKey}
      className={clsx(styles.accordionBlock, className)}
    >
      <AccordionBlockTrigger
        entity={entity}
        className={styles.accordionTrigger}
      />
      <AccordionContent>
        <AccordionBlockContent entity={entity} />
      </AccordionContent>
    </AccordionItem>
  )
}

export default AccordionBlock
