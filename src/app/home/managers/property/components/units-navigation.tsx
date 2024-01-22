"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UnitsNavigation = ({ property }: { property: String }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/home/managers/property/${property}`);
  }, [property, router]);

  return null;
};

export default UnitsNavigation;
