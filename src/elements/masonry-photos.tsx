import { Heart } from "lucide-react";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useLocalLikes } from "@/hooks/use-local-favorites";
import { cn } from "@/lib/utils";
import { photoAspectClass } from "@/utils/photo-aspect-class";

import { ImageWithFallback } from "./image-with-fallback";

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
}

interface PhotoMasonryProps {
  photos: Photo[];
  visibleCount: number;
}

export const MasonryPhotos = ({ photos, visibleCount }: PhotoMasonryProps) => {
  const { isLiked, toggleLike } = useLocalLikes();

  const breakpointColumns = {
    default: 5,
    1280: 4,
    768: 3,
    640: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-4 lg:-ml-10 w-auto"
      columnClassName="pl-4 lg:pl-10 bg-clip-padding"
    >
      {photos.slice(0, visibleCount).map((photo, index) => (
        <div key={photo.id} className="relative group mb-4 lg:mb-10">
          <Link
            to={`/photos/${photo.id}`}
            className={cn(
              "block overflow-hidden transform transition duration-300 hover:scale-[1.03] break-inside-avoid",
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

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              toggleLike(photo.id);
            }}
            title={isLiked(photo.id) ? "Unlike" : "Like"}
            className="absolute top-1 right-1 p-0 rounded-full transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 hover:cursor-pointer"
          >
            <Heart
              className={cn(
                "!h-6 !w-6 transition-colors duration-300",
                isLiked(photo.id) ? "fill-red-500 text-red-500" : "text-white"
              )}
              strokeWidth={1}
            />
          </Button>
        </div>
      ))}
    </Masonry>
  );
};
