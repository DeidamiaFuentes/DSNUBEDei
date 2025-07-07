import { useContext, useEffect, useState, useCallback } from "react";
import { useFirebaseUser } from "../../hooks/useFirebaseUser";
import { PostRepository } from "../../repositories/PostRepository";
import { PostInfo } from "./PostInfo";
import { PostContext } from "../../contexts/PostContext";
import type { Post } from "../../models/Post";

export const PostList = () => {
  const { user } = useFirebaseUser();
  const { reloadFlag, setReloadFlag } = useContext(PostContext);
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = useCallback(async () => {
    const thePosts = await new PostRepository().getPostsByOwnerId(user!.uid);
    setPosts(thePosts);
  }, [user]);

  useEffect(() => {
    if (user) loadPosts();
  }, [user, reloadFlag, loadPosts]);

  return (
    <>{posts.map((post) => (
      <PostInfo key={post.id} post={post} onDeleteCallback={() => setReloadFlag(reloadFlag + 1)} />
    ))}</>
  );
};
