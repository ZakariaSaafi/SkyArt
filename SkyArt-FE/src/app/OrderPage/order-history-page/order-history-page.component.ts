import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order.model';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.css']
})
export class OrderHistoryPageComponent implements OnInit {
  confirmedOrders: Order[] = [];
  userId: string = "60d21b4567d0d8992e610c84";
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadConfirmedOrders();
  }
  downloadOrderPosts(orderId: any): void {
    this.orderService.downloadOrderPosts(orderId);
  }
  loadConfirmedOrders(): void {
    this.orderService.getConfirmedOrdersByUserId(this.userId).subscribe(
      (orders: Order[]) => {
        this.confirmedOrders = orders;
        console.log("this.confirmedOrders",this.confirmedOrders);
      },
      (error) => {
        console.error('Error fetching confirmed orders:', error);
      }
    );
  }

}
