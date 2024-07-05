import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/User/auth.service';

@Component({
  selector: 'app-all-artist',
  templateUrl: './all-artist.component.html',
  styleUrls: ['./all-artist.component.css']
})
export class AllArtistComponent implements OnInit {

  
  artists: any[] = [];
  artistImageUrl = 'http://localhost:4040/';  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchArtists();
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
          // Handle error as needed
        }
      );
  }
  

  updateRating(artist: any, newRating: number): void {
    artist.rating = newRating; // Update the artist's rating
  }

  // Example function for follow button action
  followArtist(artist: any): void {
    console.log(`Following artist: ${artist.name}`);
    // Implement follow logic here
  }

}
