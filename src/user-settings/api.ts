import UpdateProfileRequest, { UploadResponse, GetProfileResponse } from './types';
import httpClient from '../common/http';

class AccountApi {
  update(updateProfileRequest: UpdateProfileRequest): Promise<void> {
    return httpClient.put<UpdateProfileRequest>(`/accounts/self`, updateProfileRequest).then();
  }

  upload(data: FormData): Promise<UploadResponse> {
    return httpClient.post<UploadResponse>('uploads', data).then(res => res.data);
  }

  getSelf(): Promise<GetProfileResponse> {
    return httpClient.get<GetProfileResponse>('/accounts/self').then(res => res.data);
  }
}

const accountApi = new AccountApi();
export default accountApi;
