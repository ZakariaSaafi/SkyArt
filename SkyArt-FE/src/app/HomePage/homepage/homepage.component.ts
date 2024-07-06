import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import { AuthService } from 'src/services/User/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  count: number = 8;
  public posts:any[] = Array(this.count).fill(0);
  public errorMsg:any;

  constructor(private postService: PostService, public auth : AuthService) { }

  ngOnInit(): void {
    this.postService.getPost().subscribe(
      (data:any)=>{
        this.posts = data;
        console.log(this.posts.length);
      },error => {
        console.log(error);
        this.errorMsg  = error;
      }
    );

  }

}
