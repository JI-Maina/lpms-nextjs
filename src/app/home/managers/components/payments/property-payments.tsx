"use client";

import { useEffect, useState } from "react";

import { columns } from "./columns";
import { Property } from "@/types/property";
import { PaymentsTable } from "./payments-table";
import AddUnitPaymentDialog from "./add-unit-payment-modal";
import SelectPropertyHeader from "../shared/select-property-header";

type PropertyProps = {
  properties: Property[];
};

const PropertyPayments = ({ properties }: PropertyProps) => {
  const [id, setId] = useState(properties[0]?.id);
  const [payments, setPayments] = useState([]);

  const property = properties.find((property) => property.id === id);
  const units = property?.unit_set;

  const onChange = (value: string) => {
    setId(value);
  };

  useEffect(() => {
    const getPayments = async () => {
      const res = await fetch(`/api/payments/${id}`);
      const data = await res.json();
      setPayments(data);
    };

    if (id) getPayments();
  }, [id]);

  return (
    <main>
      <SelectPropertyHeader
        id={id}
        title="Payments Data"
        properties={properties}
        onChange={onChange}
        actionModal={units && <AddUnitPaymentDialog units={units} />}
      />

      <div className="max-w-[360px] sm:max-w-full">
        <PaymentsTable data={payments} columns={columns} />
      </div>
    </main>
  );
};

export default PropertyPayments;
