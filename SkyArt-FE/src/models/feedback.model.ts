export interface Feedback {
  _id?: string;
  sender: string;
  receiver: string;
  message: string;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
