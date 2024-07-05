import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/User/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  loginFormUser!: FormGroup;
  loginFormArtist!: FormGroup;
  //artist: any;

  constructor(private fb: FormBuilder,private AuthService: AuthService,private router: Router  ) { }

  ngOnInit(): void {
    this.loginFormUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.loginFormArtist = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitUser(): void {
    if (this.loginFormUser.valid) {
      this.AuthService.loginUser(this.loginFormUser.value).subscribe(response => {
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
  }
  onSubmitArtist(): void {
    if (this.loginFormArtist.valid) {
      this.AuthService.loginArtist(this.loginFormArtist.value).subscribe(response => {
        if (response.token) {
          localStorage.setItem('artistToken', response.token);
          localStorage.setItem('artistData', JSON.stringify(response.Artist)); // Store artist data
          console.log('Artist Login Successful');
          console.log(response.token);
          //this.artist = response.Artist;
          this.router.navigate(['/profile']);
        }
      }, error => {
        console.error(error);
        alert("Please make sure of the creadentials")
      });
    }
  }

}
