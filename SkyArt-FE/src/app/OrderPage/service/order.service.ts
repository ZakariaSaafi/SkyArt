import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order.model';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://127.0.0.1:4040/orders/pending'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getpendingOrders(): Observable<Order[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Order[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}
