import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CreateRequestFormInputData } from '@/features/requests/model/schemas'
import { Label } from '@/shared/ui/shadcn/label'
import { Input } from '@/shared/ui/shadcn/input'
import styles from './CreateRequestFormContent.module.scss'
import { Hackathon } from '@/features/hackathons/model/types'
import TabSelect from '@/features/admin/ui/AdminTabFilter/TabSelect/TabSelect'

interface CreateRequestFormContentProps {
  form: UseFormReturn<CreateRequestFormInputData>
  hackathonList: Hackathon[] | undefined
}

const CreateRequestFormContent = ({
  form,
  hackathonList,
}: CreateRequestFormContentProps) => {
  const options =
    hackathonList?.map(hackathon => ({
      value: hackathon.id.toString(),
      label: hackathon.name,
    })) || []

  return (
    <div className={styles.requestForm}>
      <div className={styles.requestFormItem}>
        <Label htmlFor='hackathon_id'>Хакатон</Label>
        <TabSelect
          key={form.watch('hackathon_id')?.toString() || 'default'}
          selectedValue={form.watch('hackathon_id')?.toString() || undefined}
          handleSelect={value => {
            if (value) {
              form.setValue('hackathon_id', Number(value))
            } else {
              form.setValue('hackathon_id', undefined)
            }
          }}
          placeholder='Выберите хакатон'
          options={options}
          position='popper'
          sideOffset={4}
          align='start'
          side='bottom'
          triggerClassName={styles.hackathonChooseSelectTrigger}
        />
      </div>
      <div className={styles.requestFormItem}>
        <Label htmlFor='subject'>Тема</Label>
        <Input
          id='subject'
          {...form.register('subject')}
          placeholder='Введите тему обращения'
        />
      </div>
      <div className={styles.requestFormItem}>
        <Label htmlFor='message'>Сообщение</Label>
        <Input
          id='message'
          {...form.register('message')}
          placeholder='Введите сообщение'
        />
      </div>
    </div>
  )
}

export default CreateRequestFormContent
