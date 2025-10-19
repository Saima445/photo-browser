import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { PageLoader } from "@/components/page-loader";
import { Navigation } from "@/layouts/navigation";

export const MainLayout = () => {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col">
      <Navigation />

      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
