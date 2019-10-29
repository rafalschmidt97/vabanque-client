import UpdateProfileRequest from './types';
import httpClient from '../common/http';

interface UploadResponse {
  url: string;
}

class AccountApi {
  update(updateProfileRequest: UpdateProfileRequest): Promise<void> {
    return httpClient.put<UpdateProfileRequest>(`/accounts/self`, updateProfileRequest).then();
  }

  upload(data: FormData): Promise<UploadResponse> {
    return httpClient.post<UploadResponse>('uploads', data).then(res => res.data);
  }
}

const accountApi = new AccountApi();
export default accountApi;
