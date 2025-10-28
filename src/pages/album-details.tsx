import { useQuery } from "@tanstack/react-query";
import { Loader, RefreshCw } from "lucide-react";
import { useParams } from "react-router-dom";

import { getAlbumByIdWithClient } from "@/api/jsonplaceholder/albums";
import { getPhotosByAlbumIdWithClient } from "@/api/jsonplaceholder/photos";
import { getUserByIdWithClient } from "@/api/jsonplaceholder/users";
import { Button } from "@/components/ui/button";
import BackPreviousButton from "@/elements/button-back-to-previous";
import ScrollToTopButton from "@/elements/button-scroll-to-top";
import { MasonryPhotos } from "@/elements/masonry-photos";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

const AlbumDetails = () => {
  const { albumId } = useParams<{ albumId: string }>();

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

  const { visibleCount, loadMoreRef } = useInfiniteScroll(photosByAlbum?.length ?? 0, 30);

  return (
    <div className="relative md:min-h-[calc(100svh-68px)] flex flex-col sm:flex-row sm:items-start gap-4 pt-16 sm:pt-24">
      <ScrollToTopButton />
      <BackPreviousButton />
      <section className="flex flex-col items-start gap-6 justify-start sm:w-[16%] sm:sticky sm:top-[68px]">
        <h3>{album?.title ? album.title.charAt(0).toUpperCase() + album.title.slice(1) : "..."}</h3>
        <div className="space-y-2">
          <p>
            <strong>Album</strong> No. {album ? album.id : "..."}
          </p>
          <p>
            <strong>Who made this album:</strong> {user ? user.name : "Couldn't find user"}
          </p>
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
          <>
            <MasonryPhotos photos={photosByAlbum} visibleCount={visibleCount} />
            <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
              {visibleCount < photosByAlbum.length ? (
                <Loader className="h-6 w-6 animate-spin text-primary" />
              ) : (
                <p className="text-muted-foreground text-sm">All {photosByAlbum.length} photos loaded</p>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default AlbumDetails;
