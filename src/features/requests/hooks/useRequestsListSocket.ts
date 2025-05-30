import { useEffect } from 'react'
import {
  wsService,
  WebSocketMessage,
} from '@/shared/lib/services/websocket.service'
import { useQueryClient } from '@tanstack/react-query'

// Хук для страницы со списка обращений
export const useRequestsListSocket = () => {
  const queryClient = useQueryClient()

  // Обновление списка обращений
  const reloadRequests = () => {
    console.log('Reloading requests list')
    queryClient.invalidateQueries({ queryKey: ['requests'] })
  }

  // Обработка веб-сокет события для списка обращений
  function handleWebSocketMessage(response: WebSocketMessage) {
    console.log('Received WebSocket message in useRequestsListSocket:', {
      action: response.action,
      data: response.data,
    })

    switch (response.action) {
      case 'request_opened':
        console.log('New request opened, reloading list...')
        reloadRequests()
        break
      case 'request_closed':
        console.log('Request closed, reloading list...')
        reloadRequests()
        break
      default:
        console.log('Unhandled WebSocket action:', response.action)
    }
  }

  useEffect(() => {
    console.log('Subscribing to WebSocket messages for requests list')
    wsService.subscribe(handleWebSocketMessage)
    return () => {
      console.log('Unsubscribing from WebSocket messages for requests list')
      wsService.unsubscribe(handleWebSocketMessage)
    }
  }, [])
}
