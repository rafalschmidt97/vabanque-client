export default interface UpdateProfileRequest {
  nickname: string;
  phoneNumber: string;
  avatar: string;
}

export interface GetProfileResponse {
  id: number;
  email: string;
  nickname: string;
  phoneNumber: string;
  avatar: string;
}

export interface UploadResponse {
  url: string;
}
