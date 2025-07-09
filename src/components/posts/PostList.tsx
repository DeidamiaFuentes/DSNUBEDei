import { useEffect, useState } from "react";
import { onSnapshot, query, collection } from "firebase/firestore";
import { firebaseDb } from "../../firebase/FirebaseConfig";
import { PostInfo } from "./PostInfo";
import { PostRepository } from "../../repositories/PostRepository";
import type { Post } from "../../models/Post";

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const q = query(collection(firebaseDb, "posts"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts: Post[] = [];
      snapshot.forEach((doc) => {
        newPosts.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(newPosts);
    });

    return () => unsubscribe();
  }, []);

  const handleDeletePost = async (postId: string) => {
    await new PostRepository().deletePost(postId);
  };

  return (
    <>
      {posts.map((post) => (
        <PostInfo
          key={post.id}
          post={post}
          onDeleteCallback={() => handleDeletePost(post.id!)}
        />
      ))}
    </>
  );
};
