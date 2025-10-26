import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/features/theme-provider";

export const Hero = () => {
  const { theme } = useTheme();

  return (
    <div
      className="h-full w-full bg-cover sm:bg-contain bg-center bg-no-repeat sm:bg-fixed transition-[background-image] duration-500"
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
    </div>
  );
};
