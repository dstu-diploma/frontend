'use client'

import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import styles from './requests.module.scss'
import { ActionModal } from '@/shared/ui/custom/modals/ActionModal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateRequestFormData,
  createRequestFormSchema,
} from '@/features/requests/model/schemas'
import { useRequests } from '@/features/requests/hooks/useRequests'
import CreateRequestFormContent from '@/features/requests/ui/modal-form-contents'
import EntityLoading from '@/shared/ui/custom/fallback/EntityLoading'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import RequestList from '@/features/requests/ui/RequestList'
import { useRequestsListSocket } from '@/features/requests/hooks/useRequestsListSocket'
import { hackathonApi } from '@/features/hackathons/api'

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

  return (
    <div className={styles.requestsContainer}>
      <h1 className={styles.requestsTitle}>Мои обращения</h1>
      <div className={styles.requestsContent}>
        <Toolbar>
          <ActionModal
            title='Создание обращения'
            trigger={<Button>Создать обращение</Button>}
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
