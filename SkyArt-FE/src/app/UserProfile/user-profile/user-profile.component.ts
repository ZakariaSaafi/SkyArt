import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/User/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  artist: any;
  artistImageUrl: string;
  artistId: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.artist = null;
    this.artistImageUrl = '';
    this.artistId = '';
  }

  ngOnInit(): void {
    const storedArtistData = localStorage.getItem('artistData') || localStorage.getItem('ArtistData');
    if (storedArtistData) {
      this.artist = JSON.parse(storedArtistData);
      this.artistImageUrl = `http://localhost:4040/${this.artist.image}`;
    } else {
      // Retrieve artist ID from route parameter
      this.route.params.subscribe(params => {
        this.artistId = params['id'];
        // Fetch artist details based on artistId
        this.fetchArtistDetails(this.artistId);
      });
    }
  }

  fetchArtistDetails(id: string): void {
    // Call your artist service to fetch artist details by ID
    this.authService.getArtistById(id).subscribe(
      (artist: any) => {
        this.artist = this.transformArtistData(artist);
        this.artistImageUrl = `http://localhost:4040/${this.artist.image}`;
        // Store artist data in localStorage
        localStorage.setItem('ArtistData', JSON.stringify(this.artist));
      },
      error => {
        console.error('Error fetching artist details', error);
      }
    );
  }
  transformArtistData(artist: any): any {
    // Extract relevant fields and rename if necessary
    return {
      _id: artist.Artist._id,
      name: artist.Artist.name,
      email: artist.Artist.email,
      password: artist.Artist.password,
      isAdmin: artist.Artist.isAdmin,
      image: artist.Artist.image,
      followed: artist.Artist.followed,
      isBanned: artist.Artist.isBanned,
      __t: artist.Artist.__t,
      phoneNumber: artist.Artist.phoneNumber,
      biography: artist.Artist.bioghraphy, // Corrected from "bioghraphy" to "biography"
      averageRating: artist.Artist.averageRating,
      following: artist.Artist.following,
      ratings: artist.Artist.ratings,
      createdAt: artist.Artist.createdAt,
      updatedAt: artist.Artist.updatedAt,
      __v: artist.Artist.__v
    };
}
}
