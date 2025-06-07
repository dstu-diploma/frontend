type NotificationCallback = {
  success: (message: string) => void
  successRaw: (title: string, description: string) => void
  error: (error: unknown, message: string) => void
  errorRaw: (title: string, description: string) => void
}

class NotificationService {
  private static instance: NotificationService
  private listeners: NotificationCallback[] = []

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  public subscribe(callback: NotificationCallback): void {
    this.listeners.push(callback)
  }

  public unsubscribe(callback: NotificationCallback): void {
    this.listeners = this.listeners.filter(cb => cb !== callback)
  }

  public success(message: string): void {
    this.listeners.forEach(callback => callback.success(message))
  }

  public successRaw(title: string, description: string): void {
    this.listeners.forEach(callback => callback.successRaw(title, description))
  }

  public error(error: unknown, message: string): void {
    this.listeners.forEach(callback => callback.error(error, message))
  }

  public errorRaw(title: string, description: string): void {
    this.listeners.forEach(callback => callback.errorRaw(title, description))
  }
}

export const notificationService = NotificationService.getInstance()
