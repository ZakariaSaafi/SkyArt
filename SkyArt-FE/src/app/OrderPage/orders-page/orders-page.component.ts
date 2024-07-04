import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order.model';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {
  pendingOrders : Order[];

  constructor(private orderService : OrderService ) { }

  ngOnInit(): void {
    this.getPendingOrders();

  }


  getPendingOrders() {
    this.orderService.getpendingOrders().subscribe(
      pendingOrders => {
        this.pendingOrders = pendingOrders;
        console.log(this.pendingOrders);
      },
      error => {
        console.error('Failed to find parcs by disponibility:', error);
      }
    );
  }




}
