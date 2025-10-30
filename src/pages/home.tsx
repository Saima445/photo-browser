import { useQuery } from "@tanstack/react-query";
import { Loader, RefreshCw } from "lucide-react";
import { useState } from "react";

import { getPhotosByAlbumIdWithClient, getPhotosWithClient } from "@/api/jsonplaceholder/photos";
import { getUsersAlbumsWithClient, getUsersWithClient } from "@/api/jsonplaceholder/users";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScrollToTopButton from "@/elements/button-scroll-to-top";
import { Hero } from "@/elements/hero";
import { MasonryPhotos } from "@/elements/masonry-photos";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const {
    data: photos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["photos"],
    queryFn: getPhotosWithClient,
    placeholderData: (prev) => prev,
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersWithClient,
  });

  const { data: userAlbums } = useQuery({
    queryKey: ["user-albums", selectedUser],
    queryFn: () => getUsersAlbumsWithClient(selectedUser!),
    enabled: !!selectedUser,
  });

  const { data: userPhotos } = useQuery({
    queryKey: ["user-photos", selectedUser],
    queryFn: async () => {
      if (!userAlbums) return [];
      const res = await Promise.all(userAlbums.map((album) => getPhotosByAlbumIdWithClient(album.id)));
      return res.flat(); // flat array of arrays
    },
    enabled: !!userAlbums,
  });

  const filteredPhotos = selectedUser ? (userPhotos ?? []) : (photos ?? []);

  const { visibleCount, loadMoreRef } = useInfiniteScroll(filteredPhotos?.length ?? 0, 100);

  return (
    <div className="relative flex flex-col gap-24">
      <ScrollToTopButton />
      <section className="h-[calc(100svh-68px)] max-h-[1000px] pb-8">
        <Hero />
      </section>
      <section id="photos">
        <div className="sm:sticky sm:top-[68px] w-full flex justify-center mb-8 z-999">
          <Select
            value={selectedUser === null ? "" : String(selectedUser)}
            onValueChange={(value) => setSelectedUser(value === "all" ? null : Number(value))}
          >
            <SelectTrigger className="md:w-[55%]">
              <SelectValue placeholder="Filter photos by uploader" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All uploaders</SelectItem>
              {users?.map((user) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {isLoading && (
          <div className="w-full h-[50dvh] flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="w-full h-[50dvh] flex flex-col items-center justify-center gap-4">
            <h3>Something went wrong with fetching</h3>
            <p className="text-muted-foreground mb-6">But give it one more go</p>
            <Button onClick={() => refetch()}>
              <RefreshCw />
            </Button>
          </div>
        )}

        {filteredPhotos && filteredPhotos.length > 0 && (
          <>
            <MasonryPhotos photos={filteredPhotos} visibleCount={visibleCount} />
            <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
              {visibleCount < filteredPhotos.length ? (
                <Loader className="h-6 w-6 animate-spin text-primary" />
              ) : (
                <p className="text-muted-foreground text-sm">All photos loaded ({filteredPhotos.length})</p>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
