import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, Building2, Download, Globe, Loader, Mail, Phone, RefreshCw, Share2 } from "lucide-react";
import { Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getAlbumByIdWithClient } from "@/api/jsonplaceholder/albums";
import { getPhotoByIdWithClient, getPhotosByAlbumIdWithClient } from "@/api/jsonplaceholder/photos";
import { getUserByIdWithClient } from "@/api/jsonplaceholder/users";
import { getPicsumPhotoInfo } from "@/api/picsum/picsum-photo";
import { Button } from "@/components/ui/button";
import BackPreviousButton from "@/elements/button-back-to-previous";
import ScrollToTopButton from "@/elements/button-scroll-to-top";
import { ImageWithFallback } from "@/elements/image-with-fallback";
import { MasonryPhotos } from "@/elements/masonry-photos";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useLocalLikes } from "@/hooks/use-local-favorites";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { downloadPhoto, sharePhoto } from "@/utils/photo-actions";

const PhotoDetails = () => {
  const { photoId } = useParams<{ photoId: string }>();
  const isMobile = useIsMobile();
  const { toggleLike, isLiked } = useLocalLikes();

  const {
    data: photo,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["photo", photoId],
    queryFn: () => getPhotoByIdWithClient(photoId!),
    enabled: !!photoId,
    placeholderData: (prev) => prev,
  });

  const { data: picsumData } = useQuery({
    queryKey: ["picsum photo data", photoId],
    queryFn: () => getPicsumPhotoInfo(photoId!),
    enabled: !!photoId,
  });

  const albumId = photo?.albumId;

  const { data: album } = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => getAlbumByIdWithClient(albumId!),
    enabled: !!albumId,
  });

  const { data: photosByAlbum } = useQuery({
    queryKey: ["photos by album", albumId],
    queryFn: () => getPhotosByAlbumIdWithClient(albumId!),
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
    <div className="relative flex flex-col gap-24 pt-16 md:pt-0">
      <ScrollToTopButton />
      <BackPreviousButton />
      <section className="w-full md:h-[calc(100svh-68px)] md:max-h-[1000px] gap-6 pb-8 flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center relative">
          {isLoading && <Loader className="h-8 w-8 animate-spin text-primary my-32" />}
          {photo && (
            <ImageWithFallback
              src={photo.url}
              alt={photo.title}
              className="md:max-h-[90%]"
              imageClassName="object-contain"
            />
          )}
          {isError && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <h3>Something went wrong with fetching</h3>
              <p className="text-muted-foreground mb-6">But give it one more go</p>
              <Button onClick={() => refetch()}>
                <RefreshCw />
              </Button>
            </div>
          )}

          {!isMobile && (
            <div className="absolute bottom-0 left-0 flex">
              <ArrowDown strokeWidth={1} />
              <div>
                <p className="text-xs uppercase">(Keep</p>
                <p className="text-xs uppercase">scrolling)</p>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-[35%] p-8 lg:p-12 rounded-3xl bg-card flex flex-col justify-start gap-10 overflow-y-auto no-scrollbar">
          <div className=" flex flex-col justify-start gap-2">
            {/* photo */}
            <h3 className="mb-4">Photo details</h3>
            <p>
              <strong>Title:</strong>{" "}
              {photo?.title ? photo.title.charAt(0).toUpperCase() + photo.title.slice(1) : "..."}
            </p>
            <p>
              <strong>Photographer:</strong> {picsumData?.author}
            </p>
            <p>
              <strong>Resolution:</strong> {picsumData?.width} x {picsumData?.height}
            </p>
            <div className="flex items-center justify-start flex-wrap gap-4 mt-4">
              {photo && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleLike(photo.id)}
                  title={isLiked(photo.id) ? "Unlike" : "Like"}
                  className="hover:cursor-pointer"
                >
                  <Heart
                    className={cn(
                      "!h-7 !w-7 transition-colors",
                      isLiked(photo.id)
                        ? "fill-red-500 text-red-500"
                        : "text-foreground hover:text-foreground/80"
                    )}
                    strokeWidth={1}
                  />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  sharePhoto({
                    photoId: photo?.id,
                    title: photo?.title,
                  })
                }
                className="hover:cursor-pointer hover:text-foreground/80"
              >
                <Share2 className="!h-7 !w-7" strokeWidth={1} />
              </Button>
              {photo && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => downloadPhoto({ photoUrl: photo?.url, title: photo?.title })}
                  className="hover:cursor-pointer hover:text-foreground/80"
                >
                  <Download className="!h-7 !w-7" strokeWidth={1} />
                </Button>
              )}
            </div>
          </div>

          {/* album */}
          <div className="flex flex-col justify-start gap-2 bg-secondary p-6 rounded-3xl">
            <h3 className="mb-4">Album details</h3>
            <p>
              <strong>Name:</strong>{" "}
              {album?.title ? album.title.charAt(0).toUpperCase() + album.title.slice(1) : "..."}
            </p>
            <Link to={`/albums/${album?.id}`}>
              <p className="hover:text-blue-400">
                <strong>Album:</strong> No. {album ? album.id : "..."}
              </p>
            </Link>
            <p>
              <strong>Created by:</strong> {user ? user.name : "Couldn't find user"}
            </p>
            <p>
              <strong>Contact user:</strong>
            </p>

            <div className="flex items-center justify-center flex-wrap gap-4 mt-4">
              <a
                href={`mailto:${user?.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex justify-center items-center"
                title="Send email"
              >
                <Mail className="h-5 w-5" strokeWidth={1} />
              </a>

              <a
                href={`tel:${user?.phone}`}
                className="h-10 w-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex justify-center items-center"
                title="Call"
              >
                <Phone className="h-5 w-5" strokeWidth={1} />
              </a>

              <a
                href={`https://${user?.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex justify-center items-center"
                title="Visit website"
              >
                <Globe className="h-5 w-5" strokeWidth={1} />
              </a>

              <Popover>
                <PopoverTrigger className="h-10 w-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:cursor-pointer transition-colors flex justify-center items-center">
                  <Building2 className="h-5 w-5" strokeWidth={1} />
                </PopoverTrigger>
                <PopoverContent
                  sideOffset={6}
                  className="bg-popover text-popover-foreground rounded-3xl px-6 py-4 z-[9999]"
                >
                  <p className="text-xs font-semibold">Company: {user?.company.name}</p>
                  <p className="text-xs">"{user?.company.catchPhrase}"</p>
                  <p className="text-xs mt-1 text-muted-foreground">In other words what they do:</p>
                  <p className="text-xs text-muted-foreground">{user?.company.bs}</p>
                </PopoverContent>
              </Popover>
            </div>

            {/* do something clever with address */}
            {/* {user?.address && (
              <iframe
                title="User location"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}&hl=en&z=14&output=embed`}
                className=" shadow-sm"
              ></iframe>
            )} */}
          </div>
        </div>
      </section>
      <section>
        {isLoading && (
          <div className="w-full h-[50dvh] flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        <h2 className="mb-8 ">More photos from this album</h2>
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

export default PhotoDetails;
