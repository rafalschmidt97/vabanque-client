import { RefreshRequest, LogoutRequest } from '../../home/login/external-auth/types';
import { Token } from './types';
import { AuthRequest } from '../../home/login/external-auth/types';
import httpClient from '../../common/http';

class AuthApi {
  signIn(): Promise<Token> {
    const credentials: AuthRequest = {
      email: 'account1@example.com',
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
