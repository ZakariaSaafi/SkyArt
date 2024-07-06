import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/User/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SkyArt-FE';

  public isLoggedIn: boolean = false;

  constructor(private auth: AuthService){}

  ngOnInit(): void {

    if(localStorage.getItem("artistData") || localStorage.getItem("artistToken")){
      this.isLoggedIn = true;
    }
  }
}
