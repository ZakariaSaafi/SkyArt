import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSignup(): void {
    console.log("signup works");
  }

}
