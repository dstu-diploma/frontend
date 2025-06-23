import React from 'react'
import clsx from 'clsx'
import MDEditor from '@uiw/react-md-editor'
import Toolbar from '@/shared/ui/custom/misc/Toolbar/Toolbar'
import { Button } from '@/shared/ui/shadcn/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/shadcn/form'
import { Hackathon } from '@/features/hackathons/model/types'
import { DescriptionFormData } from '@/features/hackathons/model/schemas'
import { UseFormReturn } from 'react-hook-form'
import { isAdmin, isAdminOrOrganizer } from '@/shared/lib/helpers/roleMapping'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import styles from './HackathonPageDescription.module.scss'
import CustomMDEditor from '@/shared/ui/custom/misc/CustomMDEditor/CustomMDEditor'
import { useScreenSize } from '@/providers/ScreenSizeProvider'

interface HackathonPageDescriptionProps {
  hackathonInfo: Hackathon | undefined
  form: UseFormReturn<DescriptionFormData>
  onSave: (data: DescriptionFormData) => void
}

const HackathonPageDescription = ({
  hackathonInfo,
  form,
  onSave,
}: HackathonPageDescriptionProps) => {
  const isPrivileged = isAdminOrOrganizer()

  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const hackathonDescriptionStyles = clsx(styles.hackathonDescription, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <Toolbar className={hackathonDescriptionStyles}>
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
                      <CustomMDEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
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
              draggable={false}
            />
          </div>
        )}
      </div>
    </Toolbar>
  )
}

export default HackathonPageDescription
