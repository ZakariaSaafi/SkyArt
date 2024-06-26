import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../models/user.model';
import {FeedbackService} from "../../../services/feedback/feedback.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId: string = '';
  user!: User;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.userId = this.getUserIdFromToken();
    if (this.userId) {
      this.loadUser();
    }
  }

  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.userId;
    }
    return '';
  }

  loadUser(): void {
    this.feedbackService.getUserById(this.userId).subscribe(
      (user: any) => {
        this.user = user.user;
        console.log('User data:', user);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
