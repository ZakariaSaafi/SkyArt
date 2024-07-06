import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-payment',
  template: `
    <button (click)="confirmPayment()">Confirm Payment</button>
  `
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
  }

  confirmPayment() {
    const orderId = 'ORDER_ID_HERE'; // Replace with the actual order ID
    this.paymentService.createPayment(orderId).subscribe((response: any) => {
      const paymentId = response.id;
      window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${paymentId}`;
    });
  }

}