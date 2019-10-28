export interface AuthRequest {
  email: string;
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
