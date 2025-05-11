import { useEffect, useState } from 'react'
import { useToast } from '@/shared/hooks/use-toast'
import { websocketService } from '@/shared/lib/services/websocket'
import { WSMessage } from '../model/websocket'

export const useChatSocket = (requestId: number) => {
  const { toast } = useToast()
  const [messages, setMessages] = useState<WSMessage['data'][]>([])

  useEffect(() => {
    const unsubscribe = websocketService.subscribe((message: WSMessage) => {
      if (
        message.action === 'message' &&
        message.data.request_id === requestId
      ) {
        setMessages(prevMessages => [...prevMessages, message.data])
      }
    })

    if (!websocketService.isConnected()) {
      websocketService.connect()
    }

    return () => {
      console.log('Cleaning up chat subscription for request:', requestId)
      unsubscribe()
    }
  }, [requestId])

  const sendMessage = (content: string) => {
    const success = websocketService.sendMessage(content, requestId)

    if (!success) {
      toast({
        title: 'Ошибка отправки',
        description: 'Соединение с чатом потеряно',
        variant: 'destructive',
      })
    }
  }

  return {
    sendMessage,
    messages,
  }
}
