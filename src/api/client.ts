import { API_BASE_URL } from "@/utils/const";

export const apiClient = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data: T = await res.json();
  return data;
};
