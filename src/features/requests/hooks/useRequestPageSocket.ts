import { useEffect } from 'react'
import { wsService } from '@/shared/lib/services/websocket.service'
import { useQueryClient } from '@tanstack/react-query'

// Хук для страницы конкретного обращения
export const useRequestPageSocket = (requestId: number) => {
  const queryClient = useQueryClient()

  // Обновление текущего обращения
  const reloadRequest = () => {
    queryClient.invalidateQueries({ queryKey: ['request', requestId] })
  }

  // Обработка веб-сокет события для конкретного обращения
  function handleSocketMessage(response: { action: string; data: any }) {
    switch (response.action) {
      case 'message':
        if (response.data.id === requestId) {
          reloadRequest()
        }
        break
      case 'request_closed':
        if (response.data.id === requestId) {
          reloadRequest()
        }
        break
    }
  }

  useEffect(() => {
    wsService.subscribe(handleSocketMessage)
    return () => wsService.unsubscribe(handleSocketMessage)
  }, [requestId])
}
