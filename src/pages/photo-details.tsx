import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import { Building2, Globe, Loader, Mail, Phone, RefreshCw } from "lucide-react";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAlbumByIdWithClient } from "@/api/jsonplaceholder/albums";
import { getPhotoByIdWithClient, getPhotosByAlbumIdWithClient } from "@/api/jsonplaceholder/photos";
import { getUserByIdWithClient } from "@/api/jsonplaceholder/users";
import { getPicsumPhotoInfo } from "@/api/picsum/picsum-photo";
import { ImageWithFallback } from "@/components/image-with-fallback";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PhotoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: photo,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["photo", id],
    queryFn: () => getPhotoByIdWithClient(id!),
    enabled: !!id,
    placeholderData: (prev) => prev,
  });

  const { data: picsumData } = useQuery({
    queryKey: ["picsum photo data", id],
    queryFn: () => getPicsumPhotoInfo(id!),
    enabled: !!id,
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

  useLayoutEffect(() => {
    document.getElementById("scroll-root")?.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative flex flex-col gap-12">
      <ScrollToTopButton />
      <section className="md:h-[calc(100svh-68px)] gap-6 md:gap-0 pb-8 flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center">
          {isLoading && <Loader className="h-8 w-8 animate-spin text-primary" />}
          {photo && (
            <ImageWithFallback src={photo.url} alt={photo.title} className="md:max-h-[80%] md:max-w-[80%]" />
          )}
        </div>
        <div className="md:w-[35%] p-8 lg:p-12 rounded-3xl bg-card flex flex-col justify-start gap-8 overflow-y-auto no-scrollbar">
          <div className=" flex flex-col justify-start gap-4">
            <h3 className="mb-2">Photo details</h3>

            <p>Title: {photo?.title}</p>
            <p>Author: {picsumData?.author}</p>
            <p>
              Resolution: {picsumData?.width} x {picsumData?.height}
            </p>
          </div>
          <div className="flex flex-col justify-start gap-4 bg-secondary p-6 rounded-3xl">
            <h3 className="mb-2">Album details</h3>
            <p>Album: {album?.title}</p>
            <p>User behind this album: {user?.username}</p>

            <div className="flex items-center justify-center flex-wrap gap-4">
              <a
                href={`mailto:${user?.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                title="Send email"
              >
                <Mail className="h-5 w-5" strokeWidth={1} />
              </a>

              <a
                href={`tel:${user?.phone}`}
                className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                title="Call"
              >
                <Phone className="h-5 w-5" strokeWidth={1} />
              </a>

              <a
                href={`https://${user?.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                title="Visit website"
              >
                <Globe className="h-5 w-5" strokeWidth={1} />
              </a>

              <Popover>
                <PopoverTrigger className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Building2 className="h-5 w-5" strokeWidth={1} />
                </PopoverTrigger>
                <PopoverContent
                  sideOffset={6}
                  className="bg-accent text-accent-foreground rounded-3xl px-6 py-4 z-[9999]"
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
          <div className="columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-4 space-y-4 lg:gap-10 lg:space-y-10">
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
                      {photo.title}
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

export default PhotoDetails;
