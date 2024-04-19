"use client";

import { useEffect, useState } from "react";

import { columns } from "./columns";
import { PaymentsTable } from "./payments-table";
import { Payment, Property } from "../../../../types/property";
import AddUnitPaymentDialog from "./add-unit-payment-modal";
import PropertyDetailsHeader from "../shared/property-details-header";

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
  }, [id, properties]);

  const year = new Date().getFullYear();
  let recentPayments: Payment[] = [];

  if (year in payments) {
    const keys = Object.keys(payments[year]);
    recentPayments = payments[year][keys[keys.length - 1]];
  } else if (year - 1 in payments) {
    const keys = Object.keys(payments[year - 1]);
    recentPayments = payments[year - 1][keys[keys.length - 1]];
  }

  return (
    <main>
      <PropertyDetailsHeader
        id={id}
        title="Payments Data"
        properties={properties}
        onChange={onChange}
        actionModal={units && <AddUnitPaymentDialog units={units} />}
      />

      <div className="max-w-[360px] sm:max-w-full">
        <PaymentsTable data={recentPayments} columns={columns} />
      </div>
    </main>
  );
};

export default PropertyPayments;
