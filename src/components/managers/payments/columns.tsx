"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "../../../../types/property";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "payment_for",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: "Method",
  },
  {
    accessorKey: "receipt_no",
    header: "Receipt",
  },
  {
    accessorKey: "payment_date",
    header: "Date",
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => {
      const payment = row.original;

      return <div>{payment.unit.unit_name}</div>;
    },
  },
  {
    accessorKey: "tenant",
    header: "Tenant",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div>
          {payment.unit.tenant?.user.first_name}{" "}
          {payment.unit.tenant?.user.last_name}
        </div>
      );
    },
  },
  {
    accessorKey: "payment_amount",
    header: "Amount",
  },
  // {
  //   accessorKey: "actions",
  //   cell: ({ row }) => {
  //     const tenant = row.original;

  //     return <DeleteTenantModal tenant={tenant} />;
  //   },
  // },
];
