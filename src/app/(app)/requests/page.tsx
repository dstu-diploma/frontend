'use client'

import { hackathonApi } from '@/features/hackathons/api'
import { useRequests } from '@/features/requests/hooks/useRequests'
import { useRequestsListSocket } from '@/features/requests/hooks/useRequestsListSocket'
import {
  CreateRequestFormData,
  createRequestFormSchema,
} from '@/features/requests/model/schemas'
import CreateRequestFormContent from '@/features/requests/ui/modal-form-contents'
import RequestList from '@/features/requests/ui/RequestList'
import { ActionModal } from '@/features/team'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import EntityLoading from '@/shared/ui/custom/fallback/EntityLoading'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import { useForm } from 'react-hook-form'
import styles from './requests.module.scss'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

const MyRequestsPage = () => {
  const { data: hackathonsList } = hackathonApi.useGetHackathonList()
  const {
    openedRequests,
    closedRequests,
    isRequestsLoading,
    handleCreateRequest,
    isCreatingRequest,
  } = useRequests()

  const createRequestForm = useForm<CreateRequestFormData>({
    resolver: zodResolver(createRequestFormSchema),
    defaultValues: {
      hackathon_id: 0,
      message: '',
      subject: '',
    },
  })

  useRequestsListSocket()

  const onSubmit = (data: CreateRequestFormData) => {
    handleCreateRequest(data)
  }

  const user = cookiesApi.getUser()
  const canCreateRequest =
    (user && user.role === 'user') || user.role === 'judge'

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const requestsPageStyles = clsx(styles.requestsContainer, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <div className={requestsPageStyles}>
      <h1 className={styles.requestsTitle}>
        {user.role !== 'user' ? 'Все' : 'Мои'} обращения
      </h1>
      <div className={styles.requestsContent}>
        {canCreateRequest && (
          <Toolbar className={styles.requestsToolbar}>
            <ActionModal
              title='Создание обращения'
              trigger={
                <Button className={styles.createRequestButton}>
                  Создать обращение
                </Button>
              }
              submitButtonText='Создать'
              onSave={createRequestForm.handleSubmit(onSubmit)}
              isSubmitting={isCreatingRequest}
            >
              <CreateRequestFormContent
                hackathonList={hackathonsList}
                form={createRequestForm}
              />
            </ActionModal>
          </Toolbar>
        )}
        <div className={styles.requestsListContainer}>
          <h3>Список обращений</h3>
          {isRequestsLoading ? (
            <EntityLoading />
          ) : (
            <Tabs defaultValue='opened' className={styles.tabs}>
              <TabsList className={styles.tabsList}>
                <TabsTrigger className={styles.tabsTrigger} value='opened'>
                  Активные
                </TabsTrigger>
                <TabsTrigger className={styles.tabsTrigger} value='closed'>
                  Закрытые
                </TabsTrigger>
              </TabsList>
              <TabsContent className={styles.tabContent} value='opened'>
                <RequestList requests={openedRequests} type='opened' />
              </TabsContent>
              <TabsContent className={styles.tabContent} value='closed'>
                <RequestList requests={closedRequests} type='closed' />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyRequestsPage
