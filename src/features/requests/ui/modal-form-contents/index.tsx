import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CreateRequestBody } from '@/features/requests/model/types'
import { Label } from '@/shared/ui/shadcn/label'
import { Input } from '@/shared/ui/shadcn/input'
import styles from './CreateRequestFormContent.module.scss'
import { Hackathon } from '@/features/hackathons/model/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select'

interface CreateRequestFormContentProps {
  form: UseFormReturn<CreateRequestBody>
  hackathonList: Hackathon[] | undefined
}

const CreateRequestFormContent = ({
  form,
  hackathonList,
}: CreateRequestFormContentProps) => {
  return (
    <div className={styles.requestForm}>
      <div className={styles.requestFormItem}>
        <Label htmlFor='hackathon_id'>Хакатон</Label>
        <Select
          value={form.watch('hackathon_id')?.toString()}
          onValueChange={value => {
            form.setValue('hackathon_id', Number(value))
          }}
        >
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue
              placeholder='Выберите хакатон'
              className={styles.selectValue}
            />
          </SelectTrigger>
          <SelectContent
            position='popper'
            sideOffset={4}
            className={styles.selectContent}
            align='start'
            side='bottom'
          >
            {hackathonList?.map(hackathon => {
              return (
                <SelectItem
                  key={hackathon.id}
                  value={hackathon.id.toString()}
                  className={styles.selectItem}
                >
                  {hackathon.name}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
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
