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
import {
  CriterionFormData,
  CriterionDeletionData,
} from '@/features/hackathons/model/schemas'
import { Criterion, DetailedHackathon } from '@/features/hackathons/model/types'
import styles from './HackathonPageCriteria.module.scss'
import { HackathonPageOptionCard } from '../../../cards/HackathonPageOptionCard'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface HackathonPageCriteriaProps {
  isStartPeriod: boolean
  criteria: Criterion[] | undefined
  criterionForm: UseFormReturn<CriterionFormData>
  criterionDeletionForm: UseFormReturn<CriterionDeletionData>
  handleCriterionCreation: (
    data: CriterionFormData,
    form: UseFormReturn<{
      name: string
      weight: string
    }>,
  ) => void
  handleCriterionUpdate: (
    data: CriterionFormData,
    form: UseFormReturn<CriterionFormData>,
  ) => void
  handleCriterionDeletion: (
    data: CriterionDeletionData,
    form: UseFormReturn<CriterionDeletionData>,
  ) => void
}

const HackathonPageCriteria = ({
  isStartPeriod,
  criteria,
  criterionForm,
  criterionDeletionForm,
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
              {isAdminOrOrganizer() ? (
                !isStartPeriod ? (
                  <div className={styles.hackathonCriteriaActions}>
                    <ActionModal
                      title='Создать критерий'
                      trigger={<Button>Создать</Button>}
                      submitButtonText='Создать'
                      form={criterionForm}
                      onSave={async e => {
                        e.preventDefault()
                        try {
                          await new Promise<void>((resolve, reject) => {
                            criterionForm.handleSubmit(
                              data => {
                                handleCriterionCreation(data, criterionForm)
                                resolve()
                              },
                              errors => {
                                reject(errors)
                              },
                            )(e)
                          })
                          return true // Закрыть модалку при успехе
                        } catch (errors) {
                          return false // Не закрывать модалку при ошибках
                        }
                      }}
                    >
                      <HackathonCriteriaFormContent form={criterionForm} />
                    </ActionModal>
                    <ActionModal
                      title='Обновление критерия'
                      trigger={<Button>Обновить</Button>}
                      submitButtonText='Обновить'
                      form={criterionForm}
                      onSave={async e => {
                        e.preventDefault()
                        try {
                          await new Promise<void>((resolve, reject) => {
                            criterionForm.handleSubmit(
                              data => {
                                handleCriterionUpdate(data, criterionForm)
                                resolve()
                              },
                              errors => {
                                reject(errors)
                              },
                            )(e)
                          })
                          return true // Закрыть модалку при успехе
                        } catch (errors) {
                          return false // Не закрывать модалку при ошибках
                        }
                      }}
                    >
                      <HackathonCriteriaFormContent
                        form={criterionForm}
                        update={true}
                        criteria={criteria}
                      />
                    </ActionModal>
                    <ActionModal
                      title='Удаление критерия'
                      trigger={<Button variant='destructive'>Удалить</Button>}
                      destructive={true}
                      submitButtonText='Удалить'
                      form={criterionDeletionForm}
                      onSave={async e => {
                        e.preventDefault()
                        try {
                          await new Promise<void>((resolve, reject) => {
                            criterionDeletionForm.handleSubmit(
                              data => {
                                handleCriterionDeletion(
                                  data,
                                  criterionDeletionForm,
                                )
                                resolve()
                              },
                              errors => {
                                reject(errors)
                              },
                            )(e)
                          })
                          return true // Закрыть модалку при успехе
                        } catch (errors) {
                          return false // Не закрывать модалку при ошибках
                        }
                      }}
                    >
                      <HackathonCriteriaFormContent
                        form={criterionDeletionForm}
                        deletion={true}
                        criteria={criteria}
                      />
                    </ActionModal>
                  </div>
                ) : (
                  <span style={{ marginTop: '20px' }}>
                    Критерии можно изменять только до начала хакатона
                  </span>
                )
              ) : null}
            </div>
          ) : (
            <div className={styles.noCriteria}>
              <span>Критерии для оценки работ команд отсутствуют</span>
              {isAdminOrOrganizer() ? (
                !isStartPeriod ? (
                  <div className={styles.hackathonCriteriaActions}>
                    <ActionModal
                      title='Создать критерий'
                      trigger={<Button>Создать критерий</Button>}
                      submitButtonText='Создать'
                      form={criterionForm}
                      onSave={async e => {
                        e.preventDefault()
                        try {
                          await new Promise<void>((resolve, reject) => {
                            criterionForm.handleSubmit(
                              data => {
                                handleCriterionCreation(data, criterionForm)
                                resolve()
                              },
                              errors => {
                                reject(errors)
                              },
                            )(e)
                          })
                          return true // Закрыть модалку при успехе
                        } catch (errors) {
                          return false // Не закрывать модалку при ошибках
                        }
                      }}
                    >
                      <HackathonCriteriaFormContent form={criterionForm} />
                    </ActionModal>
                  </div>
                ) : (
                  <span style={{ marginTop: '20px' }}>
                    Критерии можно изменять только до начала хакатона
                  </span>
                )
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Toolbar>
  )
}

export default HackathonPageCriteria
