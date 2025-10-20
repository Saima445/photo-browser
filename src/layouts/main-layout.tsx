import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { PageLoader } from "@/components/page-loader";
import { Navigation } from "@/layouts/navigation";

export const MainLayout = () => {
  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-y-auto">
      <Navigation />

      <main className="flex-1 max-w-[1600px] mx-auto p-6 pt-[68px] 2xl:px-0">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
