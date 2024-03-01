"use client";

import { useEffect, useState } from "react";

import { columns } from "./columns";
import { Property } from "@/types/property";
import { InvoiceTable } from "./invoice-table";
import PropertiesHeader from "../shared/properties-header";
import CreateInvoiceButton from "./create-invoice-button";

type InvoiceProps = {
  properties: Property[];
};

const PropertyInvoices = ({ properties }: InvoiceProps) => {
  const [id, setId] = useState(properties?.[0]?.id);
  const [invoices, setInvoices] = useState([]);

  const onChange = (value: string) => {
    setId(value);
  };

  useEffect(() => {
    const getInvoices = async () => {
      const res = await fetch(`/api/invoices/${id}`);
      const data = await res.json();
      setInvoices(data);
    };

    if (id) getInvoices();
  }, [id, properties]);

  //   console.log(invoices);

  return (
    <main className="space-y-6">
      <PropertiesHeader
        properties={properties}
        onChange={onChange}
        dialog={<CreateInvoiceButton />}
      />

      <div>
        <InvoiceTable data={invoices} columns={columns} />
      </div>
    </main>
  );
};

export default PropertyInvoices;
