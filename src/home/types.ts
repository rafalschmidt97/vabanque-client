export interface AuthRequest {
  email: string;
  password: string;
}

export interface Token {
  authToken: string;
  refreshToken: string;
}
