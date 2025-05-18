'use client'

import Link from 'next/link'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import { ActionModal } from '@/shared/ui/custom/ActionModal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminApi } from '@/features/admin/api'
import { useToast } from '@/shared/hooks/use-toast'
import { AxiosError } from 'axios'
import UserCardSkeleton from '@/shared/ui/custom/UserCardSkeleton'
import styles from './hackathons.module.scss'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { useHackathons } from '@/features/hackathons/hooks/useHackathons'
import {
  HackathonFormData,
  hackathonFormSchema,
} from '@/features/hackathons/model/schemas'
import { HackathonListCard } from '@/features/hackathons/ui/cards/HackathonListCard'
import HackathonEditFormContent from '@/features/hackathons/ui/modal-form-contents/HackathonEditFormContent'

const HackathonsPage = () => {
  const user = cookiesApi.getUser()
  const { mutate: createHackathon } = adminApi.createHackathon()
  const { toast, dismiss } = useToast()
  const { allHackathons, isHackathonsLoading, getAllHackathons } =
    useHackathons()

  const editForm = useForm<HackathonFormData>({
    resolver: zodResolver(hackathonFormSchema),
    defaultValues: {
      name: '',
      max_participant_count: 0,
      max_team_mates_count: 0,
      description: '',
      start_date: '',
      score_start_date: '',
      end_date: '',
    },
  })

  const onSubmit = (data: HackathonFormData) => {
    createHackathon(data, {
      onSuccess: async () => {
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: `Хакатон «${data.name}» успешно создан`,
        })
        await getAllHackathons()
      },
      onError: error => {
        dismiss()
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const errorData = axiosError.response.data as { detail: string }
          toast({
            variant: 'destructive',
            title: 'Ошибка при создании хакатона',
            description: errorData.detail,
          })
          console.error('Ошибка при создании хакатона:', errorData.detail)
        }
      },
    })
  }

  return (
    <div className={styles.hackathonsContainer}>
      <h1 className={styles.hackathonsTitle}>Хакатоны</h1>
      <div className={styles.hackathonsContent}>
        {(user.role === 'admin' || user.role === 'organizer') && (
          <Toolbar>
            <div className={styles.toolbarContent}>
              <ActionModal
                title='Объявление хакатона'
                trigger={<Button>Объявить новый хакатон</Button>}
                submitButtonText='Объявить'
                onSave={e => {
                  e.preventDefault()
                  editForm.handleSubmit(onSubmit)(e)
                }}
                contentClassName={styles.hackathonCreateModal}
              >
                <HackathonEditFormContent form={editForm} />
              </ActionModal>
            </div>
          </Toolbar>
        )}
        <div className={styles.hackathons}>
          <h4>Список хакатонов</h4>
          {isHackathonsLoading ? (
            <div className={styles.skeletonContainer}>
              <UserCardSkeleton />
              <UserCardSkeleton />
              <UserCardSkeleton />
            </div>
          ) : (
            <div className={styles.hackathonsList}>
              {allHackathons.length > 0 ? (
                allHackathons.map(hackathon => (
                  <Link
                    href={`/hackathons/${hackathon.id}`}
                    className={styles.hackathonLink}
                  >
                    <HackathonListCard
                      key={hackathon.id}
                      hackathon={hackathon}
                    />
                  </Link>
                ))
              ) : (
                <span>Нет объявленных хакатонов</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HackathonsPage
