// src/app/models/post.model.ts

export interface Post {
    title: string;
    description: string;
    files: string[];
    dateCreated: Date;
    isAsset: boolean;
    assetPrice?: number;  // Optional, only required if isAsset is true
    category: string;     // Assuming category is represented by its ID
    createdAt?: Date;
    updatedAt?: Date;
  }
  