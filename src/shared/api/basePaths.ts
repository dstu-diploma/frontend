// Основной базовый URL для всех API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

// Базовые URL для всех сервисов
export const USER_SERVICE_API_URL = API_URL ? API_URL + '/user' : 'http://localhost/user';
export const TEAM_SERVICE_API_URL = API_URL ? API_URL + '/team' : 'http://localhost/team';
export const HACKATHON_SERVICE_API_URL = API_URL ? API_URL + '/hackathon' : 'http://localhost/hackathon';

// Базовые URL для админки
export const USER_SERVICE_ADMIN_API_URL = USER_SERVICE_API_URL + '/admin';
export const TEAM_SERVICE_ADMIN_API_URL = TEAM_SERVICE_API_URL + '/admin';
export const HACKATHON_SERVICE_ADMIN_API_URL = HACKATHON_SERVICE_API_URL + '/admin';

// Базовый путь для управления хакатонами
export const HACKATHON_SERVICE_MANAGE_API_URL = HACKATHON_SERVICE_API_URL + '/manage';

// Базовый путь для управления хакатоновскими командами
export const TEAM_SERVICE_HACKATHON_TEAM_API_URL = TEAM_SERVICE_API_URL + '/hackathon';