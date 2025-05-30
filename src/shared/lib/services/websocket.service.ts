import {
  CHAT_SERVICE_API_URL,
  USER_SERVICE_API_URL,
} from '@/shared/api/basePaths'
import Cookies from 'js-cookie'
import axiosInstance, { API_URL } from '@/shared/api/axios'
import { type Request } from '@/features/requests/model/types'
import { notificationService } from './notification.service'
import axios from 'axios'
import {
  WSActions,
  WSCloseRequestData,
  WSMessageData,
  WSOpenRequestData,
} from '@/features/requests/model/websocket'

export interface WebSocketMessage {
  action: WSActions
  data: WSMessageData | WSCloseRequestData | WSOpenRequestData
}

type MessageCallback = (data: WebSocketMessage) => void

class WebSocketService {
  private static instance: WebSocketService
  private ws: WebSocket | null = null
  private messageCallbacks: MessageCallback[] = []
  private apiKey: string
  private refreshToken: string

  private constructor(apiKey: string, refreshToken: string) {
    if (!apiKey || !refreshToken) {
      throw new Error('API key and refresh token are required')
    }
    this.apiKey = apiKey
    this.refreshToken = refreshToken
  }

  // Получение инстанса соединения
  public static getInstance(
    apiKey: string,
    refreshToken: string,
  ): WebSocketService {
    if (!apiKey || !refreshToken) {
      throw new Error('API key and refresh token are required')
    }

    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(apiKey, refreshToken)
    } else {
      // Обновляем токены в существующем инстансе
      WebSocketService.instance.apiKey = apiKey
      WebSocketService.instance.refreshToken = refreshToken
    }
    return WebSocketService.instance
  }

  // Обновление ключа API к открытию соединения
  private async refreshApiToken(): Promise<void> {
    const response = await axios.post(
      `${API_URL}/user/access_token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.refreshToken}`,
        },
      },
    )
    if (!response.data.access_token) {
      const username = 'nikita@mail.ru'
      const password = '1122334455'
      const formData = new URLSearchParams()
      formData.append('username', username)
      formData.append('password', password)

      const response = await axiosInstance.post(
        `${USER_SERVICE_API_URL}/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      return response.data
    }
    this.apiKey = response.data.access_token
  }

  // Слушатель события получения сообщения с сокета
  private async onMessage(event: MessageEvent<string>): Promise<void> {
    try {
      const data = JSON.parse(event.data) as WebSocketMessage

      // Глобальная обработка событий
      switch (data.action) {
        case 'request_opened':
          const newRequest = await axiosInstance.get<Request>(
            `${CHAT_SERVICE_API_URL}/${data.data.id}`,
          )
          notificationService.success(
            `Добавлено новое обращение: «${newRequest.data.subject}»`,
          )
          break
        case 'message':
          const currentRequest = await axiosInstance.get<Request>(
            `${CHAT_SERVICE_API_URL}/${data.data.request_id}`,
          )
          notificationService.success(
            `Пришло новое сообщение в обращение: «${currentRequest.data.subject}»`,
          )
          break
        case 'request_closed':
          const closedRequest = await axiosInstance.get<Request>(
            `${CHAT_SERVICE_API_URL}/${data.data.id}`,
          )
          notificationService.success(
            `Обращение «${closedRequest.data.subject}» закрыто`,
          )
          break
      }

      // Вызываем колбэки подписчиков
      this.messageCallbacks.forEach(callback => callback(data))
    } catch (e) {
      console.error('Invalid JSON from websocket', e)
    }
  }

  // Слушатель открытия соединения в сокете
  private onOpen(): void {
    console.log('WebSocket connected')
    this.ws?.send(this.apiKey)
  }

  // Слушатель закрытия соединения
  private async onClose(): Promise<void> {
    console.log('WebSocket disconnected')
    console.log('Updating API token')
    await this.refreshApiToken()
    this.ws = null
  }

  // Слушатель ошибки соединения
  private onError(e: Event): void {
    console.log('WebSocket error', e)
  }

  // Подключение к чат-сервису
  public connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected')
      return
    }

    this.ws = new WebSocket('http://localhost/chat/ws')

    this.ws.onopen = this.onOpen.bind(this)
    this.ws.onmessage = this.onMessage.bind(this)
    this.ws.onclose = this.onClose.bind(this)
    this.ws.onerror = this.onError.bind(this)
  }

  // Подписка на веб-сокет
  public subscribe(callback: MessageCallback): void {
    this.messageCallbacks.push(callback)
  }

  // Отписка от сокета
  public unsubscribe(callback: MessageCallback): void {
    this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback)
  }

  // Сброс соединения
  public disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  // Существует ли открытое соединение
  public isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}

// Создаем экземпляр сервиса только если есть токены
export let wsService: WebSocketService | null = null

const access_token = Cookies.get('access_token')
const refresh_token = Cookies.get('refresh_token')

if (access_token && refresh_token) {
  try {
    wsService = WebSocketService.getInstance(
      `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NDg2MzE5Mjl9.J1qAW4PJb47xM3LyStRZp9ceGXakujsRkPG-wRnErJ4`,
      refresh_token,
    )
    wsService.connect()
  } catch (error) {
    console.error('Failed to initialize WebSocket service:', error)
  }
} else {
  console.log('No tokens found in cookies')
}
