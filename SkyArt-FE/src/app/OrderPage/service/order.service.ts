import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order.model';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Post } from '../model/post.model';
import { PayPalOrderResponse } from '../model/paypal.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.apiUrl+'/orders'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getpendingOrders(): Observable<Order[]> {
    const url = `${this.apiUrl}/pending`;

    return this.http.get<Order[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

    addPostToOrder(userId: string, postId: string, totalAmount: number): Observable<Order> {
    const url = `${this.apiUrl}/addPost`;
    const body = { userId, postId, totalAmount };
    return this.http.post<Order>(url, body, this.httpOptions);
  }

  getOrderPosts(): Observable<Post[]> {
    const url = `${this.apiUrl}/getOrderPosts`;

    return this.http.get<Post[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  cancelPendingOrder(): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/cancelOrder`, {})
      .pipe(
        catchError(this.handleError)
      );
  }
  confirmPendingOrderAndCreatePayment(): Observable<PayPalOrderResponse> {
    return this.http.put<PayPalOrderResponse>(`${this.apiUrl}/orders/confirmPendingOrderAndCreatePayment`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  capturePayment(orderId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payments/capture-payment`, { orderId })
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


  downloadOrderPosts(orderId: string): void {
    const url = `${this.apiUrl}/download/${orderId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `order_${orderId}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading order posts:', error);
        // Handle error appropriately in your component
      }
    );
  }
  getPendingOrdersByUserId(userId: string): Observable<Order[]> {
    const url = `${this.apiUrl}/orders/pending/${userId}`;
    return this.http.get<Order[]>(url);
  }
  removePostFromOrder(orderId: string, postId: string): Observable<any> {
    const url = `${this.apiUrl}/orders/${orderId}/posts/${postId}`;
    return this.http.delete<any>(url);
  }
  deletePostFromPendingOrder(userId: string, postId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/pending/${userId}/posts/${postId}`);
  }

  getConfirmedOrdersByUserId(userId: string): Observable<Order[]> {
    console.log("userId",userId)
    return this.http.get<Order[]>(`${this.apiUrl}/confirmed-orders/${userId}`);
    
  }
}
