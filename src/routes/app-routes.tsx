import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "@/layouts/main-layout";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import PhotoDetails from "@/pages/photo-details";
import { AuthRoutes } from "@/routes/auth-routes";

// test loader
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// const Home = lazy(() => delay(2000).then(() => import("@/pages/home")));
const UserDetails = lazy(() => import("@/pages/user-details"));
const Albums = lazy(() => import("@/pages/albums"));
const AlbumDetails = lazy(() => import("@/pages/album-details"));
const Profile = lazy(() => import("@/pages/profile"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/photos/:id" element={<PhotoDetails />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:albumId" element={<AlbumDetails />} />
        <Route path="/users/:id" element={<UserDetails />} />

        <Route element={<AuthRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
