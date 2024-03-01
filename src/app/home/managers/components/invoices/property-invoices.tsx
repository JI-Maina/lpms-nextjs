"use client";

import { Property } from "@/types/property";
import { columns } from "./columns";
import CreateInvoiceDialog from "./create-invoice-dialog";
import { InvoiceTable } from "./invoice-table";
import { useEffect, useState } from "react";

type InvoiceProps = {
  properties: Property[];
};

const PropertyInvoices = ({ properties }: InvoiceProps) => {
  const [id, setId] = useState(properties?.[0]?.id);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getInvoices = async () => {
      const res = await fetch(`/api/invoices/${id}`);
      const data = await res.json();
      setInvoices(data);
    };

    if (id) getInvoices();
  }, [id, properties]);

  console.log(invoices);

  return (
    <main className="space-y-6">
      <div className="h-36 bg-property bg-cover bg-center bg-no-repeat bg-opacity-5 relative">
        <div className="flex justify-end absolute right-0 bottom-0 p-1">
          <CreateInvoiceDialog />
        </div>
      </div>

      <div>
        <InvoiceTable data={invoices} columns={columns} />
      </div>
    </main>
  );
};

export default PropertyInvoices;
