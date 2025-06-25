// Основной базовый URL для всех API
export const API_URL = 'https://api.pakosti.online'

// Базовые URL для всех сервисов
export const USER_SERVICE_API_URL = API_URL + '/user'
export const TEAM_SERVICE_API_URL = API_URL + '/team'
export const HACKATHON_SERVICE_API_URL = API_URL + '/hackathon'
export const CHAT_SERVICE_API_URL = API_URL + '/chat'

// Базовые URL для админки
export const USER_SERVICE_ADMIN_API_URL = USER_SERVICE_API_URL + '/admin'
export const TEAM_SERVICE_ADMIN_API_URL = TEAM_SERVICE_API_URL + '/admin'
export const HACKATHON_SERVICE_ADMIN_API_URL =
  HACKATHON_SERVICE_API_URL + '/admin'

// Базовый путь для управления хакатонами
export const HACKATHON_SERVICE_MANAGE_API_URL =
  HACKATHON_SERVICE_API_URL + '/manage'

// Базовый путь для управления хакатоновскими командами
export const TEAM_SERVICE_HACKATHON_TEAM_API_URL =
  TEAM_SERVICE_API_URL + '/hackathon'
