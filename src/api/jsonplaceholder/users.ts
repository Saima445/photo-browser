import type { Album } from "@/api/jsonplaceholder/albums";
import { apiClient } from "@/api/jsonplaceholder/client";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const getUsersWithClient = async (): Promise<User[]> => {
  return await apiClient<User[]>("/users");
};

export const getUserByIdWithClient = async (userId: number): Promise<User> => {
  return await apiClient<User>(`/users/${userId}`);
};

export const getUsersAlbumsWithClient = async (userId: number): Promise<Album[]> => {
  return await apiClient<Album[]>(`/users/${userId}/albums`);
};
