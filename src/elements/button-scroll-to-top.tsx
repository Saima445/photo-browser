import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const ScrollToTopButton = () => {
  const [showTopArrow, setShowTopArrow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTopArrow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      variant="ghost"
      size="lgIcon"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`
        fixed bottom-6 right-4 sm:right-6 z-[999]
        transition-all duration-500
        ${showTopArrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}
      `}
    >
      <ArrowUp className="!h-12 !w-12 shrink-0" strokeWidth={1} />
    </Button>
  );
};

export default ScrollToTopButton;
