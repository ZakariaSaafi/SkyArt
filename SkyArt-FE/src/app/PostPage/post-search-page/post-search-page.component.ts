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

}
