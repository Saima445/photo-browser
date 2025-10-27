import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/features/theme-provider";

export const Hero = () => {
  const { theme } = useTheme();

  return (
    <div
      className="h-full w-full bg-cover sm:bg-contain bg-center bg-no-repeat sm:bg-fixed transition-[background-image] duration-500"
      style={{
        backgroundImage:
          theme === "dark"
            ? `url('${import.meta.env.BASE_URL}images/bg-dark.jpg')`
            : `url('${import.meta.env.BASE_URL}images/bg-light.jpg')`,
      }}
    >
      <div className="h-full flex flex-col justify-center sm:px-8">
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
        <h1 className="font-playfair font-bold">better pixels</h1>
        <h1 className="sm:self-end">since 2025</h1>
      </div>
    </div>
  );
};
