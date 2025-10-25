import { cva } from "class-variance-authority";
import { ArrowDownLeft, ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/elements/mode-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const navLink = cva("uppercase text-sm transition-colors font-extralight hover:text-muted-foreground", {
  variants: {
    active: {
      true: "font-semibold",
      false: "",
    },
    isMobile: {
      true: "text-xl flex items-center gap-0",
      false: "text-base",
    },
  },
  defaultVariants: {
    active: false,
    isMobile: false,
  },
});

export const Navigation = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/albums", label: "Albums" },
    { to: "/profile", label: "Profile" },
  ];

  if (isMobile) {
    return (
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between pl-6 pr-4 py-2 bg-background z-[999]">
        <Link to={"/"}>
          <h4 className="">Photo Browser</h4>
        </Link>
        {!menuOpen && (
          <Button variant="ghost" size="lgIcon" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <ArrowDownLeft className="!h-12 !w-12 shrink-0" strokeWidth={1} />
          </Button>
        )}

        <div
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background backdrop-blur-sm transition-opacity duration-300 ease-out",
            menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <Button
            variant="ghost"
            size="lgIcon"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-2 right-4"
          >
            <X className="!h-12 !w-12 shrink-0" strokeWidth={1} />
          </Button>

          <div className="flex flex-col items-center gap-10 text-center">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => navLink({ active: isActive, isMobile: true })}
                onClick={() => setMenuOpen(false)}
              >
                <ArrowUpRight className="h-12 w-12 shrink-0" strokeWidth={1} />
                {link.label}
              </NavLink>
            ))}

            <ModeToggle />
          </div>
        </div>
      </nav>
    );
  }

  // desktop
  return (
    <nav className="fixed top-0 left-0 w-full px-8 py-4 bg-background z-999">
      <div className="mx-auto max-w-[1600px] flex items-center justify-between">
        <div className="flex gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => navLink({ active: isActive, isMobile: false })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};
