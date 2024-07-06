import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/User/auth.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  public artist :any;
  constructor(private router: Router, private auth : AuthService) { }

  ngOnInit(): void {
    const storedArtistData = localStorage.getItem('artistData') || localStorage.getItem('ArtistData');

    if (storedArtistData) {
      this.artist = JSON.parse(storedArtistData);
      }
  }

  logout() {
    this.auth.logout();
  }

}
