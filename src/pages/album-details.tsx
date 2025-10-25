import { useQuery } from "@tanstack/react-query";
import { Loader, RefreshCw } from "lucide-react";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAlbumByIdWithClient } from "@/api/jsonplaceholder/albums";
import { getPhotosByAlbumIdWithClient } from "@/api/jsonplaceholder/photos";
import { getUserByIdWithClient } from "@/api/jsonplaceholder/users";
import { Button } from "@/components/ui/button";
import BackPreviousButton from "@/elements/button-back-to-previous";
import ScrollToTopButton from "@/elements/button-scroll-to-top";
import { ImageWithFallback } from "@/elements/image-with-fallback";
import { cn } from "@/lib/utils";

const AlbumDetails = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();

  const { data: album } = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => getAlbumByIdWithClient(Number(albumId)!),
    enabled: !!albumId,
  });

  const {
    data: photosByAlbum,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["photos by album", albumId],
    queryFn: () => getPhotosByAlbumIdWithClient(Number(albumId)!),
    enabled: !!albumId,
  });

  const userId = album?.userId;

  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserByIdWithClient(userId!),
    enabled: !!userId,
  });

  useLayoutEffect(() => {
    document.getElementById("scroll-root")?.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative md:min-h-[calc(100svh-68px)] flex flex-col sm:flex-row sm:items-start gap-4 sm:pt-24">
      <ScrollToTopButton />
      <BackPreviousButton />
      <section className="flex flex-col items-start gap-6 justify-start sm:w-[16%] sm:sticky sm:top-[68px]">
        <h3>{album?.title ? album.title.charAt(0).toUpperCase() + album.title.slice(1) : "..."}</h3>
        <div className="space-y-2">
          <p>Album No. {album ? album.id : "..."}</p>
          <p>Who made this album: {user ? user.name : "Couldn't find user"}</p>
        </div>
      </section>
      <section className="flex-1">
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

        {photosByAlbum && photosByAlbum.length > 0 && (
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 lg:gap-10 lg:space-y-10">
            {photosByAlbum.map((photo, index) => {
              // mixed sizes
              const sizeClass = (() => {
                const mod = index % 6;
                if (mod === 0) return "aspect-[3/4]";
                if (mod === 1) return "aspect-[4/3]";
                if (mod === 2) return "aspect-[1/1]";
                if (mod === 3) return "aspect-[2/3]";
                if (mod === 4) return "aspect-[3/2]";
                return "aspect-[5/4]";
              })();

              return (
                <div
                  key={photo.id}
                  onClick={() => {
                    navigate(`/photos/${photo.id}`);
                    document.getElementById("scroll-root")?.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={cn(
                    "group relative block overflow-hidden transform transition duration-300 hover:scale-[1.03] break-inside-avoid",
                    sizeClass
                  )}
                >
                  <ImageWithFallback src={photo.thumbnailUrl} alt={photo.title} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-500">
                    <p className="opacity-0 group-hover:opacity-100 text-white text-center px-2 transition-opacity duration-500">
                      {photo.title ? photo.title.charAt(0).toUpperCase() + photo.title.slice(1) : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default AlbumDetails;
