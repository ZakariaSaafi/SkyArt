import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  artist: any;
  
    

  constructor() {
    
  }

  ngOnInit(): void {
    const storedArtistData = localStorage.getItem('artistData');
    if (storedArtistData) {
      this.artist = JSON.parse(storedArtistData);
    } else {
      console.error('No artist data available in localStorage');
    }
  }
}

 


