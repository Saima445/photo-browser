import { useQuery } from "@tanstack/react-query";
import { ArrowDown, Loader, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

import { getPhotosWithClient } from "@/api/jsonplaceholder/photos";
import { ImageWithFallback } from "@/components/image-with-fallback";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/features/theme-provider";
import { cn } from "@/lib/utils";

const Home = () => {
  const { theme } = useTheme();

  const {
    data: photos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["photos"],
    queryFn: getPhotosWithClient,
  });

  return (
    <div className="relative flex flex-col gap-12">
      <ScrollToTopButton />
      <section
        className="h-[calc(100svh-68px)] bg-contain bg-center bg-no-repeat sm:bg-fixed transition-[background-image] duration-500"
        style={{
          backgroundImage: theme === "dark" ? "url('/images/bg-dark.jpg')" : "url('/images/bg-light.jpg')",
        }}
      >
        <div className="flex flex-col justify-start">
          <div className="flex items-center gap-6">
            <h1>Serving</h1>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                document.getElementById("photos")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ArrowDown className="h-12 w-12 shrink-0" strokeWidth={1} />
            </Button>
          </div>
          <h1>better pixels</h1>
          <h1 className="self-end items-end">since 2025</h1>
        </div>
      </section>
      <section id="photos">
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

        {photos && photos.length > 0 && (
          <div className="columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-4 space-y-4 lg:gap-10 lg:space-y-10">
            {photos.slice(0, 1000).map((photo, index) => {
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
                <Link
                  key={photo.id}
                  to={`/photos/${photo.id}`}
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
