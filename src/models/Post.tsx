import type { DocumentData } from "firebase/firestore";

export class Post {
  id?: string;
  title: string = "";
  content: string = "";
  ownerId: string = "";
  imageUrl?: string = "";
  createdAt: Date = new Date();

  static fromFirestore(id: string, data: DocumentData): Post {
    return {
      id,
      title: data.title || "",
      content: data.content || "",
      ownerId: data.ownerId || "",
      imageUrl: data.imageUrl || "",
      createdAt: data.createdAt?.toDate?.() || new Date(),
    };
  }
}
