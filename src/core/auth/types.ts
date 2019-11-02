export interface AuthState {
  isAuthenticated: boolean;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
