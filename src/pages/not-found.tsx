import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="h-full w-full flex flex-col items-center justify-center text-center gap-4">
      <h2 className="">This page isn't available</h2>
      <p className="text-muted-foreground mb-6">Sorry, you can't access this.</p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </section>
  );
};

export default NotFound;
