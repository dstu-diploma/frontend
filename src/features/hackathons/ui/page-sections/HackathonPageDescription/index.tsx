import React from 'react'
import clsx from 'clsx'
import MDEditor from '@uiw/react-md-editor'
import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/shadcn/form'
import { DescriptionFormData } from '@/features/hackathons/model/schemas'
import { UseFormReturn } from 'react-hook-form'
import { Hackathon } from '../../../model/types'
import { isPrivilegedRole } from '@/shared/lib/helpers/roleMapping'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import styles from './HackathonPageDescription.module.scss'

interface HackathonPageDescriptionProps {
  hackathonInfo: Hackathon | null
  form: UseFormReturn<DescriptionFormData>
  onSave: (data: DescriptionFormData) => void
}

const HackathonPageDescription = ({
  hackathonInfo,
  form,
  onSave,
}: HackathonPageDescriptionProps) => {
  const isPrivileged = isPrivilegedRole()

  return (
    <Toolbar className={styles.hackathonDescription}>
      <div
        className={clsx(
          styles.hackathonSectionContainer,
          styles.hackathonDescriptionContainer,
        )}
      >
        <h4>Описание хакатона</h4>
        {isPrivileged ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className={styles.form}>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className={styles.description}>
                        <MDEditor
                          value={field.value}
                          onChange={field.onChange}
                          height={400}
                          preview='live'
                          highlightEnable={true}
                          enableScroll={true}
                          visiableDragbar={true}
                          minHeight={200}
                          maxHeight={800}
                          tabSize={2}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className={styles.saveButton}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? 'Сохранение...'
                  : 'Сохранить описание'}
              </Button>
            </form>
          </Form>
        ) : (
          <div className={styles.description}>
            <MDEditor
              value={hackathonInfo?.description || ''}
              preview='preview'
              height={400}
              hideToolbar={true}
            />
          </div>
        )}
      </div>
    </Toolbar>
  )
}

export default HackathonPageDescription
