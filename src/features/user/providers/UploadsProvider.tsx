import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { cookiesApi } from '@/shared/lib/helpers/cookies'

interface Upload {
  type: 'avatar' | 'cover'
  url: string
  [key: string]: any
}

interface UploadsContextType {
  updateUploads: (type: 'avatar' | 'cover', data: any | null) => void
  getUploads: () => Upload[]
}

const UploadsContext = createContext<UploadsContextType | null>(null)

export const UploadsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [uploads, setUploads] = useState<Upload[]>([])

  // Инициализация состояния при монтировании
  useEffect(() => {
    const user = cookiesApi.getUser()
    if (user?.uploads) {
      setUploads(user.uploads)
    }
  }, [])

  const updateUploads = useCallback(
    (type: 'avatar' | 'cover', data: any | null) => {
      setUploads(prevUploads => {
        // Создаем новый массив, исключая загрузку указанного типа
        const filteredUploads = prevUploads.filter(
          upload => upload.type !== type,
        )

        // Если есть новые данные, добавляем их в массив
        const newUploads = data
          ? [...filteredUploads, { ...data, type }]
          : filteredUploads

        // Обновляем куки с новым состоянием
        const user = cookiesApi.getUser()
        if (user) {
          cookiesApi.setUserCookie({
            ...user,
            uploads: newUploads,
          })
        }

        return newUploads
      })
    },
    [],
  )

  const getUploads = useCallback(() => {
    return uploads
  }, [uploads])

  return (
    <UploadsContext.Provider value={{ updateUploads, getUploads }}>
      {children}
    </UploadsContext.Provider>
  )
}

export const useUploads = () => {
  const context = useContext(UploadsContext)
  if (!context) {
    throw new Error('useUploads must be used within UploadsProvider')
  }
  return context
}
