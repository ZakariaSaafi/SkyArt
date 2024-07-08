import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  private URL: string = 'http://127.0.0.1:4040/event/events';

  constructor(private http: HttpClient) {}

  public getEvents(): Observable<any> {
    return this.http.get('http://127.0.0.1:4040/event/events');
  }
  public getEventById(id: any) {
    return this.http.get(this.URL + '/' + id);
  }
  public updateEvent(postId: any, update: any) {
    return this.http.patch(this.URL + '/' + postId, update);
  }

  public deleteEvent(postId: any) {
    return this.http.delete(this.URL + '/' + postId);
  }

  public addEvent(formData: any) {
    return this.http.post(this.URL, formData);
  }
}
