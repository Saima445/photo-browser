import { useQuery } from "@tanstack/react-query";
import { Folder, Loader, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getAlbumsWithClient } from "@/api/jsonplaceholder/albums";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BackPreviousButton from "@/elements/button-back-to-previous";
import ScrollToTopButton from "@/elements/button-scroll-to-top";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { cn } from "@/lib/utils";
import { photoAspectClass } from "@/utils/photo-aspect-class";

const Albums = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    data: albums,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbumsWithClient,
  });

  const filteredAlbums = useMemo(() => {
    if (!albums) return albums;

    let result = albums;

    if (selectedAlbum) {
      result = result.filter((album) => album.id === selectedAlbum);
    }

    return [...result].sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));
  }, [albums, selectedAlbum, sortOrder]);

  const { visibleCount, loadMoreRef } = useInfiniteScroll(filteredAlbums?.length ?? 0, 50);

  return (
    <div className="relative md:h-[calc(100svh-68px)] pt-16 sm:pt-24">
      <ScrollToTopButton />
      <BackPreviousButton />
      <section>
        <div className="flex justify-between flex-wrap items-center gap-2 mb-6">
          <h2 className="leading-none">All albums</h2>
          <div className="flex flex-wrap gap-1">
            <Input
              id="albumId"
              type="number"
              placeholder="Enter album number..."
              value={selectedAlbum === null ? "" : String(selectedAlbum)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedAlbum(value === "" ? null : Number(value));
              }}
              className="w-[11rem] text-center"
            />
            <Button
              variant="outline"
              onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
              className="h-10 w-[7rem]"
            >
              Sort: {sortOrder === "asc" ? "Asc ↑" : "Desc ↓"}
            </Button>
          </div>
        </div>
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

        {filteredAlbums && filteredAlbums.length > 0 && (
          <>
            <div className="columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-4 space-y-4 lg:gap-10 lg:space-y-10">
              {filteredAlbums.slice(0, visibleCount).map((album, index) => (
                <Link
                  key={album.id}
                  to={`/albums/${album.id}`}
                  className={cn(
                    "group relative bg-card p-2 rounded-3xl flex flex-col gap-2 justify-center items-center transform transition duration-300 hover:scale-[1.03] break-inside-avoid",
                    photoAspectClass(index)
                  )}
                >
                  <div className="flex gap-4 items-center">
                    <Folder className="w-12 h-12" strokeWidth={1} />
                    <h3>No. {album.id}</h3>
                  </div>
                  <p className="text-center px-2 line-clamp-2">
                    {album.title ? album.title.charAt(0).toUpperCase() + album.title.slice(1) : ""}
                  </p>
                </Link>
              ))}
            </div>
            <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
              {visibleCount < filteredAlbums.length ? (
                <Loader className="h-6 w-6 animate-spin text-primary" />
              ) : (
                <p className="text-muted-foreground text-sm"> All {filteredAlbums?.length} albums loaded</p>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Albums;
