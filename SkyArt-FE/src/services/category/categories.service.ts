import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private URL:string = 'http://localhost:4040/category';

  constructor(private http:HttpClient) { }

  public getCategories(){
    return this.http.get(this.URL);
  }
  public getCategoryById(id:any){
    return this.http.get(this.URL + "/" + id);
  }
  public updateCategory(postId:any){
    return this.http.patch(this.URL, postId);
  }

  public deleteCategory(postId: any){
    return this.http.delete(this.URL, postId);
  }

  public addCategory(formData: any){
    return this.http.post(this.URL, formData);
  }

}
