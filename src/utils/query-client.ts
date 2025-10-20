import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // data stayes fresh for 5 mins
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
