export const uploadImageToImgBB = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=envConfig.imagebbApi`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();
  if (result.success) {
    return result.data.url;
  }
  throw new Error("Image upload failed");
};
