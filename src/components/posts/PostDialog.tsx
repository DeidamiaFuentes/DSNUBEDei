import { useContext, useState } from "react"; // Importa useState
import { useForm, type SubmitHandler } from "react-hook-form";
import { PostRepository } from "../../repositories/PostRepository";
import { PostContext } from "../../contexts/PostContext";
import { Dialog } from "../Dialog";
import { Input } from "../Input";
import Button from "../Button";
import { useFirebaseUser } from "../../hooks/useFirebaseUser";
import { uploadImage } from "../../utils/uploadImage";
import FileInput from "../FileInput";

type Inputs = {
  title: string;
  content: string;
  image: FileList;
};

export const PostDialog = () => {
  const { isDialogOpen, setIsDialogOpen, reloadFlag, setReloadFlag } =
    useContext(PostContext);
  const { user } = useFirebaseUser();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!user) return;

    setIsUploading(true);
    let imageUrl;
    if (data.image && data.image.length > 0) {
      try {
        imageUrl = await uploadImage(data.image[0]);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setIsUploading(false);
        return;
      }
    }

    const newPost = {
      title: data.title,
      content: data.content,
      ownerId: user.uid,
      createdAt: new Date(),
      imageUrl: imageUrl,
    };

    await new PostRepository().addPost(newPost);
    
    setIsUploading(false);
    setIsDialogOpen(false);
    setReloadFlag(reloadFlag + 1);
    reset();
  };

  return (
    <Dialog isOpen={isDialogOpen} onClose={() => { setIsDialogOpen(false); reset(); }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Title" {...register("title", { required: true })} error={errors.title ? "Required" : ""} />
        <Input label="Content" {...register("content", { required: true })} error={errors.content ? "Required" : ""} />
        <FileInput
          label="Image"
          type="file"
          {...register("image")}
          error={errors.image ? "Required" : ""}
        />
        <div className="mt-4">
          <Button variant="primary" type="submit" disabled={isUploading}>
            {isUploading ? "Guardando..." : "Guardar Post"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};