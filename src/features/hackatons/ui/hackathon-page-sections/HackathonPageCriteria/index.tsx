import React from 'react'
import { ActionModal } from '@/features/team'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import clsx from 'clsx'
import HackathonCriteriaFormContent from '../../modal-form-contents/HackathonCriteriaFormContent'
import { Criterion } from '@/features/hackatons/model/types'
import { CriterionFormData } from '@/features/hackatons/model/schemas'
import { UseFormReturn } from 'react-hook-form'
import styles from './HackathonPageCriteria.module.scss'
import { isPrivilegedRole } from '@/shared/lib/helpers/roleMapping'
import { HackathonPageOptionCard } from '../../HackathonPageOptionCard'

interface HackathonPageCriteriaProps {
  criteria: Criterion[] | null
  criterionForm: UseFormReturn<{ name: string; weight: number }>
  handleCriterionCreation: (data: CriterionFormData) => void
  handleCriterionUpdate: (data: CriterionFormData) => void
  handleCriterionDeletion: (data: CriterionFormData) => void
}

const HackathonPageCriteria = ({
  criteria,
  criterionForm,
  handleCriterionCreation,
  handleCriterionUpdate,
  handleCriterionDeletion,
}: HackathonPageCriteriaProps) => {
  return (
    <Toolbar className={styles.hackathonCriteria}>
      <div
        className={clsx(
          styles.hackathonSectionContainer,
          styles.hackathonCriteriaContainer,
        )}
      >
        <h4>Критерии оценивания</h4>
        <div className={styles.hackathonCriteriaInfo}>
          {criteria?.length > 0 ? (
            <div className={styles.hackathonCriteriaContent}>
              <div className={styles.hackathonCriteriaList}>
                {criteria?.map((criterion: Criterion) => (
                  <HackathonPageOptionCard key={criterion.id} item={criterion}>
                    <div className={styles.criterionWeight}>
                      <span className={styles.weightLabel}>вес</span>
                      <span className={styles.weightValue}>
                        {criterion.weight}
                      </span>
                    </div>
                  </HackathonPageOptionCard>
                ))}
              </div>
              <div className={styles.hackathonCriteriaActions}>
                {isPrivilegedRole() && (
                  <ActionModal
                    title='Создать критерий'
                    trigger={<Button>Создать</Button>}
                    submitButtonText='Объявить'
                    onSave={e => {
                      e.preventDefault()
                      criterionForm.handleSubmit(handleCriterionCreation)(e)
                    }}
                  >
                    <HackathonCriteriaFormContent form={criterionForm} />
                  </ActionModal>
                )}
                {isPrivilegedRole() && (
                  <ActionModal
                    title='Обновление критерия'
                    trigger={<Button>Обновить</Button>}
                    submitButtonText='Объявить'
                    onSave={e => {
                      e.preventDefault()
                      criterionForm.handleSubmit(handleCriterionUpdate)(e)
                    }}
                  >
                    <HackathonCriteriaFormContent form={criterionForm} />
                  </ActionModal>
                )}
                {isPrivilegedRole() && (
                  <ActionModal
                    title='Удаление критерия'
                    trigger={<Button variant='destructive'>Удалить</Button>}
                    submitButtonText='Объявить'
                    onSave={e => {
                      e.preventDefault()
                      criterionForm.handleSubmit(handleCriterionDeletion)(e)
                    }}
                  >
                    <HackathonCriteriaFormContent
                      form={criterionForm}
                      deletion={true}
                    />
                  </ActionModal>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.noCriteria}>
              <span>
                Критерии для оценки работ команд на данном хакатоне отсутствуют
              </span>
              <div className={styles.hackathonCriteriaActions}>
                {isPrivilegedRole() && (
                  <ActionModal
                    title='Создать критерий'
                    trigger={<Button>Создать критерий</Button>}
                    submitButtonText='Объявить'
                    onSave={e => {
                      e.preventDefault()
                      criterionForm.handleSubmit(handleCriterionCreation)(e)
                    }}
                  >
                    <HackathonCriteriaFormContent form={criterionForm} />
                  </ActionModal>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Toolbar>
  )
}

export default HackathonPageCriteria
