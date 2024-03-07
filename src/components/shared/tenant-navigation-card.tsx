"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TenantNavigationCard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/home/tenants");
  }, [router]);

  return null;
};

export default TenantNavigationCard;
