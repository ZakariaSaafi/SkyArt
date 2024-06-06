import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public posts:any;
  public errorMsg:any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPost().subscribe(
      (data:any)=>{
        this.posts = data;
        console.log(this.posts);
      },error => {
        console.log(error);
        this.errorMsg  = error;
      }
    );

  }

}
