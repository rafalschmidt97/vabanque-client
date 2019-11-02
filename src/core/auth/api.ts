import { RefreshRequest } from './../../home/sign-in/external-auth/types';
import { Token } from './types';
import { AuthRequest } from '../../home/sign-in/external-auth/types';
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
}

const authApi = new AuthApi();
export default authApi;
