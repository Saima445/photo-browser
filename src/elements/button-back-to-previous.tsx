import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const BackPreviousButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="ghost" size="lgIcon" onClick={() => navigate(-1)} className="absolute top-0 -left-1.5">
      <ArrowLeft className="!h-12 !w-12 shrink-0" strokeWidth={1} />
    </Button>
  );
};

export default BackPreviousButton;
