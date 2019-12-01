import UpdateProfileRequest, { UploadResponse, GetProfileResponse } from './types';
import httpClient from '../../../common/http';
import { AxiosResponse } from 'axios';

class AccountApi {
  update(updateProfileRequest: UpdateProfileRequest): Promise<AxiosResponse<UpdateProfileRequest>> {
    return httpClient.put<UpdateProfileRequest>(`/accounts/self`, updateProfileRequest);
  }

  uploadProfilePicture(data: FormData): Promise<UploadResponse> {
    return httpClient.post<UploadResponse>('uploads', data).then(res => res.data);
  }

  get(): Promise<GetProfileResponse> {
    return httpClient.get<GetProfileResponse>('/accounts/self').then(res => res.data);
  }
}

const accountApi = new AccountApi();
export default accountApi;
