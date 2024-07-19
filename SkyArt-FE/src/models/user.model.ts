export interface User {
  _id?: string; // Optional if you use MongoDB's ObjectId
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  image?: string;
  isBanned?: boolean;
}
