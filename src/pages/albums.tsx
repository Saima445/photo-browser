import { useQuery } from "@tanstack/react-query";
import { Folder, Loader, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

import { getAlbumsWithClient } from "@/api/jsonplaceholder/albums";
import { Button } from "@/components/ui/button";
import BackPreviousButton from "@/elements/button-back-to-previous";
import { cn } from "@/lib/utils";
import { photoAspectClass } from "@/utils/photo-aspect-class";

const Albums = () => {
  const {
    data: albums,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbumsWithClient,
  });

  return (
    <div className="relative md:h-[calc(100svh-68px)] pt-16 sm:pt-24">
      <BackPreviousButton />
      <section>
        {/* <div className="sm:sticky sm:top-[68px] w-full flex justify-center mb-8 z-999">
          <Select
            value={selectedUser === null ? "" : String(selectedUser)}
            onValueChange={(value) => setSelectedUser(value === "all" ? null : Number(value))}
          >
            <SelectTrigger className="w-[50%]">
              <SelectValue placeholder="Filter photos by user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All users</SelectItem>
              {users?.map((user) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
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

        {albums && albums.length > 0 && (
          <div className="columns-2 sm:columns-3 md:columns-4 xl:columns-5 gap-4 space-y-4 lg:gap-10 lg:space-y-10">
            {albums.map((album, index) => {
              return (
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
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Albums;
