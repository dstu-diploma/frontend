import { useEffect } from 'react'
import { wsService } from '@/shared/lib/services/websocket.service'
import { useQueryClient } from '@tanstack/react-query'
import { WebSocketMessage } from '@/shared/lib/services/websocket.service'

// Хук для страницы со списка обращений
export const useRequestsListSocket = () => {
  const queryClient = useQueryClient()

  // Обновление списка обращений
  const reloadRequests = () => {
    queryClient.invalidateQueries({ queryKey: ['requests'] })
  }

  // Обработка веб-сокет события для списка обращений
  function handleWebSocketMessage(response: WebSocketMessage) {
    switch (response.action) {
      case 'request_opened':
        reloadRequests()
        break
      case 'request_closed':
        reloadRequests()
        break
    }
  }

  useEffect(() => {
    wsService.subscribe(handleWebSocketMessage)
    return () => wsService.unsubscribe(handleWebSocketMessage)
  }, [])
}
