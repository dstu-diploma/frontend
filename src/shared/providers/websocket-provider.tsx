import { useEffect } from 'react'
import { websocketService } from '@/shared/lib/services/websocket'

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    websocketService.connect()
    return () => {
      websocketService.disconnect()
    }
  }, [])

  return <>{children}</>
}
