import { useEffect } from 'react'
import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { userApi } from '../../api'

export const useInitAvatar = (setAvatarSrc: (src: string | null) => void) => {
  useEffect(() => {
    const initAvatar = async () => {
      const user = cookiesApi.getUser()
      if (user?.id) {
        const avatarPath = userApi.getAvatar(user.id)
        const pathIsValid = await userApi.isAvatarExists(avatarPath)

        if (pathIsValid) {
          setAvatarSrc(`${avatarPath}?t=${Date.now()}`)
        }
      }
    }

    initAvatar()
  }, [setAvatarSrc])
}
