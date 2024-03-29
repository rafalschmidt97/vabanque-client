import { Creditor, Debtor } from '../types';
import httpClient from '../../common/http';
import PagingRequest, { DeleteDebtorRequest } from './types';

class MoneyApi {
  getDebtors(params: PagingRequest): Promise<Debtor[]> {
    return httpClient.get<Debtor[]>('/debtors/self', { params }).then(res => res.data);
  }

  getCreditors(params: PagingRequest): Promise<Creditor[]> {
    return httpClient.get<Creditor[]>(`/debtors/self/creditors`, { params }).then(res => res.data);
  }

  deleteDebtor(params: DeleteDebtorRequest) {
    return httpClient.delete(`/debtors/${params.debtorId}`).then(res => res.data);
  }
}

const debtorApi = new MoneyApi();
export default debtorApi;
