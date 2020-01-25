import { Token } from './types';

class LocalStorageService {
  setTokens(token: Token) {
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  clear(): void {
    localStorage.clear();
  }
}

const localStorageService = new LocalStorageService();
export default localStorageService;
