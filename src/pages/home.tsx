import { useQuery } from "@tanstack/react-query";
import { Loader, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getAlbumsWithClient } from "@/api/jsonplaceholder/albums";
import { getPhotosWithClient } from "@/api/jsonplaceholder/photos";
import { getUsersWithClient } from "@/api/jsonplaceholder/users";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScrollToTopButton from "@/elements/button-scroll-to-top";
import { Hero } from "@/elements/hero";
import { ImageWithFallback } from "@/elements/image-with-fallback";
import { cn } from "@/lib/utils";
import { photoAspectClass } from "@/utils/photo-aspect-class";

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

  const { data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbumsWithClient,
  });

  const filteredPhotos = useMemo(() => {
    if (!selectedUser || !albums || !photos) return photos;

    const userAlbumIds = albums.filter((album) => album.userId === selectedUser).map((album) => album.id);

    return photos.filter((photo) => userAlbumIds.includes(photo.albumId));
  }, [selectedUser, photos, albums]);

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
          <div className="columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-4 space-y-4 lg:gap-10 lg:space-y-10">
            {filteredPhotos.slice(0, 100).map((photo, index) => {
              return (
                <Link
                  key={photo.id}
                  to={`/photos/${photo.id}`}
                  className={cn(
                    "group relative block overflow-hidden transform transition duration-300 hover:scale-[1.03] break-inside-avoid",
                    photoAspectClass(index)
                  )}
                >
                  <ImageWithFallback src={photo.thumbnailUrl} alt={photo.title} />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-500">
                    <p className="opacity-0 group-hover:opacity-100 text-white text-center px-2 transition-opacity duration-500">
                      {photo.title ? photo.title.charAt(0).toUpperCase() + photo.title.slice(1) : ""}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
