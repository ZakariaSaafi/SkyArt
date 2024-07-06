import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {ActivatedRoute} from "@angular/router";
import { OrderService } from 'src/app/OrderPage/service/order.service';
import { Order } from 'src/app/OrderPage/model/order.model';

@Component({
  selector: 'app-post-detail-page',
  templateUrl: './post-detail-page.component.html',
  styleUrls: ['./post-detail-page.component.css']
})
export class PostDetailPageComponent implements OnInit {
  post: any;
  showComments = false;
  newComment : any = '';
  userId = '60d21b4567d0d8992e610c84'; // Replace with actual user ID
  totalAmount = 100;

  constructor(private postService: PostService, private route: ActivatedRoute, private orderService : OrderService) { }

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
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId){
    this.orderService.addPostToOrder(this.userId, postId, this.totalAmount).subscribe(
      (order: Order) => {
        console.log('Order updated or created:', order);
      },
      (error) => {
        console.error('Error adding post to order:', error);
      }
    );}
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
