"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

const NavigateButton = ({ propertyId }: { propertyId: string }) => {
  const router = useRouter();

  return (
    <Button
      size="icon"
      variant="link"
      onClick={() => router.push(`/home/properties/${propertyId}`)}
    >
      <MoreHorizontal />
    </Button>
  );
};

export default NavigateButton;
