import { Trash, HandThumbsDown, HandThumbsUp } from "react-bootstrap-icons";
import Button from "../../components/Button";
import type { Post } from "../../models/Post";
import { PostRepository } from "../../repositories/PostRepository";
import { httpsCallable } from "firebase/functions";
import { firebaseFunctions } from "../../firebase/FirebaseConfig";
import { useFirebaseUser } from "../../hooks/useFirebaseUser";

type Props = {
  post: Post;
  onDeleteCallback(): void;
};

export const PostInfo = ({ post, onDeleteCallback }: Props) => {
  const { user } = useFirebaseUser();

  const onDeleteClick = async () => {
    await new PostRepository().deletePost(post.id!);
    onDeleteCallback();
  };

  const onLikeDislike = async (type: "like" | "dislike") => {
    const notifyFn = httpsCallable(firebaseFunctions, "notifyPostOwnerOnReaction");
    try {
      await notifyFn({
        postId: post.id,
        type: type,
        ownerId: post.ownerId,
        postTitle: post.title,
      });
      console.log(`✅ ${type} enviado y notificación solicitada`);
    } catch (error) {
      console.error("Error al procesar la reacción:", error);
    }
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
      
      <div className="d-flex align-items-center">

        {user?.uid === post.ownerId && (
          <Button onClick={onDeleteClick}>
            <Trash size={12} /> Borrar
          </Button>
        )}

        {user && user.uid !== post.ownerId && (
          <>
            <Button
              onClick={() => onLikeDislike("like")}
              className="me-2"
            >
              <HandThumbsUp size={12} /> Like ({post.likeCount || 0})
            </Button>
            <Button
              onClick={() => onLikeDislike("dislike")}
            >
              <HandThumbsDown size={12} /> Dislike ({post.dislikeCount || 0})
            </Button>
          </>
        )}
      </div>
    </div>
  );
};