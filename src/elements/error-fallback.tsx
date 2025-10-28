import type { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();
  return (
    <section className="h-[100dvh] w-full flex flex-col items-center justify-center text-center gap-4">
      <h3>Something went wrong</h3>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
      <Button
        onClick={() => {
          resetErrorBoundary();
          navigate("/");
        }}
      >
        Go Home
      </Button>
    </section>
  );
};
