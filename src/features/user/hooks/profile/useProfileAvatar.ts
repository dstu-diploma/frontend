import { cookiesApi } from "@/shared/lib/helpers/cookies";
import { useState, useRef, useEffect } from "react";
import { profileApi } from "../../api/profileApi";
import { useToast } from "@/shared/hooks/use-toast";

export const useProfileAvatar = () => {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [timestamp, setTimestamp] = useState<number>(Date.now())

  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const { toast, dismiss } = useToast()

  const { mutate: setOrUpdateAvatar } = profileApi.setOrUpdateAvatar()
  const { mutate: deleteAvatar } = profileApi.deleteAvatar()

  useEffect(() => {
    const prepareAvatar = async () => {
      const user = cookiesApi.getUser()
      const avatarPath = profileApi.getAvatar(user.userId)
      const pathIsValid = await profileApi.isAvatarExists(avatarPath)

      if (pathIsValid) {
        setAvatarSrc(`${avatarPath}?t=${timestamp}`)
      }
    }
    prepareAvatar()
  }, [timestamp])

  const refreshAvatar = () => {
    setTimestamp(Date.now())
  }

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const newObjectUrl = URL.createObjectURL(file);
    objectUrlRef.current = newObjectUrl;
    setAvatarSrc(newObjectUrl);
    setMenuOpen(false);

    setOrUpdateAvatar(file, {
      onSuccess: () => {
        dismiss()
        toast({ 
          variant: 'defaultBlueSuccess',
          description: 'Аватар успешно изменен!'
        })
      },
      onError: (error) => {
        const title = error.message.includes('403') ? 'Обновите сессию' : undefined
        dismiss()
        toast({ 
          title: title,
          variant: 'destructive',
          description: 'Ошибка при изменении аватара'
        })
        console.error(`${error.message}`)
      }
    })
  };

  const handleDeleteAvatar = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setAvatarSrc(null);
    setMenuOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    deleteAvatar(undefined, {
      onSuccess: () => {
        setMenuOpen(false);
        dismiss()
        toast({
          variant: 'defaultBlueSuccess',
          description: 'Аватар успешно удалён!'
        });
      },
      onError: (error) => {
        const title = error.message.includes('403') ? 'Обновите сессию' : undefined
        dismiss()
        toast({
          title: title,
          variant: 'destructive',
          description: 'Ошибка при удалении аватара'
        })
      }
    });
  };

  return {
    menuOpen,
    setMenuOpen,
    fileInputRef,
    avatarSrc, 
    setAvatarSrc,
    handleAvatarChange,
    handleDeleteAvatar
  }
}