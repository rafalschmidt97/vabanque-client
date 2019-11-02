import httpClient from '../common/http';
import { Token } from '../core/auth/types';
import { AuthRequest } from './sign-in/external-auth/types';

class AuthApi {
  signIn(credentials: AuthRequest): Promise<Token> {
    return httpClient.post<Token>(`/auth`, credentials).then();
  }
}

const authApi = new AuthApi();
export default authApi;
