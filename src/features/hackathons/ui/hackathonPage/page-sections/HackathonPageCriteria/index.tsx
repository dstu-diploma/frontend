import React from 'react'
import clsx from 'clsx'
import { ActionModal } from '@/features/team'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import HackathonCriteriaFormContent from '../../modal-form-contents/HackathonCriteriaFormContent'
import { UseFormReturn } from 'react-hook-form'
import {
  isAdminOrOrganizer,
  isPrivilegedRole,
} from '@/shared/lib/helpers/roleMapping'
import { CriterionFormData } from '@/features/hackathons/model/schemas'
import { Criterion } from '@/features/hackathons/model/types'
import styles from './HackathonPageCriteria.module.scss'
import { HackathonPageOptionCard } from '../../../cards/HackathonPageOptionCard'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface HackathonPageCriteriaProps {
  criteria: Criterion[] | undefined
  criterionForm: UseFormReturn<CriterionFormData>
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
  const cropCriteria = (criteria: number) => {
    const str = criteria.toString()
    return str.length > 8 ? `${str.slice(0, 8)}...` : str
  }

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const criteriaSectionStyles = clsx(styles.hackathonCriteria, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <Toolbar className={criteriaSectionStyles}>
      <div
        className={clsx(
          styles.hackathonSectionContainer,
          styles.hackathonCriteriaContainer,
        )}
      >
        <h4>Критерии оценивания</h4>
        <div className={styles.hackathonCriteriaInfo}>
          {criteria && criteria?.length > 0 ? (
            <div className={styles.hackathonCriteriaContent}>
              <div className={styles.hackathonCriteriaList}>
                {criteria?.map((criterion: Criterion) => (
                  <HackathonPageOptionCard
                    key={criterion.id}
                    item={criterion}
                    className={styles.criteriaCard}
                  >
                    <div className={styles.criterionWeight}>
                      <span className={styles.weightLabel}>вес</span>
                      <span className={styles.weightValue}>
                        {cropCriteria(criterion.weight)}
                      </span>
                    </div>
                  </HackathonPageOptionCard>
                ))}
              </div>
              {isAdminOrOrganizer() && (
                <div className={styles.hackathonCriteriaActions}>
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
                  <ActionModal
                    title='Обновление критерия'
                    trigger={<Button>Обновить</Button>}
                    submitButtonText='Обновить'
                    onSave={e => {
                      e.preventDefault()
                      criterionForm.handleSubmit(handleCriterionUpdate)(e)
                    }}
                  >
                    <HackathonCriteriaFormContent form={criterionForm} />
                  </ActionModal>
                  <ActionModal
                    title='Удаление критерия'
                    trigger={<Button variant='destructive'>Удалить</Button>}
                    destructive={true}
                    submitButtonText='Удалить'
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
                </div>
              )}
            </div>
          ) : (
            <div className={styles.noCriteria}>
              <span>Критерии для оценки работ команд отсутствуют</span>
              {isAdminOrOrganizer() && (
                <div className={styles.hackathonCriteriaActions}>
                  <ActionModal
                    title='Создать критерий'
                    trigger={<Button>Создать критерий</Button>}
                    submitButtonText='Создать'
                    onSave={e => {
                      e.preventDefault()
                      criterionForm.handleSubmit(handleCriterionCreation)(e)
                    }}
                  >
                    <HackathonCriteriaFormContent form={criterionForm} />
                  </ActionModal>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Toolbar>
  )
}

export default HackathonPageCriteria
