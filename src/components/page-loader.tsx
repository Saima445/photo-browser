import { Loader } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center">
      <Loader className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};
