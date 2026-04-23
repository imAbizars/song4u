import { useState } from "react";

export function useUploadImage() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file) => {
    if (!file) return null;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.url;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadImage };
}