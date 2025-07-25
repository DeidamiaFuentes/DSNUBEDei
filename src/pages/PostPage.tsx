import { useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { Container } from "../components/Container";
import Button from "../components/Button";
import { PostList } from "../components/posts/PostList";
import { PostDialog } from "../components/posts/PostDialog";
import Menu from "../components/Menu";

export default function PostPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);

  return (
    <>
      <Menu />
      <PostContext.Provider value={{ reloadFlag, setReloadFlag, isDialogOpen, setIsDialogOpen }}>
        <Container>
          <div className="flex justify-between items-center mb-4 mt-4">
            <h1 className="text-2xl mt-2 mb-2">Posts</h1>
            <Button onClick={() => setIsDialogOpen(true)}>Add post</Button>
          </div>
          <PostList />
        </Container>
        <PostDialog />
      </PostContext.Provider>
    </>
  );
};
