import {
  WSOpenRequest,
  WSMessage,
  WSCloseRequest,
} from '@/features/requests/model/websocket'
import { cookiesApi } from '@/shared/lib/helpers/cookies'

type MessageHandler = (
  message: WSOpenRequest | WSMessage | WSCloseRequest,
) => void

class WebSocketService {
  private static instance: WebSocketService
  private socket: WebSocket | null = null
  private isConnecting: boolean = false
  private messageHandlers: Set<MessageHandler> = new Set()
  private reconnectTimeout: NodeJS.Timeout | null = null
  private isAuthenticated: boolean = false
  private messageQueue: { content: string; requestId: number }[] = []
  private reconnectAttempts: number = 0
  private readonly MAX_RECONNECT_ATTEMPTS = 5
  private connectionPromise: Promise<void> | null = null

  private constructor() {}

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  private async waitForConnection(): Promise<void> {
    if (this.socket?.readyState === WebSocket.OPEN && this.isAuthenticated) {
      return
    }

    if (this.connectionPromise) {
      return this.connectionPromise
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Connection timeout'))
      }, 5000)

      const checkConnection = () => {
        if (
          this.socket?.readyState === WebSocket.OPEN &&
          this.isAuthenticated
        ) {
          clearTimeout(timeout)
          resolve()
        } else if (this.socket?.readyState === WebSocket.CLOSED) {
          clearTimeout(timeout)
          reject(new Error('Connection closed'))
        } else {
          setTimeout(checkConnection, 100)
        }
      }

      checkConnection()
    })

    return this.connectionPromise
  }

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN && this.isAuthenticated) {
      console.log('WebSocket is already connected and authenticated')
      return
    }

    if (this.isConnecting) {
      console.log('WebSocket connection is already in progress')
      return
    }

    const accessToken = cookiesApi.getAccessToken()
    if (!accessToken) {
      console.log('No access token available')
      return
    }

    this.isConnecting = true
    this.connectionPromise = null
    const wsUrl = `ws://localhost/chat/ws`
    console.log('Creating WebSocket connection to:', wsUrl)

    try {
      if (this.socket) {
        console.log('Closing existing connection')
        this.socket.close()
        this.socket = null
        this.isAuthenticated = false
      }

      this.socket = new WebSocket(wsUrl)

      this.socket.onopen = () => {
        console.log('WebSocket connection established')
        this.isConnecting = false
        this.reconnectAttempts = 0

        // Отправляем только токен как текст
        console.log('Sending access token')
        this.socket?.send(accessToken)
        // Считаем соединение аутентифицированным после отправки токена
        this.isAuthenticated = true
        this.processMessageQueue()
      }

      this.socket.onmessage = event => {
        console.log('Received WebSocket message:', event.data)
        try {
          const message = JSON.parse(event.data)
          console.log('Parsed message:', message)

          // Проверяем тип сообщения и уведомляем подписчиков
          if (this.isValidMessage(message)) {
            this.messageHandlers.forEach(handler => handler(message))
          } else {
            console.warn('Received invalid message format:', message)
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      this.socket.onerror = error => {
        console.error('WebSocket error:', {
          error,
          readyState: this.socket?.readyState,
          url: this.socket?.url,
          protocol: this.socket?.protocol,
          extensions: this.socket?.extensions,
          bufferedAmount: this.socket?.bufferedAmount,
        })
        this.isConnecting = false
        this.isAuthenticated = false
        this.connectionPromise = null
      }

      this.socket.onclose = event => {
        console.log('WebSocket connection closed:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
          wasAuthenticated: this.isAuthenticated,
          readyState: this.socket?.readyState,
          reconnectAttempts: this.reconnectAttempts,
        })

        this.isConnecting = false
        this.isAuthenticated = false
        this.connectionPromise = null

        if (
          event.code !== 1000 &&
          !event.wasClean &&
          !this.isAuthenticated &&
          this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS
        ) {
          this.reconnectAttempts++
          console.log(
            `Scheduling reconnection (attempt ${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})...`,
          )
          this.reconnectTimeout = setTimeout(() => {
            console.log('Attempting reconnection...')
            this.connect()
          }, 3000)
        } else if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
          console.error('Max reconnection attempts reached')
        }
      }
    } catch (error) {
      console.error('Error creating WebSocket:', error)
      this.isConnecting = false
      this.isAuthenticated = false
      this.connectionPromise = null
    }
  }

  private isValidMessage(
    message: any,
  ): message is WSOpenRequest | WSMessage | WSCloseRequest {
    if (
      !message ||
      typeof message !== 'object' ||
      !message.action ||
      !message.data
    ) {
      return false
    }

    switch (message.action) {
      case 'request_opened':
        return this.isValidRequestOpened(message)
      case 'message':
        return this.isValidMessageData(message)
      case 'request_closed':
        return this.isValidRequestClosed(message)
      default:
        return false
    }
  }

  private isValidRequestOpened(message: any): message is WSOpenRequest {
    const data = message.data
    return (
      typeof data.id === 'number' &&
      typeof data.author_user_id === 'number' &&
      typeof data.subject === 'string' &&
      typeof data.create_date === 'string' &&
      (data.closed_by_user_id === null ||
        typeof data.closed_by_user_id === 'number')
    )
  }

  private isValidMessageData(message: any): message is WSMessage {
    const data = message.data
    return (
      typeof data.id === 'number' &&
      typeof data.user_id === 'number' &&
      typeof data.message === 'string' &&
      typeof data.request_id === 'number' &&
      typeof data.send_date === 'string'
    )
  }

  private isValidRequestClosed(message: any): message is WSCloseRequest {
    const data = message.data
    return (
      typeof data.id === 'number' &&
      typeof data.author_user_id === 'number' &&
      typeof data.subject === 'string' &&
      typeof data.create_date === 'string' &&
      typeof data.closed_by_user_id === 'number'
    )
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
    }
    if (this.socket) {
      this.socket.close(1000, 'Manual disconnect')
      this.socket = null
    }
    this.isConnecting = false
    this.isAuthenticated = false
    this.messageQueue = []
  }

  private processMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      if (message) {
        this.sendMessage(message.content, message.requestId)
      }
    }
  }

  async sendMessage(content: string, requestId: number): Promise<boolean> {
    try {
      await this.waitForConnection()

      if (this.socket?.readyState === WebSocket.OPEN && this.isAuthenticated) {
        const message = JSON.stringify({
          action: 'message',
          data: {
            id: 5,
            author_user_id: 35,
            subject: 'ЪХУЙ',
            create_date: '2025-05-10T14:39:42.161239Z',
            closed_by_user_id: 35,
          },
        })
        console.log('Sending message:', message)``
        this.socket.send(message)
        return true
      } else {
        console.log('WebSocket not ready, queueing message')
        this.messageQueue.push({ content, requestId })
        if (!this.isConnecting) {
          this.connect()
        }
        return false
      }
    } catch (error) {
      console.error('Error sending message:', error)
      this.messageQueue.push({ content, requestId })
      if (!this.isConnecting) {
        this.connect()
      }
      return false
    }
  }

  subscribe(handler: MessageHandler) {
    this.messageHandlers.add(handler)
    return () => {
      this.messageHandlers.delete(handler)
    }
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN && this.isAuthenticated
  }
}

export const websocketService = WebSocketService.getInstance()
