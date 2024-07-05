import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order.model';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Post } from '../model/post.model';
import { PayPalLink, PayPalOrderResponse } from '../model/paypal.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {
  pendingOrderPosts : Post[];
  currentOrder: Order;
  userId : string = "60d21b4567d0d8992e610c84";

  constructor(private orderService : OrderService, private router: Router ) {

   }

  ngOnInit(): void {
    this.fetchPendingOrderPosts();
    

  }

  fetchPendingOrderPosts(): void {
    this.orderService.getOrderPosts().subscribe(
      (data: Post[]) => {
        this.pendingOrderPosts = data;
      },
      (error) => {
        console.error('Failed to fetch pending order posts:', error);
      }
    );
  }
  getOrderPosts() {
    this.orderService.getOrderPosts().subscribe(
      (post: Post[]) => {
        this.pendingOrderPosts = post;      },
      error => {
        console.error('Failed to find order posts:', error);
      }
    );
  }


  cancelOrder() {
    this.orderService.cancelPendingOrder().subscribe(
      response => {
        console.log('Order canceled:', response);
        this.getOrderPosts(); // Refresh the list after cancellation
      },
      error => {
        console.error('Failed to cancel order:', error);
      }
    );
  }

  confirmOrder() {
    this.orderService.confirmPendingOrderAndCreatePayment().subscribe(
      (response: PayPalOrderResponse) => {
        console.log('Payment created:', response);
        // Redirect the user to PayPal for payment
        const approvalLink = response.links.find((link: PayPalLink) => link.rel === 'approve');
        if (approvalLink) {
          window.location.href = approvalLink.href;
        } else {
          console.error('No approval link found in the response.');
        }
      },
      error => {
        console.error('Failed to confirm order and create payment:', error);
      }
    );
    }
  goToOrdersHistory(): void {
    this.router.navigate(['/OrdersHistory']); // Navigate to /OrdersHistory route
  }

  deletePost(postId: string): void {
    this.orderService.deletePostFromPendingOrder(this.userId, postId).subscribe(response => {
      this.fetchPendingOrderPosts(); // Refresh the list after deletion
    });
  }
}
