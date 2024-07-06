import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://127.0.0.1:4040';

  constructor(private http: HttpClient) { }

  createPayment(orderId: string) {
    return this.http.post(`${this.apiUrl}/create-payment`, { orderId });
  }

  capturePayment(paymentId: string) {
    return this.http.post(`${this.apiUrl}/capture-payment`, { paymentId });
  }

}