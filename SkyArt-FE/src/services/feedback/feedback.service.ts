import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://127.0.0.1:4040/feedback';
  private api = 'http://127.0.0.1:4040/user';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  sendMessage(feedback: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, feedback, { headers });
  }

  getMessages(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  getUsersWithMessages(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/users`, { headers });
  }

  getUserMessages(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/user/${userId}`, { headers });
  }

  updateFeedback(feedbackId: string, updates: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch(`${this.apiUrl}/${feedbackId}`, updates, { headers });
  }
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.api}/${userId}`);
  }

}
