export interface AuthRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}
