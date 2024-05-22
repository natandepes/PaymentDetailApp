import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { PaymentDetail } from '../models/payment-detail.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  url: string = environment.apiBaseUrl + '/PaymentDetail';

  constructor(private httpClient: HttpClient) { }

  refreshList(): Observable<PaymentDetail[]> {
    return this.httpClient.get<PaymentDetail[]>(this.url);
  }

  registerCard(paymentDetail: PaymentDetail): Observable<object> {
    return this.httpClient.post(this.url, paymentDetail);
  }

  updateCard(paymentDetail: PaymentDetail): Observable<object> {
    return this.httpClient.put(this.url + `/${paymentDetail.paymentDetailId}`, paymentDetail);
  }

  deleteCard(paymentDetailId: number): Observable<object> {
    return this.httpClient.delete(this.url + `/${paymentDetailId}`);
  }
}
