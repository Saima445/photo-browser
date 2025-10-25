import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, Building2, Globe, Loader, Mail, Phone, RefreshCw } from "lucide-react";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAlbumByIdWithClient } from "@/api/jsonplaceholder/albums";
import { getPhotoByIdWithClient, getPhotosByAlbumIdWithClient } from "@/api/jsonplaceholder/photos";
import { getUserByIdWithClient } from "@/api/jsonplaceholder/users";
import { getPicsumPhotoInfo } from "@/api/picsum/picsum-photo";
import { Button } from "@/components/ui/button";
import BackPreviousButton from "@/elements/button-back-to-previous";
import ScrollToTopButton from "@/elements/button-scroll-to-top";
import { ImageWithFallback } from "@/elements/image-with-fallback";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { photoAspectClass } from "@/utils/photo-aspect-class";

const PhotoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
    <div className="relative flex flex-col gap-24 pt-24 md:pt-0">
      <ScrollToTopButton />
      <BackPreviousButton />
      <section className="md:h-[calc(100svh-68px)] md:max-h-[1000px] gap-6 pb-8 flex flex-col md:flex-row">
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
        <div className="md:w-[35%] p-8 lg:p-12 rounded-3xl bg-card flex flex-col justify-start gap-8 overflow-y-auto no-scrollbar">
          <div className=" flex flex-col justify-start gap-2">
            <h3 className="mb-4">Photo details</h3>

            <p>Title: {photo?.title ? photo.title.charAt(0).toUpperCase() + photo.title.slice(1) : ""}</p>
            <p>Photographer: {picsumData?.author}</p>
            <p>
              Resolution: {picsumData?.width} x {picsumData?.height}
            </p>
          </div>
          <div className="flex flex-col justify-start gap-2 bg-secondary p-6 rounded-3xl">
            <h3 className="mb-4">Album details</h3>
            <p>Album: {album?.title ? album.title.charAt(0).toUpperCase() + album.title.slice(1) : "..."}</p>
            <p>Album No. {album ? album.id : "..."}</p>
            <p>Who made this album: {user ? user.name : "Couldn't find user"}</p>

            <div className="flex items-center justify-center flex-wrap gap-4 mt-4">
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

        {isError && (
          <div className="w-full h-[50dvh] flex flex-col items-center justify-center gap-4">
            <h3>Something went wrong with fetching</h3>
            <p className="text-muted-foreground mb-6">But give it one more go</p>
            <Button onClick={() => refetch()}>
              <RefreshCw />
            </Button>
          </div>
        )}
        <h2 className="mb-8 ">More photos from this album</h2>
        {photosByAlbum && photosByAlbum.length > 0 && (
          <div className="columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-4 space-y-4 lg:gap-10 lg:space-y-10">
            {photosByAlbum.map((photo, index) => {
              return (
                <div
                  key={photo.id}
                  onClick={() => {
                    navigate(`/photos/${photo.id}`);
                    document.getElementById("scroll-root")?.scrollTo({ top: 0, behavior: "smooth" });
                  }}
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
