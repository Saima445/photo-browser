import { useQuery } from "@tanstack/react-query";
import { Heart, Loader, RefreshCw, X } from "lucide-react";
import { Link } from "react-router-dom";

import { type Photo, getPhotoByIdWithClient } from "@/api/jsonplaceholder/photos";
import { Button } from "@/components/ui/button";
import BackPreviousButton from "@/elements/button-back-to-previous";
import ScrollToTopButton from "@/elements/button-scroll-to-top";
import { ImageWithFallback } from "@/elements/image-with-fallback";
import { useLocalLikes } from "@/hooks/use-local-favorites";

type PhotoOrError = Photo & { error?: true };

const Profile = () => {
  const { likedPhotos, toggleLike } = useLocalLikes();

  const {
    data: localStoragePhotos,
    isLoading,
    isError,
    refetch,
  } = useQuery<PhotoOrError[]>({
    queryKey: ["liked-photos", likedPhotos],
    queryFn: async () => {
      const results = await Promise.allSettled(likedPhotos.map((id) => getPhotoByIdWithClient(String(id))));
      return results.map((result, index) => {
        if (result.status === "fulfilled") return result.value;
        // error object
        return {
          id: likedPhotos[index],
          title: "Failed to load",
          url: "",
          thumbnailUrl: "",
          albumId: 0,
          error: true,
        };
      });
    },
    enabled: likedPhotos.length > 0,
    placeholderData: (prev) => prev,
  });

  return (
    <div className="relative md:h-[calc(100svh-68px)] pt-16 sm:pt-24">
      <ScrollToTopButton />
      <BackPreviousButton />
      <section>
        <h2 className="leading-none mb-6">Photos you liked</h2>
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
        {!likedPhotos || likedPhotos.length === 0 ? (
          <p className="text-muted-foreground">You haven&apos;t liked any photos yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {localStoragePhotos?.map((photo) =>
              photo.error ? (
                <div key={photo.id} className="bg-destructive w-full h-full flex items-center justify-center">
                  <X strokeWidth={1} className="h-[50%] w-[50%]" />
                </div>
              ) : (
                <div key={photo.id} className="relative group">
                  <Link
                    to={`/photos/${photo.id}`}
                    className="block aspect-square overflow-hidden transform transition duration-300 hover:scale-[1.03]"
                  >
                    <ImageWithFallback src={photo.thumbnailUrl} alt={photo.title} className="w-full h-full" />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-500">
                      <p className="opacity-0 group-hover:opacity-100 text-white text-center px-2 transition-opacity duration-500">
                        {photo.title ? photo.title.charAt(0).toUpperCase() + photo.title.slice(1) : ""}
                      </p>
                    </div>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(photo.id);
                    }}
                    className="absolute top-1 right-1 rounded-full bg-transparent hover:cursor-pointer transition-colors z-10"
                    title="Unlike"
                  >
                    <Heart className="!h-6 !w-6 fill-red-500 text-red-500" />
                  </Button>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
