import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getPhotosWithClient } from "@/api/photos";
import { PageLoader } from "@/components/page-loader";
import { cn } from "@/lib/utils";

const Home = () => {
  const {
    data: photos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["photos"],
    queryFn: getPhotosWithClient,
  });

  if (isLoading) return <PageLoader />;
  if (isError) return <p className="p-8 text-center">Something went wrong with fetching</p>;

  return (
    <>
      <section className="flex justify-start">
        <h1>Let's check some pics!</h1>
      </section>
      <section>
        <div className="columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-4 space-y-4 lg:gap-10 lg:space-y-10">
          {photos?.slice(0, 40).map((photo, index) => {
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
                to={`/photo/${photo.id}`}
                className={cn(
                  "group relative block overflow-hidden transform transition duration-300 hover:scale-[1.03] break-inside-avoid",
                  sizeClass
                )}
              >
                <img
                  src={`${photo.thumbnailUrl}`}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-500">
                  <p className="opacity-0 group-hover:opacity-100 text-white text-center px-2 transition-opacity duration-500">
                    {photo.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
