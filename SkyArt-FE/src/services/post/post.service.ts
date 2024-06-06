import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private URL:string = 'http://localhost:4040/posts';
  constructor(private http:HttpClient) { }

  public getPost(){
    return this.http.get(this.URL);
  }
}
