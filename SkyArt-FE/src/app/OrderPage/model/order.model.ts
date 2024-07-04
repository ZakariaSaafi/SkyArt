import { Post } from './post.model';

export interface Order {
    userId: string;
    posts: Post[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'canceled';
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }