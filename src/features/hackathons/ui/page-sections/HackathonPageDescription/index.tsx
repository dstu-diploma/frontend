import Toolbar from '@/shared/ui/custom/Toolbar/Toolbar'
import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { Hackathon } from '../../../model/types'
import { CustomMDEditor } from '@/shared/ui/custom/MDEditor'
import { Button } from '@/shared/ui/shadcn/button'
import { isPrivilegedRole } from '@/shared/lib/helpers/roleMapping'
import styles from './HackathonPageDescription.module.scss'

interface HackathonPageDescriptionProps {
  hackathonInfo: Hackathon | null
}

const HackathonPageDescription = ({
  hackathonInfo,
}: HackathonPageDescriptionProps) => {
  const [description, setDescription] = useState(
    hackathonInfo?.description || '',
  )

  useEffect(() => {
    if (hackathonInfo?.description) {
      setDescription(hackathonInfo.description)
    }
  }, [hackathonInfo?.description])

  const handleUpdateDescription = () => {
    console.log(description)
  }

  return (
    <Toolbar className={styles.hackathonDescription}>
      <div
        className={clsx(
          styles.hackathonSectionContainer,
          styles.hackathonDescriptionContainer,
        )}
      >
        <h4>Описание хакатона</h4>
        {isPrivilegedRole() ? (
          <CustomMDEditor
            value={description}
            onChange={setDescription}
            placeholder='Введите описание...'
            name='hackathonDescription'
            height={300}
            className={styles.hackathonDescriptionEditor}
          />
        ) : (
          <p>{description}</p>
        )}
        {isPrivilegedRole() && (
          <Button
            type='submit'
            onClick={handleUpdateDescription}
            className={styles.saveButton}
          >
            Сохранить описание
          </Button>
        )}
      </div>
    </Toolbar>
  )
}
export default HackathonPageDescription
