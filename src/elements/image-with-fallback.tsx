import { X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

export const ImageWithFallback = ({ src, alt, className, imageClassName }: ImageWithFallbackProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("h-full w-full flex items-center justify-center overflow-hidden", className)}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            imageClassName
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="bg-destructive w-full h-full flex items-center justify-center">
          <X strokeWidth={1} className="h-[50%] w-[50%]" />
        </div>
      )}
    </div>
  );
};
