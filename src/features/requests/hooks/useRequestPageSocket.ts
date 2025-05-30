import { useEffect } from 'react'
import {
  wsService,
  WebSocketMessage,
} from '@/shared/lib/services/websocket.service'
import { useQueryClient } from '@tanstack/react-query'

// Хук для страницы конкретного обращения
export const useRequestPageSocket = (requestId: number) => {
  const queryClient = useQueryClient()

  // Обновление текущего обращения
  const reloadRequest = () => {
    console.log('Reloading request:', requestId)
    queryClient.invalidateQueries({ queryKey: ['request', requestId] })
  }

  // Обработка веб-сокет события для конкретного обращения
  function handleSocketMessage(response: WebSocketMessage) {
    console.log('Received WebSocket message in useRequestPageSocket:', {
      action: response.action,
      data: response.data,
      requestId,
    })

    switch (response.action) {
      case 'message':
        if (response.data.id === requestId) {
          console.log('Message for current request, reloading...')
          reloadRequest()
        }
        break
      case 'request_closed':
        if (response.data.id === requestId) {
          console.log('Request closed, reloading...')
          reloadRequest()
        }
        break
      default:
        console.log('Unhandled WebSocket action:', response.action)
    }
  }

  useEffect(() => {
    console.log('Subscribing to WebSocket messages for request:', requestId)
    wsService.subscribe(handleSocketMessage)
    return () => {
      console.log(
        'Unsubscribing from WebSocket messages for request:',
        requestId,
      )
      wsService.unsubscribe(handleSocketMessage)
    }
  }, [requestId])
}
