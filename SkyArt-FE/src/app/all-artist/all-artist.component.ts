import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/User/auth.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-artist',
  templateUrl: './all-artist.component.html',
  styleUrls: ['./all-artist.component.css']
})
export class AllArtistComponent implements OnInit {

  
  artists: any[] = [];
  artistImageUrl = 'http://localhost:4040/';  
  constructor(private authService: AuthService,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchArtists();
    localStorage.removeItem('ArtistData');
  }
  fetchArtists(): void {
    this.authService.getAllArtists()
      .subscribe(
        (data: any[]) => {
          
          this.artists = data.map(artist => ({
            ...artist,
            image: this.artistImageUrl + artist.image
          }));
          console.log(data)
        },
        
        (error) => {
          console.error('Error fetching artists:', error);
          
        }
      );
  }
  

  
  followArtist(artist: any): void {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      console.error('No user data found in localStorage');
      return;
    }

    const userId = JSON.parse(userData)._id;
    
    
    const apiUrl = 'http://localhost:4040/followArtist/follow';
    const requestBody = {
      userId: userId,
      artistId: artist._id
    };

    this.http.post(apiUrl, requestBody).subscribe(
      response => {
        console.log('Successfully followed artist', response);
        console.log(`Following artist: ${artist.name} by user: ${userId}`);
        alert(`Artist ${artist.name} followed`);
      },
      error => {
        console.error('Error following artist', error);
        alert("Artist already followed");
      }
    );
  }
  
  rateArtist(artist: any, rating: number): void {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      console.error('No user data found in localStorage');
      return;
    }

    const userId = JSON.parse(userData)._id;
    const apiUrl = `http://localhost:4040/artist/${artist._id}/rate`;
    const requestBody = {
      userId: userId,
      rating: rating
    };

    this.http.post(apiUrl, requestBody).subscribe(
      response => {
        console.log('Rating submitted successfully', response);
        this.router.navigate(['/all-artist']).then(() =>{
          window.location.reload();
        } )
      },
      error => {
        console.error('Error submitting rating', error);
      }
    );
  }

}
