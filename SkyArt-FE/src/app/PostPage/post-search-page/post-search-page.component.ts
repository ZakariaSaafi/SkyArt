import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-post-search-page',
  templateUrl: './post-search-page.component.html',
  styleUrls: ['./post-search-page.component.css']
})
export class PostSearchPageComponent implements OnInit {
  public posts:any;
  public errorMsg:any;

  artists = [
    { name: 'KenganC', role: 'UI/UX Designer', rating: 4.9, downloads: '2.2K', userRating: 0 },
    { name: 'GangTm', role: 'UI/UX Designer', rating: 4.2, downloads: '1.8K', userRating: 0 },
    { name: 'Areluwa', role: 'UI/UX Designer', rating: 4.1, downloads: '1.2K', userRating: 0 }
  ];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPost().subscribe(
      (data:any)=>{
        this.posts = data;
      },error => {
        console.log(error);
        this.errorMsg  = error;
      }
    );
  }

  followArtist(artist: any): void {
    // Logic to follow the artist
    console.log(`Following artist: ${artist.name}`);
  }

  rateArtist(artist: any, rating: number): void {
    // Logic to rate the artist
    artist.userRating = rating;
    console.log(`Rated artist: ${artist.name} with ${rating} stars`);
  }


}
