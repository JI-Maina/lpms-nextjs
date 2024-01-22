"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NavigationCard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/home/managers");
  }, [router]);

  return null;
};

export default NavigationCard;
