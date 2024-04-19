"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Bill, Unit } from "../../../../types/property";
import CreateBillsDialog from "./create-bill-dialog";

type BillsProps = {
  unit: Unit;
  newBills: Bill[];
  setNewBills: Dispatch<SetStateAction<Bill[]>>;
};

const InvoiceBills = ({ unit, newBills, setNewBills }: BillsProps) => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const getBills = async () => {
      const res = await fetch(`/api/bills/${unit?.property}/${unit?.id}`);
      const data = await res.json();
      setBills(data);
    };

    if (unit != undefined) getBills();
  }, [unit]);

  const waterBills = bills.filter((bill) => bill.bill_type === "water");
  const recentWaterBill = waterBills[waterBills.length - 1];

  // console.log(newBills);

  return (
    <div className="border p-2 space-y-2">
      <div className="flex justify-end">
        {unit != undefined && (
          <CreateBillsDialog
            unit={unit}
            setNewBills={setNewBills}
            waterBill={recentWaterBill}
          />
        )}
      </div>

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

      {newBills.map((bill) => (
        <div className="flex justify-between border p-1" key={bill.id}>
          <div>{bill.bill_type}</div>
          <div>KSh {bill.bill_amount}</div>
          <div>Action</div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceBills;
