import { cookiesApi } from "../helpers/cookies";

export class AuthService {
    static gracefulLogout() {
        cookiesApi.removeAuthCookies();
        localStorage.setItem('login_redirect_reason', 'session_expired');
        if (typeof window !== 'undefined') {
            window.location.href = '/login'
        }
      }
    
    static async forceLogout() {
        cookiesApi.removeAuthCookies();
        localStorage.setItem('login_redirect_reason', 'session_expired');
        window.location.href = '/login'
    }
}
