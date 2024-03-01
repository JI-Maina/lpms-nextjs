"use client";

import { Bill, Unit } from "@/types/property";
import { useEffect, useState } from "react";

type BillsProps = {
  unit: Unit;
};

const InvoiceBills = ({ unit }: BillsProps) => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const getBills = async () => {
      const res = await fetch(`/api/bills/${unit?.property}/${unit?.id}`);
      const data = await res.json();
      setBills(data);
    };

    getBills();
  }, [unit]);

  const waterBills = bills.filter((bill) => bill.bill_type === "water");
  const recentWaterBill = waterBills[waterBills.length - 1];

  console.log(recentWaterBill);

  return (
    <div className="border p-2 space-y-2">
      <div className="flex justify-end">Add bill</div>

      {unit != undefined && (
        <div className="flex justify-between border p-1">
          <div>Rent</div>
          <div>KSh {unit?.unit_rent}</div>
          <div>Action</div>
        </div>
      )}

      {recentWaterBill != undefined && (
        <div className="flex justify-between border p-1">
          <div>Water</div>
          <div>KSh {recentWaterBill.bill_amount}</div>
          <div>Action</div>
        </div>
      )}

      <div className="flex justify-between border p-1">
        <div>Water</div>
        <div>Amount</div>
        <div>Action</div>
      </div>
    </div>
  );
};

export default InvoiceBills;
