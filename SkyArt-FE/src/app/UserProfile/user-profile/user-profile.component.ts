import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  posts:any;
  artist: any;
  artistImageUrl!: string;
  public isLoggedIn: boolean = false;


  constructor(private postService: PostService) {

  }

  ngOnInit(): void {
    const storedArtistData = localStorage.getItem('artistData');

    if(localStorage.getItem("artistData") || localStorage.getItem("artistToken")){
      this.isLoggedIn = true;
    }

    if (storedArtistData) {
      this.artist = JSON.parse(storedArtistData);
      this.artistImageUrl = `http://localhost:4040/${this.artist.image}`;
      console.log(this.artistImageUrl)

    } else {
      console.error('No artist data available in localStorage');
    }

  if(this.isLoggedIn){
      this.postService.getPostByOwnerId(this.artist._id).subscribe(
        (data:any)=>{
          console.log(this.artist._id)
          this.posts=data;
        }
      )
    }
  }

  deletePost(id:any){
    this.postService.deletePost(id);
  }


}




