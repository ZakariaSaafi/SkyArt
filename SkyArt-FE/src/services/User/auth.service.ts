import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private UrlUser:string = 'http://localhost:4040/user/signup';
  private UrlArtist:string = 'http://localhost:4040/artist/signup';
  private userLoginUrl:string =  'http://localhost:4040/user/login';
  private artistLoginUrl:string = 'http://localhost:4040/artist/login';

  constructor(private http:HttpClient) { }

  signupUser(userData: any): Observable<any> {
    return this.http.post<any>(this.UrlUser, userData);
  }

  signupArtist(artistData: any): Observable<any> {
    return this.http.post<any>(this.UrlArtist, artistData);
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>(this.userLoginUrl, loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  loginArtist(loginData: any): Observable<any> {
    return this.http.post<any>(this.artistLoginUrl, loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  getUserToken(): string | null {
    return localStorage.getItem('userToken');
  }

  getArtistToken(): string | null {
    return localStorage.getItem('artistToken');
  }

  removeUserToken(): void {
    localStorage.removeItem('userToken');
  }

  removeArtistToken(): void {
    localStorage.removeItem('artistToken');
  }

}
