import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-detail-page',
  templateUrl: './post-detail-page.component.html',
  styleUrls: ['./post-detail-page.component.css']
})
export class PostDetailPageComponent implements OnInit {
  post: any;
  showComments = false;
  newComment = '';
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(postId).subscribe(data => {
      this.post = data;
    });
  }

  likePost() {
    this.post.likes++;
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }
  orderPost() {
    //Amin -- here you can implement your order code
  }

  addComment() {
    if (this.newComment.trim()) {
      this.post.comments.push({
        author: 'Current User', // Replace with actual user data
        text: this.newComment
      });
      this.newComment = '';
    }
  }

}
