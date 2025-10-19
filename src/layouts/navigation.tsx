import { cva } from "class-variance-authority";
import { NavLink } from "react-router-dom";

const navLink = cva(
  "px-4 py-2 text-sm font-medium transition-colors hover:text-primary", // base classes
  {
    variants: {
      active: {
        true: "text-primary font-semibold",
        false: "text-muted-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export const Navigation = () => {
  return (
    <nav className="flex items-center justify-center gap-6 py-4 border-b bg-background">
      <NavLink to="/" className={({ isActive }) => navLink({ active: isActive })}>
        Home
      </NavLink>
      <NavLink to="/albums" className={({ isActive }) => navLink({ active: isActive })}>
        Albums
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => navLink({ active: isActive })}>
        Profile
      </NavLink>
    </nav>
  );
};
