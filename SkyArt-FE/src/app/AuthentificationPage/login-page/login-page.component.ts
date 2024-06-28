import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(): void {
    console.log("login works");
  }

}
