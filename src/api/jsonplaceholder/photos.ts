import { apiClient } from "@/api/jsonplaceholder/client";
import { API_BASE_URL, imageUrl } from "@/utils/const";

// generic way
// export const getPhotos = async () => {
//   const res = await fetch(`${API_BASE_URL}/photos`);

//   if (!res.ok) {
//     throw new Error(`Failed to fetch photos: ${res.status}`);
//   }

//   const data = await res.json();
//   return data;
// };

// export const getPhotoById = async (id: number) => {
//   const res = await fetch(`${API_BASE_URL}/photos/${id}`);

//   if (!res.ok) {
//     throw new Error(`Failed to fetch photo: ${res.status}`);
//   }

//   const data = await res.json();

//   return data;
// };

// type safe way
interface Photo {
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

export const getPhotoByIdWithClient = async (id: string): Promise<Photo> => {
  const photo = await apiClient<Photo>(`/photos/${id}`);

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
