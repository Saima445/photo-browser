import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center text-center">
      <h4 className="text-4xl font-bold mb-2">This page isn't available</h4>
      <p className="text-muted-foreground mb-6">Sorry, you can't access this.</p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
};

export default NotFound;
