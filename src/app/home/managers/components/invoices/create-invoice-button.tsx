"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const CreateInvoiceButton = () => {
  const router = useRouter();

  return (
    <Button
      size="sm"
      onClick={() => router.push("/home/managers/finances/invoices/create")}
    >
      <PlusCircle className="w-4 h-4 mr-2" /> Create Invoice
    </Button>
  );
};

export default CreateInvoiceButton;
