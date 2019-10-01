import { Overview } from './types';
import httpClient from '../../common/http';

class OverviewApi {
  find(id: number): Promise<Overview> {
    return httpClient.get<Overview>(`/overview/${id}`).then();
  }
}

const overviewApi = new OverviewApi();
export default overviewApi;
