import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter } from "react-router-dom";

import { ErrorFallback } from "@/elements/error-fallback";
import { MainLayout } from "@/layouts/main-layout";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import PhotoDetails from "@/pages/photo-details";
import { queryClient } from "@/utils/query-client";

const Albums = lazy(() => import("@/pages/albums"));
const AlbumDetails = lazy(() => import("@/pages/album-details"));
const Profile = lazy(() => import("@/pages/profile"));

export const router = createBrowserRouter(
  [
    {
      element: (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            queryClient.clear();
          }}
          resetKeys={[location.pathname]}
        >
          <MainLayout />
        </ErrorBoundary>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/photos/:photoId",
          element: <PhotoDetails />,
        },
        {
          path: "/albums",
          element: <Albums />,
        },
        {
          path: "/albums/:albumId",
          element: <AlbumDetails />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: "/photo-browser/",
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);
