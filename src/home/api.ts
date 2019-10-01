import { AuthRequest, Token } from './types';
import httpClient from '../common/http';

class AuthApi {
  signIn(credentials: AuthRequest): Promise<Token> {
    return httpClient.post<Token>(`/auth`, credentials).then();
  }
}

const authApi = new AuthApi();
export default authApi;
