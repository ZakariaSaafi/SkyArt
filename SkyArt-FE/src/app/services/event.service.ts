import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private URL:string = 'http://localhost:4040/event/events/';
  constructor(private http:HttpClient) { }

  public getEvents(){
    return this.http.get(this.URL);
  }
  public getEvent(id:any){
    return this.http.get(this.URL + "/" + id);
  }
  public updateEvent(eventId:any){
    return this.http.patch(this.URL, eventId);
  }

  public deleteEvent(eventId: any){
    return this.http.delete(this.URL, eventId);
  }

  public addEvent(formData: any){
    return this.http.post(this.URL, formData);
  }
}
