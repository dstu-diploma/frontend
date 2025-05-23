import React, { FC } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { ActionModal } from '@/features/team'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import styles from './HackathonPageJury.module.scss'
import HackathonJuryFormContent from '../../modal-form-contents/HackathonJuryFormContent'
import { UseFormReturn } from 'react-hook-form'
import { UserPartial } from '@/features/user/model/types'
import { isPrivilegedRole } from '@/shared/lib/helpers/roleMapping'
import { JuryFormData } from '@/features/hackathons/model/schemas'
import { HackathonPageOptionCard } from '../../cards/HackathonPageOptionCard'

interface HackathonPageJuryProps {
  juryInfo: UserPartial[] | null
  juryForm: UseFormReturn<JuryFormData>
  handleJuryAddition: (data: JuryFormData) => void
  handleJuryDeletion: (data: JuryFormData) => void
}

export const HackathonPageJury: FC<HackathonPageJuryProps> = ({
  juryInfo,
  juryForm,
  handleJuryAddition,
  handleJuryDeletion,
}) => {
  return (
    <Toolbar className={styles.hackathonJury}>
      <div
        className={clsx(
          styles.hackathonSectionContainer,
          styles.hackathonJuryContainer,
        )}
      >
        <h4>Состав членов жюри</h4>
        <div className={styles.hackathonJuryContent}>
          <div className={styles.hackathonJuryList}>
            {juryInfo && juryInfo?.length > 0 ? (
              juryInfo.map(judge => (
                <Link href={`/user/${judge.id}`}>
                  <HackathonPageOptionCard key={judge.id} item={judge} />
                </Link>
              ))
            ) : (
              <span>Комиссия членов жюри отсутствует</span>
            )}
          </div>
          <div className={styles.hackathonJuryActions}>
            {isPrivilegedRole() && (
              <ActionModal
                title='Добавить члена жюри'
                submitButtonText='Добавить'
                trigger={<Button>Добавить в жюри</Button>}
                onSave={e => {
                  e.preventDefault()
                  juryForm.handleSubmit(handleJuryAddition)(e)
                }}
              >
                <HackathonJuryFormContent form={juryForm} />
              </ActionModal>
            )}
            {isPrivilegedRole() && (
              <ActionModal
                title='Снятие члена жюри'
                submitButtonText='Снять'
                trigger={<Button variant='destructive'>Снять с жюри</Button>}
                onSave={e => {
                  e.preventDefault()
                  juryForm.handleSubmit(handleJuryDeletion)(e)
                }}
              >
                <HackathonJuryFormContent form={juryForm} />
              </ActionModal>
            )}
          </div>
        </div>
      </div>
    </Toolbar>
  )
}

export default HackathonPageJury
