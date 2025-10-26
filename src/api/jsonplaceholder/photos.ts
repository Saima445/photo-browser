import { apiClient } from "@/api/jsonplaceholder/client";
import { imageUrl } from "@/utils/const";

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
}

export const getPhotosWithClient = async (): Promise<Photo[]> => {
  const photos = await apiClient<Photo[]>("/photos");

  return photos.map((photo) => ({
    ...photo,
    url: `${imageUrl}/seed/${photo.id}/1200/1200`,
    thumbnailUrl: `${imageUrl}/seed/${photo.id}/800/600?grayscale`,
  }));
};

export const getPhotoByIdWithClient = async (photoId: string): Promise<Photo> => {
  const photo = await apiClient<Photo>(`/photos/${photoId}`);

  return {
    ...photo,
    url: `${imageUrl}/seed/${photo.id}/1200/1200`,
    thumbnailUrl: `${imageUrl}/seed/${photo.id}/800/600`,
  };
};

export const getPhotosByAlbumIdWithClient = async (albumId: number): Promise<Photo[]> => {
  const photos = await apiClient<Photo[]>(`/photos?albumId=${albumId}`);

  return photos.map((photo) => ({
    ...photo,
    url: `${imageUrl}/seed/${photo.id}/1200/1200`,
    thumbnailUrl: `${imageUrl}/seed/${photo.id}/800/600`,
  }));
};
