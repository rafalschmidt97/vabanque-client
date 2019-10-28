import { AuthRequest, Token } from './types';
import httpClient from '../../../common/http';

class AuthApi {
  signIn(): Promise<Token> {
    const credentials: AuthRequest = {
      email: 'account1@example.com',
      password: 'zaq1@WSX',
    };
    return httpClient.post<Token>(`/auth/sign-in`, credentials).then(res => res.data);
  }
}

const authApi = new AuthApi();
export default authApi;
