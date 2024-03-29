export interface AuthRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string | null;
}

export interface LogoutRequest {
  refreshToken: string | null;
}
