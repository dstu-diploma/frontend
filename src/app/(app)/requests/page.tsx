'use client'

import Link from 'next/link'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import styles from './requests.module.scss'
import { ActionModal } from '@/shared/ui/custom/ActionModal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateRequestFormData,
  createRequestFormSchema,
} from '@/features/requests/model/schemas'
import { useRequests } from '@/features/requests/hooks/useRequests'
import CreateRequestFormContent from '@/features/requests/ui/modal-form-contents'
import RequestCard from '@/features/requests/ui/RequestCard'

const MyRequestsPage = () => {
  const { requests, handleCreateRequest } = useRequests()

  const createRequestForm = useForm<CreateRequestFormData>({
    resolver: zodResolver(createRequestFormSchema),
    defaultValues: {
      message: '',
      subject: '',
    },
  })

  return (
    <div className={styles.requestsContainer}>
      <h1 className={styles.requestsTitle}>Мои обращения</h1>
      <div className={styles.requestsContent}>
        <Toolbar>
          <ActionModal
            title='Создание обращение'
            trigger={<Button>Создать обращение</Button>}
            submitButtonText='Создать'
            onSave={e => {
              e.preventDefault()
              createRequestForm.handleSubmit(handleCreateRequest)(e)
            }}
          >
            <CreateRequestFormContent form={createRequestForm} />
          </ActionModal>
        </Toolbar>
        <div className={styles.requestsListContainer}>
          <h3>Список обращений</h3>
          <div className={styles.requestsList}>
            {requests.length > 0 ? (
              requests.map(request => (
                <Link
                  className={styles.requestLink}
                  href={`/requests/${request.id}`}
                  key={request.id}
                >
                  <RequestCard request={request} />
                </Link>
              ))
            ) : (
              <span>Нет созданных обращений</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyRequestsPage
