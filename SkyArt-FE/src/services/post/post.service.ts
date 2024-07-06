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
  public getPostById(id:any){
    return this.http.get(this.URL + "/" + id);
  }

  public getPostByOwnerId(ownerId:any){
    return this.http.get(this.URL + "/owner/" + ownerId);
  }

  public updatePost(postId:any){
    return this.http.patch(this.URL, postId);
  }
  public deletePost(postId: any){
    return this.http.delete(this.URL + "/"+ postId);
  }

  public addPost(formData: any){
    return this.http.post(this.URL, formData);
  }
}
