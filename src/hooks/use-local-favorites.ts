import { useState } from "react";

export const useLocalLikes = () => {
  const [likedPhotos, setLikedPhotos] = useState<number[]>(() => {
    const stored = localStorage.getItem("likedPhotos");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleLike = (photoId: number) => {
    setLikedPhotos((prev) => {
      const updated = prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId];
      localStorage.setItem("likedPhotos", JSON.stringify(updated));
      return updated;
    });
  };

  const isLiked = (photoId: number) => likedPhotos.includes(photoId);

  return { likedPhotos, toggleLike, isLiked };
};
