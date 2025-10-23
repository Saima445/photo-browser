import { apiClient } from "@/api/jsonplaceholder/client";

interface Album {
  id: number;
  userId: number;
  title: string;
}

export const getAlbumsWithClient = async (): Promise<Album[]> => {
  return await apiClient<Album[]>("/albums");
};

export const getAlbumByIdWithClient = async (albumId: number): Promise<Album> => {
  return await apiClient<Album>(`/albums/${albumId}`);
};
