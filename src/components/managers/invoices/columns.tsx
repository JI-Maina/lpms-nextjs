"use client";

import { Button } from "@/components/ui/button";
import { Invoice } from "../../../../types/property";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invoice
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const invoice = row.original;

      return <div>INV-{invoice.id}</div>;
    },
  },
  {
    accessorKey: "invoice_date",
    header: "Date",
  },

  {
    accessorKey: "tenant",
    header: "Tenant",
    cell: ({ row }) => {
      const invoice = row.original;

      return (
        <div>
          {invoice.tenant.user.first_name} {invoice.tenant.user.last_name}
        </div>
      );
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => {
      const invoice = row.original;
      return <div>{invoice.unit.unit_name}</div>;
    },
  },
  {
    accessorKey: "bills",
    header: "Particulars",
    cell: ({ row }) => {
      const invoice = row.original;
      return <div>{invoice.bills.length}</div>;
    },
  },
  {
    accessorKey: "total_amount",
    header: "Amount (KSh)",
  },
];
