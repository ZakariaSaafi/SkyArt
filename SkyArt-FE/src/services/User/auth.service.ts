import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private UrlUser:string = 'http://localhost:4040/user/signup';
  private UrlArtist:string = 'http://localhost:4040/artist/signup';
  private userIdUrl:string = 'http://localhost:4040/user/';
  private userLoginUrl:string =  'http://localhost:4040/user/login';
  private artistLoginUrl:string = 'http://localhost:4040/artist/login';
  private GetAllArtists = 'http://localhost:4040/artist/getAll';
  public isLoggedin : boolean = false ;
  private ArtistById:string = 'http://localhost:4040/artist';

  constructor(private http:HttpClient, private router: Router) { }

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
  getAllArtists(): Observable<any[]> {
    return this.http.get<any[]>(this.GetAllArtists);
  }

  getArtistById(id: string): Observable<any> {
    return this.http.get<any>(`${this.ArtistById}/${id}`);
  }

  logout()
  {
    this.isLoggedin = false ;
    localStorage.clear();
    this.router.navigate(['/login-page']).then(() => {
      window.location.reload();
    });
  }

  login (loginData:any)
  {
    this.loginUser(loginData).subscribe(response => {
      if (response.token) {
        localStorage.setItem('userToken', response.token);
        console.log('User Login Successful', response.token, response.user);
        localStorage.setItem('userData', JSON.stringify(response.user)); // Store artist data
        this.router.navigate(['/posts-search-page']);

      }
    }, error => {
      console.error('Login failed: ', error);
      alert("Please make sure of the creadentials")
    });
  }

  public getUserById(ownerId:string): Observable<any> {
      return this.http.get<any>(`${this.userIdUrl}/${ownerId}`);
  }
}

