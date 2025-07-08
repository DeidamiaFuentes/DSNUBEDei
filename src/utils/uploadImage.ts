import axios from "axios";

export const uploadImage = async (file: File) => {
  const cloudName = "dazmv3jm6";
  const uploadPreset = "nube-dei";

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(url, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("Error al subir la imagen");
  }
};
