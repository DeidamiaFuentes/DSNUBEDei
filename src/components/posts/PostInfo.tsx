import { Trash } from "react-bootstrap-icons";
import Button from "../../components/Button";
import type { Post } from "../../models/Post";
import { PostRepository } from "../../repositories/PostRepository";

type Props = {
  post: Post;
  onDeleteCallback(): void;
};

export const PostInfo = ({ post, onDeleteCallback }: Props) => {
  const onDeleteClick = async () => {
    await new PostRepository().deletePost(post.id!);
    onDeleteCallback();
  };

  return (
    <div className="my-3 border p-3 rounded">
      <h3>{post.title}</h3>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full h-auto mb-3 rounded-lg border"
          style={{ objectFit: "contain" }}
        />
      )}
      <p>{post.content}</p>
      <Button onClick={onDeleteClick} variant="danger">
        <Trash size={12} /> Delete
      </Button>
    </div>
  );
};
