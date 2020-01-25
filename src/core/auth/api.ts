import { AuthRequest, LogoutRequest, RefreshRequest } from '../../home/login/external-auth/types';
import { Token } from './types';
import httpClient from '../../common/http';

class AuthApi {
  signInWithEmail(request: AuthRequest): Promise<Token> {
    return httpClient.post<Token>(`/auth/sign-in`, request).then(res => res.data);
  }

  signInGoogle(): Promise<Token> {
    const credentials: AuthRequest = {
      email: 'account1@example.com',
      password: 'zaq1@WSX',
    };
    return httpClient.post<Token>(`/auth/sign-in`, credentials).then(res => res.data);
  }

  signInFacebook(): Promise<Token> {
    const credentials: AuthRequest = {
      email: 'account2@example.com',
      password: 'zaq1@WSX',
    };
    return httpClient.post<Token>(`/auth/sign-in`, credentials).then(res => res.data);
  }

  refreshToken(refreshRequest: RefreshRequest): Promise<Token> {
    return httpClient.post<Token>(`/auth/refresh`, refreshRequest).then(res => res.data);
  }

  logout(logoutRequest: LogoutRequest) {
    return httpClient.post(`/auth/logout`, logoutRequest);
  }
}

const authApi = new AuthApi();
export default authApi;
