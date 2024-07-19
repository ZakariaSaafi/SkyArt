import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback/feedback.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  feedbacks: any[] = [];
  replyMessage: string = '';
  userId: string = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromToken();
    this.loadUsers();
  }

  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.userId;
    }
    return '';
  }

  loadUsers() {
    this.feedbackService.getUsersWithMessages().subscribe(users => {
      this.users = users.map((user: any) => {
        return {
          ...user,
          hasUnreadMessages: user.feedbacks.some((f: any) => !f.isRead)
        };
      });
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.loadMessages(user._id);
    this.markUserMessagesAsRead(user._id);
  }

  loadMessages(userId: string) {
    this.feedbackService.getUserMessages(userId).subscribe(feedbacks => {
      this.feedbacks = feedbacks;
      this.markMessagesAsRead();
    });
  }

  markMessagesAsRead() {
    this.feedbacks.forEach(feedback => {
      if (feedback.receiver._id === this.userId && !feedback.isRead) {
        feedback.isRead = true;
        // Update feedback in backend
        this.feedbackService.updateFeedback(feedback._id, { isRead: true }).subscribe();
      }
    });
  }

  markUserMessagesAsRead(userId: string) {
    this.users = this.users.map(user => {
      if (user._id === userId) {
        user.hasUnreadMessages = false;
      }
      return user;
    });
  }

  sendReply() {
    const feedback = { receiverId: this.selectedUser._id, message: this.replyMessage };
    this.feedbackService.sendMessage(feedback).subscribe(response => {
      this.replyMessage = '';
      this.loadMessages(this.selectedUser._id);
    });
  }
}
