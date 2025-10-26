import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { PageLoader } from "@/elements/page-loader";
import { Navigation } from "@/layouts/navigation";

export const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <div className="relative min-h-[100dvh] w-[100vw] flex flex-col no-scrollbar">
        <Navigation />

        <main className="flex-1 w-full max-w-[1600px] mx-auto py-6 px-6 sm:px-8 pt-[68px] 2xl:px-0">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  );
};
