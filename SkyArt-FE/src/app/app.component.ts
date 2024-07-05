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
  
  constructor(){}

  ngOnInit(): void {

    const storedArtistData = localStorage.getItem('artistData');
    if (storedArtistData) {
      this.isLoggedIn = true;
    } else {
      console.error('No artist data available in localStorage');
    }
  }
}
