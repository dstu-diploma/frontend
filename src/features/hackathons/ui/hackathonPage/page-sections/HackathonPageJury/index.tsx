import React, { FC } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { ActionModal } from '@/features/team'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import styles from './HackathonPageJury.module.scss'
import HackathonJuryFormContent from '../../modal-form-contents/HackathonJuryFormContent'
import { UseFormReturn } from 'react-hook-form'
import { isPrivilegedRole } from '@/shared/lib/helpers/roleMapping'
import { JuryFormData } from '@/features/hackathons/model/schemas'
import { Judge } from '@/features/hackathons/model/types'
import { HackathonPageOptionCard } from '../../../cards/HackathonPageOptionCard'

interface HackathonPageJuryProps {
  juryInfo: Judge[] | undefined
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
          {juryInfo && juryInfo?.length > 0 ? (
            <div className={styles.hackathonJuryList}>
              {juryInfo.map(judge => (
                <Link key={judge.id} href={`/user/${judge.user_id}`}>
                  <HackathonPageOptionCard item={judge} />
                </Link>
              ))}
            </div>
          ) : (
            <span>Комиссия членов жюри отсутствует</span>
          )}
          {isPrivilegedRole() && (
            <div className={styles.hackathonJuryActions}>
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
            </div>
          )}
        </div>
      </div>
    </Toolbar>
  )
}

export default HackathonPageJury
