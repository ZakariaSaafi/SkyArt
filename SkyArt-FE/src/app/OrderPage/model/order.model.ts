import { Post } from './post.model';

export interface Order {
    _id?: string;
    userId: string; 
    posts: [ postId : Post];
    totalAmount: number;
    status: 'pending' | 'completed' | 'canceled';
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }