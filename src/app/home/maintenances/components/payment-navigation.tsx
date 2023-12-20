"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PaymentsNavigation = ({ property }: { property: String }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/home/payments/${property}`);
  }, [property, router]);

  return null;
};

export default PaymentsNavigation;
