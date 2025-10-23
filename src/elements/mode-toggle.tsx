import { Bolt, Moon, Sun } from "lucide-react";
import { type JSX, useState } from "react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/features/theme-provider";
import { cn } from "@/lib/utils";

type ThemeOption = "light" | "dark" | "system";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const modes: { name: ThemeOption; icon: JSX.Element }[] = [
    { name: "light", icon: <Sun className="h-4 w-4" strokeWidth={1} /> },
    { name: "dark", icon: <Moon className="h-4 w-4" strokeWidth={1} /> },
    { name: "system", icon: <Bolt className="h-4 w-4" strokeWidth={1} /> },
  ];

  const active = modes.find((m) => m.name === theme) ?? modes[2];
  const others = modes.filter((m) => m.name !== active.name);

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={cn(
          "flex gap-2 transition-all duration-300 ease-in-out overflow-hidden",
          open ? "max-w-[200px] opacity-100 translate-x-0" : "max-w-0 opacity-0 translate-x-2"
        )}
      >
        {others.map((m) => (
          <Button
            key={m.name}
            variant="outline"
            size="icon"
            onClick={() => {
              setTheme(m.name);
              setOpen(false);
            }}
          >
            {m.icon}
          </Button>
        ))}
      </div>

      <Button variant="secondary" size="icon">
        {active.icon}
      </Button>
    </div>
  );
};
