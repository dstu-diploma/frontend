'use client'

import { useParams } from 'next/navigation'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import HackathonInfoSidebar from '@/features/hackatons/ui/HackathonInfoSidebar'
import clsx from 'clsx'
import { ConfirmModal } from '@/shared/ui/custom/ConfirmModal'
import { useHackathonPage } from '@/features/hackatons/hooks/useHackathonPage'
import styles from './hackathonPage.module.scss'
import { ActionModal } from '@/features/team'
import {
  CriterionFormData,
  criterionFormSchema,
} from '@/features/hackatons/model/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import HackathonCriteriaFormContent from '@/features/hackatons/ui/modal-form-contents/HackathonCriteriaFormContent'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { useHackathonCriteria } from '@/features/hackatons/hooks/useHackathonCriteria'

const HackathonPage = () => {
  const { id } = useParams()
  const user = cookiesApi.getUser()

  const { hackathonInfo, isHackathonLoading, handleApplicationSubmit } =
    useHackathonPage(Number(id))

  const { handleCriterionCreation, handleCriterionUpdate } =
    useHackathonCriteria(Number(id))

  const criterionForm = useForm<CriterionFormData>({
    resolver: zodResolver(criterionFormSchema),
    defaultValues: {
      name: '',
      weight: '0',
    },
  })

  return (
    <div className={styles.hackathonPageContainer}>
      {isHackathonLoading ? (
        <span>Загрузка информации о хакатоне...</span>
      ) : (
        <div className={styles.hackathonPageContent}>
          <h1>Хакатон «{hackathonInfo?.name}»</h1>
          <div className={styles.hackathonPageInfo}>
            <Toolbar className={styles.hackathonPageInfoToolbar}>
              <div className={styles.hackathonPageInfoToolbarButtons}>
                <Button>Изменить информацию о хакатоне</Button>
                {user.role === 'user' && (
                  <ConfirmModal
                    title={`Подать заявку на участие в хакатоне ${hackathonInfo?.name}?`}
                    submitButtonText='Подать'
                    onConfirm={handleApplicationSubmit}
                  >
                    <Button>Подать заявку на участие</Button>
                  </ConfirmModal>
                )}
              </div>
            </Toolbar>
            <div className={styles.hackathonInfo}>
              <div className={styles.hackathonDetailedInfo}>
                <Toolbar className={styles.hackathonDescription}>
                  <div
                    className={clsx(
                      styles.hackathonSectionContainer,
                      styles.hackathonDescriptionContainer,
                    )}
                  >
                    <h4>Описание хакатона</h4>
                    <p>
                      {hackathonInfo?.description ||
                        'Описание хакатона отсутствует'}
                    </p>
                  </div>
                </Toolbar>
                <Toolbar className={styles.hackathonCriteria}>
                  <div
                    className={clsx(
                      styles.hackathonSectionContainer,
                      styles.hackathonCriteriaContainer,
                    )}
                  >
                    <h4>Критерии оценивания</h4>
                    <div className={styles.hackathonCriteria}>
                      {hackathonInfo?.criteria.length > 0 ? (
                        <div className={styles.hackathonCriteriaContent}>
                          <div className={styles.hackathonCriteriaList}>
                            {hackathonInfo?.criteria.map(criterion => (
                              <div
                                key={criterion.id}
                                className={styles.criterionItem}
                              >
                                <div className={styles.criterionContent}>
                                  <h5 className={styles.criterionName}>
                                    {criterion.name}
                                  </h5>
                                  <div className={styles.criterionWeight}>
                                    <span className={styles.weightLabel}>
                                      вес
                                    </span>
                                    <span className={styles.weightValue}>
                                      {criterion.weight}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className={styles.hackathonCriteriaActions}>
                            <ActionModal
                              title='Создать критерий'
                              trigger={<Button>Создать критерий</Button>}
                              submitButtonText='Объявить'
                              onSave={e => {
                                e.preventDefault()
                                criterionForm.handleSubmit(
                                  handleCriterionCreation,
                                )(e)
                              }}
                            >
                              <HackathonCriteriaFormContent
                                form={criterionForm}
                              />
                            </ActionModal>
                            <ActionModal
                              title='Обновление критерия'
                              trigger={<Button>Обновить критерий</Button>}
                              submitButtonText='Объявить'
                              onSave={e => {
                                e.preventDefault()
                                criterionForm.handleSubmit(
                                  handleCriterionUpdate,
                                )(e)
                              }}
                            >
                              <HackathonCriteriaFormContent
                                form={criterionForm}
                              />
                            </ActionModal>
                            <ActionModal
                              title='Удаление критерия'
                              trigger={
                                <Button variant='destructive'>
                                  Удалить критерий
                                </Button>
                              }
                              submitButtonText='Объявить'
                              onSave={e => {
                                e.preventDefault()
                                criterionForm.handleSubmit(
                                  handleCriterionCreation,
                                )(e)
                              }}
                            >
                              <HackathonCriteriaFormContent
                                form={criterionForm}
                              />
                            </ActionModal>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.noCriteria}>
                          <span>
                            Критерии для оценки работ команд на данном хакатоне
                            отсутствуют
                          </span>
                          <div className={styles.hackathonCriteriaActions}>
                            <ActionModal
                              title='Создать критерий'
                              trigger={<Button>Создать критерий</Button>}
                              submitButtonText='Объявить'
                              onSave={e => {
                                e.preventDefault()
                                criterionForm.handleSubmit(
                                  handleCriterionCreation,
                                )(e)
                              }}
                            >
                              <HackathonCriteriaFormContent
                                form={criterionForm}
                              />
                            </ActionModal>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Toolbar>
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
                        {hackathonInfo?.jury?.length > 0 ? (
                          hackathonInfo.jury.map(jury => (
                            <div key={jury.id} className={styles.juryItem}>
                              <h5>{jury.name}</h5>
                            </div>
                          ))
                        ) : (
                          <span>Комиссия членов жюри отсутствует</span>
                        )}
                      </div>
                      <div className={styles.hackathonJuryActions}>
                        <ActionModal
                          title='Изменить состав жюри'
                          trigger={<Button>Изменить состав жюри</Button>}
                          onSave={() => {}}
                        >
                          Some content
                        </ActionModal>
                      </div>
                    </div>
                  </div>
                </Toolbar>
                <Toolbar className={styles.hackathonTeams}>
                  <div
                    className={clsx(
                      styles.hackathonSectionContainer,
                      styles.hackathonTeamsContainer,
                    )}
                  >
                    <h4>Команды-участники</h4>
                    <div className={styles.hackathonTeamsList}>
                      {hackathonInfo?.teams.length > 0 ? (
                        hackathonInfo?.teams.map(criterion => (
                          <div key={criterion.id}>
                            <h5>{criterion.name}</h5>
                          </div>
                        ))
                      ) : (
                        <div className={styles.noCriteria}>
                          <span>На данный момент нет команд-участников</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Toolbar>
              </div>
              <HackathonInfoSidebar hackathon={hackathonInfo} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HackathonPage
