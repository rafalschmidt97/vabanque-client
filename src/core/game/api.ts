import httpClient from '../../common/http';

class AccountApi {
  getPlayerNickname(id: number): Promise<string> {
    return httpClient.get(`/accounts/${id}`).then(res => {
      return res.data.nickname;
    });
  }
}

const accountApi = new AccountApi();
export default accountApi;
