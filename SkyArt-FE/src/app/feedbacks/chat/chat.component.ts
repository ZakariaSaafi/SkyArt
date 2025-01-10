import { Component, OnInit } from '@angular/core';
import {jwtDecode} from "jwt-decode";
import { FeedbackService } from '../../../services/feedback/feedback.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  message: string = '';
  feedbacks: any[] = [];
  userId: string = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromToken();
    this.loadMessages();
  }

  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.userId;
    }
    return '';
  }

  sendMessage() {
    const feedback = { receiverId: '667bf973bc876cf6510366d4', message: this.message };
    this.feedbackService.sendMessage(feedback).subscribe(response => {
      this.message = '';
      this.loadMessages();
    });
  }

  loadMessages() {
    this.feedbackService.getMessages().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
    });
  }
}
